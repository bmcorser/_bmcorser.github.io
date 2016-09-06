Relational algebra
##################

`:confetti_ball:`
=================
|

In this article I will give a brief description of `Edgar F. Codd`_’s
relational algebra, which might help the reader get a better understanding of
modern relational databases. It’s intended to be light-hearted and I expect the
reader to have a working knowledge of SQL. This article should provide a
theoretical underpinning for that working knowledge.

.. _`Edgar F. Codd`: https://en.wikipedia.org/wiki/Edgar_F._Codd

The terminology around relational algebra has slight differences from typical
database terminology; that which might generally be referred to as a *table* is
here referred to as a *relation* [#]_, similarly *rows* are referred to as
*tuples* and *columns* as *attributes*. That’s not too bad, most programmers
are happy(ish) to have interchangeable names for common concepts e.g. in
``a.b``, the ``.b`` part would probably be called an “attribute” by a Python
girl, but a JavaScript chap would probably say “property”.

As might be expected, relational algebra is founded in set theory. We borrow
three familiar operations, namely; union, relative complement and Cartesian
product. The definition of Cartesian product is slightly modified, but I’ll
come to that. With Cantor’s foundation only three new operations are
required to produce an algebra that describes the basic\ [#]_ functions of modern
relational databases:

    - projection, written :maths:`\pi` (say “pi”)
    - selection, written :maths:`\sigma` (say “sigma”)
    - rename, written :maths:`\rho` (say “rho”)

Basic Definitions
*****************

Remember that we are going to refer to *columns* as *attributes*. In the same
way that columns be said to apply to both tables and rows, attributes apply to
both relations and the tuples that they contain — both tupes and relations
“have” attributes.

It’s also worth pointing out (before we get into the definitions) that there is
an odd difference between how an *operation* on a relation is defined here and
how we would normally define a function in a programming language. To describe
things from a programmer’s point of view; there are two ways to pass arguments
in to an operation — only those arguments that are *relations* are considered
when describing an operation as unary or binary, other “arguments” are
considered part of the definition of the operation.

For example, take the following notation for a projection operation 

.. maths::

    $
    \pi_{a,b,c}(D)
    $

If this where to be written in Python the function defintion would probably
look like this:

.. code-block:: python

    def project(relation, attrs):
        # do the things
        return

And the call to that function corresponding to our earlier notation would look
like this:

.. code-block:: python

    project(R, ['a', 'b', 'c'])

We would most likely describe the Python function as being binary\ [#]_ (or
variadic\ [#]_ if we used ``*attrs`` instead of passing a list), but we
describe our algebraic operation as unary\ [#]_ — the non-relation arguments
are considered part of the definition of the operation, not as true arguments.
You may wish to refer back to these comments as you read on.


Projection
----------
Written :maths:`\pi`, projection is a unary operation (see above for
discussion on terminology) that takes a single relation as its argument and
results in a new relation that has a subset of the attributes of the original
relation. The projection operation can be thought of a “column filter”. The
equivalent in SQL would be the part of the query where the programmer picks the
columns to be included in the result.

.. code-block:: SQL

    SELECT name, house_number FROM addresses;
    --     ^^^^^^^^^^^^^^^^^^

The projection part of the query is emphasised with ``^`` above.

Let :maths:`R` be a relation with the set of attribute names
:maths:`a,b,c,d,e,f`, then we would write a projection operation that picked
only the attributes called :maths:`a,b,c` as follows.

.. maths::

    $
    \pi_{a,b,c}(R)
    $

The resultant relation would have the same cardinality (number of tuples) but
each tuple would only have the attributes called :maths:`a,b,c`.

Projection is simple, but it will be important in our definition of more
interesting operations later.

Selection
---------

Written :maths:`\sigma`, selection is also a unary operation on a relation. It
results in a relation with a cardinality :maths:`\le` than the cardinality of
the original relation. Selection is equivalent to a ``WHERE`` clause in an SQL
query. I find the notation similar to |filter|_, and the result of the
operation is the same.

Let :maths:`R` be a relation and let :maths:`\varphi` be a “propositional
formula” (using our lodash example, :maths:`\varphi` is the function that is
passed as the second argument to ``_.filter``), then a selection according to
:maths:`\varphi` on :maths:`R` is written

.. |filter| replace:: ``_.filter``
.. _`filter`: https://lodash.com/docs#filter

.. maths::

    $
    \sigma_\varphi(R)
    $

The relation resulting from a selection operation will always have a
cardinality :maths:`\le` to the operand, since it only contains tuples that
satisfy :maths:`\varphi`.



Rename
------
The final privitive operation is rename, written :maths:`\rho`. The rename
operation is unary, taking as its single argument a relation. It simply changes
the names of all attributes in the passed relation.

Where :maths:`a` should be renamed to :maths:`b` the specification for a rename
operation is written :maths:`b / a`. Yes, I got it right way round ...
the rename is applied :maths:`b \leftarrow a`. When we write a rename
operation (in this case renaming :maths:`a_1 \rightarrow b_2` and :maths:`a_2
\rightarrow b_2` on a relation :maths:`R`) it looks like this

.. maths::
    $
    \rho_{b_1 / a_1, b_2 / a_2}(R)
    $

Further Definitions
*******************

The definitions we have established here, along with the handful of set
theoretic operations we are going to borrow are sufficient to mathematically
define common database queries. Let’s recap on notation:

 - :maths:`\cup` Union
 - :maths:`\setminus` Relative complement
 - :maths:`\times` Cartesian product (with slight modifications — stay tuned)
 - :maths:`\pi` Projection
 - :maths:`\sigma` Selection
 - :maths:`\rho` Rename

With this set of operators and the concept of a set, tuple and attributes
forming a *relation*, we are equipped to define the following:

 - :maths:`\bowtie` Natural join
 - :maths:`\ltimes, \rtimes` Semijoin
 - :maths:`\triangleright` Antijoin
 - :maths:`\div` Division

Lets do it\ *!*

Cartesian product in relational algebra
---------------------------------------
But before we do (as alluded to above), we have to quickly look at the perhaps
subtle, but certainly critical difference between a *set theory* Cartesian
product and a *linear algebra* Cartesian product.

Let there be two sets, :maths:`A` and :maths:`B`, defined as follows

.. maths::

    $
    A = \{(a,b), (c,d)\} \\
    B = \{(e,f), (g,h)\}
    $

Now, the set theoretic Cartesian product of the two sets is defined as follows

.. maths::

    $
    A \times B = \{((a,b),(e,f)), ((a,b),(g,h)), ((c,d),(e,f)), ((c,d),(g,h))\}
    $

In relational algebra, however, their Cartesian product is defined like this instead

.. maths::

    $
    A \times B = \{(a,b,e,f), (a,b,g,h), (c,d,e,f), (c,d,g,h)\}
    $

That is, instead of pairs of 2-tuples being *nested* in an outer 2-tup, the
pair of 2-tups was *flattened* into a 4-tup. This is intuitive if you’ve ever
executed a join before, but it’s worth pointing out the difference. What might
not be so intuitive about this definition of the Cartesian product is the
following; the operation is only defined if the relations have disjoint sets of
attribute names. That is, if :maths:`A` shares an attribute name with
:maths:`B` the Cartesian product :maths:`A \times B` is not defined.

When we refer to the Cartesian product we will use the “flattening” and “no
common attributes” version persented above.

We can write this more generally in set builder notation as follows. Let
:maths:`A` and :maths:`B` be relations with no common attributes

.. maths::

    $
    A \times B = \{(a_1,...,a_n,b_1,...,b_m) : (a_1,...,a_n) \in A, (b_1,...,b_m) \in B\}
    $

Now we really do have everything we need to define us some joins, let’s really
do it this time\ *!*

Natural join
------------
This is where things may become familar to readers who have used SQL databases.
It’s also where we will start to make use of the primitives we have defined
above. First an English language definition.

A natural join is a binary operation where both operands are relations,
resulting in a third relation containing the flattened tuples from each
relation where the values all common attributes are equal.

No let’s describe the natural join more formally, let :maths:`A` and :maths:`B`
be relations with some common attributes, then

.. maths::

    $
    A \bowtie B = \{a \cup b : a \in A \wedge b \in B \wedge \text{Fun}(a \cup b) \}
    $


where :maths:`\text{Fun}` is a function that evaluates to true if all common attributes
are equal — deciding if the merged tuple :maths:`a \cup b` is in the result
set.

Ok, that’s cool. It will be a bog standard thing if you’re at all familiar with
to relational databases ... but how would we define this operation using our
algebraic primitives?

The Cartesian product :maths:`A \times B` seems like it would be a good place
to start, since it will have all possible combinations of tuples from each
relation. But wait, since part of our definition of the :maths:`\bowtie`
operation is that our relations should have some common attributes — the
Cartesian product is undefined! Blast. What to do?

Here’s where it gets nice.

Let’s define some sets of attributes for our relations :maths:`A` and
:maths:`B`.

Let :maths:`a_1,a_2,...,a_m` be attribute names unique to :maths:`A`.
Similarly, let :maths:`b_1,b_2,...,b_n` be attribute names unique to
:maths:`B`. Now, by definition there are also attribute names that are common
to :maths:`A` and :maths:`B`, so let :maths:`c_1,c_2,...,c_k` be attribute
names common to both :maths:`A` and :maths:`B`. Finally, let
:maths:`x_1,x_2,...,x_k` be attribute names that exist in neither relation.

Take note that the number of these “unused” attribute names is equal to the
number of common attribute names. Why will become clear very soon. Now let’s
break out some relational primitives ...

... the first thing to do is to get rid of the common attribute names that were
blocking our Cartesian product. We can do that with a crafty rename.

.. maths::

    $
    C = \rho_{x_1 / b_1, x_2 / b_2, ... x_k / b_k}(B)
    $

That is, all attribute names on :maths:`B` that also appear in :maths:`A`
should be given names that aren’t used by either. Now, our 
Cartesian product is defined and we can use :maths:`A \times C` to create a
relation that has everything we need to know to select tuples that should
appear in our natural join.

.. maths::

    $
    D = \sigma_{x_1 = c_1, x_2 = c_2, ... x_k = c_k}(A \times C)
    $

Remember that :maths:`c_1,c_2,...,c_k` are the common attributes. This select
operation will result in a relation that has the tuples that fulfil our
predicate and all that remains is to drop the duplicate attributes used for
comparison in the previous step.

.. maths::

    $
    E = \pi_{a_1,a_2,...,a_m,b_1,b_2,...,b_n,c_1,c_2,...,c_k}(D)
    $

Pretty swish\ *!*

Semijoin
--------
Having defined the natural join, defining the semijoin is a breeze. If the
natural join is half-way commutative operation; in that the resulting relation
contains the same values regardless of the “handedness” of the operands, then
the semijoin is non-commutative — the clue is in the notation used for each. We
write semijoin :maths:`\ltimes` and :maths:`\rtimes`, now remember that we
write natural join :maths:`\bowtie`.

The result of a left semijoin on relations :maths:`A` and :maths:`B` (written
:maths:`A \ltimes B`) is the set of all tuples :maths:`a \in A` for which all
common attributes of some tuple :maths:`b \in B` are equal.

This operation can be built from our algebraic primitives as well. We have done
most of the work in defining our natural join, all we need to do is carry out a
natural join and then project the left\ [#]_ operand’s attributes on to the
result.

So, where :maths:`a_1,a_2,...,a_m` are all attribute names on :maths:`A`, the
semijoin can be written

.. maths::

    $
    A \ltimes B = \pi_{a_1,a_2,...,a_m}(A \bowtie B)
    $

and since we were able to construct the natural join using our primitives, we
could do the same for the semijoin. 

Antijoin
--------
The antijoin follows nicely from the semijoin, and can be loosely defined as a
semijoin where the condition of its “internal” natural join is inverted. Let’s
do this simply:

.. maths::

    $
    A \triangleright B = A \setminus (A \ltimes B)
    $

This of course can be expanded using earlier definitions.

Division
--------
This one I leave as an excercise.\ [#]_

Fin
***
I started reading_ about relational algebra because Richard sent me a link to
this `little treat`_.

.. class:: center

`:hand_splayed:`

.. [#] In relational algebra “relation” does not refer to the concept of
       `binary relation`_.
.. [#] I say “basic” here, because our algebraic treatment of the database
       doesn’t consider more practical functionality, such as roles_ in
       PostgreSQL.
.. [#] That is, taking two arguments; Wikipedia__.
.. [#] Taking a variable number of arguments; Wikipedia__.
.. [#] Taking a single argument; Wikipedia__.
.. [#] For a left semijoin anyway, one would project the right operands
       attribute names for a right semijoin.
.. [#] Or you can read about it here_.

.. _here: https://en.wikipedia.org/wiki/Relational_algebra#Division
.. _`binary relation`: https://en.wikipedia.org/wiki/Binary_relation
.. _roles: https://www.postgresql.org/docs/current/static/user-manag.html
.. _reading: https://en.wikipedia.org/wiki/Relational_algebra
.. _`little treat`: https://dbis-uibk.github.io/relax/calc.htm

.. __: https://en.wikipedia.org/wiki/Variadic_function
.. __: https://en.wikipedia.org/wiki/Binary_function
.. __: https://en.wikipedia.org/wiki/Unary_function
