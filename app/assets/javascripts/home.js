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
  var useHistory = window.history && $('.cc-participant-page').hasClass('cc-multi-entry');
      $links = $('.cc-participant-entry-links a'),
      $bioLink = $('.cc-bio-link'),
      rightColWidth = $('.cc-col-r').width(),
      currentEntry = 0;

  function showBio() {
    $links.removeClass('selected');
    $bioLink.addClass('selected');

    $('.cc-entry-book-wrap').fadeOut();
    $('.cc-participant-bio').fadeIn();
  }

  function showBioHistory() {
    if (useHistory) {
      history.pushState({obj: 'bio'}, '', this.href);
      shoBio();
      return false;
    }
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

  function changeHistory() {
    if (useHistory) {
      var params = this.href.split('/'),
          id = parseInt(params[6], 10);
      console.log(params, id);
      history.pushState({obj: 'entry', id: id}, '', this.href);
      showEntry(id);
      return false;
    }
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

  function popHistory(event) {
    var state = event.state;
    if (state && state.obj === 'entry') {
      showEntry(state.id);
      gTrack(location.pathname);
    }
    else if (true || state.obj === 'bio') {
      showBio();
      gTrack(location);
    }
  }
  if (useHistory) {
    window.onpopstate = popHistory;
  }

  function setEntryHash(path) {
    //location.hash = "#entries/" + currentEntry;
    if (useHistory) {
      history.pushState({ob: 'entry', id: currentEntry}, '', path);
    }
  }

  $bioLink.click(showBioHistory);
  $links.click(changeHistory);

  $('.cc-entry-book').css({width: $links.length * rightColWidth});

  function pageLeft() {
    if (currentEntry > 0 && useHistory) {
      showEntry(currentEntry - 1);
      setEntryHash();
      return false;
    }
  }

  function pageRight() {
    if (currentEntry < $links.length - 1 && useHistory) {
      showEntry(currentEntry + 1);
      setEntryHash();
      return false;
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

