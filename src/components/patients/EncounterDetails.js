/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { fetchEncounterById, updateEncounter } from './PatientService';
import styles from './CreatePatient.module.css';
import Constants from '../../utils/constants';
import FormItem from '../form/FormItem';
import {
  getErrorsObject, errorsObjectIsNullOrEmpty, ValidateEncounter
} from '../form/validation/orchestrators';

const EncounterDetails = () => {
  const { encounterId } = useParams();
  const [apiError, setApiError] = useState();
  const { id } = useParams();
  const [encounterData, setEncounterData] = useState([]);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    fetchEncounterById(id, encounterId, setEncounterData, setApiError);
  }, [encounterId, id]);

  const onEncounterDataChange = (e) => {
    setEncounterData({ ...encounterData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async () => {
    ValidateEncounter(encounterData);
    setErrorMessages(getErrorsObject());
    if (errorsObjectIsNullOrEmpty()) {
      await updateEncounter(id, encounterId, encounterData, setApiError);
      navigate(`/patients/${id}`);
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
        <h1>Encounter Details</h1>
        <div className={styles.container}>
          <form className={styles.form}>
            <h6 className={styles.id}>
              Encounter ID:
              {' '}
              {encounterData.id}
            </h6>
            <div className="form-row">
              <div className="input-group">
                <div className="form-group col-md 6">
                  <h5>Notes: </h5>
                  <FormItem
                    type="textBox"
                    id="notes"
                    value={encounterData.notes || ''}
                    onChange={onEncounterDataChange}
                  />
                </div>
                <div className="form-group col-md 6">
                  <h5>Visit Code: </h5>
                  <FormItem
                    type="text"
                    id="visitCode"
                    value={encounterData.visitCode || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.visitCode}
                    isError={errorMessages.visitCodeIsError}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <div className="form-group col-md 6">
                  <h5>Provier: </h5>
                  <FormItem
                    type="text"
                    id="provider"
                    value={encounterData.provider || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.provider}
                    isError={errorMessages.providerIsError}
                  />
                </div>
                <div className="form-group col-md 6">
                  <h5>Billing Code: </h5>
                  <FormItem
                    type="text"
                    id="billingCode"
                    value={encounterData.billingCode || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.billingCode}
                    isError={errorMessages.billingCodeIsError}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <div className="form-group col-md 6">
                  <h5>icd10: </h5>
                  <FormItem
                    type="text"
                    id="icd10"
                    value={encounterData.icd10 || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.icd10}
                    isError={errorMessages.icd10IsError}
                  />
                </div>
                <div className="form-group col-md 6">
                  <h5>Total Cost: </h5>
                  <FormItem
                    type="number"
                    id="totalCost"
                    value={encounterData.totalCost || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.totalCost}
                    isError={errorMessages.totalCostIsError}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <div className="form-group col-md 6">
                  <h5>Copay: </h5>
                  <FormItem
                    type="number"
                    id="copay"
                    value={encounterData.copay || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.copay}
                    isError={errorMessages.copayIsError}
                  />
                </div>
                <div className="form-group col-md 6">
                  <h5>Chief Complaint: </h5>
                  <FormItem
                    type="text"
                    id="chiefComplaint"
                    value={encounterData.chiefComplaint || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.chiefComplaint}
                    isError={errorMessages.chiefComplaintIsError}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <div className="form-group col-md 6">
                  <h5>Pulse: </h5>
                  <FormItem
                    type="text"
                    id="pulse"
                    value={encounterData.pulse || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.pulse}
                    isError={errorMessages.pulseIsError}
                  />
                </div>
                <div className="form-group col-md 6">
                  <h5>Systolic: </h5>
                  <FormItem
                    type="text"
                    id="systolic"
                    value={encounterData.systolic || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.systolic}
                    isError={errorMessages.systolicIsError}
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <div className="form-group col-md 6">
                  <h5>Diastolic Pressure: </h5>
                  <FormItem
                    type="text"
                    id="diastolic"
                    value={encounterData.diastolic || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.diastolic}
                    isError={errorMessages.diastolicIsError}
                  />
                </div>
                <div className="form-group col-md 6">
                  <h5>Date: </h5>
                  <FormItem
                    type="text"
                    id="date"
                    value={encounterData.date || ''}
                    onChange={onEncounterDataChange}
                    errorMessage={errorMessages.date}
                    isError={errorMessages.dateIsError}
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleUpdate}>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EncounterDetails;
