/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom/dist';
import styles from './Patients.module.css';
import { deletePatient } from './PatientService';

const PatientCard = ({ patient, onDelete }) => {
  const [apiError, setApiError] = useState();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deletePatient(patient.id, patient, setApiError);
    onDelete(patient);
  };
  return (
    <div>
      {apiError && (
      <p
        className={styles.errMsg}
        data-testid="errMsg"
      >
        That Patient cannot be deleted since it has encounters
      </p>
      )}
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
          <Button className={styles.buttonSection} onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
