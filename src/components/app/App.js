import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import CreationPage from '../maintenance-page/CreationPage';
import Header from '../header/Header';
import customToast from '../customizable-toast/customToast';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header data-testid="header" />
    <div className="toast-buttons">
      <button onClick={() => customToast('This is an informational toast notification', 'info')} type="button" id="info" className="toast-test">Informational Toast Example</button>
      <button onClick={() => customToast('This is a successful toast notification', 'success')} type="button" id="success" className="toast-test">Successful Toast Example</button>
      <button onClick={() => customToast('This is a warning toast notification.', 'warn')} type="button" id="warning" className="toast-test">Warning Toast Example</button>
      <button onClick={() => customToast('This is an error toast notification.', 'error')} type="button" id="error" className="toast-test">Error Toast Example</button>
      <ToastContainer theme="colored" />
    </div>
    <Switch>
      <Route exact path="/products" render={() => <ProductPage />} />
      <Route exact path="/checkout" render={() => <CheckoutPage />} />
      <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
      <Route exact path="/maintenance" render={() => <MaintenancePage />} />
      <Route exact path="/maintenance/create-product" render={() => <CreationPage />} />
    </Switch>
  </BrowserRouter>
);

export default App;
