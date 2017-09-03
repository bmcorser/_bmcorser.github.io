From the ground up
##################

🌋
=
|

.. warning:: This web page contains 200 megabytes of animated gifs. If that’s
    not your thing, please leave immediately.

Developers often talk about building games from the ground up. This turn of
phrase doesn’t usually imply the involvement of any actual ground. Not so here!
With this project, the first step of configuring the build environment was
to fabricate a physical shed. This involved lots of IRL fun including putting
together a roof and then clambering over this roof to affix sheets of
`bituminous waterproofing`_, levelling concrete slabs and plenty of slotting
together of pre-cut timber.

.. _`bituminous waterproofing`: https://en.wikipedia.org/wiki/Bituminous_waterproofing#Roofing_felt

**21st of June**

Levelling using a long piece of 2be4 and a short spirit level (no fancy laser
levels on this site).

.. raw:: html

    <a href="https://youtu.be/8-aBIdLRiEM"><img alt="Spirit level" class="full" src="/assets/images/gifs/20170621110412.gif" width="480" height="270" /></a>

**24th of June**

A few days later, the wood arrived (it was `this kit`_, in case anyone is
interested) the foundation was walkable, as demonstrated below, and we were
ready to get our Lego Technic hats on to put the thing together.

.. _`this kit`: https://billyoh.com/logcabins/garden-log-cabins


.. raw:: html

    <a href="https://youtu.be/rxam_YF5ud0"><img alt="Walking on level ground" class="full" src="/assets/images/gifs/20170624130826.gif" width="480" height="270" /></a>

**Framework considerations**

After considering Godot_ as potential engine because GDScript looked similar to
Python, I opted to use a C++ as the language for the project -- the library
ecosystem is enormous. Unfortunately, I didn’t feel Rust’s ecosystem was mature
enough to support game development by the novice.

