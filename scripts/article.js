// // Creating Article object; OLD CODE
// var Article = function(obj) {
//   this.blogTitle = obj.blogTitle;
//   this.author = obj.author;
//   this.authorUrl = obj.authorUrl;
//   this.category = obj.category;
//   this.publishedOn = obj.publishedOn;
//   this.articleBody = obj.articleBody;
// };
//
// Article.categories = [];//OLD CODE
// Article.authors = [];//OLD CODE

function Article (opts) {
  Object.keys(opts).forEach(function(propName, index, keys) {
    this[propName] = opts[propName];
  },this);

  this.body = opts.body || marked(this.markdown);
}

Article.prototype.template = '';

// Creating a function in the constructor to clone html markup and populate it with new data
Article.prototype.toHTML = function () {
  // Article.categories.push(this.category);
  // Article.authors.push(this.author);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000); //Credit to Ivan Storck

  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return this.template(this);
  // var html = this.compiled(this);
  // $('.article-home').append(html);
};


Article.prototype.insertRecord = function(a) {
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown],
      }
    ],
      function () {
        console.log('Success inserting record for ' + this.title);
      }
  );
};

Article.prototype.updateRecord = function(callback) {
  //update article record in databse
  webDB.execute(
    [
      {
        'sql': 'UPDATE articles SET title=?, author=?, authorUrl=?, category=?, publishedOn=?, markdown=? WHERE id=?;',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown, this.id],
      }
    ],
    function () {
      console.log('Success updating record for ' + this.title);
    }
  );
};

Article.prototype.deleteRecord = function(callback) {
  // Delete article record in database
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM articles WHERE id=?;',
        'data': [this.id],
      }
    ],
      function () {
        console.log('Success deleting record');
      }
  );
};

Article.prototype.truncateTable = function(callback) {
  // Delete all records from given table.
  webDB.execute(
    'TRUNCATE TABLE articles;',
    function() {
      // on success
      console.log('Success setting up tables.');
    }
  );
};

// Credit to http://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array //OLD CODE
// Array.prototype.contains = function(v) {
//   for(var i = 0; i < this.length; i++) {
//     if(this[i] === v) return true;
//   }
//   return false;
// };
//
// Array.prototype.unique = function () {
//   var arr = [];
//   for(var i = 0; i < this.length; i++) {
//     if(!arr.contains(this[i])) {
//       arr.push(this[i]);
//     }
//   }
//   return arr;
// };
