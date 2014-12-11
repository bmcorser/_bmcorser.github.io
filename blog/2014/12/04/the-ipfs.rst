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

Running through the stack that makes up IPFS, there are some old friends who
play together in interesting new ways. The parts I'll cover are listed below:

    - `Merkle DAG`_
    - `DHT`_


Merkle DAG
~~~~~~~~~~

.. image:: /assets/images/merkel.jpg
           :class: full

Not invented by the German chancellor, but interesting nonetheless.

The nuance of the naming might not stick the first time; we're not describing a
Merkle *tree* `typically used`_ to verify data integrity incrementally, we're
talking about a Merkle *DAG*. The key difference between the two structures is
that (in the DAG one) any node can potentially hold data and references as well
as being a hash of its parents.

This is true of the graph of objects making up the the "main" DAG in everyone's
Git repos, except that `as far as my understanding goes`_ Git's Merkle DAG is
used more for high performance addressing rather than ensuring data integrity
between peers. Git isn't a peer-to-peer thing in the same way as IPFS is.

To allow a peer to verify the hash of a block it has using the hash tree, it
needs the root hash and the series of hashes that make up the hash
representation of the blocks it doesn't have. Because the hashes are in a tree
structure, this doesn't necessarily mean the hashes of *all* the missing
blocks (although that would work too), here's a diagram:

.. dot-graph:: /assets/images/merkle-tree.svg

    digraph merkle {

        // uncles
        1 [fillcolor="#7FDBFF", style=filled];
        12 [fillcolor="#7FDBFF", style=filled];
        6 [fillcolor="#7FDBFF", style=filled];

        // root
        root [fillcolor="#2ECC40", style=filled];

        // sibling
        24 [fillcolor="#7FDBFF", style=filled];

        // uncle covered
        3 [color=lightgrey, fontcolor=lightgrey];
        4 [color=lightgrey, fontcolor=lightgrey];

        7 [color=lightgrey, fontcolor=lightgrey];
        8 [color=lightgrey, fontcolor=lightgrey];
        9 [color=lightgrey, fontcolor=lightgrey];
        10 [color=lightgrey, fontcolor=lightgrey];

        13 [color=lightgrey, fontcolor=lightgrey];
        14 [color=lightgrey, fontcolor=lightgrey];
        15 [color=lightgrey, fontcolor=lightgrey];
        16 [color=lightgrey, fontcolor=lightgrey];
        17 [color=lightgrey, fontcolor=lightgrey];
        18 [color=lightgrey, fontcolor=lightgrey];
        19 [color=lightgrey, fontcolor=lightgrey];
        20 [color=lightgrey, fontcolor=lightgrey];
        21 [color=lightgrey, fontcolor=lightgrey];
        22 [color=lightgrey, fontcolor=lightgrey];

        25 [color=lightgrey, fontcolor=lightgrey];
        26 [color=lightgrey, fontcolor=lightgrey];
        27 [color=lightgrey, fontcolor=lightgrey];
        28 [color=lightgrey, fontcolor=lightgrey];
        29 [color=lightgrey, fontcolor=lightgrey];
        30 [color=lightgrey, fontcolor=lightgrey];



        // local block
        B9 [fillcolor=red, style=filled];
        23 [fillcolor=pink, style=filled];

        // hash chain
        11 [fillcolor=pink, style=filled];
        5 [fillcolor=pink, style=filled];
        2 [fillcolor=pink, style=filled];
        0 [fillcolor=pink, style=filled];

        // unknown blocks
        B1 [fillcolor="#FFDC00", style=filled];
        B2 [fillcolor="#FFDC00", style=filled];
        B3 [fillcolor="#FFDC00", style=filled];
        B4 [fillcolor="#FFDC00", style=filled];
        B5 [fillcolor="#FFDC00", style=filled];
        B6 [fillcolor="#FFDC00", style=filled];
        B7 [fillcolor="#FFDC00", style=filled];
        B8 [fillcolor="#FFDC00", style=filled];
        B10 [fillcolor="#FFDC00", style=filled];
        B11 [fillcolor="#FFDC00", style=filled];
        B12 [fillcolor="#FFDC00", style=filled];
        B13 [fillcolor="#FFDC00", style=filled];
        B14 [fillcolor="#FFDC00", style=filled];
        B15 [fillcolor="#FFDC00", style=filled];
        B16 [fillcolor="#FFDC00", style=filled];

        B1 -> 15 -> 7 -> 3 -> 1 [color=lightgrey]; 1 -> 0 -> root -> 0;
        B2 -> 16 -> 7 [color=lightgrey];
        B3 -> 17 -> 8 -> 3 [color=lightgrey];
        B4 -> 18 -> 8 [color=lightgrey];
        B5 -> 19 -> 9 -> 4 -> 1 [color=lightgrey];
        B6 -> 20 -> 9 [color=lightgrey];
        B7 -> 21 -> 10 -> 4 [color=lightgrey];
        B8 -> 22 -> 10 [color=lightgrey];
        B9 -> 23 -> 11 -> 5 -> 2 -> 0;
        B10 -> 24 [color=lightgrey]; 24 -> 11;
        B11 -> 25 -> 12 [color=lightgrey]; 12 -> 5;
        B12 -> 26 -> 12 [color=lightgrey];
        B13 -> 27 -> 13 -> 6 [color=lightgrey]; 6 -> 2 ;
        B14 -> 28 -> 13 [color=lightgrey];
        B15 -> 29 -> 14 -> 6 [color=lightgrey];
        B16 -> 30 -> 14 [color=lightgrey];
    }

In this example, we have been sent block ``B9`` (red) and the "uncle" hashes
for that block (blue) by an untrusted peer. We don't have any other verified
blocks (yellow) and we need to verify the integrity of the block we've been
sent. To do this we don't need anything apart from the untrusted block itself,
the untrusted "uncle" hashes and the trusted root hash (green). Calculating the
missing nodes in the Merkle tree (pink) will get us a untrusted hash of all the
blocks which can be compared to our trusted root hash to decide whether to keep
the block or not (and treat that peer as untrustworthy in the future).

The beauty of this is that we didn't need to know or calculate any of the
hashes that make up the hash tree for the blocks we don't yet have, the
greyed-out parts of the tree can remain unknown because they are covered by
the blue "uncle" hashes.

IPFS sets out to take advantage of the Merkle DAG for deduplication which I can
see; same hash means same content, we can take advantage of "usual"
characteristics of a Merkle tree to not request objects we already have, etc.

I am, however, thinking about Git's object immutibility (the time and commit
message contribute to the hash of a commit) and how that might work against
deduplication here. We can have two commits with the same content and same
message, but if they are made on a different day then they will have different
IDs. If I was concerned about *"who did what, where did they do it and exactly
what time after midday did they do what they did?"* which I frequently am, when
it comes to parts of the codebase I hold dear, then making commits by different
people appear distinct helps me. If I was only concerned about *"what is
there?"* then pure-content-addressing is dandy.

There's a good explanation in `this issue`_.





.. [#] The graph representing the revision history seen with 
       ``git log --graph`` is just a DAG of commit objects
.. _`typically used`: http://www.bittorrent.org/beps/bep_0030.html
.. _`as far as my understanding goes`: http://giphy.com/gifs/cartoon-network-flying-superman-Uw0Xv5ZKasc0g/fullscreen
.. _`this issue`: at https://github.com/jbenet/random-ideas/issues/20

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


