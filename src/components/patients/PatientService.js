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

export const postPatient = async (patientData, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}`, 'POST', patientData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).catch(() => setApiError);
};
