Relational algebra
##################

`:confetti_ball:`
=================
|

In this article I will give a brief description of `Edgar F. Codd`_’s
relational algebra and how it might help better understand modern relational
databases.

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

Definitions
***********

Remember that we are going to refer to *columns* as *attributes*. In the same
way that columns be said to apply to both tables and rows, attributes apply to
both relations and the tuples that they contain — both tupes and relations
“have” attributes.

There is a difference 
programmers would generally refer to as a function. 

It’s also worth pointing out (before we get into the definitions) that there is
an odd difference between how an *operation* on a relation is defined here and
how we would normally define a function in programming. To describe things from
a programmer’s point of view; there are two ways to pass arguments in to an
operation — only those arguments that are *relations* are considered when
describing an operation as unary or binary, other “arguments” are considered
part of the definition of the operation.

For example, take the following notation for a projection operation 

.. maths::

    $
    \Pi_{a,b,c}(D)
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

We would describe the Python function as being binary (or variadic if we used
``*attrs`` instead of passing a list), but we describe our algebraic operation
as unary — the non-relation arguments are considered part of the definition of
the operation, not as true arguments.


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

The emphasised part is the projection part of the query.


Let :maths:`R` be a relation with the set of attributes
:maths:`r_1,r_2,r_3,...,r_n`, then the projection operation defined as follows
:maths:`S = \Pi_{r_1,r_2,r_3,...,r_k}(R)` would result in a relation :maths:`S`
with the same cardinality (number of tuples) but instead of the initial
:maths:`n` many attributes it would have :maths:`k` many attributes.

Projection is pretty simple, but it will be important in our definition of more
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



Rename
------
The final privitive operation in relational algebra is rename, written
:maths:`\rho`. The rename operation is unary, taking as its single argument a
relation. It simply changes the names of all attributes in the passed relation.

Where :maths:`a` should be renamed to :maths:`b` the specification for a rename
operation is written :maths:`a \setminus c`. Yes, I got it right way round ...
the rename is applied :maths:`b \leftarrow a`.


.. maths::
    $
    b - a
    $

.. [#] In relational algebra “relation” does not refer to the concept of
       `binary relation`_.
.. [#] I say “basic” here, because our algebraic treatment of the database
       doesn’t consider more practical functionality, such as roles_ in
       PostgreSQL.

.. _`binary relation`: https://en.wikipedia.org/wiki/Binary_relation
.. _roles: https://www.postgresql.org/docs/current/static/user-manag.html
