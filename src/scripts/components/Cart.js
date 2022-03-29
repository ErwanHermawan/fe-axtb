/* ------------------------------------------------------------------------------
@name: Cart
@description: Cart
--------------------------------------------------------------------------------- */

// --- Cart
const Cart = (() => {
  const handleFormatNumber = (number, prefix = '') => {
    var _number_string = number.toString().replace(/[^,\d]/g, ''),
    _split = _number_string.split(','),
    _mod = _split[0].length % 3,
    _idr = _split[0].substr(0, _mod),
    _thousands = _split[0].substr(_mod).match(/\d{3}/gi),
    _separator = '',
    _result;

    // if thousands
    if (_thousands) {
      _separator = _mod ? '.' : '';
      _idr += _separator + _thousands.join('.');
    }

    _idr = (_split[1] != undefined ? _idr + ',' + _split[1] : _idr);
    _result = (prefix != undefined ? prefix + _idr : _idr);
    return _result;
  }

  const handlegetData = () => {
    $('.js-button-list').on('click', function() {
      let _phone = $('.js-phone').val();
      $.ajax({
        url: 'https://x-api.alpha-x.id/v1/order-cart',
        type: 'POST',
        dataType: 'JSON',
        data: {
          'phone': _phone,
        },
        success: function(data) {

          if (data.code === 200) {
            let _list_item = '';
            $.each(data.data.product_list, (i, v) => {
              _list_item += `<div class="product-cart__item">
                              <div class="product-cart__wrapper">
                                <div class="product-cart__image"><img class="product-cart__image__el" src="${v.image}" alt="${v.name}" /></div>
                                <div class="product-cart__txt">
                                  <h4 class="product-cart__name">${v.name}</h4>
                                  <div class="product-cart__desc"><span class="product-cart__discount__percent">${v.discount}%</span><del class="product-cart__discount__price">${v.price}</del>
                                    <p class="product-cart__price">Rp80.0000</p>
                                  </div>
                                  <p class="product-cart__total">Total: ${v.total}</p>
                                </div>
                              </div>
                              <p class="product-cart__info">${v.note}</p>
                            </div>`;
            });

            $('.js-result-item').html(_list_item);
          }
        }
      })
    });
  }

  // --- init
  const init = () => {
    handlegetData();
  }

  // --- return
  return {
    init
  }

})();

export default Cart;
