import {
  ValidateFirstName, ValidateLastName, ValidateStreet, ValidateSocial,
  ValidateCity, ValidateState, ValidateZip, ValidateEmail,
  ValidateGender, ValidateInsurance, ValidateAge, ValidateHeight, ValidateWeight
} from './helpers';

/**
 * @name errorMessagesObject
 * @author - Andrew Salerno
 * @description - The object used to hold error messages during validation
 */
let errorMessagesObject = {};

/**
 * @name getErrorsObject
 * @author - Andrew Salerno
 * @description - Returns an object of validated form errors to a form builder
 * @returns - An object of form errors containting a message and an error status
 */
export const getErrorsObject = () => errorMessagesObject;

/**
 * @name clearErrorsObject
 * @author - Andrew Salerno
 * @description - Clears the errorMessagesObject of form errors
 */
export const clearErrorsObject = () => { errorMessagesObject = {}; };

/**
 * @name errorsObjectIsNullOrEmpty
 * @author - Andrew Salerno
 * @description - Returns whether or not all of the
 * values in the errorMessagesObject are null or empty
 * @returns - True if all of the values in the errorMessagesObject are null or empty
 */
export const errorsObjectIsNullOrEmpty = () => Object.values(errorMessagesObject).every((value) => {
  if (value == null || value === 'Message') {
    return true;
  }
  return false;
});

export const ValidatePatient = (patient) => {
  let errors = {};
  clearErrorsObject();
  errors = ValidateFirstName(patient.firstName);
  errorMessagesObject.firstName = errors.message;
  errorMessagesObject.firstNameIsError = errors.status;

  errors = ValidateLastName(patient.lastName);
  errorMessagesObject.lastName = errors.message;
  errorMessagesObject.lastNameIsError = errors.status;

  errors = ValidateEmail(patient.email);
  errorMessagesObject.email = errors.message;
  errorMessagesObject.emailIsError = errors.status;

  errors = ValidateSocial(patient.ssn);
  errorMessagesObject.ssn = errors.message;
  errorMessagesObject.ssnIsError = errors.status;

  errors = ValidateStreet(patient.street);
  errorMessagesObject.street = errors.message;
  errorMessagesObject.streetIsError = errors.status;

  errors = ValidateCity(patient.city);
  errorMessagesObject.city = errors.message;
  errorMessagesObject.cityIsError = errors.status;

  errors = ValidateState(patient.state);
  errorMessagesObject.state = errors.message;
  errorMessagesObject.stateIsError = errors.status;

  errors = ValidateZip(patient.postal);
  errorMessagesObject.postal = errors.message;
  errorMessagesObject.postalIsError = errors.status;

  errors = ValidateGender(patient.gender);
  errorMessagesObject.gender = errors.message;
  errorMessagesObject.genderIsError = errors.status;

  errors = ValidateInsurance(patient.insurance);
  errorMessagesObject.insurance = errors.message;
  errorMessagesObject.insuranceIsError = errors.status;

  errors = ValidateAge(patient.age);
  errorMessagesObject.age = errors.message;
  errorMessagesObject.ageIsError = errors.status;

  errors = ValidateHeight(patient.height);
  errorMessagesObject.height = errors.message;
  errorMessagesObject.heightIsError = errors.status;

  errors = ValidateWeight(patient.weight);
  errorMessagesObject.weight = errors.message;
  errorMessagesObject.weightIsError = errors.status;
};
