var Article = function(obj) {
  this.blogTitle = obj.blogTitle;
  this.author = obj.author;
  this.authorUrl = obj.authorUrl;
  this.category = obj.category;
  this.publishedOn = obj.publishedOn;
  this.articleBody = obj.articleBody;
}

// Creating a function in the constructor to clone html markup and populate it with new data
Article.prototype.toHTML = function () {
  var $articleCopy = $('#template').clone();
  $articleCopy.find('.title').html(this.blogTitle);
  $articleCopy.find('.author').html(this.author);
  $articleCopy.find('.author-web').html(this.authorUrl);
  $articleCopy.find('.category').html(this.category);
  $articleCopy.find('.published').html(this.publishedOn);
  $articleCopy.find('.body').html(this.articleBody);
  $(".article-home").append($articleCopy);
}

//For loop to call each object
function render(rawData) {
  for (var i = 0; i < blog.rawData.length; i++) {
  var art = new Article(blog.rawData[i]);
  art.toHTML();
  }
}

render();
