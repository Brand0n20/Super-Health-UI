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
 * calculates the shipping cost based on the state and subtotal in string form
 * @param {Object []} products -- the products in the cart
 * @param {Object} state -- the state that the delivery address dropdown is on
 * @returns number
 */
export const getShippingCost = (products, state, shippingCost) => {
  const halfCost = shippingCost.cost / 2;
  if ((state === 'Alaska' || state === 'Hawaii') && products.reduce((acc, item) => acc + item.quantity * item.price, 0) >= parseFloat(50)) {
    return `$${parseFloat(halfCost).toFixed(2)}`;
  }
  if (!products.length || products.reduce(
    (acc, item) => acc + item.quantity * item.price, 0
  ) >= parseFloat(50)) {
    return `$${parseFloat(0).toFixed(2)}`;
  }
  if ((state === 'Alaska' || state === 'Hawaii') && products.reduce((acc, item) => acc + item.quantity * item.price, 0) < parseFloat(50)) {
    return `$${parseFloat(shippingCost.cost).toFixed(2)}`;
  }
  return `$${parseFloat(5).toFixed(2)}`;
};
/**
 * calculates the taxes based on tax percent from each state and the subtotal
 * @param {Object []} products -- products in the cart
 * @param {Object} shippingCost -- object containing the state, cost, and tax
 * @returns the amount of taxes based on state and subtotal
 */
export const getTaxAmount = (products, shippingCost) => {
  const productsSubtotal = products.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const stateTax = shippingCost.tax;
  if (!products.length || !stateTax) {
    return `$${parseFloat(0).toFixed(2)}`;
  }
  return `$${parseFloat(productsSubtotal * stateTax).toFixed(2)}`;
};
/**
 * calculates the shipping cost based on state and subtotal in non-string form
 * @param {Object []} products -- products in the cart
 * @param {Object} state -- the state updated in the delivery address
 * @param {Object} shippingCost -- an object containing the state, cost, and tax
 * @returns the cost of shipping in a non string form
 */
export const shippingCostNotString = (products, state, shippingCost) => {
  const halfCost = shippingCost.cost / 2;
  if ((state === 'Alaska' || state === 'Hawaii') && products.reduce((acc, item) => acc + item.quantity * item.price, 0) >= parseFloat(50)) {
    return parseFloat(halfCost).toFixed(2);
  }
  if (!products.length || products.reduce((acc, item) => acc + item.quantity * item.price, 0)
   >= parseFloat(50)) {
    return parseFloat(0).toFixed(2);
  }
  if ((state === 'Alaska' || state === 'Hawaii') && products.reduce((acc, item) => acc + item.quantity * item.price, 0) < parseFloat(50)) {
    return parseFloat(shippingCost.cost).toFixed(2);
  }
  return parseFloat(5).toFixed(2);
};
/**
 * calculates the total cost of items in the cart taking into account the state selected
 * @param {Object []} products -- products in the cart
 * @param {Object} state -- the state updated in the delivery address
 * @param {Object} shippingCost -- an object containing the state, cost, and tax
 * @returns the total cost after adding the subtotal, shipping cost, and taxes
 */
export const totalCost = (products, state, shippingCost) => {
  const productsSubtotal = products.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const stateTax = shippingCost.tax * productsSubtotal;
  const totalBeforeTax = parseFloat(productsSubtotal)
   + parseFloat(shippingCostNotString(products, state, shippingCost));
  if (!products.length || !state) {
    return `$${parseFloat(totalBeforeTax).toFixed(2)}`;
  }
  return `$${parseFloat(totalBeforeTax + stateTax).toFixed(2)}`;
};
