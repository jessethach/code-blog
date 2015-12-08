blog.renderPreview = function(event) {
  event.preventDefault();
  var title = $('#article-title').val();
  console.log(title);
  var category = $('#article-category').val();
  var body = $('#article-body').val();
  var author = $('#article-author').val();
  var authorUrl = $('#article-author-url').val();
  $('#preview').append(title);
  $('#preview').append(category);
  $('#preview').append(marked(body));
  $('#preview').append(author);
  $('#preview').append(authorUrl);
  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block);
  });
  var stored = {title: title, category: category, body: body, author: author, authorUrl: authorUrl};
  var storedArt = JSON.stringify(stored);
  $('#article-json').html(storedArt);
};

$(document).ready(function() {
  $('#input-new-article').on('submit', blog.renderPreview);
});
