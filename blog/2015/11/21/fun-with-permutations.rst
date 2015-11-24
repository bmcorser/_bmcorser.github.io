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
bottom line are the permuted values. For example, the below shows that
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

Moving swiftly on, consider what happens if we **compose** :maths:`\alpha` with
:maths:`\beta`, which is written :maths:`\alpha\circ\beta`. That means we get
the value from :maths:`\beta` and apply it to :maths:`\alpha`, like this:

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

Not so different. Quite some of :maths:`\beta` seems preserved. Let’s think
about our permutations slightly differently. Let’s apply our first permutation
*to itself* (we write this :maths:`\alpha^2` for brevity) and see what happens.
Remembering that first permutation:

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
ourselves. We can show this cycle more clearly if we use a different notation
for our permutation:

.. maths::

    $ \alpha = (2 \ 7 \ 5) $

That just means 2 maps to 7 maps to 5 and then back to 2. Everything else just
maps to itself. With the above notation, we can clearly see that the *orbit*
has a length of three, interesting that we got 2 to map back to itself at the
third power.  Let’s write out :maths:`\beta` in the same way:

.. maths::

    $ \beta = (1 \ 2 \ 3 \ 4 \ 5 \ 6 \ 7 \ 8 \ 9) $

It has a longer orbit of length nine, so let’s see what happens when we raise
it to the ninth power. This is going to get ugly!

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
:maths:`\beta^9 = \beta_\iota`), which we generally just write :maths:`\iota`
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
one orbit, the order of that permutation is simply the cardinality of its
single orbit.

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


.. maths::

    $
    % ((1, 3, 6, 4, 7, 9), (2, 5, 8, 10))
    % Orbits:
    % \alpha ((1,), (2, 3, 4, 5, 6, 7, 8, 9, 10))
    % \beta ((1, 2, 3, 4, 5, 6, 7, 8, 9), (10,))
    % \gamma ((1,), (2, 3, 4), (5,), (6,), (7,), (8,), (9,), (10,))
    % \delta ((1,), (2,), (3,), (4, 5, 6), (7,), (8,), (9,), (10,))
    (\alpha \circ \beta \circ \gamma \circ \delta)^{12} =
        \begin{pmatrix}
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        \end{pmatrix}
    $
