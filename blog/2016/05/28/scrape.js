var casper = require('casper').create();
casper.start('http://package.elm-lang.org/')
var getPackageNames = function () {
  var packageElems = document.querySelectorAll('.catalog .pkg-summary');
  return Array.prototype.map.call(packageElems, function (packageElem) {
    var name = packageElem.querySelector('h1').textContent;
    return name;
  });
}
casper.then(function () {
  this.waitUntilVisible('.catalog .pkg-summary', function() {
    packages = this.evaluate(getPackageNames);
    casper.echo(packages.join('\n'));
  })
});
casper.run();
