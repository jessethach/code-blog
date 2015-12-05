blog.renderPreview = function(event) {
  event.preventDefault();
  var $title = $('#article-title').val();
  console.log($title);
  var $category = $('#article-category').val();
  var $body = $('#article-body').val();
  var $author = $('#article-author').val();
  var $authorUrl = $('#article-author-url').val();
  $('#preview').append($title);
  $('#preview').append($category);
  $('#preview').append(marked($body));
  $('#preview').append($author);
  $('#preview').append($authorUrl);
  var stored = {title: $title, category: $category, body: $body, author: $author, authorUrl: $authorUrl};
  var storedArt = JSON.stringify(stored);
  $('#article-json').append(storedArt);
};

$(document).ready(function() {
  $('#input-new-article').submit(blog.renderPreview);
});
