document.addEventListener('DOMContentLoaded', function(event) { 
  var posts = _.chain(document.querySelectorAll('.document'));
  posts.map(function (post) {
    post.innerHTML = emojione.toImage(post.innerHTML);
  });
});
