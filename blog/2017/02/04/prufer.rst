Prüfer
######

💡
=
|

In this article I will make an interactive presentation of part of Prüfer’s
proof (cough) of Cayley’s theorem on the enumeration of labelled trees.

First things first
******************

A tree is probably an intimately familiar structure if you’re reading this
(whether you know it or not). We see them everywhere in computer applications.
Directories are arranged in trees, homologous nested Python ``dict``\ s could
be described as trees, the class-subclasses structure forms a tree\ [#]_.

A tree is also the name of a mathematical object which bears some relation to
the computery things mentioned above. A tree is the most simple type of `graph`
— where a graph is just a set of vertices connected by a set of edges. Let’s
define a tree slightly more formally.

Let :maths:`T` be a graph with :maths:`n` vertices. :maths:`T` is a tree if it
has :maths:`n - 1` edges and no `cycles`, ie. there is only one `path` from any
given vertex to any other. Here’s a picture of what :maths:`T` might look like:

.. dot-graph::

    graph {
        rankdir=LR;
        node [shape=circle width=0.2 label=""];
        1 [fillcolor=blue style=filled];
        7 [fillcolor=red style=filled];
        1 -- 2 -- 3 -- 4;
        3 -- 5;
        2 -- 6;
        5 -- 7;
    }

Pick any two nodes, and observe there is only one set of edges that can be
followed to get from one to the other. Simple enough. The graph below is not a
tree, since there are two different paths between the red and blue nodes, ie.
it has :maths:`n \neq n - 1` edges (where :maths:`n` is the number of
vertices):

.. dot-graph::

    graph {
        rankdir=LR;
        node [shape=circle width=0.2 label=""];
        1 [fillcolor=blue style=filled];
        4 [fillcolor=red style=filled];
        1 -- 2 -- 3 -- 4 -- 1
    }

Ok.

Now we have some vaguely mathematical definition of what a tree is, we only
need to make one additional definition and we are set to dive into Prüfer. A
labelled tree is a tree with :maths:`n` vertices where each vertex
:maths:`v_1, v_2, \dots, v_n` is labeled :maths:`1, 2, 3, \dots, n`

Let’s get rid of the colours and draw one way of labelling the tree we drew
above.

.. dot-graph::

    graph {
        rankdir=LR;
        node [shape=circle width=0.2 label=""];
        1 [xlabel=4];
        2 [xlabel=5];
        3 [xlabel=3];
        4 [xlabel=6];
        5 [xlabel=1];
        6 [xlabel=7];
        7 [xlabel=2];
        1 -- 2 -- 3 -- 4;
        3 -- 5;
        2 -- 6;
        5 -- 7;
    }

Cool.

.. [#] This holds up to mixins, but not to diamond inheritance.

Prüfer left to right
********************

Cayley’s theorem is that the number of labelled trees of :maths:`n` vertices is
simply :maths:`n^{n-2}`. Prüfer presented his proof for this theorem in `Archiv
für Mathematik und Physik 27` in 1918, in the form of an algorithm that
represents a labelled tree of :maths:`n` vertices as a unique sequence of
integers :maths:`[a_1, a_2, \dots, a_{n-2}]` where :maths:`1 \leq a_i \leq n`.
This is something that has a clear programming application; namely as a way to
store a labelled tree, something that is not naturally amenable to a computer,
as a sequence of integers, which is. Then, we have an extremely concise way to
uniquely encode a labelled tree.

Here’s how; let :maths:`T` be a tree with :maths:`n` vertices 
:maths:`v_1, \dots, v_n`, now let the vertex :maths:`v_1` be the end-vertex
with the smallest label, let the label :maths:`a_1` be the label of the vertex
adjacent to :maths:`v_1` (we don’t need to care how :maths:`v_1` is labelled)
and make :maths:`a_1` the first item in our sequence. Now remove the vertex
:maths:`v_1` and its incident edge. Rince and repeat, removing end-vertices and
recording their adjacent higher-degree’d vertex in our sequence until only two
vertices remain. Disgard these vertices. At this point we will have the Prüfer
sequence that uniquely represents :maths:`T`, that is
:maths:`[a_1, a_2, \dots, a_{n-2}]`. Read more here_ to see why this is a proof
of Cayley\ [#]_.

.. _here: https://en.wikipedia.org/wiki/Pr%C3%BCfer_sequence#Cayley.27s_formula
.. [#] Basically, the cardinality of the set of Prüfer sequences representing
    labelled trees with :maths:`n` vertices is :maths:`n^{n-2}`.


Prüfer right to left
********************

Since this sequence uniquely represents :maths:`T`, the algorithm roughly
presented above is a `bijection`, and can be “reveresed”. That is we can take a
Prüfer sequence representing an unknown tree and use it to reconstruct the
tree. Given a sequence of length :maths:`n - 2`, the technique is as follows;
we draw :maths:`n` vertices and label them :maths:`1, 2, \dots, n`. We then
make a list :maths:`1, 2, \dots, n` and find the smallest number :maths:`i` in
the list that is not in the sequence (ie. the smallest end-vertex — sound
familiar?), now we draw an edge from the vertex labelled :maths:`i` to the
vertex bearing the label of first entry in the sequence and drop the first
entry from the sequence. As with the “left to right” algorithm, we repeat this
until we have two numbers remaining in our list :maths:`1, 2, \dots, n`
(remember our sequence only had :maths:`n - 2` elements) and draw an edge
between the vertices labelled by those two remaining numbers. Bingo, we’ve got
a labelled tree.


The fun bit
***********
Now we know what’s going on ...

