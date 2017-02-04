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
to use to ... build this blog\ `!`

Not exactly the finger socket promised, but it will give a chance to go through
getting groups of containers to cooperate, robbing base images (this is a
frequent job, you can only ``FROM`` from one image) and tying things together
with ``docker-compose``.

Our goal is to have a single command we can run that will bring up two
containers with access to the host file system; one to watch for changes to
``*.rst`` files and rebuild the HTML as I write and one to serve those HTML
files in a browser. We’ve already seen how to create a container with a Python
web server in it above, so I’ll be brief.

.. _`Docker Compose`: https://docs.docker.com/compose/
.. _Fig: http://www.fig.sh/

.. [#] arf, arf

Layout
------

Project layout here is somewhat important; since Docker Compose only allows the
composition of ``Dockerfile``\ s in child directories the
``docker-compose.yaml`` that holds the configuration of the containers in your
mini-infra, it must sit at the project root. As such::

    .
    ├── _bmcorser.github.io
    ├── bmcorser.github.io
    ├── build
    ├── docker-compose.yaml
    └── serve

Where ``build`` is a ``Dockerfile`` describing a container sporting the
dependencies of Bade_ with LaTeX_ and Graphviz_ directives_, similarly
``serve`` is the Python HTTP server shown at the start of this article. The
``*.github.io`` directories are clones of the source (``_`` prefixed) and
“compiled” repositories of this blog. The idea is to have the ``build``
container read from the source repo and squirt built assets into the ``serve``
container, then we can point our browser at it — thrilling.

.. _Bade: http://pythonhosted.org/bade/
.. _Graphviz: https://github.com/bmcorser/bade/blob/master/bade/directives/dotgraph.py
.. _LaTeX: https://github.com/bmcorser/bade/blob/master/bade/directives/eqtexsvg.py
.. _directives: http://docutils.sourceforge.net/docs/ref/rst/directives.html


Container composition
---------------------

We can describe what we want in a ``docker-compose.yaml`` file, presented
below:


.. code-block:: yaml

    version: "2"
    services:
      build:
        build:
          context: .
          dockerfile: build
        volumes_from:
          - volumes
      serve:
        build:
          context: .
          dockerfile: serve
        volumes_from:
          - volumes
        ports:
          - 8000:8000
      volumes:
        image: busybox
        volumes:
          - ./_bmcorser.github.io:/source
          - ./bmcorser.github.io:/build
          - /tmp:/tmp

This is a pretty basic Docker Compose file (it’s in YAML if you didn’t get
that), where the keys in ``services`` give names to the containers that will be
managed by this compose “environment”. ``build`` and ``serve`` grab the
``Dockerfile``\ s with the corresponding names and build those containers. The
``serve`` container specifies which ``ports`` (the format is
``<host>:<container>``) should be opened on your local host and forwarded to
which ports on the container. The ``volumes`` service is slightly different in
that is doesn’t reference local ``Dockerfile``, but instead refers to an image
hosted on Dockerhub_; in particular busybox_, which is the smallest Linux
distro I could think of. The purpose of the ``volumes`` container is just to
mount some local directories on the ``build`` and ``serve`` containers so they
can access the source and build repos of the blog. This is done with the
``volumes_from`` key in the definition of those services.

.. _Dockerhub: https://hub.docker.com/
.. _busybox: https://hub.docker.com/_/busybox/

``build`` container
-------------------

The ``serve`` container is pretty simple, but the ``build`` container is where
the heavy deps of rendering pretty notation and graphs are held. There’s a nice
container `on Dockerhub`_ for isolated LaTeX installs, but I also need a
reasonable Python environment, so I’ll just steal the lines I need from
`@blang`_\ ’s container description and use the same ``python:3.5`` base image
that the ``serve`` container uses.

.. code-block:: docker

    FROM python:3.5

    # from blang/latex
    RUN apt-get update -q
    RUN apt-get install -qy texlive-full
    RUN apt-get install -qy python-pygments
    RUN apt-get install -qy gnuplot

    # we need graphviz to render DOT graphs
    RUN apt-get install -qy graphviz

    # bade and peat for building the blog files
    RUN pip install peat bade

    # where the source repo is mounted by the `volumes` container
    WORKDIR /source

    # watch for changes and build
    CMD find . -name \*.rst | peat -C bade

This is a heavy container and takes some time to build, but once the
intermediate containers are cached — each line in a ``Dockerfile`` represents a
“layer” which can be cached by Docker — then the container takes milliseconds
to spin up.

One shot
********

There we have it “containerised”, build, watch & serve for a static blog. The
only thing remaining is to bring the container group ``up`` with
``docker-compose``::

    docker-compose up --build

Boom.


.. _`on Dockerhub`: https://hub.docker.com/r/blang/latex/
.. _`@blang`: https://github.com/blang


