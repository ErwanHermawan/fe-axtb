/* ------------------------------------------------------------------------------
@name: Card
@description: Card
--------------------------------------------------------------------------------- */

// --- Card
const Card = (() => {
  // --- handleSet
  const handleSet = () => {
    handleCheckHeight();
  }

  // --- handleCheckHeight
  const handleCheckHeight = () => {
    let _height = 0;
    handleResetHeight();
    $('.js-product-list .product__card').each((i, e) => {
      if (_height < $(e).find('.product__txt').height()) {
        _height = $(e).find('.product__txt').height();
      }
    });
    $('.product__txt').height(_height);
  }

  const handleResetHeight = () => {
    let _attr = $('.product__txt').attr('style');
    // For some browsers, `attr` is undefined; for others,
    // `attr` is false.  Check for both.
    if (typeof _attr !== 'undefined' && _attr !== false) {
      $('.product__txt').removeAttr('style');
    }
  }

  // --- init
  const init = () => {
    handleSet();
  }

  // --- return
  return {
    init,
    checkHeight: handleSet
  }

})();

export default Card;
