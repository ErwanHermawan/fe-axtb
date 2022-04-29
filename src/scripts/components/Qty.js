/* ------------------------------------------------------------------------------
@name: Qty
@description: Qty
--------------------------------------------------------------------------------- */

// --- Qty
const Qty = (() => {
  // --- handleChangeQty
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

  // --- init
  const init = () => {
    handleChangeQty();
  }

  // --- return
  return {
    init
  }

})();

export default Qty;
