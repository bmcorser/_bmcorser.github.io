"""
Introduces ``dot-graph`` directive
"""
from docutils import nodes
from docutils.parsers.rst import Directive
from pydot import graph_from_dot_data


class DotgraphDirective(Directive):
    required_arguments = 1
    optional_arguments = 0
    has_content = True
    final_argument_whitespace = False

    def run(self):
        outpath = self.arguments[0]
        graph = graph_from_dot_data('\n'.join(self.content))
        graph.write_svg('_build' + outpath)
        html = '<img src="{0}" class="dot-graph"/>'
        return [nodes.raw('', html.format(outpath), format='html')]