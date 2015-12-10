//Creating stats object
var stats = {};

//Using raw data temporarily before plugging JSON
var dataSet = blog.rawData;

//Creating empty array for authors in order to chain a JQuery unique method
var authorsUnique = [];
var articlesStats = [];

// stats.getAllArticles = function(rawJSON) {
//   stats.allArticles = rawJSON;
// };

//Mapping method used to pluck out properties from an array
stats.pluck = function(property, collection) {
  var plucked = collection.map(function (item) {
    return item[property];
  });
  return plucked;
};

//Creating function to pass into .map on articleBody as a callback
stats.mapSplit = function(x) {
  return x.split(' ').length;
};

stats.wordFilter = function (str) {
  return str.replace(/[#,\n]/g, ' ').match(/\b\w+/g);
};

stats.wordCount = function() {
  var bodies = stats.pluck('articleBody', dataSet);//pluck function called
  var countBodies = bodies.map(stats.mapSplit);//mapSplit function called
  $('#stats').append('<p>Number of Words: ' + countBodies + '</p>');
};

//This function will render the values on to the web page
stats.renderAuthorCount = function () {
  var authorsStats = stats.pluck('author', dataSet);//pluck function called
  var $uniqueAuthors = $.unique(authorsStats);
  $('#stats').append('<p>Number of Authors: ' + $uniqueAuthors.length + '</p>');
};

stats.renderArticlesCount = function() {
  $('#stats').append('<p>Number of Articles: ' + dataSet.length + '</p>');
};

// function $numberOfArticles(articles) {
//   return $('<p>Number of article: ' + ariticles.length + '</p>');
// };

$(document).ready(function() {
  stats.wordCount();
  stats.renderAuthorCount();
  stats.renderArticlesCount();
  // $.getJSON('scripts/hackeripsum.json', dataSet);
});
