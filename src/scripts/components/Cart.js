/* ------------------------------------------------------------------------------
@name: Cart
@description: Cart
--------------------------------------------------------------------------------- */

// --- variables
import {
  API_URL,
  WEB_URL
} from 'variables';

// --- utilities
import {
  Session,
  Currency
} from 'utilities';

// --- Cart
const Cart = (() => {
  // --- get userdata
  const _userData = JSON.parse(Session.get('userData'));

  // --- handleGetData
  const handleGetData = () => {
    if (_userData) {
      let _email = _userData.email;

      $.ajax({
        url: API_URL.orderCart,
        type: 'POST',
        dataType: 'JSON',
        data: {
          'email': _email,
        },
        success: function(data) {
          if (data.code === 200) {
            const _data = data.data;
            if (data.data.total > 0) {
              let _cartItem = '',
                  _cartSummary = '',
                  _totalPriceSummary = 0,
                  _totalDiscountSummary = 0,
                  _elNote = '';

              $.each(_data.list, (i, v) => {

                // handle discount
                let _strDiscount = `<p class="cart__item__price">${Currency.idr_format(v.price)}</p>`;
                if (v.discount !== 0) {
                  const _totalDiscount = v.discount * v.price / 100;
                  const _priceDiscount = v.price - _totalDiscount;
                  _totalDiscountSummary += (_totalDiscount * v.total);
                  _strDiscount = `<p class="cart__item__discount"><span>${v.discount}%</span>${Currency.idr_format(v.price)}</p>
                                  <p class="cart__item__price">${Currency.idr_format(_priceDiscount)}</p>`;
                }

                _totalPriceSummary += (v.price * v.total);

                // handle note
                if (v.note) {
                  _elNote = `<p class="cart__item__desc">${v.note}</p>
                  <button class="btn-text js-show-note" type="button">Ubah</button>`;
                } else {
                  _elNote = `<button class="btn-text js-show-note" type="button">Tulis Catatan</button>`;
                }

                // set cart list
                _cartItem += `<div class="cart__item" data-id="${v.id}">
                                <div class="cart__store">
                                  <div class="checkbox">
                                    <label class="checkbox__lbl" for="check-store-${v.id}">
                                      <input type="checkbox" name="check-store-${v.id}" id="check-store-${v.id}">
                                      <span class="checkbox__area"></span>
                                    </label>
                                  </div>
                                  <div class="cart__store__txt">
                                    <p class="cart__store__name">Indah Jaya Kaos</p>
                                    <p class="cart__store__addr">Bandung </p>
                                  </div>
                                </div>
                                <div class="cart__item__prod">
                                  <div class="cart__item__row">
                                    <div class="cart__item__top">
                                      <div class="checkbox">
                                        <label class="checkbox__lbl" for="check-item-${v.id}">
                                          <input type="checkbox" name="check-item-${v.id}" id="check-item-${v.id}">
                                          <span class="checkbox__area"></span>
                                        </label>
                                      </div>
                                      <div class="cart__item__img">
                                        <img class="cart__item__img__el" src="${v.image}" alt="${v.name}">
                                      </div>
                                      <div class="cart__item__txt">
                                        <h4 class="cart__item__ttl">${v.name}</h4>
                                        ${_strDiscount}
                                      </div>
                                    </div>
                                    <div class="cart__item__bot">
                                      <div class="cart__item__detail">
                                        ${_elNote}
                                      </div>
                                      <div class="cart__item__control">
                                        <button class="btn-icon js-delete-order" type="button">
                                          <i class="mdi mdi-trash-can-outline"></i>
                                        </button>
                                        <div class="qty js-qty">
                                          <span class="qty__btn qty__btn--dec mdi mdi-minus"></span>
                                          <input class="qty__inp js-total" type="number" min="1" name="qty" id="qty" value="${v.total}" autocomplete="off">
                                          <span class="qty__btn qty__btn--inc mdi mdi-plus"></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>`;
              });

              $('.js-cart-list').html(_cartItem);

              // set cart summary
              let _elementDiscountSummary = '';
              let _grandTotalSummary = _totalPriceSummary;
              if (_totalDiscountSummary !== 0) {
                _elementDiscountSummary = `<li class="cart__summary__item">
                                            <p class="cart__summary__txt__left">Total Diskon Barang</p>
                                            <p class="cart__summary__txt__right">${Currency.idr_format(_totalDiscountSummary)}</p>
                                          </li>`;
                _grandTotalSummary -= _totalDiscountSummary;
              }

              _cartSummary += `<div class="cart__summary">
                                <h4 class="cart__summary__ttl">Ringkasan belanja</h4>
                                <ul class="cart__summary__list">
                                  <li class="cart__summary__item">
                                    <p class="cart__summary__txt__left">Total Harga (${_data.total} barang)</p>
                                    <p class="cart__summary__txt__right">${Currency.idr_format(_totalPriceSummary)}</p>
                                  </li>
                                  ${_elementDiscountSummary}
                                </ul>
                                <div class="cart__summary__result">
                                  <div class="cart__summary__txt">
                                    <p class="cart__summary__txt__left">Total Harga</p>
                                    <p class="cart__summary__txt__right">${Currency.idr_format(_grandTotalSummary)}</p>
                                  </div><button class="btn btn--primary btn--block" type="button">Beli (${_data.total})</button>
                                </div>
                              </div>`;

              $('.js-cart-summary').html(_cartSummary);

            } else {
              let _cartEmpty = `<div class="cart__empty">
                                  <div class="cart__img">
                                    <img class="cart__img__el" src="http://localhost:3000/assets/img/dummy/empty-cart.svg" alt="empty cart">
                                  </div>
                                  <div class="cart__txt">
                                    <h2 class="cart__txt__ttl">Wah, keranjang belanjamu kosong </h2>
                                    <p class="cart__txt__desc">Yuk, isi dengan barang-barang impianmu!</p>
                                    <a class="btn btn--primary" href="index.html">Mulai Belanja</a>
                                  </div>
                                </div>`;
             $('.cart .cart__wrapper').html(_cartEmpty);
            }
          }
        }
      });
    } else {
      location.href = WEB_URL.login;
    }
  }

  // --- handleNote
  const handleNote = () => {
    $('body').on('click', '.js-show-note', (e) => {
      let _this = $(e.currentTarget),
      _note = _this.parents('.cart__item__detail').find('.cart__item__desc').text(),
      _inputEl = `<div class="cart__item__note">
      <label class="cart__item__label"> Tulis Catatan untuk Barang ini</label>
                    <textarea class="cart__item__textarea js-change-note" type="text" name="note" autofocus="autofocus" maxlength="160" style="height:42px">${_note}</textarea>
                    <p class="cart__item__count">0/160</p>
                    </div>`;
      if (!_this.parents('.cart__item__detail').hasClass('show-note')) {
        _this.parents('.cart__item__detail').addClass('show-note');
        _this.parents('.cart__item__detail').html(_inputEl);
      }
    });

    $('body').on('blur', '.js-change-note', (e) => {
      let _this = $(e.currentTarget),
      _parent = _this.parents('.cart__item__detail'),
      _note = _parent.find('.js-change-note').val(),
      _inputEl = `<p class="cart__item__desc">${_note}</p><button class="btn-text js-show-note" type="button">Ubah</button>`;

      if (_parent.hasClass('show-note')) {
        _parent.removeClass('show-note');
        _this.parents('.cart__item__detail').html(_inputEl);
      }
    });
  }

  const handleDeleteCart = () => {
    $('body').on('click', '.js-delete-order', (e) => {
      const _this =$(e.currentTarget),
            _email = _userData.email,
            _productID = [_this.parents('.cart__item').attr('data-id')];
      if (confirm("Apakah anda yakin menghapus produk ini dari keranjang!")) {
        $.ajax({
          url: API_URL.orderDelete,
          type: 'POST',
          dataType: 'JSON',
          data: {
            'email': _email,
            'productID': _productID
          },
          success: function (data) {
            if (data.code === 200) {
              location.reload();
            } else {
              alert('Data gagal di proses!');
            }
          },
          error: (response) => {
            alert('Data gagal di proses!');
          }
        });
      }
    });

    $('.js-delete-cart').on('click', (e) => {
      const _this =$(e.currentTarget),
            _email = _userData.email,
            _productID = handleCheckedCart();
      if (confirm("Apakah anda yakin menghapus produk ini dari keranjang!")) {
        $.ajax({
          url: API_URL.orderDelete,
          type: 'POST',
          dataType: 'JSON',
          data: {
            'email': _email,
            'productID': _productID
          },
          success: function (data) {
            if (data.code === 200) {
              location.reload();
            } else {
              alert('Data gagal di proses!');
            }
          },
          error: (response) => {
            alert('Data gagal di proses!');
          }
        });
      }
    });
  }

  const handleCountChecked = () => {
    $('#check-all-items').on('click', (e) => {
      if ($('#check-all-items:checked')) {
        $('.js-delete-cart').fadeIn();
        $('.js-cart-list input[type=checkbox]').attr('checked', 'checked');
      } else {
        if ($('.js-cart-list input[type=checkbox]').is(":checked")) {
          $('.js-cart-list input[type=checkbox]').removeAttr('checked');
        }
        $('.js-delete-cart').fadeOut();
      }
    });

    $('body').on('click', '.js-cart-list input[type=checkbox]', (e) => {
      const _checkbox = $('.js-cart-list input[type=checkbox]'),
            _checked = $('.js-cart-list input:checked');
      if (_checked) {
        $('.js-delete-cart').fadeIn();
        if (_checked.length === _checkbox.length) {
          $('#check-all-items').attr('checked', 'checked');
        } else {
          $('#check-all-items').removeAttr('checked');
        }
      } else {
        $('.js-delete-cart').fadeOut();
      }
    });
  }

  // --- init
  const init = () => {
    if ($('.js-cart-list').length || $('.js-show-note').length) {
      handleGetData();
      handleNote();
      handleDeleteCart();
      handleCountChecked();
    }
  }

  // --- return
  return {
    init
  }

})();

export default Cart;
