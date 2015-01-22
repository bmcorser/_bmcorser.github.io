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
*scope* of a framework matches up to the scope of your own project is a first
step in assessing whether it will be helpful.

This principle applies in both directions.

If a framework expresses opinions that are outside the scope of my own
intentions, then it’s probably not a good choice – as much as I love jumping
through hoops – there’s going to be a lot of overhead.

.. class:: center

:o::runner::o:

Of course, if the framework doesn’t extend to the full scope of my project, I
will need to roll my own or integrate a smaller framework to fill the gap in
the larger framework.

I’d rather not do either of those things.


Considerations
~~~~~~~~~~~~~~
Only looking at frameworks that have the “right” scope will reduce the number
of attractive offers, but it’s unlikely that a single framework will
immediately emerge as the only possibility.

Once we have a set of frameworks which are a good fit, what things might be
useful in finding out whether one framework is more or less useful than
another?

  1. Batteries

     a. Is the framework “batteries-included”. That is, does it make readily
        available solutions to common problems
     b. If not, does the documentation make recommendations for things I care
        about
     c. Are there *too many* things bundled

  2. Standardness

     a. Does the framework make me do weird things which I see as being
        unidiomatic
     b. Can I obviously reuse code written here *outside* the framework
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

     a. How much framework-specific boilerplate do I need to write
     b. Is a highly opinionated structure enforced
     c. How readily can I reuse code *inside* the framework

Cognitive bias
~~~~~~~~~~~~~~
That’s a lot of barf to get through, so a preference or two might not go amiss.
All my favourite open source projects *kind of* represent a single person.

Think pandas_, celery_, lodash_.

