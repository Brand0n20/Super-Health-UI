import React from 'react';
import FilterFields from '../filter/FilterFields';
import './Menu.css';

/**
 * Generate the filter menu element.
 * @param {object} param0 An object containing the property
 *  that help show and hide the filter menu.
 * @returns The JSX filter menu element to be controlled by the MenuButton element.
 */
const Menu = ({ menuVisibility, setUrl }) => {
  let visibility = 'hide';
  if (menuVisibility) {
    visibility = 'show';
  }

  return (
    <div id="menu" data-testid="menu-test-id" className={visibility}>
      <FilterFields setUrl={setUrl} />
    </div>
  );
};

export default Menu;
