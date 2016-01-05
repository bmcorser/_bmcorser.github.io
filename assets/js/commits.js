var attachHistory = function (commits) {
  commitHeadElement.innerHTML = commits[0].hash;
  var commitHeadElement = document.querySelector('.commit-head');
  var commitHistoryElement = document.querySelector('.commit-history');
  commitHistoryElement.classList.add('hidden');
  _.map(commits, function (commit) {
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
    commitHistoryElement.appendChild(commitElement);
  });
  commitHeadElement.addEventListener('click', function () {
    commitHistoryElement.classList.toggle('hidden');
    commitHistoryElement.style.marginTop = -commitHistoryElement.clientHeight;
  });
};
document.addEventListener('DOMContentLoaded', function(event) { 
  var commits = typeof COMMIT_HISTORY == 'undefined' ? null : COMMIT_HISTORY;
  if (commits) attachHistory(commits);
  document.dispatchEvent(new Event('commitsDone'));
});
