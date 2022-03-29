/* ------------------------------------------------------------------------------
@name: BrowserCheck
@description: BrowserCheck
--------------------------------------------------------------------------------- */

// --- BrowserCheck
const BrowserCheck = (() => {
  // --- handleCheck
  const handleCheck = () => {
    let _browser = 'dekstop-browser';
    const HTMLElement = document.getElementsByTagName('html')[0];
    if (navigator.userAgent.match(/Android/i)) {
      _browser = 'android-browser';
    } else if (navigator.userAgent.match(/BlackBerry/i)) {
      _browser = 'blackberry-browser';
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      _browser = 'ios-browser';
    } else if (navigator.userAgent.match(/IEMobile/i)) {
      _browser = 'windows-phone-browser';
    }
    $('html').addClass(_browser);
  }

  // --- init
  const init = () => {
    handleCheck();

  }

  // --- return
  return {
    init
  }

})();

export default BrowserCheck;
