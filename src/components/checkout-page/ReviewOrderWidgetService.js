/* eslint-disable max-len */
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export const fetchShippingCost = async (state, setShippingCost) => {
  await HttpHelper(`${Constants.SHIPPING_COST_ENDPOINT}/${state}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setShippingCost);
};
/**
 * converts a price to a formatted string
 * @param {number} price
 * @returns {string} formatted price
 */
export const toPrice = (price) => `$${price.toFixed(2)}`;

/**
  * Gets the subtotal of an order
  * @param {Object []} products
  * @returns Number
  */
export const getSubtotal = (products) => {
  if (products.length) {
    return toPrice(
      products.reduce((acc, item) => acc + item.quantity * item.price, 0)
    );
  }
  return toPrice(0);
};

/**
 *
 * @param {Object []} products -- the products in the cart
 * @param {Object} state -- the state that the delivery address dropdown is on
 * @returns number
 */
export const getShippingCost = (products, state, shippingCost) => {
  const halfCost = shippingCost / 2;
  if ((state === 'Alaska' || state === 'Hawaii') && products.reduce((acc, item) => acc + item.quantity * item.price, 0) >= parseFloat(50)) {
    return `$${parseFloat(halfCost).toFixed(2)}`;
  }
  if (!products.length || products.reduce((acc, item) => acc + item.quantity * item.price, 0) >= parseFloat(50)) {
    return `$${parseFloat(0).toFixed(2)}`;
  }
  if ((state === 'Alaska' || state === 'Hawaii') && products.reduce((acc, item) => acc + item.quantity * item.price, 0) < parseFloat(50)) {
    return `$${parseFloat(shippingCost).toFixed(2)}`;
  }
  return `$${parseFloat(5).toFixed(2)}`;
};
