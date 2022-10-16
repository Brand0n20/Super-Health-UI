import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom/dist';
import Constants from '../../utils/constants';
import styles from './CreatePatient.module.css';
import FormItem from '../form/FormItem';
import { postPatient } from './PatientService';

const initialState = {
  firstName: null,
  lastName: null,
  ssn: null,
  email: null,
  street: null,
  city: null,
  state: null,
  zip: null,
  age: null,
  height: null,
  weight: null,
  insurance: null,
  gender: null
};

const CreatePatient = () => {
  const [patientData, setPatientData] = useState(initialState);
  const [apiError, setApiError] = useState();
  const nagivate = useNavigate();

  const onPatientDataChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };

  const changePage = () => {
    nagivate('/patients');
  };

  const handleCreate = async () => {
    await postPatient(patientData, setApiError);
    changePage();
  };

  return (
    <div className={styles.center}>
      {apiError && (
      <p
        className={styles.errMsg}
        data-testid="errMsg"
      >
        {Constants.API_ERROR}
      </p>
      )}
      <div className={styles.container}>
        <form className={styles.form}>
          <div className="form-row">
            <div className="input-group">
              <div className="form-group col-md 6">
                <h5>First Name: </h5>
                <FormItem
                  type="text"
                  id="firstName"
                  value={patientData.firstName || ''}
                  onChange={onPatientDataChange}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Last Name: </h5>
                <FormItem
                  type="text"
                  id="lastName"
                  value={patientData.lastName || ''}
                  onChange={onPatientDataChange}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <div className="form-group col-md 6">
                <h5>Social Security Number: </h5>
                <FormItem
                  type="text"
                  id="ssn"
                  value={patientData.ssn || ''}
                  onChange={onPatientDataChange}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Email: </h5>
                <FormItem
                  type="email"
                  id="email"
                  value={patientData.email || ''}
                  onChange={onPatientDataChange}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <div className="form-group col-md 6">
                <h5>Street: </h5>
                <FormItem
                  type="text"
                  id="street"
                  value={patientData.street || ''}
                  onChange={onPatientDataChange}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>City: </h5>
                <FormItem
                  type="text"
                  id="city"
                  value={patientData.city || ''}
                  onChange={onPatientDataChange}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <div className="form-group col-md 6">
                <h5>Zip Code: </h5>
                <FormItem
                  type="text"
                  id="zip"
                  value={patientData.zip || ''}
                  onChange={onPatientDataChange}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Age: </h5>
                <FormItem
                  type="number"
                  id="age"
                  value={patientData.age || ''}
                  onChange={onPatientDataChange}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <div className="form-group col-md 6">
                <h5>Height: </h5>
                <FormItem
                  type="number"
                  id="height"
                  value={patientData.height || ''}
                  onChange={onPatientDataChange}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Weight: </h5>
                <FormItem
                  type="number"
                  id="weight"
                  value={patientData.weight || ''}
                  onChange={onPatientDataChange}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <div className="form-group col-md 6">
                <h5>Insurance: </h5>
                <FormItem
                  type="text"
                  id="insurance"
                  value={patientData.insurance || ''}
                  onChange={onPatientDataChange}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Gender: </h5>
                <FormItem
                  type="text"
                  id="gender"
                  value={patientData.gender || ''}
                  onChange={onPatientDataChange}
                />
              </div>
            </div>
          </div>
          <Button type="button" form="submit" onClick={handleCreate}>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePatient;
