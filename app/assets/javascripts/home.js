$(function () {
  var hash = location.hash.substr(1);

  /* participant selection */
  var $links = $('.cc-participant-links a');
  $links.click(function () {
    $links.removeClass('selected');
    $(this).addClass('selected');
  });
  if (location.hash) {
    $links.removeClass('selected').each(function () {
      if (this.href.search(location.hash) > -1) {
        $(this).addClass('selected');
      }
    });
  }

});

