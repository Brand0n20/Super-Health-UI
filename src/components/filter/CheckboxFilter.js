import React from 'react';
import Collapsible from './Collapsible';
import styles from './Filter.module.css';
import ColorArray from './ColorArray';

/**
 * @name CheckBoxFilter
 * @description An element that takes in an array and a title to create a filter based off
 * of the provided information.
 * @param {title} String information to be displayed next to expand button
 * (helpful information of what the filter is).
 * @param {filterFields} Array the information to be dispalyed in the filter.
 * @returns A filled out filter component with all provided information.
 */
const CheckBoxFilter = ({
  title, filterFields, setFilterState, checkedItems, setCheckedItems
}) => {
  let updatedItems = [...checkedItems];
  let urlArray = [];
  const onClickHandler = (event) => {
    if (event.target.checked) {
      updatedItems = [...checkedItems, event.target.name];
    } else {
      //  take out the name if the box is unchecked
      updatedItems.splice(checkedItems.indexOf(event.target.name), 1);
    }
    setCheckedItems(updatedItems);

    if (title === 'Color') {
      updatedItems.forEach((color) => urlArray.push(Object.keys(ColorArray).find((key) => ColorArray[key] === color.replace('#', '')).replace('#', '')));
    } else {
      urlArray = updatedItems.map((item) => item.toLowerCase().replaceAll(' ', '-'));
    }
    const urlString = urlArray.filter(Boolean).join(',');
    const singleFilter = urlArray.length ? `${title}=${urlString}` : '';
    setFilterState(singleFilter);
  };

  const IsCheckedItems = (item) => (updatedItems.includes(item) ? 'checked-item' : 'not-checked-item');

  return (
    <div>
      <Collapsible title={title}>
        <>
          {filterFields.map((field, index) => (
            <div key={`${field}`}>
              <label htmlFor={`${field}`}>
                <input
                  id={`${index}`}
                  name={`${field}`}
                  className={styles.filterCheckbox}
                  type="checkbox"
                  checked={checkedItems.includes(field)}
                  onChange={onClickHandler}
                />
                <span className={IsCheckedItems(field)}>{field}</span>
              </label>
            </div>
          ))}
        </>
      </Collapsible>
    </div>
  );
};

export default CheckBoxFilter;
