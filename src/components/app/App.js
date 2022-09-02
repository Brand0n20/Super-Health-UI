import React from 'react';
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

/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header data-testid="header" />
    <div className="page-container">
      <div className="content-wrap">
        <Switch>
          <Route exact path="/" render={() => <ProductPage />} />
          <Route exact path="/profile" render={() => <ProfilePage />} />
          <Route path="/products/:productId" render={() => <Product />} />
          <Route exact path="/home" render={() => <HomePage />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
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

export default App;
