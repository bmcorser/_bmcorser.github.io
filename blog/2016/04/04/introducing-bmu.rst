.. role:: strike

Introducing ``bmu``
###################

`:construction_site:`
=====================
|

I’ve been working on ``bmu`` for about two months (spread over seven months, of
course) and am writing this as I’ve put the system into “production” at work. 

What is ``bmu``?
----------------
A little middleware server that sits between a Buildbot_ instance configured to
run automated test suites and the `GitHub Events API`_, mediating communication
between the two. It brings the user interfaces of the two a little closer
together by “passing on” reports from Buildbot to GitHub (via statuses_) and
allowing developers some control over Buildbot without having to leave the
familiar GitHub user interface.

More interestingly, ``bmu`` also offers a (probably, somewhat) novel way for
developers to control which suites are run. When ``bmu`` is configured, it is
given a tree of suites arranged by language or package which is converted into
a set of GitHub issue labels. These heirarchical labels then allow the
developer to signal which suites should be run.

.. _Buildbot: https://buildbot.net/
.. _`GitHub Events API`: https://developer.github.com/v3/activity/events/
.. _statuses: https://developer.github.com/v3/repos/statuses/

Influences
----------
Eagle-eyed readers may spot some similarity between ``bmu`` and Homu_, in fact
I only started writing ``bmu`` after reading the `Rust infrastructure can be
your infrastructure`_ blog post. ``bmu`` is quite different to Homu, which
automates the discipline of “test before merge” very nicely. ``bmu`` doesn’t
make :strike:`anywhere near` [#]_ as much effort to keep track of state as Homu does (with its
PostgreSQL backend), we use mostly use GitHub to keep track of what has been
run or not . The initial idea with ``bmu`` is to allow developers to run
specific test suites in a visible manner that was integrated with GitHub.

.. _Homu: https://github.com/barosl/homu
.. _`Rust infrastructure can be your infrastructure`: http://huonw.github.io/blog/2015/03/rust-infrastructure-can-be-your-infrastructure/

Why is that useful?
-------------------
Bein able to specify which test suites to run allows developers to demonstrate
iteration more quickly by only running relevant test suites. This is especially
useful when the code under test is diverse and the tests that are run against
the codebase range from unit tests that complete in a few seconds to system
tests and deployment and provisioning tests runs which take a number of minutes.

In my current company, we do our code reviews using GitHub’s PR “workflow”
(like all good hipster development teams), which means that being able to get
quick feedback from specific test suites is very useful and makes our
conversations about the code we are writing less punctuated by the frustration
of waiting for tests to complete.

Examples *!*
------------

There follow a few examples of what a typical deployment of ``bmu`` might look
like, first looking how a heirarchy of test suites might be “laid out” and the
set of labels that this would produce, then stepping through the typical
process of getting a PR tested and merged and seeing where ``bmu`` gets
involved.

Test suite heirarchy
~~~~~~~~~~~~~~~~~~~~

.. code-block:: shell

    .
    ├── js
    │   ├── functional
    │   └── unit
    ├── py
    │   ├── functional
    │   └── unit
    └── sys
        ├── functional
        ├── regression
        └── ux

Given a heirarchy of test suites like the above, the corresponding YAML
configuration would look like the following

.. code-block:: yaml

    - js:
      - functional
      - unit
    - py:
      - functional
      - unit
    - sys:
      - functional
      - regression
      - ux


Given the configuration above, the ``bmu`` would then produce a set of labels
as follows

 - ``bmu``
 - ``bmu/js``
 - ``bmu/js/unit``
 - ``bmu/js/functional``
 - ``bmu/py``
 - ``bmu/py/unit``
 - ``bmu/py/functional``
 - ``bmu/sys``
 - ``bmu/sys/functional``
 - ``bmu/sys/regression``
 - ``bmu/sys/ux``

There is a label for every node in the tree, where leaves represent test suites
and the the application of a non-leaf node would result in more than one test
suite being run. **NB:** The label above named “``bmu``” represents the root
node and applying this label will result in all test suites being run.

As such, ``bmu`` would expect to find builders, each with a ``ForceScheduler``
to allow it to be triggered from the outside, with the following names i.e.
corresponding to the leaf nodes above:

 - ``js/unit``
 - ``js/functional``
 - ``py/unit``
 - ``py/functional``
 - ``sys/functional``
 - ``sys/regression``
 - ``sys/ux``

The only two things that need to be configured are the heirarchy in ``bmu``’s
config and the corresponding builder names in Buildbot; the rest is handled
automatically.

Typical process
~~~~~~~~~~~~~~~

What would a typical “usage” of ``bmu`` look like? Well, it’s a pretty
flexible system; it lets you do label → builder mapping + heirarchy.

Let’s run through a contrived, gender non-neutral, silly but narrative example
of ``bmu`` in use.

1. Alice opens a PR, she’s been doing some work on the Python part of the
   codebase and wants to discuss implementation details with her colleague
   Beryl. She applies the appropriate label (from the previous example) which,
   in this case, will be ``bmu/py/unit``.
2. The selected test suite finishes quickly and when Beryl opens the PR, she
   can see that the code that Alice wants to talk about is green.
3. Beryl suggests adds a few changes to some interface in Alice’s PR, which she
   doesn’t think will break anything, but just to be sure, she widens the scope
   to run the functional tests as well, by changing the label on the PR to
   ``bmu/py``.
4. The test suite that Beryl selected runs quickly and Alice’s original
   selection is run too, due to the heirarchy of the labels. Alice is happy
   with Beryl’s changes and passes the PR on to Cordelia who makes some changes
   to objects that get passed to the JavaScript code. Right away, Cordelia
   applies the ``bmu/sys/functional`` label, to ensure any breakage in the JS
   will be reported on.
5. ???
6. Profit!

You can see the source code of ``bmu`` `here`_ on GitHub. Docs aren’t great
right now.

.. _`here`: https://github.com/bmcorser/bmu

.. [#] I made a first pass at adding slightly better state tracking in ``bmu``, see https://github.com/bmcorser/bmu/commit/3f6307aa37620d951f2eb91604cb653314dd42db
