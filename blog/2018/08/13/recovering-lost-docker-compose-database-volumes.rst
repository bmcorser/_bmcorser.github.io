Recovering lost data from dropped Docker Compose volumes
########################################################

`:scream:`
==========
|

**tldr;** everything was ok

I’m lazy
--------
Because I’m a particularly lazy sausage, I use Docker Compose to drive the
web site running on my originalenclosure.net_ domain. I’m so lazy, in fact,
that I didn’t (up until this point) use a separate Compose configuration for
production and development environments. I also used the standard issue Docker
image for PostgreSQL, without specifying any volumes; because Docker Compose
just takes care of that for you, right\ *!?*

.. _originalenclosure.net: https://originalenclosure.net/

I deleted everything
--------------------
The last point above is particularly pertintent to what happened next. The app
that consitutes the web site is a reasonably venerable and for the most part
a typically overcomplicated Django app. I did at one point a few years ago
rewrite things using Flask and SQLAlchemy with a shiny Vue.js frontend, but
never got round to deploying it. Occasionally something breaks (usually around
SSL) and I have to go in and tinker with the crappy Django code to get things
running again. It’s a little painful running the development server on HTTPS so
when something wasn’t working in the development environment, in in a moment of
frustration, I typed ``docker-compose down`` in anger. A fatal mistake.

*Poof!*

Just like that, being ever-helpful, Docker Compose detached all the
automatically created volumes for containers running in that config, including
my “production” database. When I ``up``’d the containers again, I was welcomed
by a fresh (but completely empty) database.


A ray of hope
-------------
Cold sweat pouring down my face, I turned to DuckDuckGo_ for answers. One can
list Docker volumes with ``docker volume ls``. I did so. The list returned was
voluminous, which set off a spark of hope. Perhaps my precious data resided in
one of these opaquely named volumes::

    $ docker volume ls -q

    1e1b183240fcdc7e8f7afd397b5c945ab8f870815f475e704d0ad7164c54a553
    1e7a7f5f6ceecd0a6e04025ce22183226da982c30c9c8b3c3a7c09afe8902b2a
    1fc43c901c8fe542640ec9a4a3d4f275c67fcb167691e73aeda6f1ea43f5b413
    201481b6da196f2eeae5b0ff6e3b385dfb56cb510cf87d5bc8b7bfa143ad4a52
    2121dd295c0d300e323ac5c033d87e1147c2a488c3bbd60a52dbbe540d758245
    2183f6fae897985bbcc785a26477da1daf519ddb7ae72b5941f49fedf27e4d5b
    229d9f2c9245191018c462fcde289c3ffe52401b8ec5551ab6461f87048d166e
    23a486b2d4e6f8267d519fd9d11ec81b136528a997024c40601d196a7062359a
    25c44569fa4f3e380994c382098c4d7a5b82d6722ac4af7b2d92d556ae15ae6d
    28b2a68be64ef60b11518c9be07870343fd2788c27619a326aeafb71e979f94e
    291c5113c778322017693df2c70cc605b3948d72d328d816ff96c2220a63167f
    2a9290558302514f5bc0e45ed2d9686bc860966996be5f426d623ed09526e94d
    2c604b84e2946727650cec5a4aafd540cf49b462fbcbfb34055e10b951b8b831
    c05bafbf4cd3f648b7a0a6e671eebe2ac33ccb13df5e9e4da60ba0b00d0dc72b
    c35995b9702d847607ae74b1e212762443770c86b8cbb15d1137169ff91b0011
    c54894ac21862e10966740cf276fcb2c70608e738251046736de441b2818d209
    c6d9bbb8a1a0a125eea27fb4c25c41088da6908b846e7f0197384b3032a76250
    c717a29da8bb2b5faf40b0368750ad743bcc615decfd352e13d1ddd4cb8a5028
    c7dc1f7d82b8d560556f26d7bb1dae33159d66bd856d1e723db1d417b69d6177
    c94ee77c9c0cfa6941e264e71d3a612c1cfc5410520ad25281ddf05231c9f555
    ca0e017563729e070d7abd4ab464936f05afa662cb39934da826ddd817414c72
    ca87e4febad63d6b4cdb3c29d363fb33131f8874077cfb7980273ae4a0c2c146
    cb03c39a5caf6f6f042dbb19dd1c962ada9fe94cbb200b17590f5854576b6e6c
    cbb57ab69b523f4cd7965c0305a003282fb7a721d850c22df27cb054c4d98e7e
    cc2424c435f29161bec9bf8d72e7a6049a16248efa8c9e3920f304a6e7a03374
    cd92a6ada63ca80d0cbbee226bbfbc0409155d85feabc93b310973f9d885ac03
    ced9123fc754c861c91c22473e725850dccdee37f7f4e36ce9c31b6614c1d42e
    cf43a24b8572ba4238e1f7c033567440d2eadd0d0ec03a6b4ef4e4516db7dd73
    cf9b8ed701573503fe70b3957693a252e4905f791cc9840d999b313b3769b540
    ...

