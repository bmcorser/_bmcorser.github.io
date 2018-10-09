ØMQ browser bridge
##################

`:roller_coaster:`
==================
|

Having a few days spare between gigs, I decided to spend some time reading the
`ØMQ Guide`_, which is written in a surprisingly jovial tone (considering ØMQ
backs some large finance-related systems at JPMorgan Chase and the Dow Jones
Industrial Average). For example, the first network schematic we find there is
the following gem.

.. _`ØMQ Guide`: http://zguide.zeromq.org/page:all

.. class:: center
.. figure:: /assets/images/zmq-fig1.png

Reading along and trying out a few of the examples in C on little clusters of
Alpine images made me feel quite enthusiastic about the library.

Since I quite often find myself involved in the production of web applications,
I wondered what the state of affairs was with respect to plugging a ØMQ network
into a web UI, perhaps to deliver progress reports of system status info to an
end user.

A few DuckDuckGo_ searches later and the lack of convincing results made me
resolve to attempt to plumb a ØMQ to WebSocket bridge myself – what else does
one do with one’s time?

.. _DuckDuckGo: https://duckduckgo.com/

Starters for ten
----------------
Since I was enjoying the C examples so much, initially I wanted to write the
whole thing in C, but I found the APIs presented by the handful of C libraries
around WebSockets either unfamiliar or complicated. Instead I opted for Rust to
do the actual “plugging” together of ØMQ sockets with WebSocket.

There are (naturally) ØMQ bindings for Rust and there is `approximately one`_
WebSocket library for the language (the latter makes choosing a lib
significantly easier) which has a nice readable event loop. Since, in order for
users-with-browsers to be able to access it, the WebSocket server must sit on
the boundary of our hypothetical ØMQ network. That means it presents an obvious
attack vector and Rust's promises around memory safety make it an attratice
choice for internet-exposed interfaces. We will use Nginx to “add” a TLS layer
to incoming requests and handle half of the HTTPS handshake – I’m assuming
Nginx’s implementation is reasonably secure.

.. _`approximately one`: https://crates.io/crates/websocket


Deep breaths
------------
Let’s take a step back and sketch out what we are trying to do; we have a
browser that will send a ``wss://`` request to an Nginx server that will
upgrade, shake hands with and ``proxy_pass`` this request to a WebSocket
server. Once the WS connection is established, the WS server will hook up a ØMQ
socket and be responsible for proxying messages that appear on the socket
through to the browser, via the connected WebSocket. There follows a diagram of
our proposed infra.

.. dot-graph::

    digraph merkle {
        rankdir=RL;
        node [shape=rect, fontname=courier, fontsize=9];
        zmq [rank=10];
        browser -> nginx -> wss;
        nginx -> browser[color=red,penwidth=3.0];
        wss -> nginx[color=red,penwidth=3.0];
        zmq -> wss[color=red,penwidth=3.0];
    }

Reading, as is tradition, from left to right, let's examine the config of each
component.

Target and proxy
----------------

On the part of the browser we don’t need to do anything unusual. Let’s imagine
some client app is already running there, all we need to do is open a secure
WebSocket connection with ``wss://`` and remember to pass the string argument
``rust-websocket`` to specifiy the protocol we shall use (to please our Rusty
WS server). We write

.. code-block:: javascript

    var ws = new WebSocket('wss://url', 'rust-websocket');

Ref: |client|_

.. |client| replace:: ``src/client.html``
.. _`client`: https://gitlab.com/bmcorser/zmq-wss/blob/master/src/client.html

Nginx’s job is to accept HTTPS pre-flight requests, upgrade them and proxy them
on to the WebSocket server. The prescient parts of the config are

.. code-block :: nginx

    server {
        listen <port> ssl;  # only accept connections over TLS
        index index.html;
        location /<path> {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
            proxy_set_header Sec-WebSocket-Key $http_sec_websocket_key;
            proxy_pass http://<hostname>;
        }
    }

actually

.. note:: On SSL config. I use `Let’s Encrypt`_ certificates in the
    `demonstration repo`_, so it’s the responsibility of the reader to have a
    set of SSL certs for their domain and amend the above Nginx configuration
    accordingly.

.. _`Let’s Encrypt`: https://letsencrypt.org/
.. _`demonstration repo`: https://gitlab.com/bmcorser/zmq-wss

MITM
----
Now for the centrepiece of our infra, the actual bridge between ØMQ and
WebSocket. Because I envisioned the browser client as a passive “listener”, I
have only implemented this bridge in the server to client direction (it would
be easy to implemented the other “side” of the bridge). The source code is
wrapped in a Cargo package (and a ``Dockerfile`` for ``libzmq`` at system
level) to manage dependencies.

