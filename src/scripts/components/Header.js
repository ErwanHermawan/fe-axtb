/* ------------------------------------------------------------------------------
@name: Header
@description: Header
--------------------------------------------------------------------------------- */
// --- utilities
import {
  Scrolllable
} from 'utilities';

const Header = (() => {

  // --- handleMobileNav
  const handleMobileNav = () => {

    // nav open
    $('.js-nav').on('click', () => {
      if ($('body').hasClass('show-nav')) {
        Scrolllable.enable();
        $('body').removeClass('show-nav');
      } else {
        Scrolllable.disable();
        $('body').addClass('show-nav');
      }
    });
  }

  // --- handleScrollMobileMenu
  const handleScrollMobileMenu = () => {
    $('.js-mobile-menu').on('scroll', (e) => {
      if ($(e.currentTarget).scrollTop() > 4) {
        $('body').addClass('on-scroll-mobile-menu');
      } else {
        $('body').removeClass('on-scroll-mobile-menu');
      }
    });
  }

  // --- handleCheckClass
  const handleCheckClass = () => {
    if ($(window).width() >= 992) {
      Scrolllable.enable();
      $('body').removeClass('show-nav');
    }
  }

  // - init
  const init = () => {
    handleMobileNav();
    handleScrollMobileMenu();
  }

  return {
    init,
    checkClass: handleCheckClass
  }

})();

export default Header
