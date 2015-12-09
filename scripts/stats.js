//Creating stats object
var stats = {};

//Using raw data temporarily before plugging JSON
var dataSet = blog.rawData;

//Creating empty array for authors in order to chain a JQuery unique method
var authorsStats = [];
var articlesStats = [];

//Mapping method used to pluck out properties from an array
stats.pluck = function(property, collection) {
  var plucked = collection.map(function (item) {
    return item[property];
  });
  return plucked;
};

//Creating function to pass into .map on articleBody as a callback
stats.mapSplit = function (x) {
  return x.split(' ').length;
};

//This function will render the values on to the web page
stats.renderCounts = function () {
  var authorsStats = stats.pluck('author', dataSet);//pluck function called
  var bodies = stats.pluck('articleBody', dataSet);//pluck function called
  var countBodies = bodies.map(stats.mapSplit);//mapSplit function called
  var $array = $.unique(authorsStats);
  $('#stats').append($array.length);
  // $('#stats-body').append(countBodies);
};

stats.placeArticlesNumber = function() {
  $('stats').append(dataSet.length);
};

// function $numberOfArticles(articles) {
//   return $('<p>Number of article: ' + ariticles.length + '</p>');
// };

$(document).ready(function() {
  stats.renderCounts();
  stats.placeArticlesNumber();
  // $.getJSON('scripts/hackeripsum.json', dataSet);
});
