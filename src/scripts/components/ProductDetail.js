/* ------------------------------------------------------------------------------
@name: ProductDetail
@description: ProductDetail
--------------------------------------------------------------------------------- */

// --- ProductDetail
const ProductDetail = (() => {
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

  const handleProductDetail = () => {
    const _alias = location.hash.split('#')[1];
    $.ajax({
      url: `https://x-api.alpha-x.id/v1/product-detail`,
      type: 'POST',
      dataType: 'JSON',
      data: {
        'alias': _alias
      },
      success: function(data) {
        if (data.code == 200) {
          const _data = data.data;
          let _productDetail = '',
          _elDiscount = '',
          _discount = (_data.discount !== 0 ? _data.price - (_data.discount/100*_data.price) : _data.price);

          // set discount
          if (_data.discount !== 0) {
            _elDiscount = `
              <div class="discount">
                <span class="discount__percent">${_data.discount} %</span>
                <s class="discount__price">${handleFormatNumber(_data.price)}</s>
              </div>
            `;
          }

          // set rate
          let _star = `<i class="mdi mdi-star"></i>`;
          for (let i=1; i < Math.round(_data.review); i++) {
            _star += `<i class="mdi mdi-star"></i>`;
          }

          _productDetail = `<div class="product-detail__image">
                              <div class="product-detail__image__box"><img class="product-detail__image__el" src="${_data.image}" alt="${_data.name}" />
                            </div>
                            </div>
                            <div class="product-detail__content">
                              <h1 class="product-detail__title">${_data.name}</h1>
                              <div class="product-detail__review">
                                ${_star}
                                <span>(${_data.review_total})</span>
                              </div>
                              ${_elDiscount}
                              <h4 class="product-detail__price">${handleFormatNumber(_discount)}</h4>
                              <div class="product-detail__detail">
                                <h6 class="product-detail__detail__title">Detail</h6>
                                <div class="product-detail__detail__desc">
                                  ${_data.detail}
                                </div>
                              </div>
                              <div class="product-detail__store">
                                <div class="product-detail__store__img"><img class="product-detail__store__img__el" src="assets/img/dummy/1.jpeg" alt="Autofit Penetrating Oil 702 500ml Cairan Perontok Karat Baut dan Besi" /></div>
                                <div class="product-detail__store__txt">
                                  <p class="product-detail__store__name">${_data.shop_name}</p>
                                  <p class="product-detail__store__location">${_data.location}</p>
                                </div>
                              </div>
                              <div class="product-detail__checkout">
                                <h6 class="product-detail__checkout__title">Pesan Produk</h6>
                                <div class="product-detail__checkout__form"><input class="js-product-id" type="hidden" name="product_id" />
                                  <div class="fi-row">
                                    <label class="fi-label" for="qty">Jumlah</label>
                                  </div>
                                  <div class="fi-row">
                                    <div class="qty js-qty">
                                      <span class="qty__dec mdi mdi-minus qtybtn"></span>
                                      <input class="qty__number" type="number" name="jumlah" min="1" value="1">
                                      <span class="qty__inc mdi mdi-plus qtybtn"></span>
                                    </div>
                                  </div>
                                  <div class="fi-row">
                                    <label class="fi-label" for="none">Catatan</label>
                                    <textarea class="fi-multiline js-note" id="none" name="note"></textarea>
                                  </div>
                                  <div class="fi-row">
                                    <button class="btn btn--primary btn--block js-add-product"><i class="mdi mdi-plus"></i>Keranjang</button>
                                  </div>
                                </div>
                              </div>
                            </div>`;

          $('.js-product-detail').html(_productDetail);
        } else if(data.code === 400) {

        }
      },
      error: function() {

      }
    });
  }

  const handleChangeQty = () => {
    $('body').on('click', '.js-qty .qtybtn', function() {
      var _parent = $(this).parents('.js-qty'),
      _val = _parent.find('.qty__number').val(),
      _qty = '';

      if ($(this).hasClass('qty__inc')) {
        _qty = parseFloat(_val) + 1;
      } else if ($(this).hasClass('qty__dec')) {
        if (_val > 1) {
          _qty = parseFloat(_val) - 1;
        } else {
          _qty = 1;
        }
      }
      _parent.find('.qty__number').val(_qty);
    });
  }

  const handleAddToCart = () => {
    $('.js-add-product').on('click', function () {
      let _productId = $('.js-product-id').val(),
      _qty = $('.js-qty').val(),
      _note = $('.js-note').val();

      $.ajax({
        url: `https://x-api.alpha-x.id/v1/order-product`,
        type: 'POST',
        dataType: 'JSON',
        data: {
          'productID': _productId,
          'total': _qty,
          'note': _note,
        },

        success: function(data) {
          if (data.code == 200) {

          }
        }
      });
    });
  }


  // --- init
  const init = () => {
    handleProductDetail();
    handleChangeQty();
    handleAddToCart();
  }

  // --- return
  return {
    init
  }

})();

export default ProductDetail;
