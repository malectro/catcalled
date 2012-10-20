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
  $('.cc-nav-part-link').click(function (event) {
    var $partsNav = $('.cc-nav-participants');
    if ($partsNav.css('display') === 'none') {
      $partsNav.show();
      $(document.body).one('click', function () {
        $partsNav.hide();
      });
      return false;
    }
    event.preventDefault();
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
      history.pushState({obj: 'bio'}, '', $(this).attr('href'));
      shoBio();
      return false;
    }
  }

  function setPageHeight(i) {
    var entryHeight = $('.cc-entry').eq(i).height();
    $('.cc-entry-book').css('height', entryHeight + 30);
  }

  function showEntry(i, immediate) {
    var animationTime = (immediate) ? 0 : 200;

    $('.cc-participant-bio').fadeOut(animationTime);
    $('.cc-entry-book-wrap').fadeIn(animationTime);

    setPageHeight(i);

    $('.cc-entry-book').animate({left: -i * rightColWidth}, animationTime, function () {
      setPageHeight(i);
    });

    $(window).scrollTop(0);
    currentEntry = i;

    $bioLink.removeClass('selected');
    $links.removeClass('selected');
    $links.eq(i).addClass('selected');

  }

  function changeHistory() {
    var params = this.href.split('/'),
        id = parseInt(params[6], 10);
    if (useHistory) {
      history.pushState({obj: 'entry', id: id}, '', this.href);
      showEntry(id);
      return false;
    }
    else if (window.history && params[5]) {
      params[4] = params[4] + '#' + params[5];
      params.splice(5, 1);
      location = params.join('/');
      return false;
    }
  }

  function showEntryByHash() {
    if (location.hash.indexOf('entries') === 1) {
      console.log(location.hash, location.hash.substr(9), location.hash.substr(1));
      var i = parseInt(location.hash.substr(9), 10);
      history.replaceState({obj: 'entry', id: i}, '', location.pathname + '/' + location.hash.substr(1));
      showEntry(i, true);
    }
  }
  showEntryByHash();

  function popHistory(event) {
    if (popHistory.initial) {
      return;
    }

    var state = event.state;

    if (state && state.obj === 'entry') {
      showEntry(state.id);
      gTrack(location.pathname);
    }
    else if (true || state.obj === 'bio') {
      showBio();
      gTrack(location.pathname);
    }
  }
  if (useHistory) {
    popHistory.initial = true;
    window.onpopstate = popHistory;
    setTimeout(function () {
      popHistory.initial = false;
    }, 500);
  }

  function setEntryHash(path) {
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

  $('.cc-entry-prev').click(changeHistory);
  $('.cc-entry-next').click(changeHistory);


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

