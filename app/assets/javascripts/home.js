$(function () {
  var hash = location.hash.substr(1);

  /* nav sticky */
  var $nav = $('.cc-nav'),
      navTop = $('.cc-nav').offset().top,
      navStuck = false;

  function checkNavHeight() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop < navTop && navStuck) {
      $nav.removeClass('stuck');
      navStuck = false;
    }
    else if (scrollTop >= navTop && !navStuck) {
      $nav.addClass('stuck');
      navStuck = true;
    }
  }
  checkNavHeight();
  $(window).scroll(checkNavHeight);

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

