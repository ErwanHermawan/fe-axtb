/* ------------------------------------------------------------------------------
@name: Login
@description: Login
--------------------------------------------------------------------------------- */
// --- utilities
import {
  Validation
} from 'utilities';

// Form Validation
const ElementSelector = [
  {
    id: 'email',
    validation: {
      required: true,
      email: true
    }
  },
  {
    id: 'password',
    validation: {
      required: true
    }
  }
];
const ElementEvents = ['input', 'blur'];

// --- Login
const Login = (() => {

  // Handle Run Validation
  const handleRunValidation = () => {
    Validation.config(ElementEvents, ElementSelector);
  }

  // Handle Click Validation
  const handleClickValidation = () => {
    $('.js-auth-register button[type="submit"]').on('click', (e) => {
      $.each(ElementSelector, (i, v) => {
        $('#'+v.id).blur();
      });

      if ($('.error').length === 0) {
        handleRegistrtion();
      }
      e.preventDefault();
    });
  }

  const handleRegistrtion = () => {
    $.ajax({
      url: `https://x-api.alpha-x.id/v1/registration`,
      type: 'POST',
      dataType: 'JSON',
      data: {
        'email': $('#email').val(),
        'password': $('#password').val(),
      },
      beforeSend: () => {
        $('.js-auth-register').html('<span class="lds-ring"><span></span><span></span><span></span><span></span></span>');
      },
      success: (response) => {
        const _data = response;
        if (_data.code === 203) {
          $('.alert').show(200);
          $('.alert__text').text(_data.message);
        } else if (_data.code === 200) {
          location.href = 'http://localhost:3000/register-success.html';
        }
      },
      error: (respon) => {
        alert('Data gagal diproses');
      }
    });
  }

  // --- init
  const init = () => {
    if ($('.js-auth-register').length > 0) {
      handleRunValidation();
      handleClickValidation();
    }
  }

  // --- return
  return {
    init
  }

})();

export default Login;
