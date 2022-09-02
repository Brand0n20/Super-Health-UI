import React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAltOutlined';
import './MenuButton.css';

/**
 * Generate the button to toggle the filter menu.
 * @param {object} param0 - An object containing all properties
 *  that help modify the behavior of the button
 * @returns The JSX button element to display on the screen.
 */
const MenuButton = ({ handleOnClick, slideTo }) => {
  let position = 'initial-position';
  if (slideTo) {
    position = 'expended';
  }
  return (
    <div>
      <button type="button" id="menuButton" data-testid="menuButton-test-id" className={position} onClick={handleOnClick}>
        <FilterAltIcon />
      </button>
    </div>
  );
};

export default MenuButton;
