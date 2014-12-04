The ipfs
########

InterPlanetary Filesystem
=========================

Preamble
--------

Last week I was thinking about how cool it would be if I could serve pars_
images using something like the BitTorrent protocol from the browser. I asked
Jeeves: "Can browsers communicate peer-to-peer?" Turns out they can, through
WebRTC_.  The WebRTC protocol is supported by major browsers (but,
disappointingly, interoperability is only possible through a polyfill_) which
means it would be possible to implement a torrent client in JavaScript that
would run in the browser. And because, as a wise programmer once said,
everything you can think of has already been implemented in JavaScript, someone
`already has`_.

So that might have hapened, until I was on Dan O'Huiginn's blog and read `his
overview`_ of the InterPlanetary Filesystem.

It kind of sounded like what I wanted.

.. _pars: http://originalenclosure.net/pars
.. _WebRTC: http://www.webrtc.org/
.. _polyfill: http://www.webrtc.org/interop
.. _`already has`: https://github.com/feross/webtorrent
.. _`his overview`: http://ohuiginn.net/wp/?p=2032

Introduction
------------

IPFS got designed by some Stanford CS graduate dude (`Juan Batiz-Benet`_) and
it's pitching to become something that you can throw just about every buzzword
at. It's distributed, secure, high-performance and (yes, indeed)
version-controlled. It draws inspiration from things that everyone loves like
Git's DAG and BitTorrent's DHT. It has WIP implementations in hipster [1]_
languages like Golang and Node.js, someone is even working [2]_ on Haskell
implementation.

It's interesting to imagine what kind of web would be produced if IPFS achieved
widespread uptake by ISPs and browser vendors.

.. _`Juan Batiz-Benet`: http://juan.benet.ai/
.. [1] People are often suspicious about younger languages, but we were all
       young once ...
.. [2] Well, there's a GitHub issue that says someone expressed an interest at
       https://github.com/jbenet/ipfs/issues/4
