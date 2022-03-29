/* ------------------------------------------------------------------------------
@name: isOS
@description: isOS
--------------------------------------------------------------------------------- */

const isOS = {
  android: () => {
    return navigator.userAgent.match(/Android/i);
  },
  blackberry: () => {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: () => {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  mac: () => {
    return navigator.platform.indexOf('Mac') > -1
  },
  opera: () => {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  win: () => {
    return navigator.platform.indexOf('Win') > -1
  },
  winMobile: () => {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: () => {
    return (isOS.android() || isOS.blackberry() || isOS.iOS() || isOS.mac() || isOS.opera() || isOS.win() || isOS.winMobile());
  }
};

export default isOS;
