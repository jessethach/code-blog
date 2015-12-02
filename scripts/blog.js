// Creating empty articles array
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
    Article.authors = Article.authors.unique();
  }
};

//Creating function to populate select menu with unique array of categories
blog.toSelect = function (array) {
  for (var i = 0; i < array.length; i++) {
    if (array === Article.categories) {
      var $optFirst = $('<option></option>');
      var $categorySelect = $('#filter-cat');
      $optFirst.attr('value', array[i]);
      $optFirst.attr('id', array[i]);
      $optFirst.text(array[i]);
      $categorySelect.append($optFirst);
    } else if (array === Article.authors) {
      var $optSecond = $('<option></option>');
      var $authSelect = $('#filter-auth');
      $optSecond.attr('value', array[i]);
      $optSecond.attr('id', array[i]);
      $optSecond.text(array[i]);
      $authSelect.append($optSecond);
    }
  };
};

//Working on method to populate drop down menu
// blog.chooseMenu = function (event) {
//   var $chosen = $('Article.categories');
//   console.log(Article.categories.value);
//   if (Article.categories.value == $chosen) {
//     alert('You must select a condition to continue');
//   } else  {
//     var chosenOne = chosen.options[chosen.selectedIndex].text;
//     console.log(chosenOne);
//   };
// }



//After lead-in paragraph, reveal only on button click
blog.shortenArticles = function (event) {
  $('div.body p:not(:first-child)').hide();
  $('main').on('click', '.read-more', function(event) {
    event.preventDefault();
    $(this).parent().find('p').show(); //can also use fade in
    $(this).hide();
  });
};

// $('div.body p:first-child').css("border", "red solid 3px")
