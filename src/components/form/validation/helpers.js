/**
 * @description - Validates if an input is required
 * @param {*string} property - The input value being validated
 * @returns - If the input is required
 */
const isRequired = (property) => (property === '' || property == null);

/**
 * @description - Checks if an input has spaces
 * @param {*string} property - The input value being validated
 * @returns - If the input contains spaces
 */
const hasSpaces = (property) => /[\s\t\n]/.test(property);

/**
 * @description - Checks if an input has anything not a space
 * @param {*string} property - The input value being validated
 * @returns - If the input contain anything not a space
 */
const anythingNotSpaces = (property) => /[^\s\t\n]/.test(property);

const hasSpecialCharacters = (property) => /[!@#$%^&*()]/.test(property);

const onlyLettersDashesApostrophesSpaces = (property) => /[^A-Za-z-' ]/.test(property);

const phoneIsDashedFormat = (property) => /^\d{3}-\d{3}-\d{4}$/.test(property);

const isFiveFourDashedNumberFormat = (property) => /^\d{5}-\d{4}$/.test(property);

const beginsWithANumber = (property) => /^\d+/.test(property);

const notNumbersOrSpaces = (property) => /[^0-9\s\t\n]/.test(property);

const isGroupOfFiveNumbers = (property) => /^\d{5}$/.test(property);

const isValidSocialSecurityNumber = (property) => /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/.test(property);

const isValidEmail = (property) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(property);

const isValidICD10 = (property) => /^[A-Z]{1}\d{2}$/.test(property);

const isValidVisitCode = (property) => /^[A-Z]{1}\d{1}[A-Z]{1} \d{1}[A-Z]{1}\d{1}$/.test(property);

const isValidBillingCode = (property) => /^\d{3}.\d{3}.\d{3}-\d{2}$/.test(property);

const isWholeNumber = (property) => /^\d+$/.test(property);

const isValidDate = (property) => /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(property);

/**
 * @name ValidateFirstName
 * @description - Validates a First Name input for:
 * isRequired, hasSpaces, hasNumbers, only letters, dashes -, or apostrophes '
 * @param {*string} firstName - First Name value to be validated
 * @returns - An error message and an error status
 */
export const ValidateFirstName = (firstName) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(firstName)) {
    errorMessage.message = 'First Name is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(firstName)) {
    errorMessage.message = 'First Name is required';
    errorMessage.status = true;
  } else if (onlyLettersDashesApostrophesSpaces(firstName)) {
    errorMessage.message = 'First Name must only use letters,\ndashes, or apostrophes';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateLastName
 * @description - Validates a Last Name input for:
 * isRequired, hasSpaces, hasNumbers, only letters, dashes -, or apostrophes '
 * @param {*string} lastName - Last Name value to be validated
 * @returns - An error message and an error status
 */
export const ValidateLastName = (lastName) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(lastName)) {
    errorMessage.message = 'Last Name is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(lastName)) {
    errorMessage.message = 'Last Name is required';
    errorMessage.status = true;
  } else if (onlyLettersDashesApostrophesSpaces(lastName)) {
    errorMessage.message = 'Last Name must only use letters,\ndashes, or apostrophes';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateSocial
 * @description - Validates ssn and makes sure format is correct
 * @param {*} ssn - social security number to be validated
 * @returns - An error message and error status
 */
export const ValidateSocial = (ssn) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(ssn)) {
    errorMessage.message = 'SSN is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(ssn)) {
    errorMessage.message = 'SSN is required';
    errorMessage.status = true;
  } else if (!isValidSocialSecurityNumber(ssn)) {
    errorMessage.message = 'SSN  must match DDD-DD-DDDD format';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateStreet
 * @description - Validates a Street input
 * @param {*string} street - The street infromation to be validated
 * @returns - An error message and and error status
 */
export const ValidateStreet = (street) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(street)) {
    errorMessage.message = 'Street is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(street)) {
    errorMessage.message = 'Street is required';
    errorMessage.status = true;
  } else if (!notNumbersOrSpaces(street)) {
    errorMessage.message = 'Street can not be only numbers';
    errorMessage.status = true;
  } else if (!beginsWithANumber(street)) {
    errorMessage.message = 'Street must begin with a number';
    errorMessage.status = true;
  } else if (hasSpecialCharacters(street)) {
    errorMessage.message = 'Street can not use special characters';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateCity
 * @description - Validates a City input
 * @param {*string} city - City information to be validated
 * @returns - An error message and an error status
 */
export const ValidateCity = (city) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(city)) {
    errorMessage.message = 'City is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(city)) {
    errorMessage.message = 'City is required';
    errorMessage.status = true;
  } else if (hasSpecialCharacters(city)) {
    errorMessage.message = 'City can not use special characters';
    errorMessage.status = true;
  } else if (onlyLettersDashesApostrophesSpaces(city)) {
    errorMessage.message = 'City must only use letters,\ndashes, or apostrophes';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateState
 * @description - Validates a State input
 * @param {*string} state - State information to be validated
 * @returns - An error message and an error status
 */
export const ValidateState = (state) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(state)) {
    errorMessage.message = 'Must select a state';
    errorMessage.status = true;
  } else if (hasSpecialCharacters(state)) {
    errorMessage.message = 'Must select a state';
    errorMessage.status = true;
  } else if (onlyLettersDashesApostrophesSpaces(state)) {
    errorMessage.message = 'Must select a state';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateZip
 * @description - Validates a Zip code input
 * @param {*string} zip - Zip code information to be validated
 * @returns - An error message and an error status
 */
export const ValidateZip = (postal) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(postal)) {
    errorMessage.message = 'Zip code is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(postal)) {
    errorMessage.message = 'Zip code is required';
    errorMessage.status = true;
  } else if (!isGroupOfFiveNumbers(postal)) {
    if (!isFiveFourDashedNumberFormat(postal)) {
      errorMessage.message = 'Zip must be format 12345 or 12345-6789';
      errorMessage.status = true;
    }
  }
  return errorMessage;
};

