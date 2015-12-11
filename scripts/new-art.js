blog.renderPreview = function(event) {
  event.preventDefault();
  var title = $('#article-title').val();
  console.log(title);
  var category = $('#article-category').val();
  var markdown = $('#article-body').val();
  var author = $('#article-author').val();
  var authorUrl = $('#article-author-url').val();
  var publishedOn = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  $('#preview').append(title);
  $('#preview').append(category);
  $('#preview').append(marked(body));
  $('#preview').append(author);
  $('#preview').append(authorUrl);
  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block);
  });
  var stored = [title, author, authorUrl, category, publishedOn, markdown];//Array to use in the insertRecord method
  var storedArt = JSON.stringify(stored);
  $('#article-json').html(storedArt);
  webDB.insertRecord(stored);
};

// a.title, a.author, a.authorUrl, a.category, a.publishedOn, a.articleBody


$(document).ready(function() {
  $('#input-new-article').on('submit', blog.renderPreview);
});
