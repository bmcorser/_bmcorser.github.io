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
protocol does not appear groundbreaking in itself, on the face of it it's a
pretty simple idea. It describes something like a single, global Git repo that
supports peer-to-peer protocols as well as SSH and HTTP. You can get the data
you want by cloning the relevant part of the DAG through BitTorrent (like a
shallow clone in Git). The parts of the repo you have locally would be seeded
to others in the network who requested them, following similar choking rules to
BitTorrent.

It's a great idea because it builds on things people are already familiar with
that also have mature and and widely successful implementations as well as
introducing some novel ideas (see `Mutable namespaces`_) and wraps the whole
lot into a pretty well cohesive whole. The clarity of vision is impressive and
ambitious, yes sir.

It also boasts WIP implementations in hipster [#]_ languages like Golang and
Node.js, someone is even working [#]_ on a Haskell implementation. What's not
to like?

However, it's not going to happen tomorrow; IPFS is still just a cool idea.
There are no clients, there is no toolchain or "ecosystem" and there's no
browser support. That said, let's have a look in some more detail at what IPFS
is made out of and imagine some applications of being able "mount the world at
``/ipfs``".


.. _`Juan Batiz-Benet`: http://juan.benet.ai/
.. _`"acqui-hire"`: http://en.wikipedia.org/wiki/Acqui-hiring
.. [#] Read "young".
.. [#] Well, there's a GitHub issue that says someone expressed an interest at
       https://github.com/jbenet/ipfs/issues/4

Innards
-------
Running through the stack that makes up IPFS, there are two core ideas with
applications that will be familiar to most people:

    - `Merkle DAG`_ in Git
    - `Kademlia DHT`_ in BitTorrent

Let's go on a whistlestop tour through DAG & DHT. All aboard!

`:bicyclist:`

Merkle DAG
~~~~~~~~~~
.. figure:: /assets/images/merkel.jpg
            :class: full

            Angela Merkel (source__)

.. __: http://anotherangryvoice.blogspot.co.uk/2012/05/angela-merkel-dead-woman-walking.html

Not invented by the German chancellor, but interesting nonetheless.

The nuance of the naming might not stick the first time; there is `a
distinction`_ between a Merkle **tree** `typically used`_ to incrementally verify
data integrity and a Merkle **DAG** as used by Git. The key difference between
the two structures is that (in the more-general DAG one) any node can
potentially hold data and references as well as a hash of its parents.

.. _`a distinction`: at https://github.com/jbenet/random-ideas/issues/20
.. _`typically used`: http://www.bittorrent.org/beps/bep_0030.html

This is true of the graph of objects making up the the "main" DAG in everyone's
Git repos, except that `as far as my understanding goes`_ Git's Merkle DAG is
used more for high performance addressing and perhaps deduplication rather than
ensuring data integrity between peers. Git isn't a peer-to-peer thing in the
same way as IPFS is.

.. _`as far as my understanding goes`: http://giphy.com/gifs/cartoon-network-flying-superman-Uw0Xv5ZKasc0g/fullscreen

Merkle tree
^^^^^^^^^^^
Let's look at how a binary Merkle tree is used in peer-to-peer systems to allow
verification of untrusted data with a high degree of confidence and low
metadata overhead.

To be able to verify the hash of a block I have, I need a trusted root hash (a
trusted hash of all blocks) and a series of hashes that can be used to
reconstruct the hash tree for the blocks I don't have. Because the hashes are
in a tree structure, this doesn't necessarily mean the hashes of *all* the
missing blocks (although that would work too).

In the example below, we have been sent block ``B9`` (red) and the required
"uncle" hashes (blue) by an untrusted peer. We don't have any other verified
blocks (yellow) and we need to verify the integrity of the block we've been
sent. To do this we don't need anything apart from the hash of the untrusted
block (23), the untrusted "uncle" hashes and the trusted root hash (green).
Calculating the missing nodes in the Merkle tree (pink) by hashing the
descendants will eventually yield an untrusted hash representing all the
blocks. This *untrusted* root hash can then be compared to our *trusted* root
hash to decide whether to keep the block or not (and treat that peer as
untrustworthy in the future, etc).

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
        B9 [fillcolor="#FF4136", style=filled];
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

The efficiency comes from peers not needing to know so much. In fact, there was
quite a lot we didn't need to know (all the grey stuff in the diagram). The
hashes that make up the tree for the blocks we don't yet have can remain
unknown because those nodes in the tree are covered by the blue "uncle" nodes.

Cool.

Git's DAG
^^^^^^^^^
So we briefly covered the application of a Merkle tree in the context of
verifying untrusted blocks of files in peer-to-peer systems, but how does that
apply when we're talking about Git?

Reading Tommi Virtanen's great article `Git for computer scientists`_ is a good
place to start seeing how Git's DAG works. Taking (some) inspiration from
`git-big-picture`_ I whipped up `a script`_ to examine Git's DAG. We can see
how deduplication is handled by addressing content rather than files. Follow
along with my experiment:

.. code-block:: shell

    $ git init
    $ mkdir A
    $ touch A/a A/b
    $ touch B
    $ tree .
    .
    ├── A
    │   ├── a
    │   └── b
    └── B

    1 directory, 3 files
    $ git add .
    $ git commit -m 'init'
    $ git rev-parse HEAD
    ee8285efa8f43be5a2061c0d2bc79f17c86beeae

Ok, so that's the simplest repo known to man and we have the revision ID. Let's
look at the what's going on under the hood.

.. image:: /assets/images/ee8285e.svg
           :class: full

We can see the directory ``A`` and the files ``B``, ``a`` and ``b`` we created.
Notice that all the files reference that same blob object ``e69de29``, that's
because they are all empty files (and therefore have the same content,
nothing). If we alter file ``a`` to not be empty (and therefore have different
content) like this:

.. code-block:: shell

    $ echo 'hello' > A/a
    $ git add A/a
    $ git commit -m 'altered a'
    $ git rev-parse HEAD
    437816ad6b9c9495007da9689613484daef8ff28

Not only do we get a new commit ID, but we see the underlying DAG change:

.. image:: /assets/images/437816a.svg
           :class: full

Both files ``b`` and ``B`` :smile: share a blob, but ``a`` now has a blob of
its very own. This also demonstrates that in Git's model, blob objects
correspond to one-to-one with files (sans directory location) which works fine
if you only want to deduplicate files that have *exactly* the same content, but
deduplication could be more aggressive if files were split into blocks and
deduplicated at block-level instead of file-level.

.. dot-graph:: /assets/images/block-level-blog.svg

    digraph {
        // blocks
        B1 [fillcolor="#FFDC00", style=filled];
        B2 [fillcolor="#FFDC00", style=filled];
        B3 [fillcolor="#FFDC00", style=filled];
        B4 [fillcolor="pink", style=filled];
        B5 [fillcolor="pink", style=filled];

        A [fillcolor="#7FDBFF", style=filled];
        B [fillcolor="#7FDBFF", style=filled];

        B1 -> A;
        B2 -> A;
        B3 -> A;
        B4 -> A;

        B1 -> B;
        B2 -> B;
        B3 -> B;
        B5 -> B;
    }

Files ``A`` and ``B`` share most blocks (yellow), so blocks 1-3 are used by
both, only blocks 4 and 5 (pink) are unique to the individual files.

.. _`Git for computer scientists`: http://eagain.net/articles/git-for-computer-scientists/
.. _`git-big-picture`: https://github.com/esc/git-big-picture
.. _`a script`: https://github.com/bmcorser/git-little-picture

Kademlia DHT
~~~~~~~~~~~~
.. figure:: /assets/images/consistent_hashing.png
            :class: full

            Yes, it's that exciting (source__).

.. __: http://offthelip.org/2009/07/19/distributed-hash-tables-part-1/

One routing mechanism IPFS proposes to use is the "distributed sloppy hash
table" employed by BitTorrent. The spec also states that the routing layer
should be "swappable", meaning more traditional (or more exotic) routing could
be used in place of a DHT. The specific DHT concept mentioned is Kademlia_
(Petar Maymounkov, David Mazières - 2002) which is a variant of Chord_, with
nice properties for high-churn applications; that is, nodes becoming available
and then becoming unavailable a short time later which is something frequently
seen in existing filesharing spaces (we're all guilty of shutting down μTorrent
as soon as that latest Linux distro has finished downloading).

.. _Kademlia: http://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf
.. _Chord: http://pdos.csail.mit.edu/papers/chord:sigcomm01/chord_sigcomm.pdf


At least one unrelated thrust (GTP_) has already been made in a similar
direction. 

.. _GTP: https://code.google.com/p/gittorrent/

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


Security
--------
The security of a system such as IPFS presents different problems to
traditional web security. The normal scenario would be that the trusted DNS
server gives me the IP for the domain I request, I setup a connection to that
trusted IP address over HTTP/TLS. As long as the box answering to that IP is
secure (`lol, Sony`_) and I trust the owner of that box means me no harm then I
can safely transfer files in good faith that the content will be what I expect.

.. _`lol, Sony`: http://attrition.org/security/rant/sony_aka_sownage.html
