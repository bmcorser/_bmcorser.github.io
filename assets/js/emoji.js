document.addEventListener('commitsDone', function(event) { 
  emojione.imageType = 'svg';
  emojione.sprites = true;
  emojione.imagePathSVGSprites = '/bower_components/emojione/assets/sprites/emojione.sprites.svg';
  _.map(document.querySelectorAll('.document'), function (post) {
    post.innerHTML = emojione.toImage(post.innerHTML);
  });
  _.map(document.querySelectorAll('.commit span'), function (commit) {
    commit.innerHTML = emojione.toImage(commit.innerHTML);
  });
});
