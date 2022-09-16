/* eslint-disable max-len */
import {
  ValidateCreditCardNumber, ValidateCvvNumber, ValidateCardExpiration, ValidateCardholderName,
  ValidateFirstName, ValidateLastName, ValidateStreet, ValidateStreetTwo, ValidateCity,
  ValidateState, ValidateZip, ValidateEmail, ValidatePhone
} from './helpers';

/**
 * @description - Tests the methods of helpers.js
 */
describe('HelpersTest', () => {
  /**
   * @description - Tests the ValidateFirstName error messages and status
   * @author - Andrew Salerno
   */
  describe('ValidateFirstName', () => {
    it('Returns an error message object', () => {
      const actualMessageObject = ValidateFirstName();
      expect(actualMessageObject).toHaveProperty('message');
      expect(actualMessageObject).toHaveProperty('status');
    });
    it('Returns correct message and status for required', () => {
      const errorMessageObject = ValidateFirstName('');
      const expectedMessage = 'First Name is required';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateFirstName(' ');
      const expectedMessage = 'First Name can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for only letters dashes apostrophes', () => {
      const errorMessageObject = ValidateFirstName('@.!%$#');
      const expectedMessage = 'First Name must only use letters,\ndashes, or apostrophes';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for no errors', () => {
      const errorMessageObject = ValidateFirstName('Andrew');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the ValidateLastName error messages and status
   * @author - Andrew Salerno
   */
  describe('ValidateLastName', () => {
    it('Returns an error message object', () => {
      const actualMessageObject = ValidateLastName();
      expect(actualMessageObject).toHaveProperty('message');
      expect(actualMessageObject).toHaveProperty('status');
    });
    it('Returns correct message and status for required', () => {
      const errorMessageObject = ValidateLastName('');
      const expectedMessage = 'Last Name is required';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateLastName(' ');
      const expectedMessage = 'Last Name can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for only letters dashes apostrophes', () => {
      const errorMessageObject = ValidateLastName('@.!%$#');
      const expectedMessage = 'Last Name must only use letters,\ndashes, or apostrophes';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for no errors', () => {
      const errorMessageObject = ValidateLastName('Salerno');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the ValidateStreet error messages and status
   * @author - Andrew Salerno
   */
  describe('ValidateStreet', () => {
    it('Returns an error message object', () => {
      const actualMessageObject = ValidateStreet();
      expect(actualMessageObject).toHaveProperty('message');
      expect(actualMessageObject).toHaveProperty('status');
    });
    it('Returns correct message and status for required', () => {
      const errorMessageObject = ValidateStreet('');
      const expectedMessage = 'Street is required';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateStreet(' ');
      const expectedMessage = 'Street can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for only can not be only numbers', () => {
      const errorMessageObject = ValidateStreet('1122334455');
      const expectedMessage = 'Street can not be only numbers';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for must begin with a number', () => {
      const errorMessageObject = ValidateStreet('A55');
      const expectedMessage = 'Street must begin with a number';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for can not use special characters', () => {
      const errorMessageObject = ValidateStreet('3@!#$%^&*()-_+=');
      const expectedMessage = 'Street can not use special characters';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for no errors', () => {
      const errorMessageObject = ValidateStreet('123 Sesame St.');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the ValidateStreetTwo error messages and status
   * @author - Andrew Salerno
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
    it('Returns correct message and status for no errors', () => {
      const errorMessageObject = ValidateStreetTwo('Apt. #3');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the ValidateCity error messages and status
   * @author - Andrew Salerno
   */
  describe('ValidateCity', () => {
    it('Returns an error message object', () => {
      const actualMessageObject = ValidateCity();
      expect(actualMessageObject).toHaveProperty('message');
      expect(actualMessageObject).toHaveProperty('status');
    });
    it('Returns correct message and status for required', () => {
      const errorMessageObject = ValidateCity('');
      const expectedMessage = 'City is required';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateCity(' ');
      const expectedMessage = 'City can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for has special characters', () => {
      const errorMessageObject = ValidateCity('@.!%$#');
      const expectedMessage = 'City can not use special characters';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for no errors', () => {
      const errorMessageObject = ValidateCity('Columbus');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the ValidateState error messages and status
   * @author - Andrew Salerno
   */
  describe('ValidateState', () => {
    it('Returns an error message object', () => {
      const actualMessageObject = ValidateState();
      expect(actualMessageObject).toHaveProperty('message');
      expect(actualMessageObject).toHaveProperty('status');
    });
    it('Returns correct message and status for required', () => {
      const errorMessageObject = ValidateState('');
      const expectedMessage = 'State is required';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for no errors', () => {
      const errorMessageObject = ValidateState('Ohio');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the ValidateZip error messages and status
   * @author - Andrew Salerno
   */
  describe('ValidateZip', () => {
    it('Returns an error message object', () => {
      const actualMessageObject = ValidateZip();
      expect(actualMessageObject).toHaveProperty('message');
      expect(actualMessageObject).toHaveProperty('status');
    });
    it('Returns correct message and status for required', () => {
      const errorMessageObject = ValidateZip('');
      const expectedMessage = 'Zip code is required';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateZip(' ');
      const expectedMessage = 'Zip code can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for incorrect format', () => {
      const errorMessageObject = ValidateZip('1234');
      const expectedMessage = 'Zip must be format 12345 or 12345-6789';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for no errors on 5 digit', () => {
      const errorMessageObject = ValidateZip('12345');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for no errors on 5 digit dash 4 digit', () => {
      const errorMessageObject = ValidateZip('12345-1234');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the ValidateEmail error messages and status
   * @author - Andrew Salerno
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
    it('Returns correct message and status for no errors', () => {
      const errorMessageObject = ValidateEmail('asalerno@catalyte.io');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the ValidatePhone error messages and status
   * @author - Andrew Salerno
   */
  describe('ValidatePhone', () => {
    it('Returns an error message object', () => {
      const actualMessageObject = ValidatePhone();
      expect(actualMessageObject).toHaveProperty('message');
      expect(actualMessageObject).toHaveProperty('status');
    });
    it('Returns correct message and status for required', () => {
      const errorMessageObject = ValidatePhone('');
      const expectedMessage = 'Phone is required';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for empty', () => {
      const errorMessageObject = ValidatePhone(' ');
      const expectedMessage = 'Phone can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for incorrect format', () => {
      const errorMessageObject = ValidatePhone('1234');
      const expectedMessage = 'Phone must be format 123-456-7890';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Returns correct message and status for no errors', () => {
      const errorMessageObject = ValidatePhone('123-456-7890');
      const expectedMessage = 'Message';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = null;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
  });

  /**
   * @description - Tests the CreditCard helpers empty fields error messages and status
   * @author - Andrew Salerno
   */
  describe('CreditCardEmptyFields', () => {
    it('CC Number Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateCreditCardNumber(' ');
      const expectedMessage = 'Credit Card can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('CVV Number Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateCvvNumber(' ');
      const expectedMessage = 'CVV can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Card Expiration Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateCardExpiration(' ');
      const expectedMessage = 'Expiration can not be empty';
      const actualMessage = errorMessageObject.message;
      const expectedStatus = true;
      const actualStatus = errorMessageObject.status;
      expect(actualMessage).toEqual(expectedMessage);
      expect(actualStatus).toEqual(expectedStatus);
    });
    it('Cardholder Name Returns correct message and status for empty', () => {
      const errorMessageObject = ValidateCardholderName(' ');
      const expectedMessage = 'Cardholder can not be empty';
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
});
