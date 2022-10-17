import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @return component
 */
const FormItemDropdown = ({
  onChange, value, id, label, options, errorMessage, isError
}) => {
  if (isError) {
    return (
      <div>
        <label className={styles.label} htmlFor={id}>
          {label}
          <div>
            <select
              className={isError ? styles.errorOutline : styles.input}
              id={id}
              onChange={onChange}
              value={value}
            >
              <option
                value={0}
                key={0}
              >
                Select One
              </option>
              {options.map((optionText) => (
                <option
                  value={optionText}
                  key={optionText}
                >
                  {optionText}
                </option>
              ))}
            </select>
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
          <select
            className={styles.input}
            id={id}
            onChange={onChange}
            value={value}
          >
            <option
              value={0}
              key={0}
            >
              Select One
            </option>
            {options.map((optionText) => (
              <option
                value={optionText}
                key={optionText}
              >
                {optionText}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.invisible}>{errorMessage}</div>
      </label>
    </div>
  );
};
export default FormItemDropdown;
