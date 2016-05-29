Dutch elm
#########

`:deciduous_tree:`
==================
|

Pondering the future of the JavaScripts
---------------------------------------
I’ve come across Elm\ [#]_ several times in the past year, but had never given
it a serious look. By some thread of YouTube videos starting with
funfunfunction_, going through some general conference talk about the
importance of teaching functional programming to juniors and ending up at
Richard Feldman’s excellent_, unusually lengthy presentation of Elm.

.. _funfunfunction: https://www.youtube.com/channel/UCO1cgjhGzsSYb1rsB4bFe4Q
.. _excellent: https://www.youtube.com/watch?v=zBHB9i8e3Kc

Seeing that things have come a long way\ [#]_ in the Elm community since I last
checked in, it got me thinking about the state of modern JavaScript.


Transpilvania Express
'''''''''''''''''''''
Almost all current approaches to web application development involve build
processes with varying degrees of complexitude and longness. People who want to
write ES6 use Babel, people who want to use React do the same for JSX, people
who want to use Vue.js single file components\ [#]_ use Webpack or Browserify.
In fact, there basically isn’t an approach out there that doesn’t involve
taking some highly evolved form of JavaScript and devolving back to something
that will actually execute in The Browser.

This goes even further, such is the level of our collective dissatisfaction
with so-called raw JavaScript\ [#]_ as the language of web development, that
there are projects to allow developers to write application code in Lisp\ [#]_,
Haskell\ [#]_ and Rust\ [#]_. In fact, whilst searching DuckDuckGo_ for project
pages for compiled languages that target JavaScript I stumbled upon
`this page`_ which (at the time of writing) lists 335 compilers that target
JavaScript.

Apparently the appetite for *anything else* apart from JavaScript knows no
bounds.

Enter the treefolk
''''''''''''''''''
I’m really interested in Elm, but for its completeness as a solution it still
seems relatively obscure. Someone pointed out to me that it’s an entirely
different language to JavaScript — meaning, of course, that JavaScript
developers wouldn’t be able to call into force their leet JavaScript skillset.
Although, having written variously Perl, Python, JavaScript, Rust and even a
little C++; the “language barrier” feels rather transparent. Learning a new
framework or programming style is almost always a harder proposition than a
mere language. I found learning to use Vim\ [#]_ much tougher than switching
from Perl to Python to JavaScript.

It was also put to me by `@richtier`_ that the “all or nothing” nature of Elm
could contribute to its obscurity relative to React, for example, or that
mother of all obscenities, Angular.

.. _`@richtier`: https://github.com/richtier

Elm is a truly holistic beast. It’s a *functional* reimagining of all or none
of the following; buildchain, application framework, testing infrastructure,
package manager. That means you can either have all of those from Elm or none
of them.

It’s this that planted a seed of doubt in my mind.

What of the future?
'''''''''''''''''''
My concern is basically about the longevity of a nascent Elm and its budding\
[#]_ community. For a picture of longevity, consider the commit history of that
most venerable free software project, PostgreSQL_\ [#]_. Perhaps it seems a
little morbid to be considering the death of a project just as it is coming to
into being, but from a practical standpoint one simply must.

.. _PostgreSQL: https://github.com/postgres/postgres/graphs/contributors

Elm’s creator, Evan Czaplicki, spoke about where he saw the project going
`a few years ago`_.

.. _`a few years ago`: https://www.youtube.com/watch?v=Bv8elmoComE

Visuals
'''''''
I wanted to get a feel for how Elm has developed, and so set about graphing (in
a similar way to the PostgreSQL graph linked above) the development histories
of the core repos and the community packages. There are few enough repos in the
set mentioned to reasonably download all their respective data and whip it up
into some coloured lines.

Downloading all the things
^^^^^^^^^^^^^^^^^^^^^^^^^^
Since the community packages for Elm are all listed on a single page, and they
are all predictably hosted on GitHub, it’s easy enough to scrape the repo URLs
and clone out the actual repos.

A quick ``df -h`` to see if I have enough space on my pathetic MacBook SSD::

    Filesystem      Size  Used Avail Use% Mounted on
    /dev/disk1      112G  109G  3.4G  97% /

Meh, it’s probably enough. Elm’s packages page is an Elm app (of course!) so
let’s scrape using CasperJS and grab all the repos using Python. We’ll traverse
each repo we’ve got our hands on with Rust and spit out some JSON detailing
its history. So, let’s pipe the list of packages through our rickety collection
of code.

Running ``scrape.js`` with CasperJS gets an outer list of packages, pipe that
to ``update.py`` which validates package names, then clones or updates the repo
and finally the Rust binary ``repo-commits`` reads repository histories and
outputs JSON that we can graph against, in ``package-histories.json``.

So here it is, a graph showing cumulative sum of number of commits grouped by
contributor across all Elm repositories; core, community and those listed on
http://package.elm-lang.org/

.. raw:: html

    <div id="plotly-plot" style="width: 50em; height: 50em; margin: 2em auto"></div>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script src="/assets/html/elm-packages/plot.js"></script>

This data was collected on the 5th of May 2016.  I will update the data
periodically. If you want to see  create `an issue`_ if you want me to do it
sooner.

You can also see the graph out of context here_.

.. _`an issue`: https://github.com/bmcorser/_bmcorser.github.io/issues/new
.. _here: https://bmcorser.github.io/assets/html/elm-packages/


.. _DuckDuckGo: https://duck.co/blog/post/297/help-for-programmers
.. _`this page`: https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS

.. [#] Briefly, Elm is a really nice functional language that compiles to
       JavaScript and has libraries for generating HTML. Whilst that might
       sound like a toy project, it lets you write functional programs that
       describe real browser applications that run in real browsers. More
       here_.
.. _here: http://elm-lang.org/
.. [#] In particular, putting API change tracking into package management
       system seemed pretty revolutionary. I don’t think even Rust does that.
.. [#] As the saying goes; a ``WebComponent`` by any other name ...
.. [#] Even the term *raw JavaScript* has the air of paradox.
.. [#] http://clojure.org/
.. [#] https://github.com/ghcjs/ghcjs
.. [#] https://github.com/rust-lang/rfcs/issues/604
.. _this: https://www.norfolkwinters.com/vim-creep/
.. [#] Mostly spurred on by this_ treasure of an article, which I notice now
       features a narrated audio version. Give it a listen. It reminds me of a
       Red Dwarf audio book; “One word ... *Vim*.”
.. [#] Yeah I did!
.. _`one of the Elm repos`: https://github.com/elm-lang/elm-compiler/graphs/contributors
.. [#] You can probably see what I mean by nascent by looking at the
       equivalent graph for `one of the Elm repos`_.
