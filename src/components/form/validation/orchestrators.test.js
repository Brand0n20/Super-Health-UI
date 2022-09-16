import {
  ValidateDeliveryAddress, ValidateBillingAddress, ValidateCreditCard,
  errorsObjectIsNullOrEmpty, clearErrorsObject, getErrorsObject
} from './orchestrators';

/**
 * Delivery Address testing data
 */
const deliveryAddress = {
  firstName: 'Andrew',
  lastName: 'Salerno',
  street: '123 Sesame St.',
  street2: 'Apt. #3',
  city: 'Columbus',
  state: 'Ohio',
  zip: 12345
};

/**
 * Billing Address testing data
 */
const billingAddress = {
  street: '123 Sesame St',
  street2: 'Apt. #3',
  city: 'Columbus',
  state: 'Ohio',
  zip: 12345,
  email: 'asalerno@catalyte.io',
  phone: '123-456-7890'
};

/**
 * Credit Card testing data
 */
const creditCard = {
  cardNumber: 1234567812345678,
  cvv: 555,
  expiration: '10/29',
  cardholder: 'Andrew Salerno'
};

/**
 * @description - Tests the methods in orchestrators
 * @author - Andrew Salerno
 */
describe('OrchestratorsTest', () => {
  /**
   * @description - Tests if ValidateDeliveryAddress builds a correct errorMessagesObject
   * @author - Andrew Salerno
   */
  describe('ValidateDeliveryAddress', () => {
    it('Builds an errorMessagesObject with correct properties', () => {
      ValidateDeliveryAddress(deliveryAddress);
    });
  });

  /**
   * @description - Tests if ValidateBillingAddress builds a correct errorMessagesObject
   * @author - Andrew Salerno
   */
  describe('ValidateBillingAddress', () => {
    it('Builds an errorMessagesObject with correct properties', () => {
      ValidateBillingAddress(billingAddress);
    });
  });

  /**
   * @description - Tests if ValidateCreditCard builds a correct errorMessagesObject
   * @author - Andrew Salerno
   */
  describe('ValidateCreditCard', () => {
    it('Builds an errorMessagesObject with correct properties', () => {
      ValidateCreditCard(creditCard);
    });
  });

  /**
   * @description - Tests if errorsObjectIsNullOrEmpty() returns true on null or empty
   * @author - Andrew Salerno
   */
  describe('errorsObjectIsNullOrEmpty returns true', () => {
    it('Builds an errorMessagesObject with correct properties', () => {
      ValidateDeliveryAddress(deliveryAddress);
      ValidateBillingAddress(billingAddress);
      ValidateCreditCard(creditCard);
      errorsObjectIsNullOrEmpty();
    });
  });

  /**
   * @description - - Tests if errorsObjectIsNullOrEmpty() returns false on errors
   * @author - Andrew Salerno
   */
  describe('errorsObjectIsNullOrEmpty returns false', () => {
    it('Builds an errorMessagesObject with correct properties', () => {
      deliveryAddress.firstName = '';
      ValidateDeliveryAddress(deliveryAddress);
      errorsObjectIsNullOrEmpty();
    });
  });

  /**
   * @description - - Test if getErrorsObject gets an errorMessagesObject
   * @author - Andrew Salerno
   */
  describe('errorsObjectIsNullOrEmpty', () => {
    it('Gets an error messages object', () => {
      getErrorsObject();
    });
  });

  /**
   * @description - - Test if clearErrorsObject clears the errorMessagesObject
   * @author - Andrew Salerno
   */
  describe('errorsObjectIsNullOrEmpty', () => {
    it('Gets an error messages object', () => {
      clearErrorsObject();
    });
  });
});
