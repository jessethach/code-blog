// Creating Article object
var Article = function(obj) {
  this.blogTitle = obj.blogTitle;
  this.author = obj.author;
  this.authorUrl = obj.authorUrl;
  this.category = obj.category;
  this.publishedOn = obj.publishedOn;
  this.articleBody = obj.articleBody;
};

Article.categories = [];
Article.authors = [];

// Creating a function in the constructor to clone html markup and populate it with new data
Article.prototype.toHTML = function () {
  Article.categories.push(this.category);
  Article.authors.push(this.author);
  this.publishedOn = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000); //Credit to Ivan Storck
  var html = this.compiled(this);
  $('.article-home').append(html);
};


// Article.prototype.insertRecord = function(a) {
//   webDB.execute(
//     html5sql.process(
//       [
//         {
//           'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, articleBody) VALUES (?, ?, ?, ?, ?, ?);',
//           'data': [a.title, a.author, a.authorUrl, a.category, a.publishedOn, a.articleBody],
//         }
//       ],
//       function () {
//         console.log('Success inserting record for ' + a.title);
//       })
//   );
// };
//
//
// Article.prototype.insertRecord = function(callback) {
//   // insert article record into database
//   webDB.execute(
//     // TODO: Add SQL here...
//     ,
//     callback
//   );
// };
//
// Article.prototype.updateRecord = function(callback) {
//   //update article record in databse
//   webDB.execute(
//     // TODO: Add SQL here...
//     ,
//     callback
//   );
// };
//
// Article.prototype.deleteRecord = function(callback) {
//   // Delete article record in database
//   webDB.execute(
//     // TODO: Add SQL here...
//     ,
//     callback
//   );
// };
//
// Article.prototype.truncateTable = function(callback) {
//   // Delete all records from given table.
//   webDB.execute(
//     // TODO: Add SQL here...
//     ,
//     callback
//   );
// };

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
