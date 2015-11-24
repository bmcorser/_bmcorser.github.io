Fun with permutations
=====================

A permutation is a bijective_ mapping of a set to itself. For example, if we had
the set defined as :maths:`S = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10 \}`, just the
numbers from one to ten, then a permutation :maths:`\alpha` mapping :maths:`S`
to itself (written :maths:`\alpha : S \rightarrow S`) could be represented as
follows:

.. _bijective: https://en.wikipedia.org/wiki/Bijection

.. maths::

    $
    \alpha = \begin{pmatrix}
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        1 & 7 & 3 & 4 & 2 & 6 & 5 & 8 & 9 & 10 \\
    \end{pmatrix}
    $

The numbers on top line are the elements of :maths:`S` and the numbers on the
bottom line are the permuted values. For example, the above shows that
:maths:`\alpha(2) = 7`

It’s not a tremendously exciting permutation, most of the numbers just map back
to themselves, for example :maths:`\alpha(3) = 3` and so on. Consider a second
permutation of :maths:`S`, called :maths:`\beta`:

.. maths::

    $
    \beta = \begin{pmatrix}
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 1 & 10 \\
    \end{pmatrix}
    $

Every number maps to something different, with the exception of 10, which
doesn’t change. Moving swiftly on, consider what happens if we **compose**
the permutation :maths:`\alpha` with the permutation :maths:`\beta`, which is
written :maths:`\alpha\circ\beta`. That means we get the value from
:maths:`\beta` and apply it to :maths:`\alpha`, like this:

.. maths::

    $ \alpha\circ\beta(x) = \alpha(\beta(x)) $

Let’s try it with an actual value from :maths:`S`, how about 6:

.. maths::

    \begin{align*}
        \alpha\circ\beta(6) &= \alpha(\beta(6)) \\
                            &= \alpha(7) \\
                            &= 5 \\
                            \\
        \therefore \alpha\circ\beta(6) &= 5
    \end{align*}

Interesting, 6 doesn’t map to 5 under either permutation, so
:maths:`\alpha\circ\beta` looks like a new permutation entirely. If we run all
the values of :maths:`S` through our new permutation, we can write the whole
thing out as follows:

.. maths::

    $
    \alpha\circ\beta = \begin{pmatrix}
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        7 & 3 & 4 & 2 & 6 & 5 & 8 & 9 & 1 & 10 \\
    \end{pmatrix}
    $

Not so different. Quite some of :maths:`\beta` seems preserved; 7 maps to 8 in
the same way. Let’s think about our permutations slightly differently. Let’s
apply our first permutation *to itself* (we write this :maths:`\alpha^2` for
brevity) and see what happens.  Remembering that first permutation:

.. maths::

    $
    \alpha = \begin{pmatrix}
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        1 & 7 & 3 & 4 & 2 & 6 & 5 & 8 & 9 & 10 \\
    \end{pmatrix}
    $

Let’s pick one of the numbers that is actually changed under the mapping and
run it through twice. 

.. maths::

    \begin{align*}
        \alpha^2(2) &= \alpha(\alpha(2)) \\
                            &= \alpha(7) \\
                            &= 5 \\
                            \\
        \therefore \alpha^2(2) &= 5
    \end{align*}

What happens if we keep going?

.. maths::

    \begin{align*}
        \alpha^3(2) &= \alpha(\alpha(\alpha(2))) \\
                            &= \alpha(\alpha(7)) \\
                            &= \alpha(5) \\
                            &= 2 \\
                            \\
        \therefore \alpha^3(2) &= 2
    \end{align*}

Ah ha! The cycle is complete; we started at 2 and got back there. It’s easy to
see if we keep raising :maths:`\alpha` to higher powers we will repeat
ourselves every third power. We can show this cycle more clearly if we use a
different notation for our permutation:

.. maths::

    $ \alpha = (2 \ 7 \ 5) $

That just means 2 maps to 7 maps to 5 and then back to 2. Everything else just
maps to itself. With the above notation, we can clearly see that the *orbit*
has a length of three, interesting that we got 2 to map back to itself at the
third power. Let’s write out :maths:`\beta` in the same way:

.. maths::

    $ \beta = (1 \ 2 \ 3 \ 4 \ 5 \ 6 \ 7 \ 8 \ 9) $

It has a longer orbit of length nine, so (following from what we discovered
above) let’s see what happens when we raise it to the ninth power. This is
going to get ugly!

.. maths::

    \begin{align*}
        \beta^9(2) &= \beta(\beta(\beta(\beta(\beta(\beta(\beta(\beta(\beta(2))))))))) \\
                   &= \beta(\beta(\beta(\beta(\beta(\beta(\beta(\beta(3))))))))) \\
                   &= \beta(\beta(\beta(\beta(\beta(\beta(\beta(4)))))))) \\
                   &= \beta(\beta(\beta(\beta(\beta(\beta(5))))))) \\
                   &= \beta(\beta(\beta(\beta(\beta(6)))))) \\
                   &= \beta(\beta(\beta(\beta(7))))) \\
                   &= \beta(\beta(\beta(8)))) \\
                   &= \beta(\beta(9))) \\
                   &= \beta(1)) \\
                   &= 2 \\
                            \\
        \therefore \beta^9(2) &= 2
    \end{align*}

