import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom/dist';
import styles from './Patients.module.css';

const PatientCard = ({ patient }) => {
  const navigate = useNavigate();
  return (
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
        <Button className="btn btn-secondary" onClick={() => navigate(`/patients/${patient.id}`)}>Patient Details</Button>
      </div>
    </div>
  );
};

export default PatientCard;