All the above have a real, alive, committed [#]_ and invested individual(s)
maintaining the codebase *right now*. At the time of writing, none of the above
had been dormant for longer than 48 hours [#]_. That’s amazing.

When a piece of software represents someone’s idea, rather than being the
accumulation of occasional bursts of interest from developers “just passing
through” it will always be better software. Since 1991 Bram Moolenaar has
personally reviewed every patch for Vim.  OSS shouldn’t necessarily be
egalitarian about what it’s for and how it works, it should express an
*opinion*. It should do what the author wants it to do, not aspire to be all
things to all users.

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

.. _Ember: https://github.com/emberjs/ember.js/graphs/contributors

Source for my toy app in Ember is here__.

.. __: https://github.com/bmcorser/7wonders/tree/master/hamster


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

Another thing I liked about Ember was the explicit support of Promises, which –
in case you missed it – are totally *the* way to write asynchronous code. Ember
Data mentions_ they comply with Promises/A+ spec, which is good to read (after
the jQuery debarcle_). It’s unclear_ whether the main Ember codebase is using
Promises/A+ of the bastard incarnation.

.. _ember-cli: https://github.com/ember-cli/ember-cli
.. _Chrome: https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en
.. _Firefox: https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/
.. _mentions: https://github.com/emberjs/data#ember-data-
.. _debarcle: https://blog.domenic.me/youre-missing-the-point-of-promises/
.. _unclear: http://emberjs.com/guides/routing/asynchronous-routing/

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
I could being to *not* write any configuration code.

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
things; all this ``extend`` everywhere, making API design decisions for me, it
feels like a worried parent looking over my shoulder. `So unfair!`_

.. _`So unfair!`: http://youtu.be/dLuEY6jN6gY


Angular_
--------
As a project sponsored, promoted and managed by the Chocolate Factory
workers, one could argue it has a dubious claim over being “free and open
source”. However, Angular *is* hugely popular [#]_ and does have a very large,
active community.

Its popularity is good for new developers. Stack Overflow is going to be packed
with newbie questions and answers that will make a great resource for
interested parties.

Source for my toy app in Angular is here__.

.. __: https://github.com/bmcorser/7wonders/tree/master/triforce

Things I kind of liked
~~~~~~~~~~~~~~~~~~~~~~

I was initially put off by the crazy HTML elements and attribute names flying
around in Angular’s templating system, but its concision can’t be matched by
Handlebars or Knockout (the other two templating languages I looked at). If you
can stomach non-standard HTML elements, then directives become a way of
promoting markup to a kind of programming language. Check it.

.. code-block:: html

    <my-funky-thing funk-level="strong" />

The code above is like calling the function ``my-funky-thing`` with the
element as the first argument and that element’s attributes as keyword
arguments. There are convenience methods for getting a grip on binding scope
too (which is important). Check out `the docs`_ for the lowdown.

Angular’s official docs are good too, especially if you are learning and not
just using them for reference. Everything has a noob–friendly example, with a
link to try out the example code in one of those cool dude in–browser IDEs.

There are also `a bunch`_ of useful built in “services” (utility libraries)
which could hurry development along. Everyone loves some nicely hurried
development. Angular gets extra points for having the ``$cacheFactory``,
which was exactly what I was looking for (see Method_).


.. _`the docs`: https://docs.angularjs.org/guide/directive
.. _Angular: https://github.com/angular/angular.js/graphs/contributors
.. _`a bunch`: https://docs.angularjs.org/api/ng/service

Things I didn’t like
~~~~~~~~~~~~~~~~~~~~

Module definition in Angular is batshit insane. *Insane.* They are still pretty
much relying on the ol’ ``(function(){})();`` hack to maintain isolation. As a
Python developer, I completely fell in love with RequireJS from the moment I
``define``\’d my first module. I basically got my trusty ``import`` statement
made available in JavaScript land.  It is possible_ to integrate RequireJS with
Angular, but you still have to write the Angular “module” bumpf to wire things
up for the framework. Yes, Angular probably has a super–cool, super–futuristic
DI system, but it just feels like Google NIH syndrome. RequireJS has been
around longer than Angular.  Why didn’t they take advantage of that? The upshot
is that we’re stuck with crazy syntax like this:

.. code-block:: js

    obj.fn('name', ['a', 'b', function (a, b) { }]);

Seriously, *wtf* u guize. Who said “how about a function that takes a name as
the first argument and an array where the last item is a function with the same
number of elements as the number of elements in the array that it is in minus
one because it is in that array as its second argument” and people were like
“great, sounds great”.

And remember you can’t load CommonJS or AMD modules using Angular’s DI, which
leads to crazy projects like this__ (bigup Jon Man) just to get scoped access
to Lodash. Quel ennui …

.. __: https://github.com/rockabox/ng-lodash
.. _possible: http://developer.telerik.com/featured/requiring-vs-browerifying-angular/

A complaint I saw levelled against Angular a few times is that it uses
needlessly confusing terminology. There were some pretty empassioned arguments
on the subject. After all the tears that have been shed, I don’t have any
sympathy for the confused.  After a few hours with the documentation and
codebase however, the conclusion I have come to is that the terminology is
confusing because it is *confused*. The Angular team seem to have appropriated
terms that already have a set (and useful) meaning. It’s like slang, which is
weird to see in a *computer code framework*.

I’m sorry, Angular, “services” are `already a thing`__.

I’m afraid ``when`` is also kinda `already a thing`__ [#]_.

Since we’re talking about things that are already things, yes, *“modules”* are
already a thing__ too__!

.. __: http://martinfowler.com/articles/microservices.html
.. __: http://api.jquery.com/jquery.when/
.. __: http://requirejs.org/docs/whyamd.html
.. __: http://wiki.commonjs.org/wiki/CommonJS

Durandal_
---------
.. _Durandal: https://github.com/BlueSpire/Durandal/graphs/contributors

*Over the horizon, a challenger appears. The mighty sword of the ancients
(well, Rob Eisenberg) is held aloft. Sunlight glints off its keen blade. The
trumpets sound, calling the righteous to battle.*

.. class:: center

`:sunrise_over_mountains:`

A challenger appears
~~~~~~~~~~~~~~~~~~~~
Durandal is a youngest framework I looked at by a few years, which is
significant when the average age is around four. However, it’s coming from a
programmer who has been in the field a long time and has something of a history
of building frameworks [#]_ and a rep in the weird world of .NET and
Silverlight web development.

Source for my toy app in Durandal is here__.

Shiny
~~~~~
Something struck me about how Durandal described itself, and reminded of
Pyramid – a Python web framework with similar heritage [#]_ to Durandal.

I started hacking on Python web stuff with CherryPy (I liked the name, it also
turned out to be pretty awesome), did a year’s grind in Django and finally
wound up with Pyramid. I didn’t miss Django at all. Not even Django admin, nor
Django forms, nor Django anything else really. It’s not that I never had a use
for these things, but more the layering with plugins we needed to make those
“batteries-included” modules work the way we wanted them to got pretty
oh-tee-tee. It got so it felt that the only thing we were using Django for was
upholding the models/views/urls structure of the project. That could have
happened in code review – even in a big organisation with many developers.

I learnt a lot about how to write good Python from Django, their source is high
quality, but I didn’t want to use what I had learnt to write Django apps.
Pyramid was a revelation in this respect, it is very light on concepts and a
lot smaller than Django. It gave me WSGI stuff, a request-response cycle and
some great tooling for writing tests. It does this by basically providing a
recommended pattern for using WebOb_ and Venusian_, (almost) everything else is
left up to the developer.

Durandal does the same thing for JavaScript. It provides a recommended (not
enforced) pattern for using RequireJS and KnockoutJS to build SPAs by offering
a small collection of custom KnockoutJS bindings.

.. _Venusian: http://venusian.readthedocs.org/en/latest/
.. _WebOb: https://webob.readthedocs.org/en/latest/reference.html#introduction


.. __: https://github.com/bmcorser/7wonders/tree/master/cutter

Rusty
~~~~~

    - Docs are thin on the ground
    - Knockout is verbose
    - Knockout ``thing().stuff.cake().bread`` is confusing

.. [#] That is to say, I only care about the *general* principles of
       readability, modularity and single-responsibility.
.. [#] It’s a *chaining-style browser polyfill library*, surely.
.. [#] It’s solved anyway http://stackoverflow.com/a/7062795/3075972
.. [#] ``#sorrynotsorry``
.. [#] At the time of writing, the last commit on the Postgres repo was a
       quarter of an hour ago ... ’nuff said.
.. [#] I realise there are notable exceptions such as ReactJS, Polymer and
       probably a tonne more, but there are only so many hours in the day.
.. [#] https://www.google.com/trends/explore?hl=en-US#q=ember.js%2C%20angularjs%2C%20durandal&cmpt=q&tz=
.. [#] To a lesser degree, granted, but it’s already a *JavaScript* thing.
.. [#] Some stuffs for .Net or C＃ or something?
.. [#] Pyramid grew out of Zope/Plone into Pylons before becoming Pyramid. It’s
       maintained by early Python adopters aka. generally cool dudes.
