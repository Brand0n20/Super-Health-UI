import {
  ValidateDeliveryAddress, ValidateBillingAddress,
  clearErrorsObject
} from './orchestrators';

/**
 * @name ValidatePurchase
 * @description - An orchestrator method to perform validation of the CheckoutPage
 * @param {*object} deliveryAddress - Data from the Delivery Address form
 * @param {*object} billingAddress - Data from the Billing Address form
 * @param {*object} creditCard - Data from the Credit Card form
 * @returns - An object of error messages used to set reactive states
 */
export const ValidatePurchase = (deliveryAddress, billingAddress) => {
  clearErrorsObject();
  ValidateDeliveryAddress(deliveryAddress);
  ValidateBillingAddress(billingAddress);
  // ValidateCreditCard(creditCard);
};

export const ValidateFormTwo = () => {

};
