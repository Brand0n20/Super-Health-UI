import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { fetchPatientById, updatePatient } from './PatientService';
import { fetchEncountersByPatientId } from './EncounterService';
import Constants from '../../utils/constants';
import styles from './CreatePatient.module.css';
import FormItem from '../form/FormItem';
import FormItemDropdown from '../form/FormItemDropdown';
import {
  getErrorsObject, errorsObjectIsNullOrEmpty, ValidatePatient
} from '../form/validation/orchestrators';
import EncounterCard from './EncounterCard';

const PatientDetails = () => {
  const { id } = useParams();
  const [patientData, setPatientData] = useState([]);
  const [encounters, setEncounters] = useState([]);
  const [apiError, setApiError] = useState();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const usStates = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI',
    'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'CM', 'OH', 'OK', 'OR', 'PA',
    'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
  const genders = ['Male', 'Female', 'Other'];

  useEffect(() => {
    fetchPatientById(id, setPatientData, setApiError);
    fetchEncountersByPatientId(id, setEncounters, setApiError);
  }, [id]);

  const onPatientDataChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };

  const changePage = () => {
    navigate('/patients');
  };

  const handleUpdate = async () => {
    ValidatePatient(patientData);
    setErrorMessages(getErrorsObject());
    if (errorsObjectIsNullOrEmpty()) {
      await updatePatient(id, patientData, setApiError);
      changePage();
    }
  };
  return (
    <div>
      <div className={styles.center}>
        {apiError && (
        <p
          className={styles.errMsg}
          data-testid="errMsg"
        >
          {Constants.API_ERROR}
        </p>
        )}
        <Button onClick={() => navigate('/patients')} className={styles.goBack}>Go back to Patients Page</Button>
        <div className={styles.container}>
          <form className={styles.form}>
            <h6 className={styles.id}>
              Patient ID:
              {' '}
              {patientData.id}
            </h6>
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
                    type="text"
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
                    type="text"
                    id="height"
                    placeholder="in inches"
                    value={patientData.height || ''}
                    onChange={onPatientDataChange}
                    errorMessage={errorMessages.height}
                    isError={errorMessages.heightIsError}
                  />
                </div>
                <div className="form-group col-md 6">
                  <h5>Weight: </h5>
                  <FormItem
                    type="text"
                    id="weight"
                    placeholder="lbs"
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
                    value={patientData.gender}
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
              value={patientData.state}
              options={usStates}
              errorMessage={errorMessages.state}
              isError={errorMessages.stateIsError}
            />
            <Button type="button" form="submit" onClick={handleUpdate}>Submit</Button>
          </form>
        </div>
      </div>
      <div className={styles.encounters}>
        {encounters.map((encounter) => (
          <div key={encounter.id} className={styles.encounter}>
            <EncounterCard encounter={encounter} patientData={patientData} />
          </div>
        ))}
        <Button className={styles.create} onClick={() => navigate(`/patients/${id}/encounters/create`)}>Add new Encounter</Button>
      </div>
    </div>
  );
};
export default PatientDetails;
