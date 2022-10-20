import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Constants from '../../utils/constants';
import styles from './CreatePatient.module.css';
import FormItem from '../form/FormItem';
import { postPatient } from './PatientService';
import FormItemDropdown from '../form/FormItemDropdown';
import {
  getErrorsObject, errorsObjectIsNullOrEmpty, ValidatePatient
} from '../form/validation/orchestrators';

const initialState = {
  firstName: null,
  lastName: null,
  ssn: null,
  email: null,
  street: null,
  city: null,
  state: null,
  postal: null,
  age: null,
  height: null,
  weight: null,
  insurance: null,
  gender: null
};

const CreatePatient = () => {
  const [patientData, setPatientData] = useState(initialState);
  const [apiError, setApiError] = useState();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const usStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'CM', 'OH', 'OK', 'OR', 'PA',
    'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

  const genders = ['Male', 'Female', 'Other'];
  const onPatientDataChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };

  const changePage = () => {
    navigate('/patients');
  };

  const handleCreate = async () => {
    ValidatePatient(patientData);
    setErrorMessages(getErrorsObject());
    if (errorsObjectIsNullOrEmpty()) {
      await postPatient(patientData, setApiError);
      changePage();
    }
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
                  errorMessage={errorMessages.firstName}
                  isError={errorMessages.firstNameIsError}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Last Name: </h5>
                <FormItem
                  type="text"
                  id="lastName"
                  value={patientData.lastName || ''}
                  onChange={onPatientDataChange}
                  errorMessage={errorMessages.lastName}
                  isError={errorMessages.lastNameIsError}
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
                  errorMessage={errorMessages.ssn}
                  isError={errorMessages.ssnIsError}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Email: </h5>
                <FormItem
                  type="email"
                  id="email"
                  value={patientData.email || ''}
                  onChange={onPatientDataChange}
                  errorMessage={errorMessages.email}
                  isError={errorMessages.emailIsError}
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
                  errorMessage={errorMessages.street}
                  isError={errorMessages.streetIsError}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>City: </h5>
                <FormItem
                  type="text"
                  id="city"
                  value={patientData.city || ''}
                  onChange={onPatientDataChange}
                  errorMessage={errorMessages.city}
                  isError={errorMessages.cityIsError}
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
                  id="postal"
                  value={patientData.postal || ''}
                  onChange={onPatientDataChange}
                  errorMessage={errorMessages.postal}
                  isError={errorMessages.postalIsError}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Age: </h5>
                <FormItem
                  type="number"
                  id="age"
                  value={patientData.age || ''}
                  onChange={onPatientDataChange}
                  errorMessage={errorMessages.age}
                  isError={errorMessages.ageIsError}
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
                  errorMessage={errorMessages.height}
                  isError={errorMessages.heightIsError}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Weight: </h5>
                <FormItem
                  type="number"
                  id="weight"
                  value={patientData.weight || ''}
                  onChange={onPatientDataChange}
                  errorMessage={errorMessages.weight}
                  isError={errorMessages.weightIsError}
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
                  errorMessage={errorMessages.insurance}
                  isError={errorMessages.insuranceIsError}
                />
              </div>
              <div className="form-group col-md 6">
                <h5>Gender: </h5>
                <FormItemDropdown
                  id="gender"
                  onChange={onPatientDataChange}
                  value={patientData.gender || ''}
                  options={genders}
                  errorMessage={errorMessages.gender}
                  isError={errorMessages.genderIsError}
                />
              </div>
            </div>
          </div>
          <h5>State: </h5>
          <FormItemDropdown
            id="state"
            onChange={onPatientDataChange}
            value={patientData.state || ''}
            options={usStates}
            errorMessage={errorMessages.state}
            isError={errorMessages.stateIsError}
          />
          <Button type="button" form="submit" onClick={handleCreate}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePatient;
