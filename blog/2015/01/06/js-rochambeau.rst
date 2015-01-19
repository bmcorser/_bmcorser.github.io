JavaScript Framework Rochambeau
###############################

`:mans_shoe::jeans:`
====================
|

A new year and we’ve got ourselves a greenfield OPA/SPA project. I really like
the idea of writing “in-browser” applications, where templates are rendered by
the user’s computer, routing/navigation is handled client side. It’s like
getting a distributed computing platform for free. When the majority of the
behavioural (aka “business”) logic and all of the UI logic is contained in
JavaScript code that is simply transferred to user’s computer and executed
there, the server’s responsibility is likely diminshed to:

    a) Serving static assets (inc. JS code)
    b) Auth‘n’perms
    c) Data access

We are left with less to scale on the back end and the computing cost is
somewhat offloaded onto the user :blush: This pattern also means the front end
is throughly decoupled from server side code which *should* mean less juggling
of simultaneous debugging sessions. With clearer delination of code
responsibility comes clearer behaviour and with clear behaviour comes great
optimisation.

I’ve never written a considerable amount of JavaScript and don’t have strong
JS-specific opinions about what constitutes idiomatic code or a sane project
structure [#]_. I’m also happy to steal ideas from other developers. That means
it’s framework selection time.

Let the rochambeau commence!

Criteria
--------

What even
~~~~~~~~~

Before asking what makes a framework good, let’s ask: what even *is* a
framework? I once spent an hour convincing a colleague that jQuery is not a
framework [#]_ then wondenered why on earth I bothered. Is the distinction even
important? The jQuery argument, not so much [#]_, but considering how well the
*scope* of a framework and its documentation match up to the scope of your own
project is a first step in assessing whether it will be helpful.

This principle applies in both directions.

If a framework expresses opinions that are outside the scope of my own
intentions, then it’s probably not a good choice – as much as I love jumping
through hoops – there’s going to be a lot of overhead.

.. class:: center

:o::runner::o:

Of course, if the framework doesn’t extend to the full scope of my project, I
will need to roll my own or integrate a smaller framework to fill the gap in
the larger framework. I’d rather not do either of those things.


Considerations
~~~~~~~~~~~~~~
Only looking at frameworks that are similar in scope to my own will reduce the
number of attractive offers, but it’s unlikely that a single framework will
immediately emerge as the only possibility.

Once we have a set of frameworks which are “good fit”, what things might be
useful in finding out whether one framework is more or less useful than
another?

Here are some general considerations for assessing framework suitability:

  1. Batteries

     a. Is the framework “batteries-included”. That is, does it make readily
        available solutions to common problems
     b. If not, does the documentation make recommendations for things I care
        about
     c. Are there *too many* things bundled

  2. Standardness

     a. Does the framework make me do weird unidiomatic things
     b. Can I obviously reuse code written here outside the framework
     c. What’s the source code quality like, would I be happy to debug it

  3. Surroundings

     a. Is there sufficient documentation
     b. Are the specific things I want to do documented
     c. Does it look like anyone is actually developing with the framework
     d. When was the last commit
     e. Is there an active bugtracker
     f. Is anyone at home in the IRC channel

  4. Toolchain

     a. Are there the integrations for my developement environment
     b. What’s the debugging provision like

  5. Composability

     a. How much framework-specific boilerplate to I need to write
     b. Is a highly opinionated structure enforced
     c. How readily can I reuse code *inside* the framework

Cognitive bias
~~~~~~~~~~~~~~
That’s a lot of barf to get through, so a preference or two might not go amiss.
I like OSS best when it represents a single person or a very small group.

Think pandas_, celery_, lodash_.

All the above have a real, alive, committed [#]_ and invested individual(s)
maintaining the codebase *right now*. At the time of writing, none of the above
had been dormant for longer than 48 hours [#]_. That’s amazing.

When a piece of software represents someone’s idea, rather than being the
accumulation of occasional bursts of interest from developers “just passing
through” it will always be better software. Bram Moolenaar has personally
reviewed every patch for Vim. OSS shouldn’t necessarily be egalitarian
about what it’s for and how it works, it should express an *opinion*. It should
do what the author wants it to do, not aspire to be all things to all users.

.. _pandas: https://github.com/pydata/pandas/graphs/contributors
.. _celery: https://github.com/celery/celery/graphs/contributors
.. _lodash: https://github.com/lodash/lodash/graphs/contributors


Method
------
When trying to choose the best option without getting too managerial, I figured
the best approach would be to just dive right in. In that spirit I resolved to
implement a toy app in each of the JS frameworks [#]_ that (after perusing
available documentation) appeared to be a good fit for the project, which were:

 - Ember
 - Angular
 - Durandal

My toy app would be contrived to force me to form an opinion on what it is like
to develop with a given framework whilst bearing in mind the considerations_
listed above. The apps will be able to to the following things:

 - Fetch a collection of objects from the backend
 - Cache the data
 - Display a summary of the collection to the user
 - Display detail about a single object
 - Perform some computation on the object before display

Implementing this small set of behaviours should give me a good idea of what
it’s like to write code with each framework, ie. how quickly I can get the
behaviour I want, are there batteries like that included, do I end up with code
I could reuse. Let’s get to it!

.. class:: center

:fire::triangular_ruler::knife: 

Ember_
------
I had the impression that Ember was the most venerable of the frameworks I will
be looking at, but glancing at the contributors graph on GitHub (if that’s a
valid metric) reveals it is a year younger than Angular.

Source for my toy app in Ember is here_.

.. _Ember: https://github.com/emberjs/ember.js/graphs/contributors
.. _here: https://github.com/bmcorser/7wonders/tree/master/hamster


It’s groovy
~~~~~~~~~~~
Ember uses what is called “convention over configuration”, which means the
framework will make (what are hopefully) documented assumptions about how your
project code is structured.

The “convention over configuration” idea is a good one, designed to promote
testability and separation of concerns. It should lead to a well structured
project with modular, well-tested code.

Ember has an accompanying CLI ember-cli_ which provides a comprehensive
toolchain for building projects. It comes bundled with a testrunner,
development server and some tooling around mocking. It takes the conventions of
the framework further by enforcing the location of files and writes boilerplate
code for you.

There are versions of “Ember Inspector” for Chrome_ and Firefox_ (but no
:heart: for IE?). Debugging JS in the browser is always painful so these tools
are essential, especially if you’re working on someone else’s sucky code.

.. _ember-cli: https://github.com/ember-cli/ember-cli
.. _Chrome: https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en
.. _Firefox: https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/

Not so groovy
~~~~~~~~~~~~~
Ember is a great project, but some of the calling syntax is pretty
wacky. A typical controller might look something like this:

.. code-block:: js

    Ember.ObjectController.extend({
      sum: function () {
        return this.get('a') + this.get('b');
      }.property('a', 'b')
    });

It just feels uncomfortable calling a method on a function definition, and it
looks damn funky. In the above example, the ``property`` call is declaring the
dependencies of the function it is being called on, which lets Ember know what
things it might need to update if they’re changed in function body. It gets
even more funky when you’re writing controller code for an array, see
here__.

.. __: http://emberjs.com/guides/object-model/computed-properties-and-aggregate-data/

On the subject of readability, I found Handlebars syntax unweildy. I certainly
didn’t enjoy typing ``{{/link-to}}`` more than one time.

There is a tonne of official documentation on Ember, which is indicative of the
size of the framework. Ember’s Ruby roots show through in the writing sometimes
– there’s no “hash” type in JavaScript!

I found it necessary to go through a good chunk of documentation before I could
start playing around in Ember. There are a lot of conventions to learn before
you can start *not* writing configuration code.

Ember is very opinionated. It even wants to tell me how to design my web API,
which is a bit rich coming from a JavaScript framework. From what I could make
out, Ember is `basically expecting`_ `“JSON API”`_ on the back end. If I wanted
to use a more RPC-like interface (which I do), then I would have to work
against the framework to make that happen. So for Ember, “convention over
configuration” actually extends well outside the scope of the framework. Not
cool, guys. Especially since Ember Data is still described_ as being in beta.

.. _`basically expecting`: http://emberjs.com/guides/models/the-rest-adapter/
.. _`“JSON API”`: http://jsonapi.org/format/
.. _described: https://github.com/emberjs/data#api-stability


Without descending into pure facetiousness, Ember just seems caremad about some
things; all this ``extend`` everywhere, designing my API for me, it feels like
a worried mum. `So unfair!`_.

.. _`So unfair!`: http://youtu.be/dLuEY6jN6gY


Angular_
--------
.. _Angular: https://github.com/angular/angular.js/graphs/contributors

Things I didn’t like
~~~~~~~~~~~~~~~~~~~~

    - Module definition is not really there; relies on ``(function(){})();``
      closures; we'll still need to use RequireJS/Browserify/CommonJS
    - Damn this is ugly
    - So many wheels reinvented; Google NIH syndrome?
    - Terminology is confusing because it is *confused* (ex. "services",
      ``.when``)
    - Feels like it's designed to build one type of app (maybe that's the
      "Angular Way")

Things I kind of liked
~~~~~~~~~~~~~~~~~~~~~~

    - Promotion of HTML to programming language, with ``<div>`` as a primitive
    - With debug dist, tracebacks are not unreasonable
    - Built in fun, like ``$cacheFactory``

Durandal_
---------
.. _Durandal: https://github.com/BlueSpire/Durandal/graphs/contributors

Rusty
~~~~~

    - Docs are thin on the ground
    - Knockout is verbose
    - Knockout ``thing().stuff.cake().bread`` is confusing

Shiny
~~~~~

    - Focus is on binding scope
    - Idiomatic, rjs
    - Not clever
    - Fine grain control over application of bindings (performance)
    - Knockout bindings are quite debuggable


.. [#] That is to say, I only care about the *general* principles of
       readability, modularity and single-responsibility.
.. [#] It’s a *chaining-style browser polyfill library*, surely.
.. [#] It’s solved anyway http://stackoverflow.com/a/7062795/3075972
.. [#] ``#sorrynotsorry``
.. [#] At the time of writing, the Postgres repo where the last commit was a
       quarter of an hour ago ... ’nuff said.
.. [#] I realise there are notable exceptions such as ReactJS, Polymer and
       probably a tonne more, but there are only so many hours in the day.
