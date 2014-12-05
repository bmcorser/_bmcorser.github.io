The ``ipfs``
############

InterPlanetary Filesystem
=========================

Preamble
--------

Last week, dreaming about being able to serve pars_ images using something like
the BitTorrent protocol from the browser. I asked Jeeves: "Can browsers
communicate peer-to-peer?" Turns out they can, through WebRTC_.  The WebRTC
protocol is supported by major browsers (but, disappointingly, interoperability
is only possible through a polyfill_) which means it would be possible to
implement a torrent client in JavaScript that would run in the browser. As the
wise programmer once said, everything you can think of has already been
implemented in JavaScript, and sure enough someone has already implemented an
in-browser BitTorrent client, called webtorrent_.

That could have gone somewhere, until I was on Dan O'Huiginn's blog and read
`his overview`_ of the InterPlanetary Filesystem.

It kind of sounded like something I wanted.

.. _pars: http://originalenclosure.net/pars
.. _WebRTC: http://www.webrtc.org/
.. _polyfill: http://www.webrtc.org/interop
.. _webtorrent: https://github.com/feross/webtorrent
.. _`his overview`: http://ohuiginn.net/wp/?p=2032

Introduction
------------

IPFS got designed by some Stanford CS graduate dude (`Juan Batiz-Benet`_), who
made a company which sold to Yahoo as an `"acqui-hire"`_ last year. The
protocol is not groundbreaking in itself, it's a pretty simple idea. It
describes something like a global Git repo that you can check out incrementally
like shallow cloning part of a tree, in Git terms. The parts of the repo you
have cloned locally would be made to others nearby who needed them like seeding
a file in BitTorrent. These are ideas many people are familiar with, and at
least one unrelated thrust (GTP_) has already been made in a similar direction.

Aside from borrowing ideas from successful applications of DAGs and DHTs, the
IPFS protocol claims to solve issues around permission and security. In terms
of a global Git repo, what if someone overwrote the master branch? How many
people would want branches called ``dev``?


The most interesting part of the spec is how it handles addressing and namespacing

It has WIP implementations in hipster [1]_ languages like Golang and Node.js,
someone is even working [2]_ on Haskell implementation. Groovy.


However, it's not going to happen tomorrow; IPFS is still really just a good
idea. There is no toolchain, but more importantly there is no browser support.
It would take development on the part of browser vendors to support the
protocol 

.. _`Juan Batiz-Benet`: http://juan.benet.ai/
.. _`"acqui-hire"`: http://en.wikipedia.org/wiki/Acqui-hiring
.. _GTP: https://code.google.com/p/gittorrent/

Innards
-------

Running through

Obvious applications
--------------------

There are several obvious applications that

    - `Package manager`_

Others :fork_and_knife:

Package manager
~~~~~~~~~~~~~~~

Like GitHub did for git (go, bower, npm)


.. [1] Read "young" .. don't be so suspicious!
.. [2] Well, there's a GitHub issue that says someone expressed an interest at
       https://github.com/jbenet/ipfs/issues/4
