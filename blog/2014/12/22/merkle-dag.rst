Merkle DAG
~~~~~~~~~~
.. figure:: /assets/images/merkel.jpg
            :class: full

            Angela Merkel (source__)

.. __: http://anotherangryvoice.blogspot.co.uk/2012/05/angela-merkel-dead-woman-walking.html

Not invented by the German chancellor, but interesting nonetheless.

The nuance of the naming might not stick the first time; there is `a
distinction`_ between a Merkle **tree** `typically used`_ to incrementally
verify data integrity and a Merkle **DAG** as used by Git. The key difference
between the two structures is that (in the more-general DAG one) any node can
potentially hold data and references as well as a hash of its parents.

.. _`a distinction`: at https://github.com/jbenet/random-ideas/issues/20
.. _`typically used`: http://www.bittorrent.org/beps/bep_0030.html

This is true of the graph of objects making up the the “main” DAG in everyone’s
Git repos, except that `as far as my understanding goes`_ Git’s Merkle DAG is
used more for high performance addressing and perhaps deduplication rather than
ensuring data integrity between peers.

.. _`as far as my understanding goes`: http://giphy.com/gifs/cartoon-network-flying-superman-Uw0Xv5ZKasc0g/fullscreen

Merkle tree
^^^^^^^^^^^
Let’s look at how a binary Merkle tree is used in peer-to-peer systems to allow
verification of untrusted data with a high degree of confidence and low
metadata overhead.

To be able to verify the hash of a block I have, I need a trusted root hash (a
trusted hash of all blocks) and a series of hashes that can be used to
reconstruct the hash tree for the blocks I don’t have. Because the hashes are
in a tree structure, this doesn’t necessarily mean the hashes of *all* the
missing blocks (although that would work too).

In the example below, we have been sent block ``B9`` (red) and the required
“uncle” hashes (blue) by an untrusted peer. We don’t have any other verified
blocks (yellow) and we need to verify the integrity of the block we’ve been
sent. To do this we don’t need anything apart from the hash of the untrusted
block (23), the untrusted “uncle” hashes and the trusted root hash (green).
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
quite a lot we didn’t need to know (all the grey stuff in the diagram). The
hashes that make up the tree for the blocks we don’t yet have can remain
unknown because those nodes in the tree are covered by the blue "uncle" nodes.

Cool.

Git’s DAG
^^^^^^^^^
So we briefly covered the application of a Merkle tree in the context of
verifying untrusted blocks of files in peer-to-peer systems, but how does that
apply when we’re talking about Git?

Reading Tommi Virtanen’s great article `Git for computer scientists`_ is a good
place to start seeing how Git’s DAG works. Taking (some) inspiration from
`git-big-picture`_ I whipped up `a script`_ to examine Git’s DAG. We can see
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
    $ git rev-parse HEAD | cut -c 1-7
    ee8285e

Ok, so that’s the simplest repo known to man and we have the revision ID of
``HEAD``. Let’s look at the what’s going on under the hood.

.. image:: /assets/images/ee8285e.svg
           :class: full

We can see the directory ``A`` (or tree object ``296e560``) and the files
``B``, ``a`` and ``b`` we created.  Notice that all the files reference that
same blob object ``e69de29``, that’s because they are all empty files (and
therefore have the same content, nothing). If we alter file ``a`` to not be
empty (and therefore have different content) like this:

.. code-block:: shell

    $ echo 'hello' > A/a
    $ git add A/a
    $ git commit -m 'altered a'
    $ git rev-parse HEAD | cut -c 1-7
    437816a

Not only do we get a new commit ID and commit-tree ID (``e468afd``), but we
also see the underlying DAG change:

.. image:: /assets/images/437816a.svg
           :class: full

Both files ``b`` and ``B`` :smile: still share a blob, but ``a`` now has a blob
of its very own. This also demonstrates that in Git’s model, blob objects
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

That’s enough colourful graphs for now. Get back to work.

.. _`Git for computer scientists`: http://eagain.net/articles/git-for-computer-scientists/
.. _`git-big-picture`: https://github.com/esc/git-big-picture
.. _`a script`: https://github.com/bmcorser/git-little-picture

