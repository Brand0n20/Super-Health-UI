import {
  ValidateFirstName, ValidateLastName, ValidateStreet, ValidateSocial,
  ValidateCity, ValidateState, ValidateZip, ValidateEmail,
  ValidateGender, ValidateInsurance, ValidateAge,
  ValidateHeight, ValidateWeight, ValidateProvider,
  ValidateTotalCost, ValidateIcd10, ValidateVisitCode,
  ValidateBillingCode, ValidateCopay, ValidateChiefComplaint, ValidateNumber, ValidateDate
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

export const ValidateEncounter = (encounter) => {
  let errors = {};
  clearErrorsObject();
  errors = ValidateProvider(encounter.provider);
  errorMessagesObject.provider = errors.message;
  errorMessagesObject.providerIsError = errors.status;

  errors = ValidateTotalCost(encounter.totalCost);
  errorMessagesObject.totalCost = errors.message;
  errorMessagesObject.totalCostIsError = errors.status;

  errors = ValidateCopay(encounter.copay);
  errorMessagesObject.copay = errors.message;
  errorMessagesObject.copayIsError = errors.status;

  errors = ValidateIcd10(encounter.icd10);
  errorMessagesObject.icd10 = errors.message;
  errorMessagesObject.icd10IsError = errors.status;

  errors = ValidateVisitCode(encounter.visitCode);
  errorMessagesObject.visitCode = errors.message;
  errorMessagesObject.visitCodeIsError = errors.status;

  errors = ValidateBillingCode(encounter.billingCode);
  errorMessagesObject.billingCode = errors.message;
  errorMessagesObject.billingCodeIsError = errors.status;

  errors = ValidateChiefComplaint(encounter.chiefComplaint);
  errorMessagesObject.chiefComplaint = errors.message;
  errorMessagesObject.chiefComplaintIsError = errors.status;

  errors = ValidateNumber(encounter.pulse);
  errorMessagesObject.pulse = errors.message;
  errorMessagesObject.pulseIsError = errors.status;

  errors = ValidateNumber(encounter.systolic);
  errorMessagesObject.systolic = errors.message;
  errorMessagesObject.systolicIsError = errors.status;

  errors = ValidateNumber(encounter.diastolic);
  errorMessagesObject.diastolic = errors.message;
  errorMessagesObject.diastolicIsError = errors.status;

  errors = ValidateDate(encounter.date);
  errorMessagesObject.date = errors.message;
  errorMessagesObject.dateIsError = errors.status;
};

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
