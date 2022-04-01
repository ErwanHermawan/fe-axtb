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
    $('.js-auth-login').on('click', (e) => {
      $.each(ElementSelector, (i, v) => {
        $('#'+v.id).blur();
      });

      if ($('.error').length === 0) {
        handleLogin();
      } else {
        e.preventDefault();
      }
    });
  }

  const handleCheckSession = () => {
    const _userData = JSON.parse(localStorage.getItem('userData'));
    if (_userData) {
      if (_userData.logged) {
        location.href = 'http://localhost:3000/index.html';
      }
    }
  }

  const handleLogin = () => {
    $.ajax({
      url: `https://x-api.alpha-x.id/v1/login`,
      type: 'POST',
      dataType: 'JSON',
      data: {
        'email': $('#email').val(),
        'password': $('#password').val(),
      },
      success: function(response) {
        const _data = response;
        if (_data.code === 203) {
          $('.alert').show(200);
          $('.alert__text').text(_data.message);
        } else if (_data.code === 200) {
          localStorage.setItem('userData', JSON.stringify(_data.data));
          location.href = 'http://localhost:3000/index.html';
        }
      },
      error: function(respon) {
        alert('Data gagal diproses');
      }
    });
  }

  // --- init
  const init = () => {
    if ($('.js-auth-login').length > 0) {
      handleRunValidation();
      handleClickValidation();
      handleCheckSession();
    }

  }

  // --- return
  return {
    init
  }

})();

export default Login;
