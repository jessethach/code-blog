if (typeof blog === 'undefined') {
  var blog = {};
}

// Creating empty articles array
blog.articles = [];
blog.arcticlesReal = [];

blog.fetchJSON = function() {
  $.getJSON('scripts/hackeripsum.json', blog.updateFromJSON);
};

// Drop old records and insert new into db and blog object:
blog.updateFromJSON = function (data) {
  // Iterate over new article JSON:
  data.forEach(function(item) {
    // Instantiate an article based on item from JSON:
    var article = new Article(item);

    // Add the article to blog.articles
    blog.articlesReal.push(article);

    // Cache the article in DB
    // TODO: Trigger SQL here...
  });
  blog.initArticles();
};

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

//Function that will render the data that is taken from raw data
blog.compileTemplate = function() {
  $.get( 'templates/articles.handlebars', function(data) {
    Article.prototype.compiled = Handlebars.compile(data);
  }).done(function() {
    blog.render();
  });
};

//Creating function to populate select menu with unique array of categories
blog.toSelect = function (array) {
  for (var i = 0; i < array.length; i++) {
    if (array === Article.categories) { //If array in the instance matched the unique categories array, then populate
      var $optFirst = $('<option></option>');
      var $categorySelect = $('#filter-cat');
      $optFirst.attr('value', array[i]);
      $optFirst.attr('id', array[i]);
      $optFirst.text(array[i]);
      $categorySelect.append($optFirst);
    } else if (array === Article.authors) { //If array in the instance matched the unique categories array, then populate
      var $optSecond = $('<option></option>');
      var $authSelect = $('#filter-auth');
      $optSecond.attr('value', array[i]);
      $optSecond.attr('id', array[i]);
      $optSecond.text(array[i]);
      $authSelect.append($optSecond);
    }
  };
};

//After lead-in paragraph, reveal only on button click
blog.shortenArticles = function (event) {
  $('.read-more').css( 'cursor', 'pointer' );
  $('.author-web').css( 'cursor', 'pointer' );
  $('div.body p:not(:first-child)').hide();
  $('main').on('click', '.read-more', function(event) {
    event.preventDefault();
    $(this).parent().find('p').show(); //can also use fade in
    $(this).hide();
  });
};

//Creating a select list event listeners
blog.selectListCat = function() {
  $('#filter-cat').change(function() {
    console.log(this.value);
    $('main').find('article').show();
    $('#filter-auth').find('first-child').attr('selected', true);
    if (this.value === 'none') {
      $(document).ready(function() {
        $('#template').attr('style', 'display:none');
        blog.render();
      });
    } else {
      $('main').find('article:not(:contains(' + this.value + '))').hide();
    //need to find category class
    }
  });
};

blog.selectListAuth = function() {
  $('#filter-auth').change(function() {
    console.log(this.value);
    $('main').find('article').show();
    $('#filter-cat').find('first-child').attr('selected', true);
    if (this.value === 'none') {
      $(document).ready(function() {
        $('#template').attr('style', 'display:none');
        blog.render();
      });
    } else {
      $('main').find('article:not(:contains(' + this.value + '))').hide();
    }
  });
};

//Creating a tab method
blog.aboutTab = function () {
  $('.nav-item').css( 'cursor', 'pointer' );
  $('#tab-about').hide();
  $('main').on('click', '#about', function(event) {
    event.preventDefault();
    $('#tab-about').show();
    $('#article-sect').fadeOut();
  });
};
//Creating articles tab method
blog.articlesTab = function () {
  // $('#tab-about').hide();
  $('main').on('click', '#articles-tab', function(event) {
    event.preventDefault();
    $('#article-sect').fadeIn();
    $('#tab-about').fadeOut();
  });
};


/////////////////////////////////////////////////////////////////

// blog.fetchJSON = function() {
//   $.getJSON('scripts/blogArticles.json', blog.updateFromJSON);
// };
//
// blog.fethFromDbB = function (callback) {
//   callback = callback || function(ele) {
//
//   }
// };
