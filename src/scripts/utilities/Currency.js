/* ------------------------------------------------------------------------------
@name: Format Rupiah
@description: Format Rupiah
--------------------------------------------------------------------------------- */

const Currency = (() => {

  // --- idr_format
  const idr_format = (number, prefix = 'Rp') => {
    let _number_string = number.toString().replace(/[^,\d]/g, ''),
    _split = _number_string.split(','),
    _mod = _split[0].length % 3,
    _idr = _split[0].substr(0, _mod),
    _thousands = _split[0].substr(_mod).match(/\d{3}/gi),
    _separator = '',
    _result;

    // if thousands
    if (_thousands) {
      _separator = _mod ? '.' : '';
      _idr += _separator + _thousands.join('.');
    }

    _idr = (_split[1] != undefined ? _idr + ',' + _split[1] : _idr);
    _result = (prefix != undefined ? prefix + _idr : _idr);
    return _result;
  }

  // remove_idr_format
  const remove_idr_format = (idr) => {
    _result = idr.split('.').join('').split(' ').join('').split('Rp').join('');
    return Number(_result);
  }

  return {
    idr_format: idr_format,
    remove_idr_format: remove_idr_format
  }

})();

export default Currency;
