Fun with permutations
#####################

`:snake:`
=========
|

A permutation is a bijective_ mapping of a set to itself. For example, if we had
the set defined as :maths:`S = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10 \}`, just the
`natural numbers`_ from one to ten, then the permutation :maths:`\alpha`
mapping :maths:`S` to itself (written :maths:`\alpha : S \rightarrow S`) could
be represented as follows:

.. _bijective: https://en.wikipedia.org/wiki/Bijection
.. _`natural numbers`: https://en.wikipedia.org/wiki/Natural_number

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
the same way. Let’s apply our first permutation *to itself* (we write this
:maths:`\alpha^2` for brevity) and see what happens.  Remembering that first
permutation:

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
ourselves every third power. Let’s think about our permutations slightly
differently. We can show the cycle we have observed more clearly if we use a
different notation for our permutation:

.. maths::

    $ \alpha = (2 \ 7 \ 5) $

That just means 2 maps to 7 maps to 5 and then back to 2. Anything not
mentioned just maps to itself (nothing interesting happens). With the above
notation, we can clearly see that the *orbit* has a length of three.
It’s interesting that we got 2 to map back to itself at the third power. Let’s
write out :maths:`\beta` in the same way:

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
find the identity :maths:`S` at the ninth power of :maths:`\beta`. In the case
that a permutation only has one orbit, the order of that permutation is simply
the cardinality (length) of its (single) orbit.

What happens if we have a permutation with more than one orbit? Let’s introduce
another permutation that has two orbits:

.. maths::

    $
    \gamma = \begin{pmatrix}
        1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        7 & 2 & 6 & 4 & 5 & 10 & 1 & 8 & 3 & 9 \\
    \end{pmatrix}
    $

Exciting! But let’s write that out in our “cycle” notation, to be clear:

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

    α = (1, 7, 8, 9)(2, 3, 4)(5, 6)

Unfortunately, the above would interfere with the calling syntax of Python and
require me to override the ``tuple`` builtin (which I’m not even sure is
possible).  Besides which, we can’t use non-ASCII characters in identifiers in
Python.  Instead I would be happy to settle for something like:

.. code-block:: python

    class Permutation(object):

        def __init__(self, name, orbits):
            pass

    a = Permutation('α', (
        (1, 7, 8, 9), (2, 3, 4), (5, 6)
    ))

Hurrah! We’ve defined half of a permutation in Python. Pity it doesn’t actually
do anything. What do permutations do? Well in terms of our definition above,
they just return the “next” thing for one of their orbits.

The code for cycling through an orbit (the handful of tuples passed to our
``Permutation`` constructor above) should be pretty straightforward. We just
need to return the “next” number, looping if we reach the end of the tuple:

.. code-block:: python

    def follow_orbit(orbit, num):
        'Follow an orbit one step from the passed number'
        index = orbit.index(num) + 1
        if len(orbit) == index:
            return orbit[0]
        return orbit[index]

I’d then like to be able call my permutation in the same way I
show application happening in my notation. Thusly;

.. code-block:: python

    >>> a(2)
    7

To do this, we can define the “dunder” method ``__call__`` on our class, which
will be the method that is called when the class instance is called (``a``
above is a class instance). Our ``__call__`` method here  would just use the
``follow_orbit`` function to return the appropriate number. Let’s put it all
together:

.. code-block:: python

    class Permutation(object):

        def __init__(self, name, orbits):
            self.name = name
            self.orbits = orbits

        def __call__(self, num):
            for orbit in self.orbits:
                if num in orbit:
                    return follow_orbit(orbit, num)
            return num  # not changed in the permutation

    a = Permutation('α', (
        (2, 7, 5),
    ))

    a(2) == 7  # True


To calculate :maths:`\alpha^2(2)` using our Python code above, we would have to
write:

.. code-block:: python

    a(a(2)) == 5  # True

This isn’t particularly useful if we need to raise our permutation to the 100th
power. Suppose we wanted to write :maths:`(\alpha\circ\beta)^4(2)` using our
Python class, we would have to write:

.. code-block:: python

    a(b(a(b(a(b(a(b(2)))))))) ===  # ???

The first thing to realise is that in this situation, “raising to a power” is
equivalent to composing a permutation with itself, I claim :maths:`\alpha^2 =
\alpha\circ\alpha` and :maths:`\alpha\circ\alpha^2 =
(\alpha\circ\alpha)\circ(\alpha\circ\alpha)`. So we have it that “raising to a
power” is just a special case of composition.

That said, until we come up with a way of representing composition in our code,
our ``Permutation`` class is pretty useless.  Python being Python, there’s
exactly what we need `in the standard lib`_ in the form of
``functools.reduce``. Before we can enjoy the stdlib goodness, and we need to
define a function that composes just two functions, which is pretty simple:

.. _`in the standard lib`: https://docs.python.org/3/library/functools.html#functools.reduce

.. code-block:: python

    def compose_left_right(left, right):
        return lambda x: left(right(x))

The above function just takes a pair and returns a closure that will call
``left`` with the return value of ``right``. Let’s put it into action with
a simple composition:

.. code-block:: python

    def add_two(num):
        return num + 2

    def multiply_two(num):
        return num * 2

    multiply_then_add = compose_left_right(add_two, multiply_two)

    multiply_then_add(2) == 6  # True

We can see that the multiplication happened first, we would have got 8 if the
addition happened first. The above can be generalised from two functions
(``left`` and ``right``), to *n* functions by using ``functools.reduce`` and a
little ``*`` magic:

.. code-block:: python

    def compose(*functions):
        return functools.reduce(compose_left_right, functions)

Now to define our special case of composition “raising to a power”, which is
just composing a function with itself a given number of times:

.. code-block:: python

    def power(fn, to):
        return compose(*[fn] * to)

Wait, we’re not done yet! We need one more function to test whether or not some
permutation (or a composition of permutations raised to a power) is the
identity of a set. Let’s dip into the standard lib once_ more_ and fish out
``itertools.starmap`` and ``operator.eq``:

.. code-block:: python

    def identity(of, permutation):
        result = zip(of, map(permutation, of))
        return all(itertools.starmap(operator.eq, result))

The variable ``result`` above will be a list of 2-tups just like our very first
representation of a permutation. Once we have that, all that remains to be done
is make a pairwise comparison per tuple (that’s where ``itertools.starmap``
and ``operator.eq`` come in); if ``all`` the pairwise comparisons come back
``True``, then we have our identity.

.. _once: https://docs.python.org/3/library/itertools.html#itertools.starmap
.. _more: https://docs.python.org/3/library/operator.html#operator.eq

Making use of the Python code we’ve written, we can find the order of the
composition of the permutations we have defined above
:maths:`\alpha\circ\beta\circ\gamma` without having to do much more than
describe the permutation in Python’s terms:

.. code-block:: python

    S = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    a = Permutation('α', (
        (2, 7, 5),
    ))

    b = Permutation('β', (
        (1, 2, 3, 4, 5, 6, 7, 8, 9),
    ))

    c = Permutation('γ', (
        (1, 7), (3, 6, 10, 9),
    ))

    abc = compose(a, b, c)

    to = 1

    while not identity(S, power(abc, to)):
        to += 1

    print("Order is {0}!".format(to))

Running the above code is left as an exercise to the reader, it’s also
available `on GitHub`_.

.. _`on GitHub`: https://github.com/bmcorser/_bmcorser.github.io/blob/master/blog/2015/11/21/order-of-composed-permutations.py
