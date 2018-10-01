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

PyPI on S3
----------
Because the specification for a PyPI server doesn’t require a database or
anything apart from an HTTP server and a filesystem, we can “simulate” these
requirements using the AWS configuration mentioned above.

s3pypi_, a command line tool for publishing Python packages to an S3 bucket, is
given AWS credentials and the location of an S3 bucket. It knows how to do the
packaging of Python code and how to store packages in the bucket in such a way
that they can be understood by package installers (ie. Pip). Whilst developers
can certainly use `s3pypi` to manually publish Python libraries to the private
PyPI instance, it is recommended that this process is carried out as part of
CI/CD.

.. _s3pypi: https://github.com/novemberfiveco/s3pypi

Once packages make their way to the bucket, they must be made accessible to
package installers. One approach would be simply to configure the bucket to
behave like an HTTP server, which is `provided for`_ However, this has the
drawback of making proprietary Python source code public and is therefore not
sufficient.

.. _`provided for`: https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html

Instead, the bucket is configured to be private and access is granted only to
a CloudFront Distribution. This would have the same effect as making the
bucket public, but a Lambda function association is added  to the default
behaviour of the distribution to prevent this. This association is set to
“Viewer request” and as such intercepts all requests (conceptually the Lambda
function acts something like WSGI middleware) and requires particular HTTP
Basic Auth headers to be present.

The final piece of configuration is on the part of package installers, which
must be configured to use the URL of the CloudFront Distribution and pass
appropriate authentication headers. In the case of Pip, this is as simple as
passing an |--extra-index-url|_ either in the requirements file or when running
``pip install``. For example::

    pip install private-package \
        --extra-index-url=https://user:pass@pypi.company.cool

.. |--extra-index-url| replace:: ``--extra-index-url``
.. _`--extra-index-url`: https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format

References
----------
The CLI tool that knows how to send Python packages to an S3 bucket
https://github.com/novemberfiveco/s3pypi (with it's insufficient security
model: 
https://novemberfive.co/blog/opensource-pypi-package-repository-tutorial/#security)

The blog post I found by Googling “http basic auth s3” or something
https://hackernoon.com/serverless-password-protecting-a-static-website-in-an-aws-s3-bucket-bfaaa01b8666

The same thing as above, but the “for dummies version”
http://kynatro.com/blog/2018/01/03/a-step-by-step-guide-to-creating-a-password-protected-s3-bucket/

My slightly-adjusted implementation of HTTP Basic Auth in the form of an AWS
Lambda function.

.. code-block:: javascript

    'use strict';
    
    exports.handler = (event, context, callback) => {
    
      // Get request and request headers
      const request = event.Records[0].cf.request;
      const headers = request.headers;

      // Send requests to index.html
      // if there's a trailing slash
      if (request.uri.endsWith('/')) {
          request.uri = request.uri + 'index.html';
      }

      // Configure authentication
      const authUser = 'abc';
      const authPass = 'xyz';

      // Construct the Basic Auth string
      const authBuf = new Buffer(authUser + ':' + authPass);
      const authString = 'Basic ' + authBuf.toString('base64');

      // Require Basic authentication
      const authHead = headers.authorization;
      if (!authHead || authHead[0].value != authString) {
        const response = {
          status: '401',
          statusDescription: 'Unauthorized',
          body: 'Unauthorized',
          headers: {
            'www-authenticate': [
              {key: 'WWW-Authenticate', value:'Basic'}
            ]
          },
        };
        callback(null, response);
      }

      // Continue request processing if authentication passed
      callback(null, request);
    };

Enjoy serverless PyPI\ *!*
