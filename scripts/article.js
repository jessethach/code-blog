// Creating Article object
var Article = function(obj) {
  this.blogTitle = obj.blogTitle;
  this.author = obj.author;
  this.authorUrl = obj.authorUrl;
  this.category = obj.category;
  this.publishedOn = obj.publishedOn;
  this.articleBody = obj.articleBody;
};

// Creating a function in the constructor to clone html markup and populate it with new data
Article.prototype.toHTML = function () {
  var $articleCopy = $('#template').clone();
  $articleCopy.removeAttr('id');
  // $(".article-home").filter(:last).remove();
  // $articleCopy.remove('#template');
  $articleCopy.find('.title').html(this.blogTitle);
  $articleCopy.find('.author').html('By <em>' + this.author + '</em>');
  $articleCopy.find('.author-web').html('<a>' + this.authorUrl + '</a>');
  $articleCopy.find('.category').html('Category: ' + this.category);
  $articleCopy.find('.published').html(this.publishedOn);
  $articleCopy.find('.body').html(this.articleBody);
  $articleCopy.find('.read-more').html('<a>Read More</a>');
  $('.article-home').append($articleCopy);
};
