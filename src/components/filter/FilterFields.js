import React, { useEffect, useState } from 'react';
import constants from '../../utils/constants';
import PriceFilter from './PriceFilter';
import CheckBoxFilter from './CheckboxFilter';
import styles from '../product-page/ProductPage.module.css';
import { fetchOptions, fetchColors } from './FetchOptionsService';

/**
 * @name FilterFields
 * @description A component with multiple filters that forms url to call back-end
 * @param {setUrl} setUrl updates and sets url in parent component
 * @returns A list of checkbox and textbox filters with apply and clear filter buttons
 */
const FilterFields = ({ setUrl }) => {
  const [apiError, setApiError] = useState(false);

  //  managing filter options
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [demographics, setDemographics] = useState([]);
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  //  managing single filter url
  const [filterState1, setFilterState1] = useState([]);
  const [filterState2, setFilterState2] = useState([]);
  const [filterState3, setFilterState3] = useState([]);
  const [filterState4, setFilterState4] = useState([]);
  const [filterState5, setFilterState5] = useState([]);
  const [filterState6, setFilterState6] = useState([]);
  //  managing content of each filter
  const [checkedItems1, setCheckedItems1] = useState([]);
  const [checkedItems2, setCheckedItems2] = useState([]);
  const [checkedItems3, setCheckedItems3] = useState([]);
  const [checkedItems4, setCheckedItems4] = useState([]);
  const [checkedItems5, setCheckedItems5] = useState([]);
  const [maxInput, setMaxInput] = useState([]);
  const [minInput, setMinInput] = useState([]);
  //  managing url strings of price filter
  const [max, setMax] = useState([]);
  const [min, setMin] = useState([]);

  const url = [
    `${filterState1}`,
    `${filterState2}`,
    `${filterState3}`,
    `${filterState4}`,
    `${filterState5}`,
    `${filterState6}`
  ]
    .filter(Boolean)
    .join('&');
  const applyFilter = () => {
    setUrl(`?${url}`);
  };

  const clearFilter = () => {
    setFilterState1([]);
    setFilterState2([]);
    setFilterState3([]);
    setFilterState4([]);
    setFilterState5([]);
    setFilterState6([]);
    setCheckedItems1([]);
    setCheckedItems2([]);
    setCheckedItems3([]);
    setCheckedItems4([]);
    setCheckedItems5([]);
    setMaxInput([]);
    setMinInput([]);
    setMax([]);
    setMin([]);
  };
  useEffect(() => {
    fetchOptions(constants.BRANDS_ENDPOINT, setBrands, setApiError);
    fetchOptions(constants.CATEGORIES_ENDPOINT, setCategories, setApiError);
    fetchOptions(constants.DEMOGRAPHICS_ENDPOINT, setDemographics, setApiError);
    fetchColors(setColors, setApiError);
    fetchOptions(constants.MATERIAL_ENDPOINT, setMaterials, setApiError);
  }, []);

  return (
    <div className={styles.menu} id="filter">
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {constants.API_ERROR}
        </p>
      )}
      <CheckBoxFilter
        title="Brand"
        filterFields={brands}
        setFilterState={setFilterState1}
        checkedItems={checkedItems1}
        setCheckedItems={setCheckedItems1}
      />
      <CheckBoxFilter
        title="Category"
        filterFields={categories}
        setFilterState={setFilterState2}
        checkedItems={checkedItems2}
        setCheckedItems={setCheckedItems2}
      />
      <CheckBoxFilter
        title="Demographic"
        filterFields={demographics}
        setFilterState={setFilterState3}
        checkedItems={checkedItems3}
        setCheckedItems={setCheckedItems3}
      />
      <CheckBoxFilter
        title="Color"
        filterFields={colors}
        setFilterState={setFilterState4}
        checkedItems={checkedItems4}
        setCheckedItems={setCheckedItems4}
      />
      <CheckBoxFilter
        title="Material"
        filterFields={materials}
        setFilterState={setFilterState5}
        checkedItems={checkedItems5}
        setCheckedItems={setCheckedItems5}
      />
      <PriceFilter
        setFilterState={setFilterState6}
        max={max}
        setMax={setMax}
        min={min}
        setMin={setMin}
        maxInput={maxInput}
        setMaxInput={setMaxInput}
        minInput={minInput}
        setMinInput={setMinInput}
      />
      <button type="button" onClick={applyFilter} className="control-button">
        Apply Filters
      </button>
      <button type="button" onClick={clearFilter} className="control-button">
        Reset Filters
      </button>
    </div>
  );
};

export default FilterFields;
