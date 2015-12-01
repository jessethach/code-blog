// Calling sortRawData and render methods
$(document).ready(function() {
  blog.sortRawData();
  blog.render();
});

//After lead-in paragraph, reveal only on button click
// blog.shortenArticles = function () {
//   $('article p:not(first-child)').hide();
//   $('main').on('click', '.read.on', function(event) {
//     event.preventDefault();
//     $(this).parent().find('p').show(); //can also use fade in
//     $(this).hide();
//   });
// }
