/* eslint-disable max-len */
import validator from './Validator';

describe('Validator initialize()', () => {
  it('should initialize a validation object', () => {
    const validationObject = validator.initialize({ name: 'Kevin', code: 123 });

    expect(validationObject).toEqual({ name: { isError: false, errorMessage: null }, code: { isError: false, errorMessage: null } });
  });

  it('should throw error with an empty object', () => {
    expect(() => { validator.initialize({}); }).toThrowError();
  });
});

describe('Validator check()', () => {
  it('validates all fields with regex', () => {
    validator.initialize({ name: 'Kevin', code: 123 });
    validator.check({ regex: /^[a-zA-Z]+$/m, errorMessage: 'Error message' });

    expect(validator.getResults()).toEqual({ name: { isError: false, errorMessage: null }, code: { isError: true, errorMessage: 'Error message' } });
  });
});

describe('Validator checkEmptyFields()', () => {
  it('validates all empty fields', () => {
    const expectedValidation = { name: { isError: false, errorMessage: null }, code: { isError: true, errorMessage: 'Field must not be empty' } };

    validator.initialize({ name: 'Kevin', code: '' });
    validator.checkEmptyFields();
    expect(validator.getResults()).toEqual(expectedValidation);
  });

  it('validates only certain fields with custom message', () => {
    const expectedValidation = { name: { isError: true, errorMessage: 'Required Field' }, code: { isError: false, errorMessage: null } };

    validator.initialize({ name: '', code: '' });
    validator.checkEmptyFields('only', ['name'], 'Required Field');
    expect(validator.getResults()).toEqual(expectedValidation);
  });

  it('validates all fields except certain fields', () => {
    const expectedValidation = { name: { isError: true, errorMessage: 'Required Field' }, code: { isError: false, errorMessage: null } };

    validator.initialize({ name: '', code: '' });
    validator.checkEmptyFields('except', ['code'], 'Required Field');
    expect(validator.getResults()).toEqual(expectedValidation);
  });

  it('throws an empty array error', () => {
    validator.initialize({ name: '', code: '' });

    expect(() => { validator.checkEmptyFields('only', []); }).toThrowError('Array must not be empty');
  });

  it('throws an invalid condition error', () => {
    validator.initialize({ name: '', code: '' });

    expect(() => { validator.checkEmptyFields('hello'); }).toThrowError("Invalid condition passed, please pass 'only' or 'except' as condition");
  });
});

describe('Validator checkOnlyLetters()', () => {
  it('gives errors for values that do not contain only letters', () => {
    const expectedValidation = { name: { isError: false, errorMessage: null }, code: { isError: true, errorMessage: 'Field must contain only letters' } };
    validator.initialize({ name: 'Kevin', code: 123 });

    validator.checkOnlyLetters();

    expect(validator.getResults()).toEqual(expectedValidation);
  });
});

describe('Validator checkPositiveIntegers', () => {
  it('gives errors for values that do not contain only positive integers', () => {
    const expectedValidation = { name: { isError: true, errorMessage: 'Field must contain only numbers' }, code: { isError: false, errorMessage: null } };
    validator.initialize({ name: 'Kevin', code: 123 });

    validator.checkPositiveIntegers();

    expect(validator.getResults()).toEqual(expectedValidation);
  });
});

describe('Validator checkBasicEmail()', () => {
  it('gives errors for values that do not contain a valid email', () => {
    const expectedValidation = { email: { isError: true, errorMessage: 'Invalid Email format' } };
    validator.initialize({ email: 'kdavis@' });

    validator.checkBasicEmail();

    expect(validator.getResults()).toEqual(expectedValidation);
  });
});

describe('Validator checkBasicDate()', () => {
  it('gives errors for values that do not contain a valid date', () => {
    const expectedValidation = { date: { isError: true, errorMessage: 'Invalid Date format' } };

    validator.initialize({ date: '01/01/20' });

    validator.checkBasicDate();

    expect(validator.getResults()).toEqual(expectedValidation);
  });
});

describe('Validator checkAlphanumericCharacters()', () => {
  it('gives errors for values that do not contain alphanumeric characters', () => {
    const expectedValidation = { name: { isError: true, errorMessage: 'Field must contain alphanumeric characters' } };
    validator.initialize({ name: '!!@@##adfaafafdf' });

    validator.checkAlphanumericCharacters();

    expect(validator.getResults()).toEqual(expectedValidation);
  });
});

describe('Validator checkPrice()', () => {
  it('gives errors for values that do not contain a valid price', () => {
    const expectedValidation = { price: { isError: true, errorMessage: 'Field does not contain a valid price' } };

    validator.initialize({ price: 10.548 });

    validator.checkPrice();

    expect(validator.getResults()).toEqual(expectedValidation);
  });
});

describe('Validator checkURL()', () => {
  it('gives errors for values that do not conatin a valid URL', () => {
    const expectedValidation = { url: { isError: true, errorMessage: 'Field does not contain a valid URL e.g. https://jiffyshirts.imgix.net/' } };

    validator.initialize({ url: 'fafaf////afdff.com' });

    validator.checkURL();

    expect(validator.getResults()).toEqual(expectedValidation);
  });
});

describe('Validator checkHexCode()', () => {
  it('gives errors for values that do not conatin a valid hexadecimal value', () => {
    const expectedValidation = { code: { isError: true, errorMessage: 'Field does not contain a valid hexadecimal code' } };

    validator.initialize({ code: '1aRad' });

    validator.checkHexCode();

    expect(validator.getResults()).toEqual(expectedValidation);
  });
});

describe('Validator checkLength()', () => {
  const expectedValidation = { length: { isError: true, errorMessage: 'Field does not match length requirement' } };

  it('gives errors for values that do not give the exact length', () => {
    validator.initialize({ length: 'number' });

    validator.checkLength({ rangeType: 'exact', range: 5 });

    expect(validator.getResults()).toEqual(expectedValidation);
  });

  it('gives errors for values that have more characters than range value', () => {
    validator.initialize({ length: 'number' });

    validator.checkLength({ rangeType: 'at-most', range: 5 });

    expect(validator.getResults()).toEqual(expectedValidation);
  });

  it('gives errors for values that have less characters than range value', () => {
    validator.initialize({ length: 'digi' });

    validator.checkLength({ rangeType: 'at-least', range: 5 });

    expect(validator.getResults()).toEqual(expectedValidation);
  });

  it('throws error for invalid values in rangeType', () => {
    validator.initialize({ length: 'number' });

    expect(() => { validator.checkLength({ rangeType: 'lizard', range: 5 }); }).toThrowError('Invalid rangeType or no rangeTypeProvided');
  });
});

describe('Validator resetError()', () => {
  const expectedValidation = { name: { isError: false, errorMessage: null } };

  it('resets an error that has been created for a specific field', () => {
    validator.initialize({ name: '' });

    validator.checkEmptyFields();

    expect(validator.resetError('name')).toEqual(expectedValidation);
  });
});

describe('Validator getInputValue()', () => {
  it('gets an input value from the form date', () => {
    validator.initialize({ name: 'Kevin', code: 123 });

    expect(validator.getInputValue('name')).toEqual('Kevin');
  });
});
