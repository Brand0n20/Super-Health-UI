import React from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import { ValidatePurchase } from '../form/validation/builds';
import { getErrorsObject, errorsObjectIsNullOrEmpty } from '../form/validation/orchestrators';
import customToast from '../customizable-toast/customToast';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  /**
   * Uses pages history navigation
   */
  const history = useHistory();

  /**
   * Uses the products from the cart
   */
  const {
    state: { products }
  } = useCart();

  /**
   * Reactive variable to hold billingData and its setMethod()
   */
  const [billingData, setBillingData] = React.useState({});

  /**
   * Updates the billing data when there is a change in its form
   * @param {*} e - A reactive event
   */
  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  /**
   * Reactive variable to hold deliveryData and its setMethod()
   */
  const [deliveryData, setDeliveryData] = React.useState({});

  /**
   * Updates the delivery data when there is a change in its form
   * @param {*} e - A reactive event
   */
  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  /**
   * Handler used to toggle the value of checked used to
   * determine if billing and shipping use the same address and
   * To dynamicly display the Billing Details form
   */
  const [checked, setChecked] = React.useState(false);
  const handleCheck = () => {
    if (checked) {
      setChecked(false);
    }
    if (!checked) {
      setChecked(true);
    }
  };

  /**
   * A reactive variable to hold the state of the errorMessages and
   * a method to set them from an errorMessagesObject{}
   */
  const [errorMessages, setErrorMessages] = React.useState({});

  /**
   * Gets the purchase form data and validates it
   * before making a purchase when the purchase button is clicked
   */
  const handlePay = async () => {
    const deliveryAddress = {
      firstName: deliveryData.firstName,
      lastName: deliveryData.lastName,
      street: deliveryData.street,
      street2: deliveryData.street2,
      city: deliveryData.city,
      state: deliveryData.state,
      zip: deliveryData.zip
    };
    const billingAddress = {};
    if (checked) {
      billingAddress.street = deliveryAddress.street;
      billingAddress.street2 = deliveryAddress.street2;
      billingAddress.city = deliveryAddress.city;
      billingAddress.state = deliveryAddress.state;
      billingAddress.zip = deliveryAddress.zip;
    } else {
      billingAddress.street = billingData.billingStreet;
      billingAddress.street2 = billingData.billingStreet2;
      billingAddress.city = billingData.billingCity;
      billingAddress.state = billingData.billingState;
      billingAddress.zip = billingData.billingZip;
    }
    billingAddress.email = billingData.email;
    billingAddress.phone = billingData.phone;

    const creditCard = {
      cardNumber: billingData.creditCard,
      cvv: billingData.cvv,
      expiration: billingData.expiration,
      cardholder: billingData.cardholder
    };

    ValidatePurchase(deliveryAddress, billingAddress, creditCard);
    setErrorMessages(getErrorsObject());
    if (errorsObjectIsNullOrEmpty()) {
      const purchaseResponseObject = await makePurchase(
        products, deliveryAddress, billingAddress, creditCard
      );
      if (purchaseResponseObject != null) {
        if (purchaseResponseObject.id != null) {
          history.push({ pathname: '/confirmation', state: { purchaseResponseObject } });
        }
        if (purchaseResponseObject.status === 400) {
          customToast('This purchase was rejected.', 'error');
        }
        if (purchaseResponseObject.error === '404 Not Found') {
          customToast('This purchase was rejected.', 'error');
        }
        if (purchaseResponseObject.status === 422) {
          customToast('This purchase was rejected.', 'error');
        }
      } else {
        customToast('This purchase was rejected.', 'error');
      }
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={`${styles.step} ${styles.order}`}>
        <h3 className={styles.title}>1. Review Order</h3>
        <ReviewOrderWidget />
      </div>
      <div className={`${styles.step} ${styles.delivery}`}>
        <h3 className={styles.title}>2. Delivery Address</h3>
        <DeliveryAddress
          onChange={onDeliveryChange}
          deliveryData={deliveryData}
          errorMessages={errorMessages}
        />
        <label htmlFor="useSame" className={styles.sameAddressText}>
          <div className={styles.useSameAddress}>
            <input
              id="useSame"
              onChange={handleCheck}
              type="checkbox"
              value={checked}
            />
          </div>
          Same Billing Address
        </label>
      </div>
      <div className={`${styles.step} ${styles.payment}`}>
        <h3 className={styles.title}>3. Billing Details</h3>
        <BillingDetails
          onChange={onBillingChange}
          billingData={billingData}
          useShippingForBilling={checked}
          errorMessages={errorMessages}
        />
      </div>
      <div className={styles.payNow}>
        <button onClick={handlePay} type="button" className={styles.payButton}>
          Purchase
        </button>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default CheckoutPage;
