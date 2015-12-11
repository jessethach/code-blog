blog = {};

// Creating empty articles array
blog.articles = [];
blog.arcticles = [];

blog.loadArticles = function() {
  $.get('templates/articles.handlebars', function(data, message, xhr) {
    Article.prototype.template = Handlebars.compile(data);
    $.ajax({
      type: 'HEAD',
      url: 'scripts/blogArticles.json',
      success: blog.fetchArticles
    });
  });
};

blog.fetchArticles = function(data, message, xhr) {
  var eTag = xhr.getResponseHeader('eTag');
  if (typeof localStorage.articlesEtag == 'undefined' || localStorage.articlesEtag != eTag) {
    console.log('cache miss!');
    localStorage.articlesEtag = eTag;

    // Remove all prior articles from the DB, and from blog:
    blog.articles = [];
    webDB.execute(
      'DELETE FROM articles;',//DESTROYS EVERYTHING before fetching JSON
      blog.fetchJSON);
  } else {
    console.log('cache hit!');
    blog.fetchFromDB();
  }
};

blog.fetchJSON = function() {
  $.getJSON('scripts/hackeripsum.json', blog.updateFromJSON);
};

// Callback for fetchJSON; drop old records and insert new into db and blog object:
blog.updateFromJSON = function (data) {
  // Iterate over new article JSON:
  data.forEach(function(item) {
    // Instantiate an article based on item from JSON:
    var article = new Article(item);

    // Add the article to blog.articles
    blog.articles.push(article);

    // Cache the article in DB
    article.insertRecord();
  });
  blog.initArticles();
};

blog.fetchFromDB = function(callback) {
  callback = callback || function() {};

  // Fetch all articles from db.
  webDB.execute(
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function (resultArray) {
      resultArray.forEach(function(ele) {
        blog.articles.push(new Article(ele));
      });

      blog.initArticles();
      callback();
    }
  );
};

// blog.initArticles = function() {
//   // blog.sortArticles(); NOT NECESSARY
//
//   // Only render if the current page has somewhere to put all the articles
//   if ($('#article-sect').length) {
//     blog.render();
//   }
// };


// Sorting the raw data using a callback method; OLD CODE
// blog.sortRawData = function() {
//   blog.rawData.sort(function(a, b) {
//     if (a.publishedOn > b.publishedOn) {return -1;}
//     if (a.publishedOn < b.publishedOn) {return 1;}
//     return 0;
//   });
// };

//BLog object that will render the articles
// blog.render = function() {
//   blog.articles.forEach(blog.appendArticle);


//   $('pre code').each(function(i, block) {
//     hljs.highlightBlock(block);
//   });
//
//   blog.setTeasers();
//   blog.populateFilters();
// };

// blog.appendArticle = function(a) {
//   $('#article-sect').append((new Article(a)).toHtml());
// };

blog.clearAndFetch = function () {
  blog.articles = [];
  blog.fetchFromDB(blog.exportJSON);
};

//For loop to call each object; OLD CODE
// blog.render = function() {
//   for (var i = 0; i < blog.rawData.length; i++) {
//     var art = new Article(blog.rawData[i]);
//     // art.toHTML();
//     Article.categories = Article.categories.unique();
//     Article.authors = Article.authors.unique();
//   }
// };

//Function that will render the data that is taken from raw data; OLD CODE
// blog.compileTemplate = function() {
//   $.get( 'templates/articles.handlebars', function(data) {
//     Article.prototype.compiled = Handlebars.compile(data);
//   }).done(function() {
//     blog.render();
//   });
// };

// blog.initNewArticlePage

//Creating function to populate select menu with unique array of categories; OLD CODE
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

//After lead-in paragraph, reveal only on button click; OLD CODE
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

//Creating a select list event listeners; OLD CODE
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

//OLD CODE
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

//Creating a tab method;
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