/**
 * @name ValidateEmail
 * @description - Validates an Email input
 * @param {*string} email - Email to be validated
 * @returns - An error message and an error status
 */
export const ValidateEmail = (email) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(email)) {
    errorMessage.message = 'Email is required';
    errorMessage.status = true;
  } else if (hasSpaces(email)) {
    errorMessage.message = 'Must be a valid email';
    errorMessage.status = true;
  } else if (!isValidEmail(email)) {
    errorMessage.message = 'Must be a valid email';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidatePhone
 * @description - Validates a phone input
 * @param {*string} phone - The Phone information to be validated
 * @returns - An error message and an error status
 */
export const ValidatePhone = (phone) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(phone)) {
    errorMessage.message = 'Phone is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(phone)) {
    errorMessage.message = 'Phone can not be empty';
    errorMessage.status = true;
  } else if (!phoneIsDashedFormat(phone)) {
    errorMessage.message = 'Phone must be format 123-456-7890';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateInsurance
 * @description - Validates a insurance input for:
 * isRequired, hasSpaces, hasNumbers, only letters, dashes -, or apostrophes '
 * @param {*string} insurance - Insurance value to be validated
 * @returns - An error message and an error status
 */
export const ValidateInsurance = (insurance) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(insurance)) {
    errorMessage.message = 'Insurance is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(insurance)) {
    errorMessage.message = 'Insurance is required';
    errorMessage.status = true;
  } else if (onlyLettersDashesApostrophesSpaces(insurance)) {
    errorMessage.message = 'Insurance must only use letters,\ndashes, or apostrophes';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateGender
 * @description - Validates a Gender input
 * @param {*string} gender - Gender information to be validated
 * @returns - An error message and an error status
 */
export const ValidateGender = (gender) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(gender)) {
    errorMessage.message = 'Must select either Male, Female, or Other';
    errorMessage.status = true;
  } else if (!gender || gender === '0') {
    errorMessage.message = 'Must select either Male, Female, or Other';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateAge = (age) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(age)) {
    errorMessage.message = 'Age is required';
    errorMessage.status = true;
  } else if (!isWholeNumber(age)) {
    errorMessage.message = 'Age must be a positive whole number';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateHeight = (height) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(height)) {
    errorMessage.message = 'Height is required';
    errorMessage.status = true;
  } else if (!isWholeNumber(height)) {
    errorMessage.message = 'Height must be a positive whole number';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateWeight = (weight) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(weight)) {
    errorMessage.message = 'Weight is required';
    errorMessage.status = true;
  } else if (!isWholeNumber(weight)) {
    errorMessage.message = 'Weight must be a positive whole number';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateProvider = (provider) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(provider)) {
    errorMessage.message = 'Provider is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(provider)) {
    errorMessage.message = 'Provider is required';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateTotalCost = (totalCost) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(totalCost)) {
    errorMessage.message = 'Total is required';
    errorMessage.status = true;
  } else if (totalCost <= 0) {
    errorMessage.message = 'Total cost must be a positive number';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateCopay = (copay) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(copay)) {
    errorMessage.message = 'Copay is required';
    errorMessage.status = true;
  } else if (copay <= 0) {
    errorMessage.message = 'Copay must be a positive number';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateIcd10 = (icd10) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(icd10)) {
    errorMessage.message = 'Icd10 is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(icd10)) {
    errorMessage.message = 'Icd10 is required';
    errorMessage.status = true;
  } else if (!isValidICD10(icd10)) {
    errorMessage.message = 'Icd10 must be of format LDD(ex. A12)';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateVisitCode = (visitCode) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(visitCode)) {
    errorMessage.message = 'Visit Code is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(visitCode)) {
    errorMessage.message = 'Visit Code is required';
    errorMessage.status = true;
  } else if (!isValidVisitCode(visitCode)) {
    errorMessage.message = 'Visit Code must be of format LDL DLD(ex. A1S 2D3)';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateBillingCode = (billingCode) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(billingCode)) {
    errorMessage.message = 'Billing Code is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(billingCode)) {
    errorMessage.message = 'Billing Code is required';
    errorMessage.status = true;
  } else if (!isValidBillingCode(billingCode)) {
    errorMessage.message = 'Billing Code must be of format xxx.xxx.xxx-xx(ex. 123.456.789-12)';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateChiefComplaint = (chiefComplaint) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(chiefComplaint)) {
    errorMessage.message = 'Chieft complaint is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(chiefComplaint)) {
    errorMessage.message = 'Chieft complaint is required';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateNumber = (number) => {
  const errorMessage = { message: 'Message', status: null };
  if (!isRequired(number) && number <= 0) {
    errorMessage.message = 'Number must be a whole positive number';
    errorMessage.status = true;
  } else if (!isRequired(number) && !isWholeNumber(number)) {
    errorMessage.message = 'Number must be a whole positive number';
    errorMessage.status = true;
  }
  return errorMessage;
};

export const ValidateDate = (date) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(date)) {
    errorMessage.message = 'Date is required';
    errorMessage.status = true;
  } else if (!isValidDate(date)) {
    errorMessage.message = 'Date must be in the format YYYY-MM-DD(ex. 2020-01-01)';
    errorMessage.status = true;
  }
  return errorMessage;
};
