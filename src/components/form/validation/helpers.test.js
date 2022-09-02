import {
  ValidateCreditCardNumber,
  ValidateCvvNumber,
  ValidateCardExpiration,
  ValidateCardholderName,
  ValidateStreetTwo,
  ValidateEmail
} from './helpers';

/**
 * Tests the ValidateStreetTwo error messages and status
 */
describe('ValidateStreetTwo', () => {
  it('Returns an error message object', () => {
    const actualMessageObject = ValidateStreetTwo();
    expect(actualMessageObject).toHaveProperty('message');
    expect(actualMessageObject).toHaveProperty('status');
  });

  it('Returns correct message and status for not required', () => {
    const errorMessageObject = ValidateStreetTwo('');

    const expectedMessage = 'Message';
    const actualMessage = errorMessageObject.message;

    const expectedStatus = null;
    const actualStatus = errorMessageObject.status;

    expect(actualMessage).toEqual(expectedMessage);
    expect(actualStatus).toEqual(expectedStatus);
  });

  it('Returns correct message and status with only spaces', () => {
    const errorMessageObject = ValidateStreetTwo(' ');

    const expectedMessage = 'Street2 can not be empty';
    const actualMessage = errorMessageObject.message;

    const expectedStatus = true;
    const actualStatus = errorMessageObject.status;

    expect(actualMessage).toEqual(expectedMessage);
    expect(actualStatus).toEqual(expectedStatus);
  });
});

/**
 * Tests the ValidateEmail error messages and status
 */
describe('ValidateEmail', () => {
  it('Returns an error message object', () => {
    const actualMessageObject = ValidateEmail();
    expect(actualMessageObject).toHaveProperty('message');
    expect(actualMessageObject).toHaveProperty('status');
  });

  it('Returns correct message and status for required', () => {
    const errorMessageObject = ValidateEmail('');
    const expectedMessage = 'Email is required';
    const actualMessage = errorMessageObject.message;

    const expectedStatus = true;
    const actualStatus = errorMessageObject.status;

    expect(actualMessage).toEqual(expectedMessage);
    expect(actualStatus).toEqual(expectedStatus);
  });

  it('Returns correct message and status for has spaces', () => {
    const errorMessageObject = ValidateEmail(' ');
    const expectedMessage = 'Email can not contain spaces';
    const actualMessage = errorMessageObject.message;

    const expectedStatus = true;
    const actualStatus = errorMessageObject.status;

    expect(actualMessage).toEqual(expectedMessage);
    expect(actualStatus).toEqual(expectedStatus);
  });

  it('Returns correct message and status for incorrect format', () => {
    const errorMessageObject = ValidateEmail('invalidemail');
    const expectedMessage = 'Email must be format email@email.com';
    const actualMessage = errorMessageObject.message;

    const expectedStatus = true;
    const actualStatus = errorMessageObject.status;

    expect(actualMessage).toEqual(expectedMessage);
    expect(actualStatus).toEqual(expectedStatus);
  });
});

describe('ValidateCreditCardNumber()', () => {
  it('should throw an error (not be empty)', () => {
    const actual = ValidateCreditCardNumber('');

    const expected = { message: 'Credit Card is required', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (be 16 numbers long)', () => {
    const actual = ValidateCreditCardNumber(12);

    const expected = { message: 'Credit Card must be a group of sixteen numbers', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (only numbers)', () => {
    const actual = ValidateCreditCardNumber('aaaaaaaaaaaaaaaa');

    const expected = { message: 'Credit Card must be a group of sixteen numbers', status: true };

    expect(actual).toEqual(expected);
  });

  it('should not throw errors', () => {
    const actual = ValidateCreditCardNumber(1234567890123456);

    const expected = { message: 'Message', status: null };
    expect(actual).toEqual(expected);
  });
});

describe('ValidateCvvNumber()', () => {
  it('should throw an error (not be empty)', () => {
    const actual = ValidateCvvNumber('');

    const expected = { message: 'CVV Number is required', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be 3 numbers long)', () => {
    const actual = ValidateCvvNumber('11');

    const expected = { message: 'Cvv must be a group of three numbers', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be a number)', () => {
    const actual = ValidateCvvNumber('aaa');

    const expected = { message: 'Cvv must be a group of three numbers', status: true };

    expect(actual).toEqual(expected);
  });

  it('should not throw errors', () => {
    const actual = ValidateCvvNumber('232');

    const expected = { message: 'Message', status: null };

    expect(actual).toEqual(expected);
  });
});

describe('ValidateCardExpiration()', () => {
  it('should throw an error (not be empty)', () => {
    const actual = ValidateCardExpiration('');

    const expected = { message: 'Expiration date is required', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be in correct format: 12/1)', () => {
    const actual = ValidateCardExpiration('12/1');

    const expected = { message: 'Expiration Date must be in MM/YY format', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be in correct format: aa/aa)', () => {
    const actual = ValidateCardExpiration('aa/aa');

    const expected = { message: 'Expiration Date must be in MM/YY format', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be in correct format: aaaaa)', () => {
    const actual = ValidateCardExpiration('aaaaa');

    const expected = { message: 'Expiration Date must be in MM/YY format', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be in correct format: 1223)', () => {
    const actual = ValidateCardExpiration('1223');

    const expected = { message: 'Expiration Date must be in MM/YY format', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (card is expired: 12/21)', () => {
    const actual = ValidateCardExpiration('12/21');

    const expected = { message: 'Credit Card is expired', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (card is expired: 01/00)', () => {
    const actual = ValidateCardExpiration('01/00');

    const expected = { message: 'Credit Card is expired', status: true };

    expect(actual).toEqual(expected);
  });

  it('should not throw errors', () => {
    const today = new Date();

    let thisMonth = today.getMonth() + 1;

    const thisYear = today.getFullYear() % 100;

    if (thisMonth < 10) {
      thisMonth = `0${thisMonth}`;
    }
    const testDate = `${thisMonth}/${thisYear}`;

    const actual = ValidateCardExpiration(testDate);

    const expected = { message: 'Message', status: null };

    expect(actual).toEqual(expected);
  });
});

describe('ValidateCardholderName', () => {
  it('should throw an error (is required)', () => {
    const actual = ValidateCardholderName('');

    const expected = { message: 'Cardholder Name is required', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be correct format: John bapcock)', () => {
    const actual = ValidateCardholderName('John bapcock');

    const expected = { message: 'Cardholder Name must be correct format', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be correct format: 12 24)', () => {
    const actual = ValidateCardholderName('12 24');

    const expected = { message: 'Cardholder Name must be correct format', status: true };

    expect(actual).toEqual(expected);
  });

  it('should throw an error (must be correct format: aguigabggs)', () => {
    const actual = ValidateCardholderName('aguigabggs');

    const expected = { message: 'Cardholder Name must be correct format', status: true };

    expect(actual).toEqual(expected);
  });

  it('should not throw errors', () => {
    const actual = ValidateCardholderName('Chris Gillespie');

    const expected = { message: 'Message', status: null };

    expect(actual).toEqual(expected);
  });

  it('should not throw errors (tests special characters)', () => {
    const actual = ValidateCardholderName('Mark-us O\'brian');

    const expected = { message: 'Message', status: null };

    expect(actual).toEqual(expected);
  });
});
