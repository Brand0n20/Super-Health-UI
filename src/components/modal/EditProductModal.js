import { React, useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './EditProductModal.module.css';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import validator from '../../utils/Validator';
import { updateProduct } from '../maintenance-page/MaintenancePageService';
import { fetchProducts } from '../product-page/ProductPageService';
import customToast from '../customizable-toast/customToast';

let initialState = {
  id: null,
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
const validateEditProductForm = (productData) => {
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
* Formats the result of date input field to be correctly displayed for use
* @author Chris Gillespie
* @param {string} date
* @returns Formatted date string e.g. XX-XX-XXXX
*/

const unformatDate = (date) => {
  const dateArray = date.split('/');
  dateArray.unshift(dateArray.pop());
  return dateArray.join('-');
};

/**
 * Updates a product on the maintanence table
 * @name EditProductModal
 * @returns React Component
 */

const EditProductModal = ({
  onClose,
  setApiError,
  setEditButtonClicked,
  product,
  setProducts
}) => {
  const [productData, setProductData] = useState(initialState);
  const [validationData, setValidationData] = useState(
    validator.initialize(initialState)
  );
  useEffect((
  ) => async () => {
    setEditButtonClicked(null);
    await fetchProducts('', setProducts, setApiError);
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  /**
   * @name onProductChange
   * @description Set changes to product Data
   */

  const onProductChange = (e) => {
    setProductData({ ...productData, [e.target.id]: e.target.value });
  };

  initialState = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    type: product.type,
    demographic: product.demographic,
    material: product.material,
    description: product.description,
    category: product.category,
    primaryColorCode: product.primaryColorCode.slice(1, 7),
    secondaryColorCode: product.secondaryColorCode.slice(1, 7),
    globalProductCode: product.globalProductCode.slice(3, 10),
    imageSrc: product.imageSrc,
    quantity: product.quantity,
    price: product.price.toFixed(2),
    releaseDate: unformatDate(product.releaseDate),
    styleNumber: product.styleNumber.slice(2, 8),
    active: 'true'
  };

  /**
     * @name handleSubmit
     * @description New product is added to database after button is clicked
     * Successful messages will appear before redirecting to maintenance page
     * If unsuccesful, error message will appear and the input fields will
     * persist with session storage values
     */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validatorResults = validateEditProductForm(productData);

    if (!validatorResults.isValidForm()) {
      setValidationData(validatorResults.getResults());
      customToast(
        'There are issues with your submitted product information. Please check your inputs for errors and try again.',
        'error'
      );
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
    productData.id = product.id;

    const editProducts = await updateProduct(
      productData,
      setApiError
    );

    if (editProducts != null) {
      setApiError(false);
      setValidationData(validator.initialize(initialState));
      setProductData(initialState);
    } else {
      setProductData(JSON.parse(sessionStorage.getItem('productData')));
      onClose();
    }
  };

  return (
    <Modal open onClose={onClose} className={styles.modal}>
      <div className={styles.wrapperContainer}>
        <div className={styles.inputWrapper}>
          <FormItem
            key="name"
            className={styles.formItem}
            placeholder="e.g. Women's Running Shorts"
            type="text"
            id="name"
            label="Name"
            onChange={onProductChange}
            value={productData.name || ''}
            isError={validationData.name.isError}
            errorMessage={validationData.name.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="brand"
            className={styles.formItem}
            placeholder="e.g. Nike, New Balance, PUMA"
            type="text"
            id="brand"
            label="Brand"
            onChange={onProductChange}
            value={productData.brand || ''}
            isError={validationData.brand.isError}
            errorMessage={validationData.brand.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="type"
            className={styles.formItem}
            placeholder="e.g. Shoe, Glove, Jacket"
            type="text"
            id="type"
            label="Type"
            onChange={onProductChange}
            value={productData.type || ''}
            isError={validationData.type.isError}
            errorMessage={validationData.type.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="demographic"
            className={styles.formItem}
            placeholder="e.g. Men, Women, Kids"
            type="text"
            id="demographic"
            label="Demographic"
            onChange={onProductChange}
            value={productData.demographic || ''}
            isError={validationData.demographic.isError}
            errorMessage={validationData.demographic.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="material"
            className={styles.formItem}
            placeholder="e.g. Cotton, Wool, Silk"
            type="text"
            id="material"
            label="Material"
            onChange={onProductChange}
            value={productData.material || ''}
            isError={validationData.material.isError}
            errorMessage={validationData.material.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="category"
            className={styles.formItem}
            placeholder="e.g. Soccer, Golf, Basketball"
            type="text"
            id="category"
            label="Category"
            onChange={onProductChange}
            value={productData.category || ''}
            isError={validationData.category.isError}
            errorMessage={validationData.category.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="primaryColorCode"
            className={styles.formItem}
            placeholder="3120E0"
            type="text"
            id="primaryColorCode"
            label="Primary Color Code"
            onChange={onProductChange}
            value={productData.primaryColorCode || ''}
            isError={validationData.primaryColorCode.isError}
            errorMessage={validationData.primaryColorCode.errorMessage}
            maxLength="6"
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="secondaryColorCode"
            className={styles.formItem}
            placeholder="21E1E1"
            type="text"
            id="secondaryColorCode"
            label="Secondary Color Code"
            onChange={onProductChange}
            value={productData.secondaryColorCode || ''}
            isError={validationData.secondaryColorCode.isError}
            errorMessage={validationData.secondaryColorCode.errorMessage}
            maxLength="6"
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="description"
            className={styles.formItem}
            placeholder="e.g. Lightweight, Slim, Comfortable"
            type="text"
            id="description"
            label="Description"
            onChange={onProductChange}
            value={productData.description || ''}
            isError={validationData.description.isError}
            errorMessage={validationData.description.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>

          <FormItem
            key="globalProductCode"
            className={styles.formItem}
            placeholder="1234567"
            type="text"
            id="globalProductCode"
            label="Global Product Code"
            onChange={onProductChange}
            value={productData.globalProductCode || ''}
            paddingLeft="2.1em"
            isError={validationData.globalProductCode.isError}
            errorMessage={validationData.globalProductCode.errorMessage}
            maxLength="7"
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="imageSrc"
            className={styles.formItem}
            placeholder="e.g. https://jiffyshirts.imgix.net/"
            type="text"
            id="imageSrc"
            label="Image URL"
            onChange={onProductChange}
            value={productData.imageSrc || ''}
            isError={validationData.imageSrc.isError}
            errorMessage={validationData.imageSrc.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="styleNumber"
            className={styles.formItem}
            placeholder="12345"
            type="text"
            max="99999"
            id="styleNumber"
            label="Style Number"
            onChange={onProductChange}
            value={productData.styleNumber || ''}
            paddingLeft="2em"
            isError={validationData.styleNumber.isError}
            errorMessage={validationData.styleNumber.errorMessage}
            maxLength="5"
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="price"
            className={styles.formItem}
            placeholder="e.g. 10.95"
            type="text"
            id="price"
            label="Item Price"
            onChange={onProductChange}
            value={productData.price || ''}
            isError={validationData.price.isError}
            errorMessage={validationData.price.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="quantity"
            className={styles.formItem}
            placeholder="e.g. 88"
            type="text"
            id="quantity"
            label="Quantity"
            onChange={onProductChange}
            value={productData.quantity || ''}
            isError={validationData.quantity.isError}
            errorMessage={validationData.quantity.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItem
            key="releaseDate"
            className={styles.formItem}
            placeholder="e.g. 01/01/2011"
            type="date"
            id="releaseDate"
            label="Release Date"
            onChange={onProductChange}
            value={productData.releaseDate || ''}
            isError={validationData.releaseDate.isError}
            errorMessage={validationData.releaseDate.errorMessage}
          />
        </div>
        <div className={styles.inputWrapper}>
          <FormItemDropdown
            key="active"
            className={styles.formItem}
            id="active"
            label="Active Product"
            options={['true', 'false']}
            onChange={onProductChange}
            defaultValue={productData.active || 'true'}
          />
        </div>
        <div>
          <button
            className={styles.submitButton}
            type="button"
            onClick={handleSubmit}
          >
            Edit Product
          </button>
          <button
            className={styles.cancelButton}
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;
