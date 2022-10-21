import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { fetchPatients } from './PatientService';
import styles from './Patients.module.css';
import Constants from '../../utils/constants';
import PatientCard from './PatientCard';

/**
 * A page where the patient cards will be displayed
 * @returns Patient Cards and a button to add a new patient
 */
const PatientsPage = () => {
  const [apiError, setApiError] = useState();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const [patientToDelete, setPatientToDelete] = useState(false);

  const onDelete = (patientState) => {
    if (patientToDelete === patientState) {
      setPatientToDelete(!patientState);
    } else {
      setPatientToDelete(patientState);
    }
  };

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
  }, [patientToDelete]);

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
          <PatientCard data-testid="patient" patient={patient} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
};

export default PatientsPage;
