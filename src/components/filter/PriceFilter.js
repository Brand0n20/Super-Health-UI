import React, { useState } from 'react';
import Collapsible from './Collapsible';
import styles from './Filter.module.css';

/**
 * @Name PriceFilter
 * @description Creates a filter component that can display price fields
 * @returns A dropdown with two input fields that persist on refresh.
 */
const PriceFilter = () => {
  const [input, setInput] = useState({
    maxPrice: '',
    minPrice: ''
  });

  const handleChange = (evt) => {
    const { value } = evt.target;
    setInput({
      ...input,
      [evt.target.name]: value
    });
  };

  return (
    <Collapsible
      title="Price"
    >
      <>
        <label htmlFor={input} className={styles.filterParagraphTextbox}>
          Max Price
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            min="0"
            placeholder="0.00"
            value={input.maxPrice}
            className={styles.filterInput}
            onChange={handleChange}
          />
        </label>
        <label htmlFor={input} className={styles.filterParagraphTextbox}>
          Min Price
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            min="0"
            placeholder="0.00"
            value={input.minPrice}
            className={styles.filterInput}
            onChange={handleChange}
          />
        </label>
      </>
    </Collapsible>
  );
};

export default PriceFilter;
