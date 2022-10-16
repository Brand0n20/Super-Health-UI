import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom/dist';
import { fetchPatients } from './PatientService';
import styles from './Patients.module.css';
import Constants from '../../utils/constants';
import PatientCard from './PatientCard';

const PatientsPage = () => {
  const [apiError, setApiError] = useState();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
  }, []);

  return (
    <div className={styles.container}>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <h1>Welcome to the Patients Page</h1>
      <div className="position-relative">
        <Button onClick={() => navigate('/patients/create')}>Add Patient</Button>
      </div>
      {patients.map((patient) => (
        <div key={patient.id} className={styles.patients}>
          <PatientCard patient={patient} />
        </div>
      ))}
    </div>
  );
};

export default PatientsPage;
