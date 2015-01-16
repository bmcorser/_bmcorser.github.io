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
    b) Auth'n'perms
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
through hoops.

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
That's a lot of barf to get through, so a preference or two might not go amiss.
I like OSS best when it represents a single person or a very small group.

Think pandas_, celery_, lodash_.

All the above have a real, alive, committed [#]_ and invested individual(s)
maintaining the codebase *right now*. It also makes me happy to see recent
commits. At the time of writing, none of the above had been dormant for longer
than 48 hours [#]_. That's amazing.

When a piece of software represents someone's idea, rather than being the
accumulation of occasional bursts of interest from developers "just passing
through" it will always be better software. I cite Bram Moolenaar reviewing all
patches for Vim.  Software shouldn't necessarily be egalitarian about what it's
for, it should express an *opinion*. It should do what the author wants it to
do, not aspire to be all things to all users.

.. _pandas: https://github.com/pydata/pandas/graphs/contributors
.. _celery: https://github.com/celery/celery/graphs/contributors
.. _lodash: https://github.com/lodash/lodash/graphs/contributors


Method
------
When trying to choose the best option without getting too managerial, I figured
the best approach would be to just dive right in. In that spirit I resolved to
implement a toy app in each of the JS frameworks [#]_ that (after perusing available
documentation) appeared to be a good fit for the project, which were:

 - Ember.js
 - Angular.js
 - Durandal

My toy app would be contrived to force me to form an opinion on what it is like
to develop with a given framework whilst bearing in mind the considerations_
listed above. The apps will be able to to the following things:

 - Fetch a collection of objects from the backend
 - Cache the data
 - Display a summary of the collection to the user
 - Display detail about a single object
 - Perform some computation on the object before display

Implementing these behaviours should give me a good idea of what it's like to
write code with each framework, ie. how quickly I can get the behaviour I want,
are there batteries like that included, do I end up with code I could reuse.
Let's get to it!

.. class:: center

:fire::triangular_ruler::knife: 


.. [#] That is to say, I only care about the *general* principles of
       readability, modularity and single-responsibility.
.. [#] It's a *chaining-style browser polyfill library*, surely.
.. [#] It's solved anyway http://stackoverflow.com/a/7062795/3075972
.. [#] ``#sorrynotsorry``
.. [#] I also checked the Postgres repo where the last commit was a quarter of
       an hour ago ... 'nuff said.
.. [#] I realise there are notable exceptions such as ReactJS, Polymer and
       probably a tonne more, but there are only so many hours in the day.
