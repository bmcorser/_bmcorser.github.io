From the ground up
##################

🌋
=
|

.. warning:: This web page contains 200 megabytes of animated gifs. If that’s
    not your thing, please leave immediately.

Developers often talk about building games from the ground up. This turn of
phrase doesn’t usually imply the involvement of any actual ground. *Not so*
with this project, the first step of configuring the build environment was
laying and levelling slabs for Paul’s shed that would serve as the place of
work.

**21st of June**

.. raw:: html

    <a href="https://youtu.be/8-aBIdLRiEM"><img alt="Spirit level" class="full" src="/assets/images/gifs/20170621110412.gif" width="480" height="270" /></a>

By the time the wood arrived (it was `this kit`_, in case anyone is interested)
the foundation was walkable, as demonstrated below.

.. _`this kit`: https://billyoh.com/logcabins/garden-log-cabins

**24th of June**

.. raw:: html

    <a href="https://youtu.be/rxam_YF5ud0"><img alt="Walking on level ground" class="full" src="/assets/images/gifs/20170624130826.gif" width="480" height="270" /></a>


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

It’s a framework put together by a crazy Russian dude, `@cadaver`_, latterly
joined by a crazy Chinese dude, `@weitjong`_. The codebase has the benefit of
`6 years`_ of fairly constant development.  There’s an ample amount of
`narrative documentation`_ along with just-about-passable automatic
documentation.

Urho3D also runs an event loop at its core, which appealed to my experience
with Celery and Salt\ [#]_. The framework ties together a good bunch of
features:

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
.. [#] My pun is intended in the worst way.

**24th of June**

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

We set computers and desks and whiteboards up

Minimal Urho3D project up and running, figuring out how to arrange C++ project
files to avoid insanity, introduction to Urho3D components

Explain entrypoint and aspects idea

Explain colour cycle idea, hook up to shader parameter, control with gamepad

**6th of July**

.. raw:: html

    <a href=""><img alt="Blinds" class="full" data-src="/assets/images/gifs/20170706194138.gif" width="480" height="270" /></a>

Common aspect

.. raw:: html

    <a href=""><img alt="Dancing teapot" class="full" data-src="/assets/images/gifs/20170708102530.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="A package from overseas" class="full" data-src="/assets/images/gifs/20170705164350.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Fuel" class="full" data-src="/assets/images/gifs/20170708173226.gif" width="480" height="270" /></a>


.. raw:: html

    <a href=""><img alt="Treemaker" class="full" data-src="/assets/images/gifs/20170718184958.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Deformable grid" class="full" data-src="/assets/images/gifs/20170725170310.gif" width="480" height="270" /></a>

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

.. raw:: html

    <a href=""><img alt="Standing stone" class="full" data-src="/assets/images/gifs/20170812113836.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Iridescence" class="full" data-src="/assets/images/gifs/20170813181054.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Robin" class="full" data-src="/assets/images/gifs/20170814103648.gif" width="480" height="270" /></a>

.. raw:: html

    <a href=""><img alt="Sky" class="full" data-src="/assets/images/gifs/20170814193142.gif" width="480" height="270" /></a>
