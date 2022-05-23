/* ------------------------------------------------------------------------------
@name: Product
@description: Product
--------------------------------------------------------------------------------- */

// --- variables
import {
  API_URL
} from 'variables';

// --- utilities
import {
  Currency
} from 'utilities';

// --- Product
const Product = (() => {

  // ---handleGetData
  const handleGetData = () => {
    $.ajax({
      url: API_URL.product,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        if (data.code === 200) {
          let _list_product = '';
          $.each(data.data, (i, v) => {
            let _elDiscount = '',
            _discount = (v.discount !== 0 ? v.price - (v.discount/100*v.price) : v.price),
            _review = '';

            // set discount
            if (v.discount !== 0) {
              _elDiscount = `
                <div class="discount">
                  <span class="discount__percent">${v.discount} %</span>
                  <s class="discount__price">${Currency.idr_format(v.price)}</s>
                </div>
              `;
            }

            // set rate
            let _star = `<i class="mdi mdi-star"></i>`;
            for (let i=1; i < Math.round(v.review); i++) {
              _star += `<i class="mdi mdi-star"></i>`;
            }

            _list_product += `<div class="product__card">
                                <div class="product__box">
                                  <a class="product__box__link" href="product-detail.html#${v.alias}"></a>
                                  <div class="product__img">
                                    <img class="product__img__el" src="${v.image}" alt="${v.name}"></div>
                                  <div class="product__txt">
                                    <h3 class="product__txt__title">${v.name}</h3>
                                    ${_elDiscount}
                                    <p class="product__txt__price">${Currency.idr_format(_discount)}</p>
                                    <div class="product__txt__bottom">
                                      <p class="product__txt__city">${v.location}</p>
                                      <div class="product__txt__star">
                                        ${_star}
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
    if ($('.js-product-list').length) {
      handleGetData();
    }
  }

  // --- return
  return {
    init
  }

})();

export default Product;
