The ``ipfs``
############

InterPlanetary Filesystem
=========================

Preamble
--------

Last week, dreaming about being able to serve pars_ images using something like
the BitTorrent protocol from the browser. I asked Jeeves: "Can browsers
communicate peer-to-peer?" Turns out they can through WebRTC_, released by
Harald Alvestrand ("on behalf" of Google) in 2011. The WebRTC protocol is
supported by some major browsers but, disappointingly, interoperability is
only possible through a polyfill_ and neither Safari or IE have native support
in any form. It would be possible to implement something like a torrent client
in JavaScript that would run in the browser. As the wise programmer once said,
everything you can think of has already been implemented in JavaScript, and
sure enough someone has already implemented an in-browser BitTorrent client,
called webtorrent_.

So that could have gone somewhere, until I was on Dan O'Huiginn's blog and read
`his overview`_ of the InterPlanetary Filesystem.

It kind of sounded like something I wanted.

.. _pars: http://originalenclosure.net/pars
.. _WebRTC: http://www.webrtc.org/
.. _polyfill: http://www.webrtc.org/interop
.. _webtorrent: https://github.com/feross/webtorrent
.. _`his overview`: http://ohuiginn.net/wp/?p=2032

Introduction
------------

IPFS is being designed primarily by a Stanford CS dude (`Juan Batiz-Benet`_),
who made a company which sold to Yahoo as an `"acqui-hire"`_ last year. The
protocol is not groundbreaking in itself, it's a pretty simple idea. It
describes something like a single, global Git repo that supports peer-to-peer
protocols as well as SSH and HTTP. You can get the data you want by cloning the
relevant part of the DAG through BitTorrent (like a shallow clone in Git). The
parts of the repo you have locally would be seeded to others in the network who
requested them, following similar choking rules to BitTorrent.

It's a great idea because it builds on ideas many people are familiar with,
that have mature and and widely successful implementations. At least one
unrelated thrust (GTP_) has already been made in a similar direction, but IPFS
does some clever stuff on top (see `Mutable namespaces`_) that I think gives it
good shot at becoming popular. It has WIP implementations in hipster [#]_
languages like Golang and Node.js, someone is even working [#]_ on Haskell
implementation. Groovy.

However, it's not going to happen tomorrow; IPFS is still just a cool idea.
There are no clients, there is no toolchain or "ecosystem" and there's no
browser support. That said, let's have a look in some more detail at what IPFS
is made out of and imagine some applications of being able "mount the world at
``/ipfs``".


.. _`Juan Batiz-Benet`: http://juan.benet.ai/
.. _`"acqui-hire"`: http://en.wikipedia.org/wiki/Acqui-hiring
.. _GTP: https://code.google.com/p/gittorrent/
.. [#] Read "young".
.. [#] Well, there's a GitHub issue that says someone expressed an interest at
       https://github.com/jbenet/ipfs/issues/4

Innards
-------

Running through the stack that makes up ``ipfs``, we revisit some old
friends who play together in interesting new ways:

    - `Merkle DAG`_
    - `DHT`_
    - `Mutable namespaces`_

Merkle DAG
~~~~~~~~~~

.. image:: /assets/images/merkel.jpg
           :class: full

Not invented by the German chancellor, but interesting nonetheless

DHT
~~~

Mutable namespaces
~~~~~~~~~~~~~~~~~~

Aside from borrowing ideas from successful applications of DAGs and DHTs, the
spec has a novel take on the URL. Novel, but apparently just an idea borrowed
from SFS_, designed for his doctoral thesis in 2000 by David Mazières.

In IPFS, files are addressed by the cryptographic hash of their content and
meta data, like objects in Git, rather than a file path or web address
decided by a human, the content-hash becomes a file's "name". This is
convenient for programmatically addressing files, but supremely
un-human-readable.

    On the internet, we rely heavily on the same address refering to different
    things at different times. For example, consider the domain ``news.com``.
    When we request that content at that address, we would probably expect to
    find the lastest news. This would not be possible if we were using a
    content-addressed system because the *content* of ``news.com`` (and
    therefore its address) would change every time an event was reported.

The IPFS would interface with DNS to offer domain names and web addresses, or
in the context of a content-addressed system; *mutable namespaces*. These would
operate something like a signed ref (tag or branch) `in Git`_, addressed on a
DHT [#]_ via your public-key. Basically, everyone would get a namespace rooted
in their key pair, which could be mapped (somehow) to a "proper" domain name in
a DNS record.

In the analogy of the "single global Git repo", this would solve the problems
of someone pushing with ``--force`` on to ``master``, everyone wanting a branch
called ``dev`` as well as making it possible to offer new news on ``news.com``.

Trust here would be provided by PGP_, which I guess pretty good :wink:

IPFS would also make it impossible to own a domain name, however, since there
would no longer be "official" nameservers it would be up to the user to decide
whos mapping of named-reference

.. [#] Probably a dedicated "namespaces" DHT that would store named pointers to
       objects in the "content" DHT.
.. _SFS: http://en.wikipedia.org/wiki/Self-certifying_File_System
.. _`in Git`: https://ariejan.net/2014/06/04/gpg-sign-your-git-commits/
.. _PGP: http://www.pgp.net/pgpnet/pgp-faq/pgp-faq-security-questions.html#security-how






Layers
------

Obvious applications
--------------------

There are several obvious applications that

    - `Package manager`_

Others :fork_and_knife:

Package manager
~~~~~~~~~~~~~~~

Like GitHub did for git (go, bower, npm)


