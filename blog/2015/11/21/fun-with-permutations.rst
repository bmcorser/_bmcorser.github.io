Fun with permutations
=====================

A permutation is a bijective mapping of a set to itself. For example, if we had
the set defined as :maths:`S = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10 \}`, just the
numbers from one to ten (we can also call it :maths:`S_{10}` for brevity), then
a permutation :maths:`\alpha` mapping :maths:`S` to itself (written
:maths:`\alpha : S \rightarrow S`) could be represented as follows:

.. maths::

    $
    B =  \begin{pmatrix}
        1 & 2 & 3 \\
        3 & 2 & 1
    \end{pmatrix}
    $

.. maths::

    $
    % ((1, 2, 3, 4, 5, 6, 7, 8, 9), (10,))
    \beta = \bigl(
        \begin{smallmatrix}
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 1 & 10 \\
        \end{smallmatrix}
    \bigr)
    $

.. maths::

    $
    % ((1,), (2, 3, 4), (5,), (6,), (7,), (8,), (9,), (10,))
    \gamma = \bigl(
        \begin{smallmatrix}
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            1 & 3 & 4 & 2 & 5 & 6 & 7 & 8 & 9 & 10 \\
        \end{smallmatrix}
    \bigr)
    $

.. maths::

    $
    % ((1,), (2,), (3,), (4, 5, 6), (7,), (8,), (9,), (10,))
    \delta = \bigl(
        \begin{smallmatrix}
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            1 & 2 & 3 & 5 & 6 & 4 & 7 & 8 & 9 & 10 \\
        \end{smallmatrix}
    \bigr)
    $

.. maths::

    $
    % Orbits:
    % \alpha ((1,), (2, 3, 4, 5, 6, 7, 8, 9, 10))
    % \beta ((1, 2, 3, 4, 5, 6, 7, 8, 9), (10,))
    % \gamma ((1,), (2, 3, 4), (5,), (6,), (7,), (8,), (9,), (10,))
    % \delta ((1,), (2,), (3,), (4, 5, 6), (7,), (8,), (9,), (10,))
    (\alpha \bullet \beta \bullet \gamma \bullet \delta)^1 = \bigl(
        \begin{smallmatrix}
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            3 & 5 & 6 & 7 & 8 & 4 & 9 & 10 & 1 & 2 \\
        \end{smallmatrix}
    \bigr)
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
