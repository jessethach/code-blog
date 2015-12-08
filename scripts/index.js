// Calling sortRawData and render methods
$(document).ready(function() {
  blog.sortRawData();
  blog.compileTemplate();
  blog.shortenArticles();
  blog.toSelect(Article.categories);
  blog.toSelect(Article.authors);
  blog.selectListCat();
  blog.selectListAuth();
  blog.aboutTab();
  blog.articlesTab();
});
