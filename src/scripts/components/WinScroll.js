/* ------------------------------------------------------------------------------
@name: WinScroll
@description: WinScroll
--------------------------------------------------------------------------------- */

// --- WinScroll
const WinScroll = (() => {
  let _lastScrollTop = 0;
  let _delta = 4;
  let _deltaCalc = 4;
  let _headerHeight = $('.header').height() / 2;

  // --- windowTemp
  let _windowTemp = $(window).width();

  // --- handleHeaderScroll
  const handleHeaderScroll = () => {
    // --- _scrollTop
    const _scrollTop = $(window).scrollTop();

    // --- Make sure they scroll more than _delta
    if (Math.abs(_lastScrollTop - _scrollTop) <= _delta) {
      return;
    }

    // --- Scroll Down
    if (_scrollTop > _lastScrollTop && _scrollTop > _headerHeight) {
      $('body').addClass('scroll-down');
    } else {
      // --- Scroll Up
      if (_scrollTop + $(window).height() < $(document).height()) {
        $('body').removeClass('scroll-down');
        if (_scrollTop > _headerHeight) {
          if(!$('body').hasClass('header-on-scroll')) {
            $('body').addClass('header-on-scroll');
          }
        } else {
          $('body').removeClass('header-on-scroll');
        }
      }
    }
    _lastScrollTop = _scrollTop;
  }

  // --- handleScroll
  const handleScroll = () => {
    let _didScroll;

    $(window).scroll(() => {
      _didScroll = true;
      setInterval(() => {
        if (_didScroll) {
          handleHeaderScroll();
          _didScroll = false;
        }
      }, 200);
    });
  }

  // --- init
  const init = () => {
    handleHeaderScroll();
    handleScroll();
  }

  // --- return
  return {
    init
  }

})();

export default WinScroll;
