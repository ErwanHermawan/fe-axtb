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
    if (!_userData) {
      location.href = WEB_URL.login;
    } else {
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
                  _cartGroup = '',
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

                // cart product per store
                _cartItem += `<div class="cart__item__prod" data-id="${v.id}">
                                <div class="cart__item__top">
                                  <div class="checkbox">
                                    <label class="checkbox__lbl" for="${v.id}">
                                      <input type="checkbox" id="${v.id}" value="${v.id}" class="js-select-product" />
                                      <span class="checkbox__area"></span>
                                    </label>
                                  </div>
                                  <div class="cart__item__img">
                                    <img class="cart__item__img__el" src="${v.image}" alt="${v.name}" />
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
                                    <button class="btn-icon js-delete-product" type="button">
                                      <i class="mdi mdi-trash-can-outline"></i>
                                    </button>
                                    <div class="qty js-qty">
                                      <span class="qty__btn qty__btn--dec mdi mdi-minus"></span>
                                      <input class="qty__inp js-total" type="number" min="1" name="qty" id="qty" value="${v.total}" autocomplete="off">
                                      <span class="qty__btn qty__btn--inc mdi mdi-plus"></span>
                                    </div>
                                  </div>
                                </div>
                              </div>`

                // cart group store
                _cartGroup = `<div class="cart__item">
                                <div class="cart__store">
                                  <div class="checkbox">
                                    <label class="checkbox__lbl" for="check-store">
                                      <input type="checkbox" name="check-store" id="check-store" class="js-select-group-products">
                                      <span class="checkbox__area"></span>
                                    </label>
                                  </div>
                                  <div class="cart__store__txt">
                                    <p class="cart__store__name">Indah Jaya Kaos</p>
                                    <p class="cart__store__addr">Bandung </p>
                                  </div>
                                </div>
                                ${_cartItem}
                              </div>`;
              });

              $('.js-cart-list').append(_cartGroup);

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
              const _cartEmpty = `<div class="cart__empty">
                                    <div class="cart__empty__img">
                                      <img class="cart__empty__img__el" src="assets/img/dummy/empty-cart.svg" alt="empty cart">
                                    </div>
                                    <div class="cart__empty__txt">
                                      <h2 class="cart__empty__ttl">Wah, keranjang belanjamu kosong </h2>
                                      <p class="cart__empty__desc">Yuk, isi dengan barang-barang impianmu!</p>
                                      <a class="btn btn--primary" href="index.html">Mulai Belanja</a>
                                    </div>
                                  </div>`;
              $('.cart .cart__wrapper').html(_cartEmpty);
            }
          }
        }
      });
    }
  }

  // --- handleClickSelect
  const handleClickSelect = () => {
    // select single product
    $('body').on('click', '.js-select-product', (e) => {
      const _checkLength = $('.js-select-product').length;
      const _checkedLength = $('.js-select-product:checked').length;

      if (_checkLength === _checkedLength) {
        $('.js-select-all-products').prop('checked', true);
      } else {
        $('.js-select-all-products').prop('checked', false);
      }

      handleToggleDelete();
    });

    // select all products
    $('body').on('click', '.js-select-all-products', (e) => {
      const _isChecked = $(e.currentTarget).is(':checked');

      if (_isChecked) {
        $('.js-select-product').prop('checked', true);
        $('.js-select-group-products').prop('checked', true);
      } else {
        $('.js-select-product').prop('checked', false);
        $('.js-select-group-products').prop('checked', false);
      }

      handleToggleDelete();
    });
  }

  // --- handleToggleDelete
  const handleToggleDelete = () => {
    const _checkLength = $('.js-select-product:checked').length;

    if (_checkLength > 0) {
      $('body').find('.js-delete-all-products').show();
    } else {
      $('body').find('.js-delete-all-products').hide();
    }
  }

  // --- handleDeleteCart
  const handleDeleteCart = () => {
    // delete single product
    $('body').on('click', '.js-delete-product', (e) => {
      const _productID = [$(e.currentTarget).parents('.cart__item__prod').attr('data-id')];

      hanldleDeletData(_productID);
    });

    // delete multiple product
    $('body').on('click', '.js-delete-all-products', (e) => {
      const _productIDArray = [];

      $('.js-select-product').each((i, e) => {
        const  _value = $(e).val();
        _productIDArray.push(_value);
      });

      hanldleDeletData(_productIDArray);
    });
  }

  // --- hanldleDeletData
  const hanldleDeletData = (productID) => {
    if (confirm("Apakah anda yakin menghapus produk ini dari keranjang!")) {
      const _email = _userData.email;
      $.ajax({
        url: API_URL.orderDelete,
        type: 'POST',
        dataType: 'JSON',
        data: {
          'email': _email,
          'productID': productID
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
  }

  // --- handleNote
  const handleNote = () => {
    // handle show note
    $('body').on('click', '.js-show-note', (e) => {
      let _this = $(e.currentTarget),
      _parent = $(_this.parents('.cart__item__detail')),
      _note = _this.parents('.cart__item__detail').find('.cart__item__desc').text(),
      _inputEl = `<div class="cart__item__note">
                    <label class="cart__item__label"> Tulis Catatan untuk Barang ini</label>
                    <textarea class="cart__item__textarea js-change-note" type="text" name="note" autofocus="autofocus" maxlength="160">${_note}</textarea>
                    <p class="cart__item__count">0/160</p>
                  </div>`;

      if (!_parent.hasClass('show-note')) {
        _parent.addClass('show-note');
        _parent.html(_inputEl);
        setTimeout(() => {
          _parent.find('textarea').focus();
        }, 250);
      }
    });

    // count charcter
    $('body').on('keyup', '.js-change-note', (e) => {
      const _this = $(e.currentTarget);
      if (e.key === 'Enter' || e.keyCode === 13) {
        _this.blur();
      }

      // set length character and limit
      const _length = _this.val().length;
      const _limit = _this.attr('maxlength');
      $('.cart__item__count').text(_length+'/'+_limit);
    });

    // handle set note
    $('body').on('blur', '.js-change-note', (e) => {
      let _this = $(e.currentTarget),
      _parent = _this.parents('.cart__item__detail'),
      _productID = _this.parents('.cart__item__prod').attr('data-id'),
      _note = _parent.find('.js-change-note').val(),
      _inputEl = `<p class="cart__item__desc">${_note}</p><button class="btn-text js-show-note" type="button">Ubah</button>`;

      if (_parent.hasClass('show-note')) {
        _parent.removeClass('show-note');
        _this.parents('.cart__item__detail').html(_inputEl);
      }

      handleEditData(_productID, _note)
    });
  }

  const handleEditData = (productID, note) => {
    const _email = _userData.email;

    $.ajax({
      url: API_URL.orderEdit,
      type: 'POST',
      dataType: 'JSON',
      data: {
        'email': _email,
        'productID': productID,
        'note' : note
      },
      success: function (data) {
        if (data.code === 200) {

        } else {
          alert('Data gagal di proses!');
        }
      },
      error: (response) => {
        alert('Data gagal di proses!');
      }
    });
  }

  // --- init
  const init = () => {
    if ($('.js-cart-list').length || $('.js-show-note').length) {
      handleGetData();
      handleNote();
      handleDeleteCart();
      handleClickSelect();
    }
  }

  // --- return
  return {
    init
  }

})();

export default Cart;
