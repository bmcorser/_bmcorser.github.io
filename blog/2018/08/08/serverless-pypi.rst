Serverless PyPI
###############

`:desert:`
==========
|

Hosting private Python packages using AWS gubbins
-------------------------------------------------
At a recent gig, the client had the need to start re-using particular Python
library code across projects. Fighting ones way through Python’s
sometimes-hairy packaging story is something we do frequently when it becomes
impractical to deploy an organisation’s entire Python codebase everywhere and
always.

Generally, we would spin up a box running devpi_ or something similar and let
it run. However here, since it was prohibitively expensive in terms of ops
resource to get a new box up, I sought a different approach.

.. _devpi: https://www.devpi.net/