The framework I finally settled on to offer education on standards and
conventions in game program design was Urho3D. I wanted to steer well clear of
monsters like Unity and Unreal 4\ [#]_ with their “user-friendliness”,
corporate backing, fee structures and abhorrent *popularity*. I needed
something open-source, reasonably mature, not too enormous and accompanied by
some degree of documentation. Urho3D_ fits the bill for all these.

It’s a framework put together by a crazy Russian dude, `@cadaver`_\ [#]_, latterly
joined by a crazy Chinese dude, `@weitjong`_. The codebase has the benefit of
`6 years`_ of fairly constant development.  There’s an ample amount of
`narrative documentation`_ along with just-about-passable generated
documentation.

The framework ties together a good bunch of features:

    - Build toolchain supporting compilation for Windows, Linux, macOS, iOS,
      tvOSnew, Android, Raspberry Pi and even Web targets
    - Physics simulation
    - DirectX and OpenGL pipeline
    - Networking

Also, it has full Unicode support 🐕

.. _Godot: https://godotengine.org/
.. _Urho3D: https://urho3d.github.io/
.. _`@cadaver`: https://github.com/cadaver
.. _`@weitjong`: https://github.com/weitjong
.. _`6 years`: https://github.com/urho3d/Urho3D/graphs/contributors
.. _`narrative documentation`: https://urho3d.github.io/documentation/HEAD/index.html


.. [#] Although Aaron McLeran’s talk “The Future of Audio in Unreal Engine”
    (https://www.youtube.com/watch?v=ErejaBCicds) did pique my interest.
.. [#] 👋🏿

**24th of June**

Ziggy came to check what we were up to. He seemed happy with progress.

.. raw:: html

    <a href="https://youtu.be/PdS1PRah3qo"><img alt="Approaching a small dog" class="full" data-src="/assets/images/gifs/20170624130840.gif" width="480" height="270" /></a>

It’s good to have friends, Urho3D has a project scaffolding system that makes
it reasonable to set up new projects without getting bogged down in framework
specifics.

In another thread, the log cabin had developed walls and a roof and doors and
windows which was pretty exciting.

**29th of June**

A wild shed appears\ *!* You choose to step inside.

.. raw:: html

    <a href=""><img alt="A wild shed appears" class="full" data-src="/assets/images/gifs/20170629193548.gif" width="480" height="270" /></a>

**Urho3D**

We set computers and desks and whiteboards up and I got a minimal Urho3D
project up and running, figuring out enough about universe-C++ to start vaguely
structuring the project wasn’t a lot of fun ... but I did it nonetheless. The
standard of documentation I would expect as a bare minimum for a Python project
is rare for an open source C++ project, which makes even learning the language
a “fun” challenge.

The motivation of being able to write game programs was enough for me to make
an effort to read through the documentation (Urho3D is `decent`_) like a
grownup before starting typing. I find it hard not to immediately start
implementing every new idea that is introduced, as it is introduced.

.. _`decent`: https://urho3d.github.io/documentation/1.7/index.html

I spent some time studying the Urho3D source code, and saw for the first time
what a heavily class-based system looks like. I am not particularly interested
in classes, the idea always seemed overly formal and I didn’t understand how
such a structure would give rise to a fast program. C++ is very fast, but the
“user experience” of the language is not a pleasent one. 👺

Overall I quite enjoyed the architecture of Urho3D; on top of the classy
base-structure, there is event layer which is an oddly familiar thing to see in
C++. Generally I like event-based systems, but again, have never really
considered them to be particularly fast (Celery was sloww, I ended up using
huey!). However, event subscription and the emission of events seems too
liberal -- especially since program speed is the primary consideration -- and
it was difficult (from a Python developer’s perspective) to see how this code
could be fast.

Urho3D offers other interfaces beyond the two mentioned above;\ [#]_ the result
is that a programmer may write using whichever application paradigm\ [#]_ suits
them. This needn’t produce programs that become difficult to reason about, in
other words, programs that are complex. On the contrary, discrete paradigms
could be used to denote responsibility and aid separation of concerns.

.. [#] An entity or component system, DOM-style access to the scene graph, a
    decent command line interface, etc.
.. [#] I recognise the sentimentality here, but architecture could never just
    be a property of a computer program 🏛


I started to formulate how the project should structured and thought about what
might be achievable in the following months. My first idea on how get
development underway was to use Urho’s entity system to build a demoscene
loader, allowing many small experiments initially and envisioning its later
use as a test harness to allow particular pieces of functionality to be tested
in isolation. My thought was also that whatever was produced could be
demonstrated easily; users don’t often know how to check out a different commit
and recompile. 😌

**6th of July**

.. raw:: html

    <a href=""><img alt="Blinds" class="full" data-src="/assets/images/gifs/20170706194138.gif" width="480" height="270" /></a>

The shed acquired a nice set of blinds, a couple of components have started to pop up.


.. raw:: html

    <a href=""><img alt="Dancing teapot" class="full" data-src="/assets/images/gifs/20170708102530.gif" width="480" height="270" /></a>

The teapots start dancing.

.. raw:: html

    <a href=""><img alt="Deformable grid" class="full" data-src="/assets/images/gifs/20170725170310.gif" width="480" height="270" /></a>

Following on from earlier work, the first feature I was interested in
investigating was mesh generation.

.. raw:: html

    <a href=""><img alt="Tremors" class="full" data-src="/assets/images/gifs/20170726142418.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Gigeresque" class="full" data-src="/assets/images/gifs/20170726144124.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Hexagon generation" class="full" data-src="/assets/images/gifs/20170729094124.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Hexagon deformation" class="full" data-src="/assets/images/gifs/20170803222420.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Hexagon deformation close up" class="full" data-src="/assets/images/gifs/20170803234844.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Vertex colouring" class="full" data-src="/assets/images/gifs/20170804000134.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Softer vertex colouring" class="full" data-src="/assets/images/gifs/20170804055156.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Vertex shader" class="full" data-src="/assets/images/gifs/20170805163210.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Drove round a corner" class="full" data-src="/assets/images/gifs/20170805190708.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="BBQ" class="full" data-src="/assets/images/gifs/20170810193126.gif" width="480" height="270" /></a>

