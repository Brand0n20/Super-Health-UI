import React from 'react';
import Collapsible from './Collapsible';
import styles from './Filter.module.css';

/**
 * @Name PriceFilter
 * @description Creates a filter component that can display price fields
 * @returns A dropdown with two input fields that persist on refresh.
 */
const PriceFilter = ({
  setFilterState, max, setMax, min, setMin, maxInput, setMaxInput, minInput, setMinInput
}) => {
  let updatedList1 = max;
  let updatedList2 = min;
  const handleChangeMax = (evt) => {
    updatedList1 = evt.target.value ? `${evt.target.name}=${evt.target.value}` : '';
    setMax(updatedList1);
    setMaxInput(evt.target.value);
    const url = [`${updatedList1}`, `${updatedList2}`].filter(Boolean).join('&');
    setFilterState(url);
  };

  const handleChangeMin = (evt) => {
    updatedList2 = evt.target.value ? `${evt.target.name}=${evt.target.value}` : '';
    setMin(updatedList2);
    setMinInput(evt.target.value);
    const url = [`${updatedList1}`, `${updatedList2}`].filter(Boolean).join('&');
    setFilterState(url);
  };

  return (
    <div>
      <Collapsible
        title="Price"
      >
        <>
          <label htmlFor={min} className={styles.filterParagraphTextbox}>
            Min Price
            <input
              type="number"
              name="min-price"
              id="min-price"
              min="0"
              placeholder="0.00"
              value={minInput}
              className={styles.filterInput}
              onChange={handleChangeMin}
            />
          </label>
          <label htmlFor={max} className={styles.filterParagraphTextbox}>
            Max Price
            <input
              type="number"
              name="max-price"
              id="max-price"
              min="0"
              placeholder="0.00"
              value={maxInput}
              className={styles.filterInput}
              onChange={handleChangeMax}
            />
          </label>
        </>
      </Collapsible>
    </div>
  );
};

export default PriceFilter;
