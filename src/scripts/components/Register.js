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
    $('.js-auth-register').on('click', (e) => {
      $.each(ElementSelector, (i, v) => {
        $('#'+v.id).blur();
      });

      if ($('.error').length === 0) {
        handleRegistrtion();
      } else {
        e.preventDefault();
      }
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
      success: function(response) {
        const _data = response;
        if (_data.code === 200) {
          location.href = 'http://localhost:3000/register-success.html';
        } else {
          alert('Data gagal diproses');
        }
      },
      error: function(respon) {
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
