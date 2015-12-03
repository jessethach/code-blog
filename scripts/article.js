// Creating Article object
var Article = function(obj) {
  this.blogTitle = obj.blogTitle;
  this.author = obj.author;
  this.authorUrl = obj.authorUrl;
  this.category = obj.category;
  this.publishedOn = obj.publishedOn;
  this.articleBody = obj.articleBody;
  // this.age = this.postAge(this.publishedOn);
};

//Create Article method to calculate age of blog post
// Article.prototpe.postAge = function (date) {
//   var today = new Date();
//   var dd = parseInt(today.getDate());
//   var mm = parseInt(month.getMonth());
//   var yy = parseInt(year.getFullYear());
//
//   var year = parseInt(date.slice(0,4));
//   var month = parseInt(date.slice(5,7));
//   var day = parseInt(date.slice(8,10));
//
//   var oneDay = 24*60*60*100;
//   var frstDate = new Date(year,month,day);
//   var secondDate = new Date(year,month,day);
//
//   var diffDays = Math.round(Math.abs(firstDate.getTime() - secondDate.getTime()/(oneDay)));
//   return diffDays;
// };

Article.categories = [];
Article.authors = [];

// Creating a function in the constructor to clone html markup and populate it with new data
Article.prototype.toHTML = function () {
  Article.categories.push(this.category);
  Article.authors.push(this.author);
  var $articleCopy = $('#template').clone();
  $articleCopy.removeAttr('id');
  $articleCopy.find('.title').html(this.blogTitle);
  $articleCopy.find('.author').html('By <em>' + this.author + '</em>');
  $articleCopy.find('.author-web').html('<a>' + this.authorUrl + '</a>');
  $articleCopy.find('.category').html('Category: ' + this.category);
  $articleCopy.find('.published').html(this.publishedOn);
  $articleCopy.find('.body').html(this.articleBody);
  $articleCopy.find('.read-more').html('<a>Read More</a>');
  $('.article-home').append($articleCopy).find('article').addClass('five columns');
};

// Credit to http://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array
Array.prototype.contains = function(v) {
  for(var i = 0; i < this.length; i++) {
    if(this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function () {
  var arr = [];
  for(var i = 0; i < this.length; i++) {
    if(!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
