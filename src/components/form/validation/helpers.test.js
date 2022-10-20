/* eslint-disable max-len */
import {
  ValidateFirstName, ValidateLastName, ValidateStreet, ValidateCity,
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
});
