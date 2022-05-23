/* ------------------------------------------------------------------------------
@name: Header
@description: Header
--------------------------------------------------------------------------------- */

// --- utilities
import {
  Session
} from 'utilities';

const Header = (() => {
  const _userData = JSON.parse(Session.get('userData'));

  // handleCheckSession
  const handleCheckSession = () => {
    Session.timeout(() => {
      Session.remove('userData');
      location.href = 'http://localhost:3000/index.html';
    }, 1200);
  }


  // handleLoginHeader
  const handleLoginHeader = () => {
    if (_userData) {
      if (_userData.logged) {
        const _email = _userData.email;

        $.ajax({
          url: 'https://x-api.alpha-x.id/v1/order-cart',
          type: 'POST',
          dataType: 'JSON',
          data: {
            'email': _email,
          },
          success: function(data) {
            let _data = data.data;

            if (_data.total !== 0) {
              const _userCart = `<span class="header__cart__total">${_data.total}</span>`
            }
          }
        });

        const _userProfile = `<div class="header__right">
                                <a class="header__cart" href="cart.html">
                                  <i class="mdi mdi-cart-outline"></i>
                                  ${_userCart}
                                </a>
                                <div class="header__profile">
                                  <div class="header__user">
                                    <div class="header__user__avatar">
                                      <img class="header__user__avatar__el" src="${_userData.profilePicture}" alt="${_userData.fullName}" />
                                    </div>
                                    <h6 class="header__user__name">${_userData.fullName}</h6>
                                  </div>
                                  <ul class="header__dropdown">
                                    <li class="header__dropdown__item">
                                      <a class="header__dropdown__link" href="profile.html">
                                        <i class="mdi mdi-account-outline"></i>
                                        <span>Profile</span>
                                      </a>
                                    </li>
                                    <li class="header__dropdown__item">
                                      <a class="header__dropdown__link js-logout" href="login.html">
                                        <i class="mdi mdi-logout"></i>
                                        <span>Logout</span></a>
                                    </li>
                                  </ul>
                                </div>
                              </div>`;

        $('.header__right').html(_userProfile);
      }
    }
  }

  const handleLogout = () => {
    $('body').on('click', '.js-logout', function (e) {
      Session.remove('userData');
      location.href = 'http://localhost:3000/login.html';
      e.preventDefault();
    });
  }

  const handlClickCart = () => {
    $('body').on('click', '.js-cart', function (e) {
      const _userData = JSON.parse(Session.get('userData'));

      if (_userData) {
        location.href = 'http://localhost:3000/cart.html';
      } else {
        location.href = 'http://localhost:3000/login.html';
      }

      e.preventDefault();
    });
  }

  // - init
  const init = () => {
    if ((_userData) ||$('.js-cart').length ) {
      handleLoginHeader();
      handleCheckSession ();
      handleLogout();
      handlClickCart();
    }
  }

  return {
    init
  }

})();

export default Header
