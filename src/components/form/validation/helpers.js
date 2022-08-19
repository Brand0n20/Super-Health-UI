/**
 * @description - Validates if an input is required
 * @param {*string} property - The input value being validated
 * @returns - If the input is required
 */
const isRequired = (property) => (property === '' || property == null);

/**
 * @description - Validates if an input has spaces
 * @param {*string} property - The input value being validated
 * @returns - If the input contains spaces
 */
const hasSpaces = (property) => /[\s\t\n]/.test(property);

const anythingNotSpaces = (property) => /[^\s\t\n]/.test(property);

// const hasNumbers = (property) => /[0-9]/.test(property);

const hasSpecialCharacters = (property) => /[!@#$%^&*()]/.test(property);

const onlyLettersDashesApostrophesSpaces = (property) => /[^A-Za-z-' ]/.test(property);

const phoneIsDashedFormat = (property) => /^\d{3}-\d{3}-\d{4}$/.test(property);

const isFiveFourDashedNumberFormat = (property) => /^\d{5}-\d{4}$/.test(property);

// const isOnlyNumbersOrDashes = (property) => /[^0-9-]/.test(property);

const beginsWithANumber = (property) => /^\d+/.test(property);

const notNumbersOrSpaces = (property) => /[^0-9\s\t\n]/.test(property);

const isGroupOfThreeNumbers = (property) => /^\d{3}$/.test(property);

const isGroupOfFiveNumbers = (property) => /^\d{5}$/.test(property);

const isGroupOfSixteenNumbers = (property) => /^\d{16}$/.test(property);

const hasAtFollowedByPeriod = (property) => /\S+@\S+\.\S+/.test(property);

const cardHolderNameFormat = (property) => /^[A-Z][a-z-']+\s[A-Z][a-z-']+$/.test(property);

const creditCardExpiration = (property) => /^(0[1-9]|1[0-2])\/?(\d{2})$/.test(property);

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
    errorMessage.message = 'First Name can not be empty';
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
    errorMessage.message = 'Last Name can not be empty';
    errorMessage.status = true;
  } else if (onlyLettersDashesApostrophesSpaces(lastName)) {
    errorMessage.message = 'Last Name must only use letters,\ndashes, or apostrophes';
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
    errorMessage.message = 'Street can not be empty';
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
 * @name ValidateStreetTwo
 * @description - Validates a Street2 input
 * @param {*string} street2 - Street2 information to be validated
 * @returns - An error message and an error status
 */
export const ValidateStreetTwo = (street2) => {
  const errorMessage = { message: 'Message', status: null };
  if (!anythingNotSpaces(street2)) {
    errorMessage.message = 'Street2 can not be empty';
    errorMessage.status = true;
  } else if (hasSpecialCharacters(street2)) {
    errorMessage.message = 'Street2 can not use special characters';
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
    errorMessage.message = 'City can not be empty';
    errorMessage.status = true;
  } else if (hasSpecialCharacters(city)) {
    errorMessage.message = 'City can not use special characters';
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
    errorMessage.message = 'State is required';
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
export const ValidateZip = (zip) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(zip)) {
    errorMessage.message = 'Zip code is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(zip)) {
    errorMessage.message = 'Zip code can not be empty';
    errorMessage.status = true;
  } else if (!isGroupOfFiveNumbers(zip)) {
    if (!isFiveFourDashedNumberFormat(zip)) {
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
    errorMessage.message = 'Email can not contain spaces';
    errorMessage.status = true;
  } else if (!hasAtFollowedByPeriod(email)) {
    errorMessage.message = 'Email must be fromat email@email.com';
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
 * @name ValidateCreditCardNumber
 * @description - Validates a Credit Card number input
 * @param {*string} cardNumber - The Credit Card information to be validated
 * @returns - An error message and an error status
 */
export const ValidateCreditCardNumber = (cardNumber) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(cardNumber)) {
    errorMessage.message = 'Credit Card is required';
    errorMessage.status = true;
  } else if (!anythingNotSpaces(cardNumber)) {
    errorMessage.message = 'Credit Card can not be empty';
    errorMessage.status = true;
  } else if (!isGroupOfSixteenNumbers(cardNumber)) {
    errorMessage.message = 'Credit Card must be a group of sixteen numbers';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateCvvNumber
 * @description - Validates a Cvv number input
 * @param {*string} cvv - Cvv number to be validated
 * @returns - An error message and an error status
 */
export const ValidateCvvNumber = (cvv) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(cvv)) {
    errorMessage.message = 'Cvv number is required';
    errorMessage.status = true;
  } else if (!isGroupOfThreeNumbers(cvv)) {
    errorMessage.message = 'Cvv must be a group of three numbers';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateCardExpiration
 * @description - Validates a credit card expiration date input
 * @param {*string} expiration - Expiration date to be validated
 * @returns - An error message and an error status
 */
export const ValidateCardExpiration = (expiration) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(expiration)) {
    errorMessage.message = 'Expiration date is required';
    errorMessage.status = true;
  } else if (!creditCardExpiration(expiration)) {
    errorMessage.message = 'Invalid expiration date';
    errorMessage.status = true;
  }
  return errorMessage;
};

/**
 * @name ValidateCardholderName
 * @description - Validates a Cardholder Name input
 * @param {*string} cardholder - Cardholder Name to be validated
 * @returns - An error message and an error status
 */
export const ValidateCardholderName = (cardholder) => {
  const errorMessage = { message: 'Message', status: null };
  if (isRequired(cardholder)) {
    errorMessage.message = 'Cardholder Name is required';
    errorMessage.status = true;
  } else if (!cardHolderNameFormat(cardholder)) {
    errorMessage.message = 'Cardholder Name must be correct format';
    errorMessage.status = true;
  }
  return errorMessage;
};
