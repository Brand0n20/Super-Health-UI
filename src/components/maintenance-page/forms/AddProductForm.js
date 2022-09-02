import React from 'react';
import styles from './AddProductForm.module.css';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';

/**
 * @author Kevin Davis
 * @description Wrapper to give space between input fields
 * @returns component
 */

const InputWrapper = ({ children }) => (
  <div className={styles['input-wrapper']}>{children}</div>);

/**
 * @name AddProductForm
 * @description Product Form to add products to the database
 * @return component
 */

const AddProductForm = ({
  onChange, productData, validationData
}) => (

  <div className={styles.form}>
    <InputWrapper>
      <FormItem
        placeholder="e.g. Women's Running Shorts"
        type="text"
        id="name"
        label="Name"
        onChange={onChange}
        value={productData.name || ''}
        isError={validationData.name.isError}
        errorMessage={validationData.name.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. Nike, New Balance, PUMA"
        type="text"
        id="brand"
        label="Brand"
        onChange={onChange}
        value={productData.brand || ''}
        isError={validationData.brand.isError}
        errorMessage={validationData.brand.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. Shoe, Glove, Jacket"
        type="text"
        id="type"
        label="Type"
        onChange={onChange}
        value={productData.type || ''}
        isError={validationData.type.isError}
        errorMessage={validationData.type.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. Men, Women, Kids"
        type="text"
        id="demographic"
        label="Demographic"
        onChange={onChange}
        value={productData.demographic || ''}
        isError={validationData.demographic.isError}
        errorMessage={validationData.demographic.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. Cotton, Wool, Silk"
        type="text"
        id="material"
        label="Material"
        onChange={onChange}
        value={productData.material || ''}
        isError={validationData.material.isError}
        errorMessage={validationData.material.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. Soccer, Golf, Basketball"
        type="text"
        id="category"
        label="Category"
        onChange={onChange}
        value={productData.category || ''}
        isError={validationData.category.isError}
        errorMessage={validationData.category.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="3120E0"
        type="text"
        id="primaryColorCode"
        label="Primary Color Code"
        onChange={onChange}
        value={productData.primaryColorCode || ''}
        prefix="#"
        isError={validationData.primaryColorCode.isError}
        errorMessage={validationData.primaryColorCode.errorMessage}
        maxLength="6"
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="21E1E1"
        type="text"
        id="secondaryColorCode"
        label="Secondary Color Code"
        onChange={onChange}
        value={productData.secondaryColorCode || ''}
        prefix="#"
        isError={validationData.secondaryColorCode.isError}
        errorMessage={validationData.secondaryColorCode.errorMessage}
        maxLength="6"
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. Lightweight, Slim, Comfortable"
        type="text"
        id="description"
        label="Description"
        onChange={onChange}
        value={productData.description || ''}
        isError={validationData.description.isError}
        errorMessage={validationData.description.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="1234567"
        type="text"
        id="globalProductCode"
        label="Global Product Code"
        onChange={onChange}
        value={productData.globalProductCode || ''}
        prefix="po-"
        paddingLeft="2.1em"
        isError={validationData.globalProductCode.isError}
        errorMessage={validationData.globalProductCode.errorMessage}
        maxLength="7"
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. https://jiffyshirts.imgix.net/"
        type="text"
        id="imageSrc"
        label="Image URL"
        onChange={onChange}
        value={productData.imageSrc || ''}
        isError={validationData.imageSrc.isError}
        errorMessage={validationData.imageSrc.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="12345"
        type="text"
        max="99999"
        id="styleNumber"
        label="Style Number"
        onChange={onChange}
        value={productData.styleNumber || ''}
        prefix="sc-"
        paddingLeft="2em"
        isError={validationData.styleNumber.isError}
        errorMessage={validationData.styleNumber.errorMessage}
        maxLength="5"
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. 10.95"
        type="text"
        id="price"
        label="Item Price"
        onChange={onChange}
        value={productData.price || ''}
        prefix="$"
        isError={validationData.price.isError}
        errorMessage={validationData.price.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. 88"
        type="text"
        id="quantity"
        label="Quantity"
        onChange={onChange}
        value={productData.quantity || ''}
        isError={validationData.quantity.isError}
        errorMessage={validationData.quantity.errorMessage}
      />
    </InputWrapper>
    <InputWrapper>
      <FormItem
        placeholder="e.g. 01/01/2011"
        type="date"
        id="releaseDate"
        label="Release Date"
        onChange={onChange}
        value={productData.releaseDate || ''}
        isError={validationData.releaseDate.isError}
        errorMessage={validationData.releaseDate.errorMessage}
      />
    </InputWrapper>
    <FormItemDropdown
      id="active"
      label="Active Product"
      options={['true', 'false']}
      onChange={onChange}
      defaultValue={productData.active || 'true'}
    />
  </div>
);

export default AddProductForm;
