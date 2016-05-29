document.addEventListener('DOMContentLoaded', function(event) { 
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'package-histories.json', true);
  xhr.send(null);
  xhr.onreadystatechange = function (event) {
    if (xhr.readyState == 4) {
      drawPlot(JSON.parse(event.target.responseText));
    }
  };
  var resolution = 50;
  var aggCommits = function (acc, item, index, history) {
    if (index === 0 || index === history.length - 1 || index % resolution === 0) {
      acc.push(index + 1);
      return acc;
    }
    acc[acc.length - 1] += 1;
    return acc;
  };
  var aggHistory = function (acc, item, index) {
    if (index === 0 || index === history.length - 1 || index % resolution === 0) {
      acc.push(new Date(item * 1000))
    }
    return acc;
  };

  var packageGroup = function (fragment, name, packages) {
    var outer = {name: name, history: []};
    _.map(packages, function (inner, index) {
      if (inner && inner.name.startsWith(fragment)) {
        outer.history = outer.history.concat(inner.history);
        delete packages[index];
      }
    });
    return outer;
  };
  var drawPlot = function (packages) {
    var plotElem = document.querySelector('#plotly-plot');
    packages.push(packageGroup('repos/elm-lang', 'elm-lang', packages));
    packages.push(packageGroup('repos/elm-community', 'elm-community', packages));
    var pkgPlots = _.reduce(_.sortBy(packages, 'name'), function (acc, pkg) {
      if (pkg) {
        acc.push({
          name: pkg.name.replace('repos/', ''),
          x: _.reduce(pkg.history.sort(), aggHistory, []),
          y: _.reduce(pkg.history.sort(), aggCommits, []),
          type: 'scatter',
        });
      }
      return acc;
    }, []);
    Plotly.newPlot(plotElem, pkgPlots);
  };
});
