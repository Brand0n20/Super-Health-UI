/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import CreationPage from '../maintenance-page/CreationPage';
import ProfilePage from '../profile-page/ProfilePage';
import ProductPage from '../product-page/ProductPage';
import Header from '../header/Header';
import Product from '../product-page/Product';
import Footer from '../footer/Footer';
import HomePage from '../home-page/HomePage';
import { putProfileData } from '../profile-page/ProfilePageService';

/**
 * @name App
 * @returns component
 */
const App = () => {
  const [user, setUser] = useState('');
  const [apiError, setApiError] = useState(false);

  /**
   * Will update the 'last_active' field in the 'User' table anytime this function is called
   */
  const updateUserTime = async () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ss = date.getSeconds();
    if (mm < 10) mm = `0${mm}`;
    if (dd < 10) dd = `0${dd}`;
    const lastActiveTime = `${yyyy}/${mm}/${dd}/${hour}hr/${minute}min/${ss}s`;

    const userInfo = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      street: user.street,
      city: user.city,
      state: user.state,
      zip: user.zip,
      date: lastActiveTime
    };
    await putProfileData(userInfo, setApiError, userInfo.userId);
  };

  return (
    <BrowserRouter>
      <Header data-testid="header" user={user} setUser={setUser} updateUserTime={updateUserTime} />
      <div className="page-container">
        <div className="content-wrap">
          <Switch>
            <Route exact path="/" render={() => <ProductPage updateUserTime={updateUserTime} />} />
            <Route exact path="/profile" render={() => <ProfilePage user={user} setUser={setUser} />} />
            <Route path="/products/:productId" render={() => <Product />} />
            <Route exact path="/home" render={() => <HomePage />} />
            <Route exact path="/checkout" render={() => <CheckoutPage user={user} updateUserTime={updateUserTime} />} />
            <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
            <Route exact path="/maintenance" render={() => <MaintenancePage />} />
            <Route exact path="/maintenance/create-product" render={() => <CreationPage />} />
            <Route exact path="/profile" render={() => <ProfilePage />} />
          </Switch>
        </div>
        <Footer data-testid="footer" />
      </div>
    </BrowserRouter>
  );
};

export default App;
