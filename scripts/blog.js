// Creating blog object
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
    Article.categories = Article.categories.unique();
  }
};

//Creating function to populate select menu
Article.prototype.toSelect = function () {
  if (this.category == Article.categories) {
    // Vanilla Javascript
    // var categorySelect = document.getElementById("filter-tool");
    // var categoryOption = document.createElement("option");
    // var categoryName = document.createTextNode(this.category);
    // conditionOption.appendChild(categoryName);
    // conditionListLocation.appendChild(conditionOption);
    var $categorySelect = $('#filter-tool');
    var $categoryOption = $('option').clone();
    $categorySelect.removeAttr('id');
    $('.filter-menu').val(this.category).html(this.category).appendTo('#filter-tool');
    $categorySelect.find('.categories').html(this.category);
  }
};
