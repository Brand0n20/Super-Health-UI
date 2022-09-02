import React, { useState } from 'react';
import Menu from './Menu';
import MenuButton from './MenuButton';

/**
 * Render the Menu and the MenuButton elements and their behaviors.
 * @returns The container on which the filter menu
 * and the MenuButton elements are rendered
 */
const MenuContainer = ({ setUrl }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnClick = (e) => {
    setIsVisible(!isVisible);
    e.stopPropagation();
  };

  return (
    <div data-testid="menuContainer">
      <MenuButton handleOnClick={handleOnClick} slideTo={isVisible} />
      <Menu menuVisibility={isVisible} setUrl={setUrl} />
    </div>
  );
};

export default MenuContainer;
