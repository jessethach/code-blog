// Creating blog object
var blog = {};
blog.articles = [];

// Sorting the raw data using a callback method
blog.sortRawData = function() {
  blog.rawData.sort(function(a, b) {
    if (a.publishedOn > b.publishedOn) {return -1;}
    if (a.publishedOn < b.publishedOn) {return 1;}
    return 0;
  });
};

//For loop to call each object
blog.render = function() {
  for (var i = 0; i < blog.rawData.length; i++) {
    var art = new Article(blog.rawData[i]);
    art.toHTML();
  }
};
