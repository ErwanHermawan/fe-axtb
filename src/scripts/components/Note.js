/* ------------------------------------------------------------------------------
@name: Note
@description: Note
--------------------------------------------------------------------------------- */

// --- Note
const Note = (() => {

  // -- handleShowNote
  const handleShowNote = () => {
    $('body').on('click', '.js-show-note', (e) => {
      let _this = $(e.currentTarget),
      _parent = $(_this.parents('.cart__item__detail')),
      _note = _this.parents('.cart__item__detail').find('.cart__item__desc').text(),
      _noteCount = _this.parents('.cart__item__detail').find('.cart__item__desc').text().length,
      _inputEl = `<div class="cart__item__note">
                    <label class="cart__item__label"> Tulis Catatan untuk Barang ini</label>
                    <textarea class="cart__item__textarea js-change-note" type="text" name="note" autofocus="autofocus" maxlength="160">${_note}</textarea>
                    <p class="cart__item__count">0/160</p>
                  </div>`;

      if (!_parent.hasClass('show-note')) {
        _parent.addClass('show-note');
        _parent.html(_inputEl);
        _parent.find('.cart__item__count').text(_noteCount + '/160');
        setTimeout(() => {
          _parent.find('textarea').focus();
        }, 250);
      }
    });
  }

  // handleCountNote
  const handleCountNote = () => {
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
  }

  // handleSetNote
  const handleSetNote = () => {
    $('body').on('blur', '.js-change-note', (e) => {
      let _this = $(e.currentTarget),
      _parent = _this.parents('.cart__item__detail'),
      _note = _parent.find('.js-change-note').val().trim(),
      _inputEl = `<p class="cart__item__desc">${_note}</p><button class="btn-text js-show-note" type="button">Ubah</button>`;

      if (_parent.hasClass('show-note')) {
        _parent.removeClass('show-note');
        _this.parents('.cart__item__detail').html(_inputEl);
      }
    });
  }

  // --- init
  const init = () => {
    handleShowNote();
    handleCountNote();
    handleSetNote();
  }

  // --- return
  return {
    init
  }

})();

export default Note;
