// $(function(){
//   //init web DB
//   webDB.init();
//   webDB.setupTables();
  // webDB.importArticlesFrom('scripts/hackeripsum.json');
//   // webDB.insertRecord(blog.rawData);
// });

$(function() {
  //init web DB
  webDB.init();
  webDB.setupTables();

  //Set up the blog with the raw data
  blog.fetchFromDB();

  // blog.initNewArticlePage();
  // blog.watchNewForm();
  //
  // blog.handleAddButton();
  // blog.handleUpdateButton();
  // blog.handleDeleteButton();
});
