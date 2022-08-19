/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */

/**
 * Helper class for performing validation on forms
 * @author Kevin Davis
 */
class Validator {
  _hasErrorKeyName = 'isError';

  _errorMessageKeyName = 'errorMessage'

  _validationResults = {};

  _isValidData;

  /**
   * Initializes Validator with initial validation data generated from passed in form data
   * @param {Object} formData - Object containing data from input fields
   * @returns Object with initial validation data
   */

  initialize(formData) {
    if (Object.keys(formData).length === 0) {
      throw new Error('Form data is empty');
    }

    this._trimTextFields(formData);
    this._setInitialValidationObject();
    this._isValidData = true;
    return this.getResults();
  }

  /**
   * Method for custom validation using a passed in regex
   * * use Validator.getResults() to get results of validation.
   * @param {Object} regex - Object with regex and errorMessage as keys
   * @param {string} condition - Defaults to 'all'.
   * *Must pass in fields array if used
   * 
   * 'only' - performs validation on the fields passed in.
   * 
   * 'except' - skips validation on the fields passed in.

   * @param {Array} fields - List of field names to be validated or skipped
   * 
   */

  check({ regex, errorMessage }, condition = 'all', fields) {
    const fieldsToValidate = this._getFieldsToValidate(condition, fields);

    fieldsToValidate.forEach((field) => {
      if (!regex.test(this.getInputValue(field))) {
        this._invalidateForm();
        this._setError(field, errorMessage);
      }
    });
  }

  /**
   * Checks if all or only specified fields are empty. Updates validation results.
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkEmptyFields(condition = 'all', fields, message = 'Field must not be empty') {
    const fieldsToValidate = this._getFieldsToValidate(condition, fields);

    fieldsToValidate.forEach((field) => {
      if (this.getInputValue(field) === '' || this.getInputValue(field) === null) {
        this._invalidateForm();
        this._setError(field, message);
      }
    });
  }

  /**
   * Checks if all or only specified fields contain only letters. Updates validation results.
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkOnlyLetters(condition = 'all', fields, message = 'Field must contain only letters') {
    this.check({ regex: /^[a-zA-Z]+$/m, [this._errorMessageKeyName]: message }, condition, fields);
  }

  /**
   * Checks if all or only specified fields contain only positive numbers. Updates validation results.
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkPositiveIntegers(condition = 'all', fields, message = 'Field must contain only numbers') {
    this.check({ regex: /^[0-9]+[0-9]*$/, [this._errorMessageKeyName]: message }, condition, fields);
  }

  /**
   * Checks if all or only specified fields contains a valid basic email. Updates validation results.
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkBasicEmail(condition = 'all', fields, message = 'Invalid Email format') {
    this.check({ regex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, [this._errorMessageKeyName]: message }, condition, fields);
  }

  /**
   * Checks if all or only specified fields contains date formatted as XX/XX/XXXX. Updates validation results.
   * 
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkBasicDate(condition = 'all', fields, message = 'Invalid Date format') {
    this.check({ regex: /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/m, [this._errorMessageKeyName]: message }, condition, fields);
  }

  /**
   * Checks if all or only specified fields contains only alphanumeric characters. Updates validation results.
   * 
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkAlphanumericCharacters(condition = 'all', fields, message = 'Field must contain alphanumeric characters') {
    this.check({ regex: /^[a-zA-Z0-9]+$/, [this._errorMessageKeyName]: message }, condition, fields);
  }

  /**
   * Checks if all or only specified fields contains a price formatted with up to two decimals. Updates validation results.
   * 
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkPrice(condition = 'all', fields, message = 'Field does not contain a valid price') {
    this.check({ regex: /^\d+(,\d{3})*(\.\d{2})?$/, [this._errorMessageKeyName]: message }, condition, fields);
  }

  /**
   * Checks if all or only specified fields contains a valid URL. Updates validation results.
   * 
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkURL(condition = 'all', fields, message = 'Field does not contain a valid URL e.g. https://jiffyshirts.imgix.net/') {
    this.check({ regex: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/, [this._errorMessageKeyName]: message }, condition, fields);
  }

  /**
   * Checks if all or only specified fields contains a valid hexadecimal code. Updates validation results.
   * 
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkHexCode(condition = 'all', fields, message = 'Field does not contain a valid hexadecimal code') {
    this.check({ regex: /^[a-fA-F0-9]+$/, [this._errorMessageKeyName]: message }, condition, fields);
  }

  /**
   * Checks if all or only specified fields have a required character length. Updates validation results.
   * @param {Object} range
   * 
   * use 'exact', 'at-least', 'at-most', for rangeType
   * 
   * use any integer for range 
   * @param {string} condition - Defaults to 'all'
   * 
   * 'only' - performs validation on the fields passed in. *Must pass in fields array if used
   * 
   * 'except' - skips validation on the fields passed in. *Must pass in fields array if used
   * @param {Array} fields - List of field names to be validated or skipped
   * @param {string} message - Custom error message
   */

