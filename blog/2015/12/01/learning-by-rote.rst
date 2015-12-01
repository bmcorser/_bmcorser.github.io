Learning by rote
################

Calculus is full of formulae. As a mundane necessity of examination sometimes
those formulae must be committed to memory. I remember remembering
:maths:`-b\pm\frac{\sqrt{b^2-4ac}}{2a}`. On first sight, it looked huge! How
would I ever be able to reproduce something so arcane just *from memory*? After
I looked again, it didn’t seem so bad.

After a few days, I had it down pat.

Because these were the GCSE days, when much learning seemed like repetition
“until it sinks in” without really understanding the significance of the thing,
we learned by rote. This was before the politics of *how* something was learned
would have struck any kind of chord with us; we just wanted to be outside.

It seems the time for learning by rote has come round again, this time with a
vengeance. Now I need to get down not one, not two, but eleven formulae
(granted, they are simple compared to the quadratic formula, but still). 

.. maths::

    \bgroup
    \def\arraystretch{2}
    \begin{tabular}{ | r | l | }
        \hline
        $f(x)$ & $f'(x)$ \\
        \hline
        $x^n$ & $nx^{n - 1}$ \\
        \hline
        $\sin x$ & $\cos x$ \\
        \hline
        $\cos x$ & $-\sin x$ \\
        \hline
        $\tan x$ & $\sec^2 x$ \\
        \hline
        $\sec x$ & $\sec x\tan x$ \\
        \hline
        $\mathrm{cosec} x$ & $-\mathrm{cosec} x \cot x$ \\
        \hline
        $\cot x$ & $-\mathrm{cosec}^2 x$ \\
        \hline
        $e^x$ & $e^x$ \\
        \hline
        $\ln x$ & $\frac{1}{x}$ \\
        \hline
        $\arcsin x$ & $\frac{1}{\sqrt{1 - x^2}}$ \\
        \hline
        $\arccos x$ & $-\frac{1}{\sqrt{1 - x^2}}$ \\
        \hline
        $\arctan x$ & $\frac{1}{1 + x^2}$ \\
        \hline
    \end{tabular}
    \egroup

How am I going to drum that lot into my head? I could print it out on a
pocket-sized sheet of paper and gaze lovingly at it when on the tube. Better
yet, I’m an adult now, so I could just get it tattooed to my wrist. But wait,
why not use the computer to do the drumming for me.

I want to be asked what the corresponding function is for a derivative and what
the derivative for a function is at regular intervals. Why don’t I just modify
my shell to ask me to give an answer before I am allowed to carry on.

Not being able to respond that the derivative of :maths:`\mathrm{cosec}x` is
:maths:`-\mathrm{cosec}x\cot x` within a few seconds would begin to burden my
productivity if I didn’t start learning ...

*Challenge accepted!*

The issue is that if I’m being asked the question in the terminal, then either
I’ll have to cope with doing the translation of the LaTeX markup in my head. It
would be quite nice to display a little X window with a nice rendered SVG.

Unix philosophy to the rescue; there’s `a package`_ ``librsvg2-bin`` that provides
`a binary`_ that does just that and nothing more: ``rsvg-view-3``

.. _`a package`: http://www.linuxfromscratch.org/blfs/view/svn/general/librsvg.html
.. _`a binary`: http://manpages.ubuntu.com/manpages/lucid/man1/rsvg-view.1.html

The behaviour is going to be dead simple; when a new shell is invoked, open a
window showing a random SVG of some :maths:`f(x)`, wait for the window to be
closed, wait for some LaTeX input, check input against the expected value.  If
the answer is correct, exit. If the answer is wrong then show the correct
answer along with the question :maths:`f(x) = f'(x)`, wait for the window to be
closed, exit.

First job is to put together a table of questions, answers in LaTeX markup and
render SVGs for the questions :maths:`f(x)` and the questions with their
answers :maths:`f(x) = f'(x)`.