.. _DuckDuckGo: https://duckduckgo.com/

The saga continues
------------------
I don’t hold any other data I particularly care about in Docker volumes, so I
was free to play fast‘n’loose wither their contents.  Reading the documention
available `on Docker Hub`_ about the ``PGDATA`` environment variable, I hit
upon the idea of blindly mounting the anonymous Docker volumes against a
virgin Postgres container and seeing how the container responded. If one of
those volumes happened to be a Postgres data directory, then I would have a
working database.  If the volume was anything else, anything else could happen
... but as I mentioned, I was ready to lose a few Docker volumes in the name of
recovering my data\ *!*

.. _`on Docker Hub`: https://hub.docker.com/_/postgres/

I grabbed a “random” volume identifier and gave it a bash::

    $ docker run --rm -itd --mount \
        source=$VOLUME_IDENT \
        target=/var/lib/postgresql/data postgres

The above command mounts the Docker volume identified by ``$VOLUME_IDENT`` the
path specified by `target` and launches a daemonised Postgres container with
TTY for connecting to it later.

It didn’t work, when I launched the container in the foreground I could there
was a friendly message from Postgres informing me that I had attempted to
launch with a data directory from a different version of Postgres. Oops! Notice
above I only specify that Docker should launch a new container from the
``postgres`` repository, but doesn’t specify which tag (basically which
version) should be used.

Oops.

I had similarly ommitted an image tag from my Docker Compose configuration, so
I didn’t even know which version of Postgres to target. The simple solution:
target them all.

Python to the rescue
--------------------
This increasingly looked like a task that was beyond my Bash expertise, so I
set up a little Python script that was set up to take the output of ``docker
volume ls -q`` via ``xargs``, and given a volume identifier would, for each
recent Postgres version 9.4, 9.5 and 9.6,

    - mount the volume referred to by the passed identifier (see command above)
    - start a daemonised ``postgres:$VERSION`` container with the volume
      referred to by the passed identifier mounted as Postgres’ data directory
    - grab the container identifier for the above
    - wait a second
    - execute ``psql -l`` in the (hopefully) running container to (hopefully)
      show an overview of the database contents
    - if the container failed to start, the script would start it again to
      surface the error
    - stop the container (if it started successfully)

I had ~200 Docker volumes on my system, so this script would take some time to
run. I set it going and made tea.

`:tea:`

Upon my return, there were several log lines indicating the existence of
volumes that were indeed Postgres data directories of a particular version, and
did indeed contain databases named ``originalenclosure``. Things were beginning
to look pretty rosy. I re-ran the “start container” command for the first one
that came to hand and presto ... my precious data\ *!*

I took a ``pg_dump`` straight away and immediately forgot I ever used unnamed
Docker volumes for data I care about.
