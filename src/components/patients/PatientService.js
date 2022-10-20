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

export const deletePatient = async (patientId, patient, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}`, 'DELETE', patient)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(Constants.API_ERROR);
    }).catch(() => setApiError(true));
};
