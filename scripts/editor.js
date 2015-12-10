$(function(){
  //init web DB
  webDB.init();
  webDB.setupTables();
  webDB.importArticlesFrom('scripts/hackeripsum.json');
  // webDB.insertRecord(blog.rawData);
});
