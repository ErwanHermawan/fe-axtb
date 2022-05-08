/* ------------------------------------------------------------------------------
@name: ProductDetail
@description: ProductDetail
--------------------------------------------------------------------------------- */

// --- utilities
import {
  Session,
  Currency,
  Scrolllable,
  BrowserCheck
} from 'utilities';

// --- ProductDetail
const ProductDetail = (() => {

  // --- get userdata
  const _userData = JSON.parse(Session.get('userData'));

  // --- handleProductDetail
  const handleProductDetail = () => {
    const _alias = location.hash.split('#')[1];

    $.ajax({
      url: `https://x-api.alpha-x.id/v1/product/${_alias}`,
      type: 'GET',
      dataType: 'JSON',
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
                <s class="discount__price">${Currency.idr_format(_data.price)}</s>
              </div>
            `;
          }

          // set rate
          let _star = `<i class="mdi mdi-star"></i>`;
          for (let i=1; i < Math.round(_data.review); i++) {
            _star += `<i class="mdi mdi-star"></i>`;
          }

          _productDetail = `<div class="product-d__image">
                              <div class="product-d__image__box">
                                <img class="product-d__image__el" src="${_data.image}" alt="${_data.name}" />
                              </div>
                            </div>
                            <div class="product-d__content">
                              <h1 class="product-d__title">${_data.name}</h1>
                              <div class="product-d__review">
                                ${_star}
                                <span>(${_data.review_total})</span>
                              </div>
                              ${_elDiscount}
                              <h4 class="product-d__price">${Currency.idr_format(_discount)}</h4>
                              <div class="product-d__detail">
                                <h6 class="product-d__detail__title">Detail</h6>
                                <div class="product-d__detail__desc">
                                  ${_data.detail}
                                </div>
                              </div>
                              <div class="product-d__store">
                                <div class="product-d__store__img">
                                  <img class="product-d__store__img__el" src="${_data.image}" alt="${_data.shop_name}" />
                                </div>
                                <div class="product-d__store__txt">
                                  <p class="product-d__store__name">${_data.shop_name}</p>
                                  <p class="product-d__store__location">${_data.location}</p>
                                </div>
                              </div>
                              <div class="product-d__checkout">
                                <h6 class="product-d__checkout__title">Pesan Produk</h6>
                                <div class="product-d__checkout__form">
                                  <input class="js-product-id" type="hidden" name="product_id" value="${_data.id}" />
                                  <div class="fi-row">
                                    <label class="fi-label" for="qty">Jumlah</label>
                                  </div>
                                  <div class="fi-row">
                                    <div class="qty js-qty">
                                      <span class="qty__dec mdi mdi-minus qtybtn"></span>
                                      <input class="qty__number" type="number" name="qty" min="1" value="1">
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

  // --- init
  const init = () => {
    if($('.js-product-detail').length || $('.js-add-product').length) {
      handleProductDetail();
    }
  }

  // --- return
  return {
    init
  }

})();

export default ProductDetail;
