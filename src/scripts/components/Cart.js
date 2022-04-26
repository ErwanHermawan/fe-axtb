/* ------------------------------------------------------------------------------
@name: Cart
@description: Cart
--------------------------------------------------------------------------------- */

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
    let _email = _userData.email;

    $.ajax({
      url: 'https://x-api.alpha-x.id/v1/order-cart',
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


          $('.js-result-item').html(_list_item);
        }
      }
    });
  }

  // --- handleNote
  const handleNote = () => {
    $('body').on('click', '.js-show-note', (e) => {
      let _this = $(e.currentTarget),
      _note = _this.parents('.cart__item__detail').find('.cart__item__desc').text(),
      _inputEl = `<div class="cart__item__note">
                    <label class="cart__item__label"> Tulis Catatan untuk Barang ini</label>
                    <input class="cart__item__input js-change-note" type="text" name="note" autofocus="autofocus" value="${_note}">
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


  // --- init
  const init = () => {
    handlegetData();
    handleNote()
  }

  // --- return
  return {
    init
  }

})();

export default Cart;
