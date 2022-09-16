import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ className }) => (
  <div className={`${className} ${styles['lds-ring']}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Spinner;
