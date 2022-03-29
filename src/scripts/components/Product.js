/* ------------------------------------------------------------------------------
@name: Product
@description: Product
--------------------------------------------------------------------------------- */

// --- Product
const Product = (() => {
  const handleFormatNumber = (number, prefix = 'Rp') => {
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

  const handleCallApi = () => {
    $.ajax({
      url: 'https://x-api.alpha-x.id/v1/product',
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        if (data.code === 200) {
          let _list_product = '';
          $.each(data.data, (i, v) => {
            let _elDiscount = '',
            _discount = (v.discount !== 0 ? v.price - (v.discount/100*v.price) : v.price),
            _review = '';

            if (v.discount !== 0) {
              _elDiscount = `
                <div class="discount">
                  <span class="discount__percent">${v.discount} %</span>
                  <s class="discount__price">${handleFormatNumber(v.price)}</s>
                </div>
              `;
            }

            // $.each(v.review, () => {
            // });

            for (let i = 0; i < v.review; i++){
              _review = '<i class="mdi mdi-star"></i>';
            }

            _list_product += `<div class="product__card">
                                <div class="product__box">
                                  <a class="product__box__link" href="product-detail.html#${v.alias}"></a>
                                  <div class="product__img">
                                    <img class="product__img__el" src="${v.image}" alt="${v.name}"></div>
                                  <div class="product__txt">
                                    <h3 class="product__txt__title">${v.name}</h3>
                                    ${_elDiscount}
                                    <p class="product__txt__price">${handleFormatNumber(_discount)}</p>
                                    <div class="product__txt__bottom">
                                      <p class="product__txt__city">${v.location}</p>
                                      <div class="product__txt__star">
                                        ${_review}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>`;
          });

          $('.js-product-list').html(_list_product);
        } else if(data.code === 400) {

        }
      },
      error: function() {

      }
    });
  }

  // --- init
  const init = () => {
    handleCallApi();
  }

  // --- return
  return {
    init
  }

})();

export default Product;
