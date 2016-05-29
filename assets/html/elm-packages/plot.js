document.addEventListener('DOMContentLoaded', function(event) { 
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/assets/html/elm-packages/package-histories.json', true);
  xhr.send(null);
  xhr.onreadystatechange = function (event) {
    if (xhr.readyState == 4) {
      drawPlot(JSON.parse(event.target.responseText));
    }
  };
  var resolution = 20;
  var aggCount = function (acc, item, index, history) {
    if (index === 0 || index === history.length - 1 || index % resolution === 0) {
      acc.push(index + 1);
      return acc;
    }
    acc[acc.length - 1] += 1;
    return acc;
  };
  var aggTime = function (acc, item, index) {
    if (index === 0 || index === history.length - 1 || index % resolution === 0) {
      acc.push(new Date(item * 1000))
    }
    return acc;
  };
  var drawPlot = function (contributors) {
    var plotElem = document.querySelector('#plotly-plot');
    var plots = _.reduce(contributors, function (acc, history, name) {
      if (history.length > 100) {
        acc.push({
          name: name,
          x: _.reduce(history, aggTime, []),
          y: _.reduce(history, aggCount, []),
          type: 'scatter',
          mode: 'lines',
          line: {
            shape: 'spline',
          }
        });
      }
      return acc;
    }, []);
    Plotly.newPlot(plotElem, _.sortBy(plots, function (plot) { return -plot.x.length }));
  };
});
