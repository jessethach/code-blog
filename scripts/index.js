// Calling sortRawData and render methods
$(document).ready(function() {
  blog.sortRawData();
  blog.render();
});

//After lead-in paragraph, reveal only on button click
blog.shortenArticles = function () {
  $('article p:not(first-child)').hide();
  $('main').on('click', '.read-more', function(event) {
    event.preventDefault();
    $(this).siblings().find('p').show(); //can also use fade in
    $(this).hide();
  });
};
