$(function () {
  var hash = location.hash.substr(1);

  /* fix emails */
  $('email').each(function () {
    var email = this.innerHTML.split(' ');
    $(this).text(
      email[0] + '@' + email[1] + '.' + email[2]
    );
  });

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
      $sectionLinks = $('.cc-section-link'),
      $bioLink = $('.cc-bio-link'),
      $introLink = $('.cc-intro-link'),
      $exitLink = $('.cc-exit-link'),
      rightColWidth = $('.cc-col-r').width(),
      currentEntry = 0;

  function showBio() {
    $links.removeClass('selected');
    $sectionLinks.removeClass('selected');
    $bioLink.addClass('selected');

    $('.cc-entry-book-wrap').fadeOut();
    $('.cc-participant-bio').fadeIn();
    $('.cc-participant-exit').fadeOut();
    $('.cc-participant-intro').fadeOut();
  }

  function showIntro(immediate) {
    var fadeTime = (immediate) ? 0 : 200;

    $links.removeClass('selected');
    $sectionLinks.removeClass('selected');
    $introLink.addClass('selected');

    $('.cc-entry-book-wrap').fadeOut(fadeTime);
    $('.cc-participant-bio').fadeOut(fadeTime);
    $('.cc-participant-exit').fadeOut(fadeTime);
    $('.cc-participant-intro').fadeIn(fadeTime);
  }

  function showExit(immediate) {
    var fadeTime = (immediate) ? 0 : 200;

    $links.removeClass('selected');
    $sectionLinks.removeClass('selected');
    $exitLink.addClass('selected');

    $('.cc-entry-book-wrap').fadeOut(fadeTime);
    $('.cc-participant-bio').fadeOut(fadeTime);
    $('.cc-participant-exit').fadeIn(fadeTime);
    $('.cc-participant-intro').fadeOut(fadeTime);
  }

  function showBioHistory() {
    if (useHistory) {
      history.pushState({obj: 'bio'}, '', $(this).attr('href'));
      showBio();
      return false;
    }
  }

  function showIntroHistory() {
    if (useHistory) {
      history.pushState({obj: 'intro'}, '', $(this).attr('href'));
      showIntro();
      return false;
    }

    return hashRedirect(this);
  }

  function showExitHistory() {
    if (useHistory) {
      history.pushState({obj: 'exit'}, '', $(this).attr('href'));
      showExit();
      return false;
    }

    return hashRedirect(this);
  }

  function setPageHeight(i) {
    var entryHeight = $('.cc-entry').eq(i).height();
    $('.cc-entry-book').css('height', entryHeight + 30);
  }

  function showEntry(i, immediate) {
    var animationTime = (immediate) ? 0 : 200;

    $('.cc-participant-bio').fadeOut(animationTime);
    $('.cc-entry-book-wrap').fadeIn(animationTime);
    $('.cc-participant-exit').fadeOut(animationTime);
    $('.cc-participant-intro').fadeOut(animationTime);

    setPageHeight(i);

    $('.cc-entry-book').animate({left: -i * rightColWidth}, animationTime, function () {
      setPageHeight(i);
    });

    $(window).scrollTop(0);
    currentEntry = i;

    $sectionLinks.removeClass('selected');
    $links.removeClass('selected');
    $links.eq(i).addClass('selected');
  }

  function hashRedirect(el) {
    var params = el.href.split('/');

    if (window.history && params[5]) {
      params[4] = params[4] + '#' + params[5];
      params.splice(5, 1);
      location = params.join('/');
      return false;
    }

    return true;
  }

  function changeHistory() {
    var params = this.href.split('/'),
        id = parseInt(params[6], 10);

    if (useHistory) {
      history.pushState({obj: 'entry', id: id}, '', this.href);
      showEntry(id);
      return false;
    }

    return hashRedirect(this);
  }

  function showEntryByHash() {
    if (location.hash) {
      var path = location.pathname + '/' + location.hash.substr(1);
      if (location.hash.indexOf('entries') === 1) {
        var i = parseInt(location.hash.substr(9), 10);
        history.replaceState({obj: 'entry', id: i}, '', path);
        showEntry(i, true);
      }
      else if (location.hash.indexOf('intro') === 1) {
        history.replaceState({obj: 'intro'}, '', path);
        showIntro(true);
      }
      else if (location.hash.indexOf('exit') === 1) {
        history.replaceState({obj: 'exit'}, '', path);
        showExit(true);
      }
    }
    else {
      var items = pathItems(),
          item = items[3];

      if (!item) {
        $introLink.addClass('selected');
      }
      else if (item === 'intro') {
        $introLink.addClass('selected');
      }
      else if (item === 'exit') {
        $exitLink.addClass('selected');
      }
      else if (item === 'entries') {
        $links.eq(items[4]).addClass('selected');
      }
    }
  }
  showEntryByHash();

  function pathItems() {
    return location.pathname.split('/');
  }

  function pathState() {
    var items = pathItems();
    return items[3];
  }

  function popHistory(event) {
    if (popHistory.initial) {
      return;
    }

    var state = event.state;

    if (state) {
      if (state.obj === 'entry') {
        showEntry(state.id);
      }
      else if (state.obj === 'intro') {
        showIntro();
      }
      else if (state.obj === 'exit') {
        showExit();
      }
    }
    else {
      showBio();
    }

    gTrack(location.pathname);
  }

  // set history event and prevent it from firing onload
  if (useHistory) {
    popHistory.initial = true;
    window.onpopstate = popHistory;
    setTimeout(function () {
      popHistory.initial = false;
    }, 500);
  }

  function setEntryHash(path) {
    if (useHistory) {
      var path = location.pathname.split('/').slice(0, 3).join('/') + '/entries/' + currentEntry;
      history.pushState({obj: 'entry', id: currentEntry}, '', path);
    }
  }

  $bioLink.click(showBioHistory);
  $introLink.click(showIntroHistory);
  $exitLink.click(showExitHistory);
  $links.click(changeHistory);

  $('.cc-entry-book').css({width: $links.length * rightColWidth});

  function pageLeft() {
    var obj;

    if (history && history.state) {
      obj = history.state.obj;
    }
    else {
      obj = pathState();
    }

    if (obj === 'intro') {

    }
    else if (obj === 'exit') {
      showEntry($links.length - 1);
      setEntryHash();
      return false;
    }
    else if (currentEntry > 0 && useHistory) {
      showEntry(currentEntry - 1);
      setEntryHash();
      return false;
    }
    else if (useHistory) {
      showIntroHistory();
      return false;
    }
  }

  function pageRight() {
    if (useHistory) {
      var obj = history.state.obj;

      console.log('hi', obj);

      if (obj === 'intro') {
        showEntry(0);
        setEntryHash();
        return false;
      }
      else if (currentEntry < $links.length - 1) {
        showEntry(currentEntry + 1);
        setEntryHash();
        return false;
      }
      else if (currentEntry === $links.length - 1) {
        showExitHistory();
        return false;
      } else if (obj === 'exit') {
        location = "/participants/"
        return false;
      }
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
  });


  /* tumblr */
  if (typeof Tumblr !== 'undefined' && Tumblr.use) {
    $.ajax({
      dataType: 'jsonp',
      url: 'http://api.tumblr.com/v2/blog/catcalled.tumblr.com/posts',
      data: {
        id: Tumblr.post,
        api_key: Tumblr.key
      },
      success: function (ret) {
        if (ret && ret.meta.status === 200)  {
          console.log(ret);
          $('.cc-profiles').html(JST.tumblr(ret.response.posts[0]));
        }
      }
    });
  }

});