I based by work on the `server example`_ given by ``rust-websocket`` project,
but replaced echo loop with a polling loop to recieve messages on a ØMQ ``SUB``
socket and re-publish them on the connected WebSocket.
    
.. _`server example`: https://github.com/websockets-rs/rust-websocket/blob/master/examples/server.rs

.. code-block:: diff

    diff --git a/src/zmq-wss/src/main.rs b/src/zmq-wss/src/example.rs
    index ed50182..0cb8065 100644
    --- a/src/zmq-wss/src/main.rs
    +++ b/src/zmq-wss/src/example.rs
    @@ -1,14 +1,13 @@
     extern crate websocket;
    +extern crate zmq;
    
     use std::thread;
     use websocket::sync::Server;
     use websocket::OwnedMessage;
    
     fn main() {
    +  let ws_server = Server::bind("0.0.0.0:80").unwrap();
    -  let server = Server::bind("127.0.0.1:2794").unwrap();
    
    +  for request in ws_server.filter_map(Result::ok) {
    -  for request in server.filter_map(Result::ok) {
         // Spawn a new thread for each connection.
         thread::spawn(move || {
           if !request.protocols().contains(&"rust-websocket".to_string()) {
    @@ -16,29 +15,34 @@ fn main() {
             return;
           }
    
    +      let client = request.use_protocol("rust-websocket").accept().unwrap();
    -      let mut client = request.use_protocol("rust-websocket").accept().unwrap();
    -
           let ip = client.peer_addr().unwrap();
    -
           println!("Connection from {}", ip);
    
    +      let (_, mut sender) = client.split().unwrap();
    -      let message = OwnedMessage::Text("Hello".to_string());
    -      client.send_message(&message).unwrap();
    -
    -      let (mut receiver, mut sender) = client.split().unwrap();
    
    +      let zmq_ctx = zmq::Context::new();
    +      let subscriber = zmq_ctx.socket(zmq::SUB).unwrap();
    +      assert!(subscriber.connect("tcp://zmq-pub:5556").is_ok());
    +      assert!(subscriber.set_subscribe(b"").is_ok());
    -      for message in receiver.incoming_messages() {
    -        let message = message.unwrap();
    
    +      let mut zmq_msg = zmq::Message::new().unwrap();
    +      loop {
    +        if subscriber.recv(&mut zmq_msg, zmq::DONTWAIT).is_err() {
    +          continue;
    -        match message {
    -          OwnedMessage::Close(_) => {
    -            let message = OwnedMessage::Close(None);
    -            sender.send_message(&message).unwrap();
    -            println!("Client {} disconnected", ip);
    -            return;
    -          }
    -          OwnedMessage::Ping(ping) => {
    -            let message = OwnedMessage::Pong(ping);
    -            sender.send_message(&message).unwrap();
    -          }
    -          _ => sender.send_message(&message).unwrap(),
             }
    +        let ws_message = OwnedMessage::Text(
    +          zmq_msg.as_str().unwrap().to_string()
    +        );
    +        sender.send_message(&ws_message).unwrap();
           }
         });
       }
     }

Let's look at the patch more closely ...

.. code-block:: rust

    let zmq_ctx = zmq::Context::new();
    let subscriber = zmq_ctx.socket(zmq::SUB).unwrap();
    assert!(subscriber.connect("tcp://zmq-pub:5556").is_ok());

is the standard ØMQ set up,

.. code-block:: rust

    assert!(subscriber.set_subscribe(b"").is_ok());

subscribes to all messages (the ``b""`` means “no filter”),

.. code-block:: rust

    let mut zmq_msg = zmq::Message::new().unwrap();

creates a message container for reuse inside the loop,

.. code-block:: rust

    loop {
      if subscriber.recv(&mut zmq_msg, zmq::DONTWAIT).is_err() {
        continue;
      }
      // ...

nonblocking message receive (we could do other work this loop), populates the
message container or returns an error,

.. code-block:: rust

      // ...
      let ws_message = OwnedMessage::Text(
        zmq_msg.as_str().unwrap().to_string()
      );
      sender.send_message(&ws_message).unwrap();
    }

we treat all messages as strings, but WebSocket supports binary messages as
well, so the same message format possibilities that exist for ØMQ are also
available here, send the ØMQ message to the browser over WebSocket as a text
frame.

And that’s it. All source (mostly a Docker Compose file) is available `on
GitLab`_, there follows a diagram of what we just built.

.. figure:: https://docs.google.com/drawings/d/e/2PACX-1vRQ0upskg3tZaDDMhSQ6rIOxVaai4ttAYWW2GkS-YM4KhWQT-tySwOicGfjnd0Kuz4X-x-MZpOqlxfq/pub?w=1440&h=1080
            :class: full

.. _`on GitLab`: https://gitlab.com/bmcorser/zmq-wss
