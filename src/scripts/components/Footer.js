/* ------------------------------------------------------------------------------
@name: Footer
@description: Footer
--------------------------------------------------------------------------------- */

// --- Footer
const Footer = ( () => {

  const _width = 767.98;

  // handleDropDown
  const handleDropDown = () => {
    $('.js-accordion-footer .footer__title').on('click', (e) => {
      const _this = $(e.currentTarget);
      const _parents = _this.parents('.footer__list__item');

      if ($(window).width() <= _width) {
        if (_this.parents('.footer__list__item').hasClass('footer__list__item--show')) {
          _this.parents('.footer__list__item').find('.footer__nav').slideUp(300);
          _this.parents('.footer__list__item').removeClass('footer__list__item--show');
        } else {
          _parents.siblings('.footer__list__item').removeClass('footer__list__item--show').find('.footer__nav').slideUp(300);

          _this.parents('.footer__list__item').find('.footer__nav').slideDown(300);
          _this.parents('.footer__list__item').addClass('footer__list__item--show')
        }
      }
    });
  }

  // handle Destroy Accordion
  const handleDestroyAccordion = () => {
    if ($(window).width() > 575.86) {
      $('.js-accordion-footer .footer__list__item').removeClass('footer__list__item--show').find('.footer__nav').removeAttr('style');
    }
  }

  // handle padding bottom
  const handleFooterSticky = () => {
    const _footer = $('.footer').innerHeight();

    if ($(window).width() > _width) {
      $('.main-site').css('paddingBottom', _footer);
    } else {
      $('.main-site').removeAttr('style');
    }
  }

  const init = () => {
    handleDropDown();
    handleFooterSticky();
  }

  return {
    init,
    destroyAccordion: handleDestroyAccordion,
    footerSticky: handleFooterSticky
  }
})();

export default Footer;