====================  =============================
``f(x)``              ``f'(x)``
====================  =============================
``x^n``               ``nx^{n - 1}``
``\sin x``            ``\cos x``
``\cos x``            ``-\sin x``
``\tan x``            ``\sec^2 x``
``\sec x``            ``\sec x\tan x``
``\mathrm{cosec} x``  ``-\mathrm{cosec} x \cot x``
``\cot x``            ``-\mathrm{cosec}^2 x``
``e^x``               ``e^x``
``\ln x``             ``\frac{1}{x}``
``\arcsin x``         ``\frac{1}{\sqrt{1 - x^2}}``
``\arccos x``         ``-\frac{1}{\sqrt{1 - x^2}}``
``\arctan x``         ``\frac{1}{1 + x^2}``
====================  =============================

Luckily, I’ve got `some code`_ hanging about that will take a LaTeX string like
we have above and return an SVG string with the notation I need to be able to
recognise. I just need to loop through the table above spitting out SVG files
for questions :maths:`f(x)` and questions with their answers :maths:`f(x) =
f'(x)`.

.. _`some code`: https://github.com/bmcorser/bade/blob/master/bade/directives/eqtexsvg.py

Because I don’t really want to write out a file called ``\frac{1}{1 + x^2}``,
I’m just going to make a short hash of the LaTeX string and use that as the
file name. I can use the same idea to check the veracity of the answer provided.

So, let’s represent the above as a mapping in Python, and render the SVGs we
need:

.. code-block:: python

    from bade.directives.eqtexsvg import eqtexsvg
    import hashlib

    fx_fdx = {
        'x^n':               'nx^{n - 1}',
        '\\sin x':           '\\cos x',
        '\\cos x':           '-\\sin x',
        '\\tan x':           '\\sec^2 x',
        '\\sec x':           '\\sec x\\tan x',
        '\\mathrm{cosec} x': '-\\mathrm{cosec} x \\cot x',
        '\\cot x':           '-\\mathrm{cosec}^2 x',
        'e^x':               'e^x',
        '\\ln x':            '\\frac{1}{x}',
        '\\arcsin x':        '\\frac{1}{\\sqrt{1 - x^2}}',
        '\\arccos x':        '-\\frac{1}{\sqrt{1 - x^2}}',
        '\\arctan x':        '\\frac{1}{1 + x^2}',
    }

    hash_map = {}
    for fx, fdx in fx_fdx.items():
        # write f(x) to file
        fx_hash = hashlib.sha1(fx.encode('utf8')).hexdigest()[:7]
        fx_svg = eqtexsvg("${0}$".format(fx))
        with open(fx_hash, 'w') as fx_fh:
            fx_fh.write(fx_svg)

        # write f(x) = f'(x) to file
        fdx_hash = hashlib.sha1(fdx.encode('utf8')).hexdigest()[:7]
        fdx_svg = eqtexsvg("${0} = {1}$".format(fx, fdx))
        with open(fdx_hash, 'w') as fdx_fh:
            fdx_fh.write(fdx_svg)

        # remember association of hashes
        hash_map[fx_hash] = fdx_hash

    from pprint import pprint
    pprint(hash_map)

Easy-peasy. A bunch of files just got written to `the directory`_ we ran `the
script`_ in and the script printed a pretty map that tells us about the
associations between the files that were written:

.. code-block:: python

    {'0741fac': 'e9e9dc6',
     '1624dce': '1624dce',
     '189199f': 'c65ec7a',
     '26d1990': '566261d',
     '3ad999b': 'd339226',
     '43630ee': '61d8e53',
     '4f1ae87': '2ba2cbb',
     '5600f00': 'd849a01',
     '67fd40d': '5600f00',
     'a297bb9': 'b82f717',
     'bd04e97': 'd261fd4',
     'd6d9338': '5edd4ce'}

Now to write the program to flash these images and check answers. Because this
is going to frequently interrupt me whilst I am doing things, it needs to be
pretty snappy if it’s not going to be get on my nerves. So, let’s write it in
Rust.

Becase I don’t intend to distribute this code and I don’t anticipate any
dependencies outside the stdlib there, I’m not going to bother with Cargo (or
any packaging endeavours) and hack straight in there with ``rustc``
`:sunglasses:`
