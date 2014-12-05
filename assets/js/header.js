document.addEventListener('DOMContentLoaded', function(event) { 
  var elem = document.querySelector('header');
  var headroomOpts = {
    offset: 30,
    tolerance: 3,
    classes: {},
  };
  if(window.location.hash) {
    elem.classList.add('headroom--unpinned');
  }
  var headroom = new Headroom(elem, headroomOpts);
  headroom.init();
  window.addEventListener('hashchange', function () {
    headroom.unpin();
  }, false);
});
