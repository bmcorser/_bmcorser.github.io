from bade.directives.eqtexsvg import eqtexsvg
import hashlib

fx_fdx = {
    'x^n':               'nx^{n - 1}',
    '\\sin x':           '\\cos x',
    '\\cos x':           '-\\sin x',
    '\\tan x':           '\\sec^2 x',
    '\\sec x':           '\\sec x\\tan x',
    '\\mathrm{cosec} x': '-\\mathrm{cosec} x \\cot x',
    '\\cot x':           '-\\mathrm{cosec}^2 x',
    'e^x':               'e^x',
    '\\ln x':            '\\frac{1}{x}',
    '\\arcsin x':        '\\frac{1}{\\sqrt{1 - x^2}}',
    '\\arccos x':        '-\\frac{1}{\sqrt{1 - x^2}}',
    '\\arctan x':        '\\frac{1}{1 + x^2}',
}

hash_map = {}
for fx, fdx in fx_fdx.items():
    # write f(x) to file
    fx_hash = hashlib.sha1(fx.encode('utf8')).hexdigest()[:7]
    fx_svg = eqtexsvg("${0}$".format(fx))
    with open(fx_hash, 'w') as fx_fh:
        fx_fh.write(fx_svg)

    # write f(x) = f'(x) to file
    fdx_hash = hashlib.sha1(fdx.encode('utf8')).hexdigest()[:7]
    fdx_svg = eqtexsvg("${0} = {1}$".format(fx, fdx))
    with open(fdx_hash, 'w') as fdx_fh:
        fdx_fh.write(fdx_svg)

    # remember association of hashes
    hash_map[fx_hash] = fdx_hash

from pprint import pprint
pprint(hash_map)
