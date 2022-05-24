/* ------------------------------------------------------------------------------
@name: Quantity
@description: Quantity
--------------------------------------------------------------------------------- */

// --- Quantity
const Quantity = (() => {

  // -- handleClickQty
  const handleClickQty = () => {
    $('body').on('click', '.js-qty .qty__btn', (e) => {
      const _this = $(e.currentTarget),
            _val = _this.parents('.qty').find('input').val();
      let _qty;

      if (_this.hasClass('qty__btn--inc')) {
        _qty = parseFloat(_val) + 1;
      } else {
        // Don't allow decrementing below zero
        if (_val > 1) {
          _qty = parseFloat(_val) - 1;
        } else {
          _qty = 1;
        }
      }
      _this.parents('.js-qty').find('input').val(_qty);
    });
  }

  // --- init
  const init = () => {
    handleClickQty();
  }

  // --- return
  return {
    init
  }

})();

export default Quantity;
