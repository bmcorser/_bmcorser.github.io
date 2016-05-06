Hack the world!
###############

`:cool::free:`
==============
|

Alternative title: The slight abuse of free CI services for compiling Rust
programs on popular architectures.

I started writing a blog post about writing Rust extensions for Python packages
destined for distribution on PyPi, but quickly realised it would be `a pain`_
to compile shared libraries to let the extension run on machines with different
CPU architectures.

.. _`a pain`: https://github.com/japaric/rust-cross

So, I thought, why not use Travis CI’s VMs to compile for Linux and OSX for me?

Hencewith, |travis_compile|_ was born.

.. |travis_compile| replace:: ``travis-compile``
.. _`travis_compile`: https://github.com/bmcorser/travis-compile

What is it?
-----------
A repository containing a Python script that will compile Rust packages against
Linux and OSX on Travis CI and send the compiled libs‘n’bins back to you.

Why is it useful?
-----------------
It saves the effort of compiling on multiple machines or maintaining the
appropriate libraries for compiling against different architectures on the same
machine. It means you don’t need to make “fat” binaries if you don’t want to.

The idea is to give Python/Rust developers the tools to make their
Rust-extended Python packages distributable across multiple platforms with less
maintenance cost.

How does it work?
-----------------
*A secret blend of 11 ngrok instances and Flask apps.* Not really. Well, sort
of. If you haven’t seen ngrok before, `check it out`_, it’s a handy thing to
have in the toolbox.

But, back to the matter at hand. The main script ``travis-compile.py`` takes
the following inputs:

 - The path to a Cargo project
 - A GitHub user and their personal access token

It then runs as follows:

 #. Create a temporary branch in the |travis_compile|_ repo
 #. Grab the Rust source code from the passed directory
 #. Start an ngrok server, get its URL
 #. Write out ``.travis.yml`` with ngrok URL and Cargo metadata
 #. Commit everything, open a PR on GitHub
 #. Start the ``receiver.py`` Flask app at the port ngrok is pointing to

Travis CI will then pick up the PR and spring into action, kicking off builds
for 32/64-bit Linux/OSX which:

 #. Compile the Cargo project
 #. Run the ``sender.py`` script to upload compilation results to the ngrok
    URL, where ``receiver.py`` is waiting

When the ``receiver.py`` server has received the results for all four builds,
it will shut itself down, clean up temporary branch and close the PR, leaving
Gzipped files labelled by OS and architecture.

Presto *!*

.. _`check it out`: https://ngrok.com/product

How can I use it?
-----------------
All you need to do is a fork of `the repo`_ and a GitHub `personal access
token`_. You can dump the token into the ``TOKEN`` file for ease of use and it
will not be committed. Then it’s just a question of invoking the script,
passing the path to your Rust project and your GitHub credentials, e.g.

.. code-block:: bash

    python travis-compile.py ~/src/rand bmcorser $(cat TOKEN)

Then sit back as Travis CI does all the running around for you.

.. _`the repo`: https://github.com/bmcorser/travis-compile
.. _`personal access token`: https://help.github.com/articles/creating-an-access-token-for-command-line-use/

TODO
----

.. |appveyor_template| replace:: ``appveyor.yml.template``

There are a few things I’d still like to do, but I ran out of energy for 

 - Make it more secure. In its current form, a URL which refers to your local
   machine is published in the PR that is created. There is a also a Flask app
   waiting to accept file uploads. This would allow an attacker to upload
   arbitrary files to your computer. This isn’t great. I have come up with a
   reasonable way to get around this, but it will require another post.
 - Add support for Windows by using Appveyor. The beginning of support is there
   (look at |appveyor_template|_) If anyone out there who has some Windows
   experience (I have none!) is interested.

.. _appveyor_template: https://github.com/bmcorser/travis-compile/blob/5e957effd1fcd00c06dbe07ee4dc20e422a11632/appveyor.yml.template
