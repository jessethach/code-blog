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

// Calling sortRawData and render methods
$(document).ready(function() {
  blog.sortRawData();
  blog.render();
  blog.shortenArticles();
});
