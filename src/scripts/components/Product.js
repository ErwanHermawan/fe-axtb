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

  `<div class="header__right">
    <a class="header__btn__cart" href="cart.html"><i class="mdi mdi-cart"></i><span class="header__btn__badge">16</span></a>
    <div class="header__btn__login"><a class="btn btn--primary btn--header" href="login.html">Masuk
        <i class="fi-arrow-right"></i>
      </a></div>
    <div class="header__user">
      <div class="header__user__img"><img class="header__user__img__el" src="assets/img/dummy/1.jpeg" alt="axtbFeed"></div>
      <p class="header__user__name">John Doe</p>
    </div>
  </div>`

  // handleHeader
  const handleHeader = () => {
    const _userData = JSON.parse(localStorage.getItem('userData'));
    console.log(_userData);

    if (_userData) {
      if (_userData.logged) {
        $('.header__right .header__btn__login').remove();

        const _userProfile = `<div class="header__profile">
                                <a class="header__btn__cart" href="cart.html">
                                  <i class="mdi mdi-cart"></i>
                                </a>
                                <div class="header__user">
                                  <div class="header__user__img">
                                    <img class="header__user__img__el" src="${_userData.profilePicture}" alt="${_userData.fullName}">
                                  </div>
                                  <p class="header__user__name">${_userData.fullName}</p>
                                </div>
                              </div>`;

        $('.header__right').html(_userProfile);
      } else {
        $('.header__right .header__user').remove();
      }
    }
  }

  // --- init
  const init = () => {
    handleCallApi();
    handleHeader();
  }

  // --- return
  return {
    init
  }

})();

export default Product;
