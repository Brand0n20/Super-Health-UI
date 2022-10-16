import React from 'react';
import styles from './Patients.module.css';

const PatientCard = ({ patient }) => (

  <div className="rounded border border-primary d-inline-flex p-2 mt-md-4">
    <div className={styles.content}>
      <h4>Patient</h4>
      <li>
        {patient.firstName}
        {' '}
        {patient.lastName}
      </li>
      <li>
        {patient.age}
      </li>
      <li>
        {patient.gender}
      </li>
    </div>
  </div>
);

export default PatientCard;
