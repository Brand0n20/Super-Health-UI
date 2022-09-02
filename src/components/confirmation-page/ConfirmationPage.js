import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './ConfirmationPage.module.css';
import devonLogo from './devonLogo.jpg';

/**
 * @name ConfirmationPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ConfirmationPage = () => {
  const location = useLocation();
  const history = useHistory();
  const continueBrowsing = () => {
    history.push('/');
  };

  /**
   * Reduces the path from location state into a purchase response object
   * @returns - A reduced confirmaiton message
   */
  const buildConfirmationMessage = () => {
    const message = location.state.purchaseResponseObject;
    return message;
  };

  /**
 * @name DisplayConfirmationProducts
 * @description - Displays the products in a confirmed purchase
 * @param {*object} param -None
 * @returns - JSX template to display purchased products
 */
  const displayConfirmationProducts = (message) => (
    <div>
      {message.products.map(({ product, quantity }) => (
        <div key={product.id}>
          <div>
            <div>Name: </div>
            {product.name}
          </div>
          <div>
            <div>Quantity:</div>
            {quantity}
          </div>
        </div>
      ))}
    </div>
  );

  const confirmationMessage = buildConfirmationMessage();
  const productsToDisplay = displayConfirmationProducts(confirmationMessage);
  return (
    <div className={styles.center}>
      <div className={styles}>
        <h1>Purchase Confirmed!</h1>
        <img src={devonLogo} alt="alternatetext" height="175" />
        <h2>Delivery Address</h2>
        <p>
          {confirmationMessage.deliveryAddress.firstName}
          {' '}
          {confirmationMessage.deliveryAddress.lastName}
        </p>
        <p>
          {confirmationMessage.deliveryAddress.deliveryStreet}
          {confirmationMessage.deliveryAddress.deliveryStreet2}
        </p>
        <p>
          {confirmationMessage.deliveryAddress.deliveryCity}
          {' '}
          {confirmationMessage.deliveryAddress.deliveryState}
          {', '}
          {confirmationMessage.deliveryAddress.deliveryZip}
        </p>
        <h2>Billing Address</h2>
        <p>
          {confirmationMessage.creditCard.cardholder}
        </p>
        <p>
          {confirmationMessage.billingAddress.billingStreet}
          {confirmationMessage.billingAddress.billingStreet2}
        </p>
        <p>
          {confirmationMessage.billingAddress.billingCity}
          {' '}
          {confirmationMessage.billingAddress.billingState}
          {', '}
          {confirmationMessage.billingAddress.billingZip}
        </p>
      </div>
      <h2>Products in Purchase</h2>
      <div>{productsToDisplay}</div>
      <button onClick={continueBrowsing} type="button" className={styles.payButton}>
        Continue Browsing!
      </button>
    </div>
  );
};

export default ConfirmationPage;
