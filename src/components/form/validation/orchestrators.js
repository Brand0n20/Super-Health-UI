import {
  ValidateFirstName, ValidateLastName, ValidateStreet, ValidateStreetTwo,
  ValidateCity, ValidateState, ValidateZip, ValidateEmail, ValidatePhone,
  ValidateCreditCardNumber, ValidateCvvNumber, ValidateCardExpiration, ValidateCardholderName
} from './helpers';

/**
 * @name errorMessagesObject
 * @description - The object used to hold error messages during validation
 */
let errorMessagesObject = {};

/**
 * @name getErrorsObject
 * @description - Returns an object of validated form errors to a form builder
 * @returns - An object of form errors containting a message and an error status
 */
export const getErrorsObject = () => errorMessagesObject;

/**
 * @name clearErrorsObject
 * @description - Clears the errorMessagesObject of form errors
 */
export const clearErrorsObject = () => { errorMessagesObject = {}; };

/**
 * @name errorsObjectIsNullOrEmpty
 * Returns whether or not all of the values in the errorMessagesObject are null or empty
 * @returns - True if all of the values in the errorMessagesObject are null or empty
 */
export const errorsObjectIsNullOrEmpty = () => Object.values(errorMessagesObject).every((value) => {
  if (value == null || value === 'Message') {
    return true;
  }
  return false;
});

/**
 * @name ValidateDeliveryAddress
 * @description Validates the deliveryAddress form
 * @param {*object} param0 - Delivery Address form data
 */
export const ValidateDeliveryAddress = (deliveryAddress) => {
  let errors = {};
  errors = ValidateFirstName(deliveryAddress.firstName);
  errorMessagesObject.deliveryFirstName = errors.message;
  errorMessagesObject.deliveryFirstNameIsError = errors.status;

  errors = ValidateLastName(deliveryAddress.lastName);
  errorMessagesObject.deliveryLastName = errors.message;
  errorMessagesObject.deliveryLastNameIsError = errors.status;

  errors = ValidateStreet(deliveryAddress.street);
  errorMessagesObject.deliveryStreet = errors.message;
  errorMessagesObject.deliveryStreetIsError = errors.status;

  errors = ValidateStreetTwo(deliveryAddress.street2);
  errorMessagesObject.deliveryStreet2 = errors.message;
  errorMessagesObject.deliveryStreet2IsError = errors.status;

  errors = ValidateCity(deliveryAddress.city);
  errorMessagesObject.deliveryCity = errors.message;
  errorMessagesObject.deliveryCityIsError = errors.status;

  errors = ValidateState(deliveryAddress.state);
  errorMessagesObject.deliveryState = errors.message;
  errorMessagesObject.deliveryStateIsError = errors.status;

  errors = ValidateZip(deliveryAddress.zip);
  errorMessagesObject.deliveryZip = errors.message;
  errorMessagesObject.deliveryZipIsError = errors.status;
};

/**
 * @name ValidateBillingAddress
 * @description Validates the billingAddress form
 * @param {*object} param0 - Billing Address form data
 */
export const ValidateBillingAddress = (billingAddress) => {
  let errors = {};
  errors = ValidateStreet(billingAddress.street);
  errorMessagesObject.billingStreet = errors.message;
  errorMessagesObject.billingStreetIsError = errors.status;

  errors = ValidateStreetTwo(billingAddress.street2);
  errorMessagesObject.billingStreet2 = errors.message;
  errorMessagesObject.billingStreet2IsError = errors.status;

  errors = ValidateCity(billingAddress.city);
  errorMessagesObject.billingCity = errors.message;
  errorMessagesObject.billingCityIsError = errors.status;

  errors = ValidateState(billingAddress.state);
  errorMessagesObject.billingState = errors.message;
  errorMessagesObject.billingStateIsError = errors.status;

  errors = ValidateZip(billingAddress.zip);
  errorMessagesObject.billingZip = errors.message;
  errorMessagesObject.billingZipIsError = errors.status;

  errors = ValidateEmail(billingAddress.email);
  errorMessagesObject.billingEmail = errors.message;
  errorMessagesObject.billingEmailIsError = errors.status;

  errors = ValidatePhone(billingAddress.phone);
  errorMessagesObject.billingPhone = errors.message;
  errorMessagesObject.billingPhoneIsError = errors.status;
};

/**
 * @name ValidateCreditCard
 * @description - Validates the creditCard form
 * @param {*object} creditCard - Credit Card form data
 */
export const ValidateCreditCard = (creditCard) => {
  let errors = {};
  errors = ValidateCreditCardNumber(creditCard.cardNumber);
  errorMessagesObject.cardNumber = errors.message;
  errorMessagesObject.cardNumberIsError = errors.status;

  errors = ValidateCvvNumber(creditCard.cvv);
  errorMessagesObject.cvv = errors.message;
  errorMessagesObject.cvvIsError = errors.status;

  errors = ValidateCardExpiration(creditCard.expiration);
  errorMessagesObject.expiration = errors.message;
  errorMessagesObject.expirationIsError = errors.status;

  errors = ValidateCardholderName(creditCard.cardholder);
  errorMessagesObject.cardholder = errors.message;
  errorMessagesObject.cardholderIsError = errors.status;
};
