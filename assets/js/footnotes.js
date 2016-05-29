document.addEventListener('DOMContentLoaded', function(event) { 

  // wrap footnotes in a div
  var container = document.createElement('div');
  container.classList.add('footnote-container');
  var docutils = document.querySelector('.document');
  _.map(document.querySelectorAll('.docutils.footnote'), function (footnote) {
    container.appendChild(footnote.cloneNode(true));
    footnote.remove();
  });
  docutils.appendChild(container);

  var highlightFootnote = function highlightFootnote (footnote) {
    if (footnote.id === window.location.hash.replace('#', '')) {
      footnote.classList.add('active');
    } else {
      footnote.classList.remove('active');
    }
  };

  // if footnote is initally targeted
  _.map(document.querySelectorAll('.docutils.footnote'), highlightFootnote);

  window.addEventListener('hashchange', function () {
    _.map(document.querySelectorAll('.docutils.footnote'), highlightFootnote);
  });
});
