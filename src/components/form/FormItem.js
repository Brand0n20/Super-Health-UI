/* eslint-disable max-len */
import React from 'react';
import styles from './FormItem.module.css';

/**
 * @authors Kevin Devis, Franc Laghom
 * @description Input field
 * @returns -An input component.
 */
const RegularInput = ({
  onChange, value, id, label, placeholder, type, errorMessage, prefix, maxLength, paddingLeft,
  errorStyles, prefixStyles
}) => (
  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          className={`${errorStyles} ${prefixStyles}`}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          style={{ paddingLeft }}
          maxLength={maxLength}
        />
      </div>
      <div className={styles.invisible}>{errorMessage}</div>
    </label>
  </div>
);

/**
 * @authors Kevin Devis, Franc Laghom
 * @description Input field
 * @returns -Input component with an error message.
 */
const RegularInputWithError = ({
  onChange, value, id, label, placeholder, type, errorMessage, prefix, maxLength, paddingLeft,
  errorStyles, prefixStyles, prefixError
}) => (
  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        {prefix && <span className={`${styles.prefix} ${prefixError}`}>{prefix}</span>}
        <input
          className={`${errorStyles} ${prefixStyles}`}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          style={{ paddingLeft }}
          maxLength={maxLength}
        />
      </div>
      <div className={styles.errorText}>{errorMessage}</div>
    </label>
  </div>
);

/**
 * @authors Kevin Devis, Franc Laghom
 * @description Input field
 * @returns -Text area component.
 */
const TextArea = ({
  onChange, value, id, label, placeholder, type, errorMessage, prefix,
  maxLength, paddingLeft, rows, errorStyles, prefixStyles
}) => (
  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <textarea
          className={`${errorStyles} ${prefixStyles}`}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          style={{ paddingLeft }}
          maxLength={maxLength}
          rows={rows}
        />
      </div>
      <div className={styles.invisible}>{errorMessage}</div>
    </label>
  </div>
);

/**
 * @authors Kevin Devis, Franc Laghom
 * @description Text area field
 * @returns -Text area component with and error message
 */
const TextAreaWithError = ({
  onChange, value, id, label, placeholder, type, errorMessage, prefix,
  maxLength, paddingLeft, rows, errorStyles, prefixStyles, prefixError
}) => (
  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        {prefix && <span className={`${styles.prefix} ${prefixError}`}>{prefix}</span>}
        <textarea
          className={`${errorStyles} ${prefixStyles}`}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          style={{ paddingLeft }}
          maxLength={maxLength}
          rows={rows}
        />
      </div>
      <div className={styles.errorText}>{errorMessage}</div>
    </label>
  </div>
);

/**
 * @author Kevin Davis, Franc Laghom
 * @name FormItem
 * @description Input field
 * @return component
 */

const FormItem = ({
  onChange, value, id, label, placeholder, type, errorMessage, isError, prefix, maxLength, paddingLeft, rows
}) => {
  const errorStyles = isError ? styles.errorOutline : styles.input;
  const prefixError = prefix ? `${styles['prefix-error']}` : '';
  const prefixStyles = prefix ? `${styles['input-prefix']}` : '';

  if (isError) {
    switch (type) {
      case 'textarea':
        return (
          <TextAreaWithError
            onChange={onChange}
            value={value}
            id={id}
            label={label}
            placeholder={placeholder}
            type={type}
            errorMessage={errorMessage}
            prefix={prefix}
            maxLength={maxLength}
            paddingLeft={paddingLeft}
            errorStyles={errorStyles}
            prefixStyles={prefixStyles}
            prefixError={prefixError}
            rows={rows}
          />
        );
      default:
        return (
          <RegularInputWithError
            onChange={onChange}
            value={value}
            id={id}
            label={label}
            placeholder={placeholder}
            type={type}
            errorMessage={errorMessage}
            prefix={prefix}
            maxLength={maxLength}
            paddingLeft={paddingLeft}
            errorStyles={errorStyles}
            prefixStyles={prefixStyles}
            prefixError={prefixError}
          />
        );
    }
  }

  switch (type) {
    case 'textarea':
      return (
        <TextArea
          onChange={onChange}
          value={value}
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
          errorMessage={errorMessage}
          prefix={prefix}
          maxLength={maxLength}
          paddingLeft={paddingLeft}
          errorStyles={errorStyles}
          prefixStyles={prefixStyles}
          rows={rows}
        />
      );
    default:
      return (
        <RegularInput
          onChange={onChange}
          value={value}
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
          errorMessage={errorMessage}
          prefix={prefix}
          maxLength={maxLength}
          paddingLeft={paddingLeft}
          errorStyles={errorStyles}
          prefixStyles={prefixStyles}
        />
      );
  }
};

export default FormItem;
