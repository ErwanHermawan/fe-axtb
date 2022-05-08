/* ------------------------------------------------------------------------------
@name: AddToCart
@description: AddToCart
--------------------------------------------------------------------------------- */

// --- utilities
import {
  Session,
  Scrolllable,
  BrowserCheck
} from 'utilities';

// --- AddToCart
const AddToCart = (() => {

  // --- get userdata
  const _userData = JSON.parse(Session.get('userData'));

  // --- handleAddToCart
  const handleAddToCart = () => {
    $(document).on('click', '.js-add-product', function () {
      if (!_userData) {
        location.href = 'http://localhost:3000/login.html';
      } else {
        let _productId = $('.js-product-id').val(),
        _email = _userData.email,
        _total = $('input[name="qty"]').val(),
        _note = $('.js-note').val();

        $.ajax({
          url: `https://x-api.alpha-x.id/v1/order-product`,
          type: 'POST',
          dataType: 'JSON',
          data: {
            'productID': _productId,
            'email': _email,
            'total': _total,
            'note': _note,
          },

          success: function(data) {
            if (data.code == 200) {
              handleShowModal();
            } else if(data.code === 400) {
              alert('Failed to add');
            }
          }
        });
      }
    });
  }

  const handleShowModal = () => {
    let _name = $('.product-d__title').text(),
    _image =$('.product-d__image__el').attr('src');

    // show modal
    $('body').addClass('modal-show');
    Scrolllable.disable();
    $('[data-modal="cart-modal"]').fadeIn(300);

    // set data
    if ($('body').hasClass('modal-show')) {
      $('.modal__card__img__el').attr({
        'src': _image,
        'alt': _name
      });
      $('.modal__card__ttl').text(_name);
    }
  }


  // --- init
  const init = () => {
    if($('.js-product-detail').length || $('.js-add-product').length) {
      handleAddToCart();
    }
  }

  // --- return
  return {
    init
  }

})();

export default AddToCart;
