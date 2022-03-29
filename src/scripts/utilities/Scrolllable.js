/* ------------------------------------------------------------------------------
@name: Scrolllable
@description: Scrolllable
--------------------------------------------------------------------------------- */

// --- Scrolllable
const Scrolllable = (() => {
  // --- handleEnable
  const handleEnable = () => {
    $('body').removeClass('rm-scroll');
  }

  // --- handleDisable
  const handleDisable = () => {
    $('body').addClass('rm-scroll');
  }

  // --- return
  return {
    enable: handleEnable,
    disable: handleDisable
  }

})();

export default Scrolllable;