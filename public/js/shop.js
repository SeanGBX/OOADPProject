
// button amount
$(".like_button").on("click", function() {
    var $count = $(this).parent().find('.count');
    $count.html($count.html() * 1 + 1);
    console.log($("count[value]"))
  });


