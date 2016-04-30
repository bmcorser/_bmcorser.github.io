.. role:: strike

From Python to Rust and back again
##################################

`:sparkles::umbrella:`
======================
|

After going along to `London Rust Meetup #4`_ which, despite being
organised by people who didn’t work for Mozilla (this `friendly chap`_, amongst
others), was hosted at Mozilla Headquarters just up the road from the ENO on
St. Martin’s Lane in London.

.. _`London Rust Meetup #4`: http://www.meetup.com/Rust-London-User-Group/events/229413056/
.. _`friendly chap`: https://github.com/vladimir-lu


I’ve been writing experimental code for a while to explore how useful (or not)
the Python/Rust combination is, and seeing `Maciej Kula`_’s lighting talk
reminded me of the potential appetite in Python developers for seeing how one
can “drop down” to Rust and when it’s a good idea to do so.

.. _`Maciej Kula`: https://github.com/maciejkula

Introduction
''''''''''''

I’m going to use the rust-cpython_ library in my Rust code to expose modules
and functions that look like “Pythonic” functions in Python, and to take
advantage of its machinery for raising Python exceptions from Rust; that way we
can get tighter integration of Rust’s error handling without repetitious work
and return meaningful exceptions that can be understood by Python.

.. _rust-cpython: http://dgrunwald.github.io/rust-cpython/doc/cpython/

I’ll also sketch out a skeleton Python package that bundles some pre-compiled
dynamic libraries as an idea of how one might distribute to users who don’t
have a Rust compiler available. Maybe this will become redundant someday; will
OS X Fuji and Ubuntu Xenial Xerus ship with ``rustc``?

I’ll do some benchmarks [#]_ which will confirm what we already know: Rust is
*fast!*

This isn’t a tutorial on how to write Rust, the Rust code herein will be
embarassingly simple. I’m interested in showing how Python developers can ship
packages that make sense to the Python community at large whilst leaning on
Rust to do any computational heavy lifting.

.. [#] Usual caveats apply; http://chasewoerner.org/skeptical.html
