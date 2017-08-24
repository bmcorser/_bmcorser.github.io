var onscreen = function(el) {
  var rect = el.getBoundingClientRect();
  if (rect.bottom < 0) return false;
  if (rect.top > window.innerHeight) return false;
  return true;
}

document.addEventListener('DOMContentLoaded', function(event) { 
  var images = Array.prototype.slice.call(document.querySelectorAll('img.full'));
  var onscroll = function(event) {
    for (var i = 0; i < images.length; i++) {
      if (onscreen(images[i])) {
        if (images[i].dataset.src) images[i].src = images[i].dataset.src;
      }
    }
  };
  onscroll();  // catch before user scrolls
  document.addEventListener('scroll', onscroll);
});
