import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import styles from './Header.module.css';
import { loginUser } from './HeaderService';
import constants from '../../utils/constants';
import { useCart } from '../checkout-page/CartContext';
import cartGuy from '../../assets/cartguy.gif';
import logo from '../../assets/logo.png';
import productBox from '../../assets/product-icon.gif';
import { ReactComponent as UserIcon } from '../../assets/user.svg';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = ({
  user, setUser, updateUserTime
}) => {
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);

  /**
   * Set user in local storage when there is a change in the state of user
   */
  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify({ user }));
    updateUserTime();
  }, [updateUserTime, user]);

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = async (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    await loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };
  /**
   * @name handleGoogleLoginFailure
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError(
      'There was a problem logging in with Google. Please wait and try again later.'
    );
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
    window.location.reload(false);
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError(
      'There was a problem logging out with Google. Please wait and try again later.'
    );
  };

  const {
    state: { products }
  } = useCart();

  return (
    <div
      data-testid="header"
      className={styles.HeaderStyling}
    >
      <NavLink to="/home">
        <img
          data-testid="logo"
          className={styles.logo}
          src={logo}
          alt="logo"
          title="Home Page"
        />
      </NavLink>
      <NavLink onClick={updateUserTime} to="/checkout">
        <img
          data-testid="cart"
          className={styles.cart}
          src={cartGuy}
          alt="cartguy"
          title="Checkout Page"
        />
        {products.length !== 0 && (
          <div
            className={styles.qtyCircle}
            data-testid="cartQty"
          >
            {products.length}
          </div>
        )}
      </NavLink>

      <NavLink to="">
        <img
          data-testid="productsButton"
          className={styles.productsButton}
          src={productBox}
          alt="products"
          title="Products Page"
        />
      </NavLink>

      {!user ? (
        <GoogleLogin
          data-testid="login"
          className={styles.googlebutton}
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
          isSignedIn
          alt="login"
        />
      ) : (
        <>
          <GoogleLogout
            data-testid="logout"
            className={styles.googlebutton}
            clientId={constants.GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleGoogleLogoutSuccess}
            onFailure={handleGoogleLogoutFailure}
          />
          <NavLink
            to="/profile"
            className={styles.alignright}
          >
            <span
              data-testid="lastname"
              className={styles.name}
            >
              {user.lastName[0].concat('.')}
            </span>
            <span
              data-testid="firstname"
              className={styles.name}
            >
              {user.firstName}
            </span>
            <span
              data-testid="circle"
              className={styles.circle}
            >
              <UserIcon />
            </span>
          </NavLink>
        </>
      )}
      {googleError && <span>{googleError}</span>}
      {apiError && <span>Api Error</span>}
    </div>
  );
};

export default Header;