This will work for any :maths:`x \in S` and we have it that the ninth power of
:maths:`\beta` is the *identity* of the permutation (so
:maths:`\beta^9 = S_\iota`), which we generally just write :maths:`\iota`
for brevity. This is what we mean:

.. maths::

    \begin{align*}
    \beta^9 &= \begin{pmatrix}
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
    \end{pmatrix}
    \end{align*}

We also say that :maths:`\beta` has an *order* of nine, that is that we will
find the identity at the ninth power. In the case that a permutation only has
one orbit, the order of that permutation is simply the cardinality (length) of
its single orbit.

What happens if we have a permutation with more than one orbit? Let’s introduce
another permutation that has two orbits:

.. maths::

    $
    \gamma = \begin{pmatrix}
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        7 & 2 & 6 & 4 & 5 & 10 & 1 & 8 & 3 & 9 \\
    \end{pmatrix}
    $

Exciting! But let’s write that out in our other notation, to be clear:

.. maths::

    $\gamma = (1 \ 7)(3 \ 6 \ 10 \ 9)$

The order of a permutation with more than one orbit will be the lowest common
multiple of the cardinalities of its orbits (which are 2 and 4). Since 2 is a
multiple of 4, the order of :maths:`\gamma` is 4. In other words; after four
iterations the 4-cardinality orbit has completed one cycle, and the
2-cardinality orbit has completed two cycles all orbits are in a state or
completion.

What happens to the order of a permutation when it is composed?

Let’s return to our first two permutations:

.. maths::

    \begin{align*}
        \alpha &= (2 \ 7 \ 5) \\
        \beta  &= (1 \ 2 \ 3 \ 4 \ 5 \ 6 \ 7 \ 8 \ 9)
    \end{align*}

Let’s write out their composition again, as above:

.. maths::


    % Orbits:
    % \alpha (2, 7, 5),)
    % \beta = B ((1, 2, 3, 4, 5, 6, 7, 8, 9), (10,))
    $
    \alpha \circ \beta = \begin{pmatrix}
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        7 & 3 & 4 & 2 & 6 & 5 & 8 & 9 & 1 & 10 \\
    \end{pmatrix}
    $

But let’s also write the orbits out in cycle notation:

.. maths::

    $\alpha\circ\beta = (1 \ 7 \ 8 \ 9)(2 \ 3 \ 4)( 5 \ 6 )$

We can see that the permutation :maths:`\alpha\circ\beta` has three orbits with
cardinalities 4, 3 and 2. The lowest common multiple of these numbers is 12, so
we have that :maths:`(\alpha\circ\beta)^{12} = \iota` and that the *order* of
:maths:`\alpha\circ\beta` is 12.

But what if we wanted to compose :maths:`\gamma` with :maths:`\alpha` and
:maths:`\beta` and to find out what the order of
:maths:`\alpha\circ\beta\circ\gamma`? We would have to track each number
through three permutations ... what a drag! Let’s just write some code to do it
for us. We can also test our hypotheses about the relationship between orbit
cardinality and order.

The first thing to define would be a permutation. I want to write a Python
``class`` that I can instatiate with some orbits and then call with numbers,
just like we do in the notation above. Perhaps something like:

.. code-block:: python

    A = (1, 7, 8, 9)(2, 3, 4)(5, 6)

Unfortunately, the above would interfere with the calling syntax and require me
to override ``__call__`` on the ``tuple`` builtin (which I’m not even sure is
possible). Instead I would be happy to settle for something like:

.. code-block:: python

    A = Permutation((
        (1, 7, 8, 9), (2, 3, 4), (5, 6)
    ))

I’d then like to be able to do something like:

.. code-block:: python

    >>> A(1)
    7

The code for cycling through orbits should be pretty straightforward:

.. code-block:: python

    def cycle_orbit(orbit, num):
        index = orbit.index(num) + 1
        if len(orbit) == index:
            return orbit[0]
        return orbit[index]

.. code-block:: python

    import operator
    import itertools

    class Permutation(object):

        def __init__(self, on, name, orbits):
            self.on = on
            self.name = name
            self.orbits = orbits

        def __call__(self, num):
            for orbit in self.orbits:
                if num in orbit:
                    index = orbit.index(num) + 1
                    if len(orbit) == index:
                        return orbit[0]
                    return orbit[index]
            return num

        def __repr__(self):
            return repr_permutation(self.name, self)

        @property
        def identity(self):
            result = zip(self.on, map(self, self.on))
            return all(itertools.starmap(operator.eq, result))
