/* ------------------------------------------------------------------------------
@name: Cart
@description: Cart
--------------------------------------------------------------------------------- */

// --- variables
import {
  API_URL
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

  // --- handlegetData
  const handlegetData = () => {
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
            let _data = data.data.list,
            _list_item = '',
            _elDiscount = '';

            $.each(_data, (i, v) => {
              let _discount = (v.discount !== 0 ? v.price - (v.discount/100*v.price) : v.price);

              // set discount
              if (v.discount !== 0) {
                _elDiscount = `
                  <p class="cart__item__discount"><span>${v.discount}</span>${Currency.idr_format(v.price)}</p>
                `;
              }

              _list_item += `<div class="cart__item">
                              <div class="cart__item__head">
                                <p class="cart__item__store">Indah Jaya Kaos</p>
                                <p class="cart__item__addr">Bandung</p>
                              </div>
                              <div class="cart__item__body">
                                <div class="cart__item__img">
                                  <img class="cart__item__img__el" src="${v.image}" alt="${v.name}" />
                                </div>
                                <div class="cart__item__txt">
                                  <h4 class="cart__item__ttl">${v.name}</h4>
                                  ${_elDiscount}
                                  <p class="cart__item__price">${Currency.idr_format(_discount)}</p>
                                </div>
                              </div>
                              <div class="cart__item__foot">
                                <div class="cart__item__detail">
                                  <p class="cart__item__desc">${v.note}</p>
                                  <button class="btn-text js-show-note" type="button">Ubah</button>
                                </div>
                                <div class="cart__item__control"><button class="btn-icon" type="button"><i class="mdi mdi-trash-can-outline"></i></button>
                                  <div class="qty js-qty"><span class="qty__dec mdi mdi-minus qtybtn"></span>
                                    <input class="qty__number" type="number" name="jumlah" min="1" value="${v.total}">
                                    <span class="qty__inc mdi mdi-plus qtybtn"></span>
                                  </div>
                                </div>
                              </div>
                            </div>`;
            });

            $('.js-result-cart').html(_list_item);
          }
        }
      });
    }
  }

  // --- handleNote
  const handleNote = () => {
    $('body').on('click', '.js-show-note', (e) => {
      let _this = $(e.currentTarget),
      _parent = _this.parents('.cart__item__detail'),
      _note = _parent.find('.cart__item__desc').text(),
      _inputNote = `<div class="cart__item__note">
                    <label class="cart__item__label"> Tulis Catatan untuk Barang ini</label>
                    <textarea class="cart__item__input js-change-note" type="text" name="note" maxlength="160" autofocus="autofocus">${_note}</textarea>
                    <p class="cart__item__count js-count-note">0/160</p>
                  </div>`;

      if (!_parent.hasClass('show-note')) {
        _parent.addClass('show-note');
        _parent.html(_inputNote);
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

    $('body').on('input', '.js-change-note', (e) => {
      let _this = $(e.currentTarget),
      _note = _this.val(),
      _letterCount = _note.length;

      $('.js-count-note').text(_letterCount + '/160');

      // let's check if the height of textarea is higher than the scrollheight
      if( _this.outerHeight() > _this.prop('scrollHeight')) {
        // adjust the height to the smallest
        _this.outerHeight(5);
      }
      // set the height of textarea to scrollheight
      _this.outerHeight(_this.prop('scrollHeight'));
    });
  }

  // --- init
  const init = () => {
    if (_userData) {
      handlegetData();
    }

    if ($('.js-result-cart').length) {
      handleNote()
    }
  }

  // --- return
  return {
    init
  }

})();

export default Cart;
