document.addEventListener('commitsDone', function(event) { 
  emojione.imagePathSVG = '/bower_components/emojione/assets/svg/';
  emojione.imagePathSVGSprites = '/bower_components/emojione/assets/sprites/emojione.sprites.svg';
  emojione.imageType = 'svg';
  var posts = _.chain(document.querySelectorAll('.document'));
  posts.map(function (post) {
    post.innerHTML = emojione.toImage(post.innerHTML);
  });
  var commits = _.chain(document.querySelectorAll('.commit span'));
  commits.map(function (commit) {
    commit.innerHTML = emojione.toImage(commit.innerHTML);
  });
});
