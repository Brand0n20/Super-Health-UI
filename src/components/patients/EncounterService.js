import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

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

export const updateEncounter = async (patientId, encounterId, encounterData, setApiError) => {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}/encounters/${encounterId}`, 'PUT', encounterData)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).catch(() => setApiError);
};
