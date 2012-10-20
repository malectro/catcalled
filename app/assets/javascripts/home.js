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
      $('.cc-nav-logo').fadeOut();
      navStuck = false;
    }
    else if (scrollTop >= navTop && !navStuck) {
      $nav.addClass('stuck');
      $('.cc-nav-logo').fadeIn();
      navStuck = true;
    }
  }
  checkNavHeight();
  $(window).scroll(checkNavHeight);

  /* profiles */
  var $links

  /* nav */
  $('.cc-nav-part-link').click(function () {
    var $partsNav = $('.cc-nav-participants');
    if ($partsNav.css('display') === 'none') {
      $partsNav.show();
      $(document.body).one('click', function () {
        $partsNav.hide();
      });
    }
    return false;
  });
  $('.cc-nav-participants').click(function (event) {
    event.stopPropagation();
  });

  /* participant selection */
  var $links = $('.cc-participant-entry-links a'),
      $bioLink = $('.cc-bio-link'),
      rightColWidth = $('.cc-col-r').width(),
      currentEntry = 0;

  function showBio() {
    $links.removeClass('selected');
    $bioLink.addClass('selected');

    $('.cc-entry-book-wrap').fadeOut();
    $('.cc-participant-bio').fadeIn();
  }

  function setPageHeight(i) {
    var entryHeight = $('.cc-entry').eq(i).height();
    $('.cc-entry-book').css('height', entryHeight + 30);
  }

  function showEntry(i) {
    setPageHeight(i);
    $('.cc-entry-book').animate({left: -i * rightColWidth}, 200, function () {
      setPageHeight(i);
    });

    $(window).scrollTop(0);
    currentEntry = i;

    $bioLink.removeClass('selected');
    $links.removeClass('selected');
    $links.eq(i).addClass('selected');

    $('.cc-participant-bio').fadeOut();
    $('.cc-entry-book-wrap').fadeIn();
  }

  function showEntryByHash() {
    if (location.hash.indexOf('entries') === 1) {
      var i = parseInt(location.hash.substr(9), 10);
      showEntry(i);
      gTrack(location.pathname + location.hash);
    }
    else if (true || location.hash === '#bio') {
      showBio();
      gTrack(location.pathname + location.hash);
    }
  }

  function setEntryHash() {
    location.hash = "#entries/" + currentEntry;
  }

  // hacky hash detection
  window.onhashchange = function () {
    showEntryByHash();
  };
  $bioLink.click(showBio);

  if (location.hash) {
    showEntryByHash();
  }

  $('.cc-entry-book').css({width: $links.length * rightColWidth});

  function pageLeft() {
    if (location.hash !== '#bio' && currentEntry > 0) {
      showEntry(currentEntry - 1);
      setEntryHash();
    }
  }

  function pageRight() {
    if (location.hash !== '#bio' && currentEntry < $links.length - 1) {
      showEntry(currentEntry + 1);
      setEntryHash();
    }
  }

  $('.cc-entry-prev').click(pageLeft);
  $('.cc-entry-next').click(pageRight);


  /* hot keys */
  var hotKeys = {
    //left
    37: pageLeft,
    //right
    39: pageRight,
    //j
    74: pageRight,
    //k
    75: pageLeft
  };
  $(document.body).keydown(function (event) {
    if (hotKeys[event.which]) {
      hotKeys[event.which]();
    }
    console.log(event.which);
  });

});

