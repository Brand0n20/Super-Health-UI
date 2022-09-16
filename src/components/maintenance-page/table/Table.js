/* eslint-disable react-hooks/exhaustive-deps */
import {
  React, useState, useRef, useEffect
} from 'react';
import styles from './Table.module.css';

/**
 * Optional container to position the product table on page
 * @param {*} children
 * @returns component
 */

export const TableContainer = ({ children }) => (

  <div className={styles['table-container']}>{children}</div>
);

/**
 * Container to hold all table components
 * @param {*} children
 * @returns component
 */

export const Table = ({ children }) => (
  <div className={styles.table}>{children}</div>
);

/**
 * Sticky header for table component
 * @param {*} children
 * @returns component
 */
export const TableHeader = ({ children }) => (
  <div className={styles['table-header']}>{children}</div>
);

/**
 * Table Row for table
 * @param {*} children
 * @param {*} active Determine whether a row should be faded out on the table
 * @returns component
 */

export const TableRow = ({ children = true }) => (
  <div className={`${styles['table-row']}`}>{children}</div>
);

/**
 * Body for all rows except the header row
 * @param {} children
 * @returns component
 */
export const TableBody = ({ children }) => (
  <div className={styles['table-body']}>{children}</div>
);

/**
 * Cell for components in the table
 * @param {*} children
 * @param {string} size set sizes for table cells include "tiny", "small", "medium", "large"
 * @param {string} tooltipOffset determines whether a tooltip
 * displays higher or lower on a table cell
 * @param {boolean} disableToolTip toggle for enabling and disabling tooltip
 * @returns component
 */

export const TableCell = ({
  children,
  size = 'medium',
  tooltipOffset = 'bottom',
  disableToolTip = false
}) => {
  const [showToolTip, setShowTooltip] = useState(false);

  const tableCell = useRef();

  useEffect(() => {
    if (
      tableCell.current.clientWidth < tableCell.current.scrollWidth
      && !disableToolTip
    ) {
      setShowTooltip(true);
    }
  }, []);
  return (
    <div className={styles['table-cell-container']}>
      <div
        ref={tableCell}
        className={`${styles['table-cell']} ${styles[size]}`}
      >
        {children}
      </div>
      {showToolTip && (
        <span className={`${styles.tooltip} ${styles[tooltipOffset]}`}>
          {children}
        </span>
      )}
    </div>
  );
};
