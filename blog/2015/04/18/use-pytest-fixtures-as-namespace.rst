Using ``namedtuple`` to group py.test fixtures
##############################################

Everyone loves a good `py.test fixture`_. Those things are so flexible.
Sometimes it’s desirable to have a fixture return a function, like this:

.. _`py.test fixture`: https://pytest.org/latest/fixture.html

.. code-block:: python

    @pytest.fixture
    def get_x():
        # some code
        x = 1
        def closure_fn():
            return x
        return closure_fn

    def test_something(get_x):
        x = get_x()
        assert x == 1

After some time, the number of function-returning fixtures gets to the point
where our test function signatures start to get a bit over the top:

.. code-block:: python

    def test_something(fixture_a,
                       fixture_b,
                       get_x,
                       get_y,
                       get_z):
        x = get_x()
        y = get_y()
        z = get_z()
        assert x, y, z == 1, 2, 3

Because py.test fixtures are can return everything and also `support
dependencies`_ on other fixtures (fixture functions support the same injection
syntax as test functions), we can just use a Python datastructure of some type
to group our ``get_*`` functions into a single fixture. The “grouping” fixture
and its usage could look like this:

.. _`support dependencies`: https://pytest.org/latest/fixture.html#modularity-using-fixtures-from-a-fixture-function

.. code-block:: python

    @pytest.fixture
    def getters(get_x, get_y, get_z):
        return get_x, get_y, get_z

    def test_more_things(getters):
        get_x, get_y, get_z = getters
        x = get_x()
        # ...

But this way, we’d need to remember in which order we packed out getters when
we want to call them from the test function. Surely there’s a better way. This
is Python, of course there’s a better way! We could use a dictionary, which
would mean we could address our getter functions by name, but then our calling
syntax would be ``getters['get_x']()`` which is a bit opaque. We can use a
little ``namedtuple`` magic to get prettier calling syntax, like this:

.. code-block:: python

    import collections

    @pytest.fixture
    def getters(get_x, get_y, get_z):
        dict_ = {
            'get_x': get_x,
            'get_y': get_y,
            'get_z': get_z,
        }
        return collections.namedtuple('getters', dict_.keys())(**dict_)

    def test_more_things(getters):
        x = getters.get_x()
        # ...

This way, we get more saner calling syntax. Wonderful!
