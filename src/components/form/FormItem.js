/* eslint-disable max-len */
import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */

const FormItem = ({
  onChange, value, id, label, placeholder, type, errorMessage, isError, prefix, maxLength, paddingLeft
}) => {
  const errorStyles = isError ? styles.errorOutline : styles.input;
  const prefixError = prefix ? `${styles['prefix-error']}` : '';
  const prefixStyles = prefix ? `${styles['input-prefix']}` : '';
  if (isError) {
    return (
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
  }
  return (
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
};

export default FormItem;
