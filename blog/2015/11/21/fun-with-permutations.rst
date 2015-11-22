Fun with permutations
=====================

.. maths::

    $
    % S = { 1 2 3 4 5 6 7 8 9 10 }
    % ((1,), (2, 3, 4, 5, 6, 7, 8, 9, 10))
    \alpha = \bigl(
        \begin{smallmatrix}
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            1 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 2 \\
        \end{smallmatrix}
    \bigr)
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
    (\alpha \o \beta \bullet \gamma \bullet \delta)^{12} = \bigl(
        \begin{smallmatrix}
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
        \end{smallmatrix}
    \bigr)
    $
