blog.renderPreview = function(event) {
  event.preventDefault();
  var title = $('#article-title').val();
  console.log(title);
  var category = $('#article-category').val();
  var body = $('#article-body').val();
  var author = $('#article-author').val();
  var authorUrl = $('#article-author-url').val();
  var publishedOn = '2015-10-10';
  $('#preview').append(title);
  $('#preview').append(category);
  $('#preview').append(marked(body));
  $('#preview').append(author);
  $('#preview').append(authorUrl);
  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block);
  });
  var stored = {author: author, authorURL: authorUrl, category: category, publishedOn: publishedOn, body: body};
  var storedArt = JSON.stringify(stored);
  $('#article-json').html(storedArt);
  webDB.insertRecord(stored);
};

// a.title, a.author, a.authorUrl, a.category, a.publishedOn, a.articleBody


$(document).ready(function() {
  $('#input-new-article').on('submit', blog.renderPreview);
});
