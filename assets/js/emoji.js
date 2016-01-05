document.addEventListener('commitsDone', function(event) { 
  emojione.imageType = 'svg';
  emojione.sprites = true;
  emojione.imagePathSVGSprites = '/bower_components/emojione/assets/sprites/emojione.sprites.svg';
  var posts = _.chain(document.querySelectorAll('.document'));
  posts.map(function (post) {
    post.innerHTML = emojione.toImage(post.innerHTML);
  });
  var commits = _.chain(document.querySelectorAll('.commit span'));
  commits.map(function (commit) {
    commit.innerHTML = emojione.toImage(commit.innerHTML);
  });
});