  checkLength({ rangeType, range = 0 }, condition = 'all', fields, message = 'Field does not match length requirement') {
    const fieldsToValidate = this._getFieldsToValidate(condition, fields);

    switch (rangeType) {
      case 'exact':
        fieldsToValidate.forEach((field) => {
          const length = this.getInputValue(field) ? this.getInputValue(field).length : 0;
          if (length !== range) {
            this._invalidateForm();
            this._setError(field, message);
          }
        });
        break;
      case 'at-least':
        fieldsToValidate.forEach((field) => {
          const length = this.getInputValue(field) ? this.getInputValue(field).length : 0;
          if (length < range) {
            this._invalidateForm();
            this._setError(field, message);
          }
        });
        break;
      case 'at-most':
        fieldsToValidate.forEach((field) => {
          const length = this.getInputValue(field) ? this.getInputValue(field).length : 0;
          if (length > range) {
            this._invalidateForm();
            this._setError(field, message);
          }
        });
        break;

      default:
        throw new Error('Invalid rangeType or no rangeTypeProvided');
    }
  }

  /**
   * Resets validation error for a specified field in the Validator object
   * @param {string} field - Field Name
   * @returns Object of validation results 
   */

  resetError(field = null) {
    if (field === null) {
      return;
    }
    // eslint-disable-next-line max-len
    this._validationResults[field] = { [this._hasErrorKeyName]: false, [this._errorMessageKeyName]: null };
    // eslint-disable-next-line consistent-return
    return this.getResults();
  }

  /**
   * Gets an input value from the data passed in.
   * @param {string} field 
   * @returns Input value of the field passed in.
   */

  getInputValue(field) {
    return this.formData[field];
  }

  /**
   * Check if the entire form is valid
   * @returns Boolean of whether the data passed in is valid data
   */

  isValidForm() {
    return this._isValidData;
  }

  /**
   * Method of getting the validation results for each input field.
   * @returns Object with the results of each input field.
   */

  getResults() {
    return JSON.parse(JSON.stringify(this._validationResults));
  }

  /**
   * Private method to invalidate the form. Only doing so if it's not already invalid.
   */
  _invalidateForm() {
    if (this._isValidData) {
      this._isValidData = false;
    }
  }

  /**
   * Private method to initialize the Validator Object with they keys that were passed in from the form data
   */
  _setInitialValidationObject() {
    this._validationResults = {};
    Object.keys(this.formData).forEach((field) => {
      this._validationResults[field] = { [this._hasErrorKeyName]: false, [this._errorMessageKeyName]: null };
    });
  }

  /**
   * Private method to trim any text fields with whitespace
   * @param {Object} formData - Form Object
   */
  _trimTextFields(formData) {
    const formDataCopy = { ...formData };

    Object.keys(formDataCopy).forEach((field) => {
      if (typeof formDataCopy[field] === 'string') {
        formDataCopy[field] = formDataCopy[field].trim();
      }
    });
    this.formData = formDataCopy;
  }

  /**
   * Private method to set the error for a field with an error message
   * @param {string} field - Field name
   * @param {string} message - Error message
   */
  _setError(field, message) {
    try {
      if (!this._validationResults[field][this._errorMessageKeyName]) {
        this._validationResults[field][this._hasErrorKeyName] = true;
        this._validationResults[field][this._errorMessageKeyName] = message;
      }
    } catch (err) {
      throw new Error(`"${field}" does not exist`);
    }
  }

  /**
   * Private method to determine which fields to validate
   * @param {string} condition - Use 'only' or 'except'. Defaults to all.
   * @param {Array} fields - Array of fields
   * @returns Array of fields.
   */
  // eslint-disable-next-line consistent-return
  _getFieldsToValidate(condition = 'all', fields = null) {
    if (fields !== null && fields.length === 0) {
      throw new Error('Array must not be empty');
    }
    switch (condition) {
      case 'all':
        return Object.keys(this.formData);
      case 'only':
        return fields;
      case 'except':
        return this._removeFields(new Set(Object.keys(this.formData)), fields);
      default:
        throw new Error("Invalid condition passed, please pass 'only' or 'except' as condition");
    }
  }

  /**
   * Private method to remove fields that do not need to validated.
   * @param {Set} set 
   * @param {Array} fields 
   * @returns Array of fields filter from Set
   */
  // eslint-disable-next-line class-methods-use-this
  _removeFields(set, fields) {
    fields.forEach((field) => set.delete(field));
    return Array.from(set);
  }
}

export default new Validator();
