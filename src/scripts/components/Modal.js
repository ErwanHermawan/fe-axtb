/* ------------------------------------------------------------------------------
@name: Modal
@description: Modal
--------------------------------------------------------------------------------- */

// --- utilities
import {
  Scrolllable,
  BrowserCheck
} from 'utilities';

// --- Modal
const Modal = (() => {

  // --- handle set data
  const handleGetData = () => {
    $('.js-show-modal').on('click', (e) => {
      let _this = $(e.currentTarget),
      _parents = _this.parents('body'),
      _name =$('.js-prod-d').attr('data-product-name'),
      _image =$('.js-prod-d').attr('data-product-image');
      if (_parents.hasClass('modal-show')) {
        $('.modal__card__img__el').attr({
          'src': _image,
          'alt': _name
        });
        $('.modal__card__ttl').text(_name);
      }
    });
  }


  // --- handle click modal
  const handleShowModal = () => {
    $('.js-show-modal').on('click', (e) => {
      let _this = $(e.currentTarget),
      _target = _this.attr('data-target'),
      _parents = _this.parents('body'),
      _name =$('.js-prod-d').attr('data-product-name'),
      _image =$('.js-prod-d').attr('data-product-image');

      if (_parents.hasClass('modal-show')) {
        _parents.removeClass('modal-show');
        Scrolllable.enable();
      } else {
        _parents.addClass('modal-show');
        Scrolllable.disable();
        $('[data-modal="'+ _target +'"]').fadeIn(300);
      }
    });
  }

  // --- handle keyup modal
  const handleHideModal = () => {
    $('body').on('click', '.js-hide-modal', function() {
      if ($('body').hasClass('modal-show')) {
        $('body').removeClass('modal-show');
        Scrolllable.enable();
        $('.modal').fadeOut(300);
      }
    });

    // handle click body
    $('body').on('click', (e) => {
      if ($('body').hasClass('modal-show')) {
        $('body').removeClass('modal-show');
        Scrolllable.enable();
        $('.modal').fadeOut(300);
      }
    });

    // stop progation
    $('body').on('click', '.js-show-modal, .modal__cntnt', (e) => {
      e.stopPropagation();
    });

    $('body').on('keyup', (e) => {
      if (e.which == 27 && $('body').hasClass('modal-show')) {
        $('body').removeClass('modal-show');
        Scrolllable.enable();
        $('.modal').fadeOut(300);
      }
    });
  }

  // --- init
  const init = () => {
    if ($('.js-show-modal').length || $('.js-prod-d').length) {
      handleShowModal();
      handleHideModal();
      handleGetData();
    }

  }

  // --- return
  return {
    init
  }

})();

export default Modal;
