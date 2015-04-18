document.addEventListener('DOMContentLoaded', function(event) { 
  var commitsElement = document.querySelector('.commits');
  // commitsElement.innerHTML = COMMIT_HISTORY[0].hash;
  _.map(COMMIT_HISTORY, function (commit) {
    var commitElement = document.createElement('div');
    commitElement.classList.add('commit');
    var hashElement = document.createElement('span');
    hashElement.innerHTML = commit.hash;
    hashElement.classList.add('hash');
    var subjectElement = document.createElement('span');
    subjectElement.innerHTML = commit.subject;
    subjectElement.classList.add('subject');
    commitElement.appendChild(hashElement);
    commitElement.appendChild(subjectElement);
    commitsElement.appendChild(commitElement);
  });
});
