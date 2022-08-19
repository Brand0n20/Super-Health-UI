import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import styles from './Filter.module.css';

/**
 * @name Collapsible
 * @description Creates an element that can hide and show content if expand button is pushed
 * @param {children} children the content to be displayed when expanded.
 * @param {title} String the title displayed next to the expand button.
 * @returns A collapsible element that expands and contracts to hide and show information.
 */
const Collapsible = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState();

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.filterDiv}>
          <p className={styles.title}>{title}</p>
          <button
            type="button"
            className={styles.btn}
            onClick={toggle}
          >
            {isOpen ? (
              <ExpandLessIcon
                className={styles.svg_icons}
              />
            ) : (
              <ExpandMoreIcon
                className={styles.svg_icons}
              />
            )}
          </button>
        </div>
        <div className={styles.borderBottom}>
          <div>
            {isOpen && (
            <div className={styles.dropdown}>
                {children}
            </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default Collapsible;
