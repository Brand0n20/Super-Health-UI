import ValidatePurchase from './builds';

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
 * @description - Tests ValidatePurchase
 * @author - Andrew Salerno
 */
describe('BuildsTest', () => {
  describe('ValidatePurchse', () => {
    it('Validates a purchse', () => {
      ValidatePurchase(deliveryAddress, billingAddress, creditCard);
    });
  });
});
