A whale of a time
#################

`:whale2:`
==========
|


This month I finally found plausibly deniable reasons to enter the happy world
of LXC_ in a professional context. Whilst I realise I am somewhat late to the
party\ [#]_, the experience was pretty great (even on a Mac) so I thought I
would share my thoughts as we go on a whirlwind tour of some container-based
highjinks.

.. [#] According to Wikipedia, LXC found its first release about 8 years ago.

Begin\ `!`
**********
Before anyone gets excited, I’m not writing application code that calls LXC
libs directly; although, being a well-backed\ [#]_ project, there are bindings
for Python\ [#]_ so that notion wouldn’t be too far from the realms of reality.
No, I’m going through Docker_ like everyone else.

In the broadest strokes, Docker is a suite of tools for managing Linux
containers. The basis of Docker is a “language” for defining containers;
the ``Dockerfile``, which looks something like this:

.. code-block:: docker

    # starting image
    FROM python:3.5

    # command to run when container starts
    CMD python -m http.server 8080

    # which ports to expose
    EXPOSE 8080

If you build the container binary with ``build`` (giving it a memorable
tag name with ``-t``), it can then be started with ``run``::

    docker build -t whale .
    docker run -p 8080:8080 -t whale

In another terminal, let’s send a request to the local port that our web server
should be listening at (example uses the excellent `HTTPie`_)::

    http -h :8080

We should then see the response header:

.. code-block:: http

    HTTP/1.0 200 OK
    Content-Length: 987
    Content-type: text/html; charset=utf-8
    Date: Sat, 10 Sep 2016 17:01:32 GMT
    Server: SimpleHTTP/0.6 Python/3.5.2

Cool, we can see that we got a ``200`` from a server identifying itself as
running ``Python/3.5.2``.

Seems legit.

.. _HTTPie: https://httpie.org/

.. _LXC: https://en.wikipedia.org/wiki/LXC
.. _Docker: https://www.docker.com/

.. [#] Google, IBM, et al
.. [#] https://linuxcontainers.org/lxc/documentation/#python


Going off piste
***************

When encountering new and unfamiliar technology, like being presented with a
spork for the first time, my first impulse is obviously to use it to do
something it wasn’t necessarily designed for; vis-à-vis the previous example
this would mean sticking it in an electric socket. Let’s do that with Docker.


I’m going to dive\ [#]_ more into the Docker toolchain and use `Docker Compose`_
(previously Fig_) to get a handle on the little bunch of containers I’m going
to use to ... `build this blog!`

Not exactly the finger socket promised, but it will give a chance to go through
getting groups of containers to cooperate, robbing base images (this is a
frequent job, you can only ``FROM`` from one image) and tying things together
with ``docker-compose``.


.. _`Docker Compose`: https://docs.docker.com/compose/
.. _Fig: http://www.fig.sh/

.. [#] arf, arf
.. [#] https://linuxcontainers.org/lxc/documentation/#python
