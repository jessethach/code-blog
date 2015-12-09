var stats = {};

var dataSet = blog.rawData;

var authorsStats = [];
var articlesStats = [];


//function to pass into the .map argument
stats.getEach = function (el) {
  console.log(el.author);
  return el.author;
};

stats.placeAuthors = function () {
  var temp = dataSet.map(stats.getEach);
  authorsStats = temp;//pushing into articlesStats array
  var $array = $.unique(authorsStats);
  console.log($array.length);
};

// stats.prototype.populateStats = function () {
//
// };

// stats.prototype.authUniqueStats = _.uniq(authorsStats);
//
// function $numberOfArticles(articles) {
//   return $('<p>Number of article: ' + ariticles.length + '</p>');
// };

$(document).ready(function() {
  stats.placeAuthors();
});
// $.getJSON('scripts/blogArticles.js', stats),
