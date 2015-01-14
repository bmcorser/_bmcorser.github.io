JavaScript Framework Rochambeau
###############################

`:mans_shoe::jeans:`
====================
|

A new year and we've got ourselves greenfield OPA/SPA project to kick things
off. I really like the idea of writing "in-browser" applications, where
templates are rendered by the user's computer, routing/navigation is handled
client side, and the server stays lean and clean. When the majority of the
behavioural (aka "business") logic and all of the user-interface logic is
contained in JavaScript code that is simply transferred to user's computer and
executed there, the server's responsibility is diminshed – probably to just:

    a) Serving static assets
    b) Authentication
    c) Data access

We are left with less to scale on the back end, that cost is somewhat offloaded
onto the user. This pattern also means the front end is throughly decoupled
from server side code – which *should* mean less juggling of simultaneous
debugging sessions. With clearer delination of code responsibility comes
clearer behaviour and with clear behaviour comes great optimisation.

I've never written a considerable amount of JavaScript and don't have strong
JS-specific opinions about what constitutes idiomatic code or a sane project
structure [#]_. I'm also happy to steal ideas from other developers. That means
it's framework selection time. Let the rochambeau commence!

Criteria
--------

What even is
~~~~~~~~~~~~

What even makes a framework good? But before we get to that, we will try to
answer another question: what even *is* a framework? I find myself convincing
colleagues that jQuery is not a framework [#]_ then wondering why I bothered.
Is the distinction even important? The jQuery argument, not so much [#]_, but
considering how well the *scope* of a framework and its documentation match up
to the scope of your own project is a first step in assessing whether a certain
framework will be helpful.

This principle applies in both directions.

If a framework expresses opinions that are outside the scope of my own
intentions, then it's probably not a good choice – as much as I love jumping
through hoops

:o::runner::o:

Of course, if the framework doesn't extend to the full scope of my project, I
will need to roll my own or integrate a smaller framework to fill the gap in
the larger framework. I'd rather not do either of those things.

Only considering frameworks that are similar in scope to my own will reduce the
number of attractive offers, but it's unlikely that a single framework will
immediately emerge as the only possibility.

So once we have a set of frameworks which are "good fit", which criteria are
useful in finding out whether one framework is more or less useful than
another. Here are some general considerations for assessing framework
suitability:

Batteries
~~~~~~~~~

    - Is the framework "batteries-included"? That is, does it make readily
      available solutions to common problems?
    - If not, does the documentation make recommendations for things I care
      about?
    - Are there too many things bundled?

Standards
~~~~~~~~~

    - Does the framework make me do weird unidiomatic things?
    - Can I obviously reuse code written here outside the framework?
    - What's the source code quality like? Would I be happy to debug it?

Docs/community
~~~~~~~~~~~~~~

    - Is there sufficient documentation?
    - Are the specific things I want to do documented?
    - Does it look like anyone is acutally developing with the framework?
    - When was the last commit?
    - Is there an active bugtracker?
    - Is anyone at home in the IRC channel?

Toolchain
~~~~~~~~~

    - Are there the integrations for my developement environment?
    - What's the debugging provision like?

Composability
~~~~~~~~~~~~~

    - How readily can I reuse code *inside* the framework?


Method
------
To try and answer the above questions


A challenger appears
--------------------


.. [#] That is to say, I only care about the general principles of readability,
   modularity and single-responsibility.
.. [#] It's a *chaining-style browser polyfill library*, surely.
.. [#] It's solved anyway http://stackoverflow.com/a/7062795/3075972
