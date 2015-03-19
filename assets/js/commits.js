document.addEventListener('DOMContentLoaded', function(event) { 
  var commitsElement = document.querySelector('.commits');
  commitsElement.innerHTML = COMMIT_HISTORY[0].hash;
  _.map(COMMIT_HISTORY, function (commit) {
    var commitElement = document.createElement('div');
    debugger;
    commitElement.innerHTML = '';
  });
});
