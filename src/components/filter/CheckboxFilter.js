import React, { useState } from 'react';
import Collapsible from './Collapsible';
import styles from './Filter.module.css';

/**
 * @name CheckBoxFilter
 * @description An element that takes in an array and a title to create a filter based off
 * of the provided information.
 * @param {title} String information to be displayed next to expand button
 * (helpful information of what the filter is).
 * @param {filterFields} Array the information to be dispalyed in the filter.
 * @returns A filled out filter component with all provided information.
 */
const CheckBoxFilter = ({ title, filterFields }) => {
  const [isChecked, setIsChecked] = useState(
    new Array(filterFields.length).fill(false)
  );

  const onClickHandler = (position) => {
    const updatedCheckedState = isChecked.map((item, index) => (index === position ? !item : item));

    setIsChecked(updatedCheckedState);
  };

  return (
    <Collapsible title={title}>
      <>
        {filterFields.map((field, index) => (
          <div>
            <label htmlFor={`${field}`}>
              <input
                id={`${field}`}
                className={styles.filterCheckbox}
                type="checkbox"
                checked={isChecked[index]}
                onClick={() => onClickHandler(index)}
              />
              {field}
            </label>
          </div>
        ))}
      </>
    </Collapsible>
  );
};

export default CheckBoxFilter;
