/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import validator from '../../utils/Validator';
import styles from './CreationPage.module.css';
import AddProductForm from './forms/AddProductForm';
import postProducts from './CreationPageService';
import constants from '../../utils/constants';

const initialState = {
  name: null,
  brand: null,
  type: null,
  demographic: null,
  material: null,
  description: null,
  category: null,
  primaryColorCode: null,
  secondaryColorCode: null,
  globalProductCode: null,
  imageSrc: null,
  quantity: null,
  price: null,
  releaseDate: null,
  styleNumber: null,
  active: 'true'
};

/**
 * Formats the result of date input field to be correctly stored in the database
 * @author Kevin Davis
 * @param {string} date
 * @returns Formatted date string e.g. XX/XX/XXXX
 */

const formatDate = (date) => {
  const dateArray = date.split('-');
  dateArray.push(dateArray.shift());
  return dateArray.join('/');
};

/**
 * Perform validation on product form
 * @author Kevin Davis
 * @param {Object} productData
 * @returns Validator object with results of validation performed on the object passed in
 */
const validateAddProductForm = (productData) => {
  validator.initialize(productData);
  validator.checkEmptyFields(
    'except',
    ['releaseDate'],
    'Required field must not be empty or contain only whitespace'
  );
  validator.checkEmptyFields(
    'only',
    ['releaseDate'],
    'Date must be filled e.g. 01/02/2022'
  );
  validator.checkPositiveIntegers(
    'only',
    ['globalProductCode', 'styleNumber', 'quantity'],
    'Field must contain only positive numbers'
  );
  validator.checkLength(
    { rangeType: 'exact', range: 7 },
    'only',
    ['globalProductCode'],
    'Must have exactly 7 digits e.g. po-1234567'
  );
  validator.checkLength(
    { rangeType: 'exact', range: 6 },
    'only',
    ['primaryColorCode', 'secondaryColorCode'],
    'Color code must have exactly 6 characters e.g. #3120E0'
  );
  validator.checkHexCode(
    'only',
    ['primaryColorCode', 'secondaryColorCode'],
    'Invalid Color Code. Color code must contain only hexadecimal digits. e.g. #3120E0'
  );
  validator.checkLength(
    { rangeType: 'exact', range: 5 },
    'only',
    ['styleNumber'],
    'Field must have exactly 5 digits'
  );
  validator.checkBasicDate(
    'only',
    ['releaseDate'],
    'Field does not contain a valid date e.g. XX/XX/XXXX'
  );
  validator.checkPrice(
    'only',
    ['price'],
    'Field must contain a valid price e.g. $10.00'
  );
  validator.checkURL('only', ['imageSrc']);

  return validator;
};

/**
 * Displays product creation page form
 * @returns component
 */

const CreationPage = () => {
  const [ApiError, setApiError] = useState();
  const [productData, setProductData] = useState(initialState);
  const [validationData, setValidationData] = useState(
    validator.initialize(initialState)
  );
  const history = useHistory();

  /**
   * @name onProductChange
   * @description Set changes to product Data
   */

  const onProductChange = (e) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  /**
   * @name handleSubmit
   * @description New product is added to database after button is clicked
   * Successful messages will appear before redirecting to maintenance page
   * If unsuccesful, error message will appear and the input fields will persist with session storage values
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatorResults = validateAddProductForm(productData);

    if (!validatorResults.isValidForm()) {
      setValidationData(validatorResults.getResults());
      return;
    }
    setValidationData(validator.initialize(initialState));
    sessionStorage.setItem('productData', JSON.stringify(productData));

    productData.primaryColorCode = `#${productData.primaryColorCode}`;
    productData.secondaryColorCode = `#${productData.secondaryColorCode}`;
    productData.globalProductCode = `po-${productData.globalProductCode}`;
    productData.styleNumber = `sc${productData.styleNumber}`;
    productData.releaseDate = formatDate(productData.releaseDate);
    productData.price = parseFloat(productData.price);
    productData.quantity = parseInt(productData.quantity, 10);
    productData.active = productData.active === 'true';

    const createProducts = await postProducts(
      productData,
      setApiError,
      history
    );
    if (createProducts != null) {
      setApiError(false);
      setValidationData(validator.initialize(initialState));
      setProductData(initialState);
    } else {
      setProductData(JSON.parse(sessionStorage.getItem('productData')));
    }
  };

  /**
   * @name returntoMaintenance
   * @description Return to maintenance page function for buttons
   */
  const returntoMaintenance = () => {
    history.push('/maintenance');
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="product"
      >
        <AddProductForm
          onChange={onProductChange}
          productData={productData}
          validationData={validationData}
        />
      </form>
      <div>
        {ApiError && (
          <p
            className={styles.errMsg}
            data-testid="errMsg"
          >
            {constants.API_ERROR}
          </p>
        )}
      </div>
      <div className={styles.buttonBlock}>
        <button
          type="submit"
          form="product"
          className={styles.button}
          data-testid="addButton"
        >
          Add Product
        </button>
        <button
          type="button"
          onClick={returntoMaintenance}
          className={styles.button}
        >
          Return to Maintenance Page
        </button>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default CreationPage;
