A whale of a time
#################

`:whale2:`
==========
|

I finally got the legitimate chance to enter the happy world of LXC_ in a
professional context. Whilst I realise I am somewhat late to the party\ [#]_,
and the experience was pretty great (even on a Mac) so I thought I would share my
thoughts as we go on a whirlwind tour of some container-based highjinks.

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

If you then build the container binary with ``build`` (giving it a memorable
tag name with ``-t``), it can then be started::

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

.. [#] According to Wikipedia, LXC found its first release about 8 years ago.
.. [#] Google, IBM, et al
.. [#] https://linuxcontainers.org/lxc/documentation/#python
