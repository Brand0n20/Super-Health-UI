import React from 'react';
import styles from './Table.module.css';

export const Table = ({
  children, width = 'auto', height = 'auto', style
}) => (
  <div data-testid="table" className={styles.table} style={{ width, height, ...style }}>{children}</div>
);

export const TableRow = ({ children, style }) => (<div className={styles['table-row']} style={{ ...style }}>{children}</div>);

export const TableCell = ({
  children, width = 'min-content', height = 'min-content', color, scrollableX, scrollableY, style
}) => (
  <div
    className={`${styles['table-cell']} ${scrollableX ? styles['scrollable-x'] : ''} ${scrollableY ? styles['scrollable-y'] : ''}`}
    style={{
      width, height, color, ...style
    }}
  >
    {children}
  </div>
);

export const TableHeader = ({ children, style }) => (
  <TableRow style={{ ...style }}>{children}</TableRow>
);

export const TableBody = ({ children, scrollable, style }) => (
  <div className={`${styles['table-body']} ${scrollable ? styles.scrollable : ''}`} style={{ ...style }}>{children}</div>
);
