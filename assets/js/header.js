document.addEventListener('DOMContentLoaded', function(event) { 
  var elem = document.querySelector('header');
  var headroom = new Headroom(elem, {
    offset: 70,
    tolerance: 3,
  });
  headroom.init();
});
