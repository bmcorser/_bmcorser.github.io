JavaScript Framework Rochambeau
###############################

`:mans_shoe::jeans:`
====================
|

A new year and we've got ourselves greenfield OPA/SPA project to kick things
off. I really like the idea of writing "in-browser" applications, where
templates are rendered by the user's computer, routing/navigation is handled
client side. It's like getting a distributed computing platform for free. When
the majority of the behavioural (aka "business") logic and all of the
user-interface logic is contained in JavaScript code that is simply transferred
to user's computer and executed there, the server's responsibility likely is
diminshed to:

    a) Serving static assets (inc. JS code)
    b) Authentication
    c) Data access

We are left with less to scale on the back end and the computing cost is
somewhat offloaded onto the user :blush: This pattern also means the front end
is throughly decoupled from server side code which *should* mean less juggling
of simultaneous debugging sessions. With clearer delination of code
responsibility comes clearer behaviour and with clear behaviour comes great
optimisation.

I've never written a considerable amount of JavaScript and don't have strong
JS-specific opinions about what constitutes idiomatic code or a sane project
structure [#]_. I'm also happy to steal ideas from other developers. That means
it's framework selection time.

Let the rochambeau commence!

Criteria
--------

What even
~~~~~~~~~

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

.. class:: center

:o::runner::o:

Of course, if the framework doesn't extend to the full scope of my project, I
will need to roll my own or integrate a smaller framework to fill the gap in
the larger framework. I'd rather not do either of those things.

Only considering frameworks that are similar in scope to my own will reduce the
number of attractive offers, but it's unlikely that a single framework will
immediately emerge as the only possibility.

So once we have a set of frameworks which are "good fit", which criteria are
useful in finding out whether one framework is more or less useful than
another.

Here are some general considerations for assessing framework suitability.

Considerations
~~~~~~~~~~~~~~

  1. Batteries

     a. Is the framework "batteries-included". That is, does it make readily
        available solutions to common problems
     b. If not, does the documentation make recommendations for things I care
        about
     c. Are there *too many* things bundled

  2. Standards

     a. Does the framework make me do weird unidiomatic things
     b. Can I obviously reuse code written here outside the framework
     c. What's the source code quality like, would I be happy to debug it

  3. Docs/community

     a. Is there sufficient documentation
     b. Are the specific things I want to do documented
     c. Does it look like anyone is actually developing with the framework
     d. When was the last commit
     e. Is there an active bugtracker
     f. Is anyone at home in the IRC channel

  4. Toolchain

     a. Are there the integrations for my developement environment
     b. What's the debugging provision like

  5. Composability

     a. How much framework-specific boilerplate to I need to write
     b. Is a highly opinionated structure enforced
     c. How readily can I reuse code *inside* the framework

Cognitive bias
~~~~~~~~~~~~~~
I have a preference for frameworks that are maintained by a small team (or
even a solo developer),


Method
------
To try and answer the above questions, the best method I could come up with was


A challenger appears
--------------------


.. [#] That is to say, I only care about the *general* principles of
       readability, modularity and single-responsibility.
.. [#] It's a *chaining-style browser polyfill library*, surely.
.. [#] It's solved anyway http://stackoverflow.com/a/7062795/3075972
