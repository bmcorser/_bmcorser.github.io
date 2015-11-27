# coding: utf-8
import functools
import itertools
import operator


def follow_orbit(orbit, num):
    'Follow an orbit one step from the passed number'
    index = orbit.index(num) + 1
    if len(orbit) == index:
        return orbit[0]
    return orbit[index]


class Permutation(object):
    'Define a permutation using an approximation of cycle notation'

    def __init__(self, name, orbits):
        self.name = name
        self.orbits = orbits

    def __call__(self, num):
        for orbit in self.orbits:
            if num in orbit:
                return follow_orbit(orbit, num)
        return num  # not changed in the permutation


def compose_left_right(left, right):
    'Compose a pair of functions'
    return lambda x: left(right(x))


def compose(*functions):
    'Compose n functions'
    return functools.reduce(compose_left_right, functions)


def power(fn, to):
    'Raise a function to a power'
    return compose(*[fn] * to)


def identity(of, permutation):
    'Is the permutation passed the identity for the set passed?'
    result = zip(of, map(permutation, of))
    return all(itertools.starmap(operator.eq, result))


S = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

a = Permutation('α', (
    (2, 7, 5),
))

b = Permutation('β', (
    (1, 2, 3, 4, 5, 6, 7, 8, 9),
))

c = Permutation('γ', (
    (1, 7), (3, 6, 10, 9),
))

abc = compose(a, b, c)

to = 1

while not identity(S, power(abc, to)):
    to += 1

print("Order is {0}!".format(to))
