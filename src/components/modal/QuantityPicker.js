import React from 'react';
import styles from './QuantityPicker.module.css';
import { useCart } from '../checkout-page/CartContext';

/**
 * @name QuantityPicker
 * @param {min} min minimum number minus button
 * @param {value} value quantity
 * @param {title} title product title for dispatch to search and update quantity
 * @param {setValue} setValue update quantity
 * @param {className} className imported css if needed
 * @param {handleBlur} handleBlur onBlur event if value is passed in, otherwise would be blank
 * @returns a quantity picker that takes imported css, handleBlur event and title
 */
const QuantityPicker = ({
  min,
  value,
  title,
  setValue,
  className,
  handleBlur
}) => {
  const { dispatch } = useCart();
  let updatedValue = value;

  /**
   * @name updateModalValue
   * @description update value in quantity picker when number is mannually entered
   * @param {input} e the input field
   */
  const updateModalValue = (e) => {
    const quantity = e.target.value ? +e.target.value : '';
    if (quantity === '' || /^[1-9]\d*$/g.test(quantity)) {
      setValue(quantity);
    }
  };

  /**
   * @name decrementModalValue
   * @descripion substract 1 from quantity picker value when minus button is clicked
   */
  const decrementModalValue = () => {
    if (updatedValue > min) {
      updatedValue -= 1;
      setValue(updatedValue);
    }
  };

  /**
   * @name incrementModalValue
   * @descripion add 1 to quantity picker value when plus button is clicked
   */
  const incrementModalValue = () => {
    updatedValue += 1;
    setValue(updatedValue);
  };

  return (
    <div
      role="button"
      tabIndex="0"
      className={`${styles.picker} ${className}`}
      onBlur={handleBlur || ''}
    >
      <button
        type="button"
        onClick={
          setValue
            ? decrementModalValue
            : () => {
              dispatch({ type: 'decrement', payload: title });
            }
        }
        className={styles.button}
      >
        -
      </button>
      <label htmlFor="quantity" className={className}>
        <input
          name="quantity"
          id="quantity"
          min={min}
          value={value}
          className={styles.input}
          onChange={
            setValue
              ? updateModalValue
              : (e) => {
                const quantity = e.target.value ? +e.target.value : '';
                if (/^[1-9]\d*$/g.test(quantity)) {
                  dispatch({
                    type: 'update',
                    payload: {
                      title,
                      quantity
                    }
                  });
                }
                if (quantity === '') {
                  dispatch({
                    type: 'update',
                    payload: {
                      title,
                      quantity: 0
                    }
                  });
                }
              }
          }
        />
      </label>
      <button
        type="button"
        onClick={
          setValue
            ? incrementModalValue
            : () => {
              dispatch({ type: 'increment', payload: title });
            }
        }
        className={styles.button}
      >
        +
      </button>
    </div>
  );
};

export default QuantityPicker;
