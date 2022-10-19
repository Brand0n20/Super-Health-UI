import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export const fetchPatients = async (setPatients, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(setPatients).catch(() => setApiError(true));
};

export const fetchEncountersByPatientId = async (patientId, setEncounters, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}/encounters`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(setEncounters).catch(() => setApiError(true));
};

export const fetchEncounterById = async (patientId, encounterId, setEncounter, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}/encounters/${encounterId}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(setEncounter).catch(() => setApiError(true));
};

export const postEncounter = async (patientId, encounterData, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}/encounters`, 'POST', encounterData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).catch(() => setApiError);
};

export const fetchPatientById = async (patientId, setPatient, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(setPatient).catch(() => setApiError(true));
};

export const postPatient = async (patientData, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}`, 'POST', patientData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).catch(() => setApiError);
};

export const updatePatient = async (patientId, patientData, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}`, 'PUT', patientData)
    .then((response) => {
      if (response.ok) {
        setApiError(false);
      }
    }).catch(() => setApiError(true));
};
