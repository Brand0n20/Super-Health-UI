import React from 'react';
import { useHistory } from 'react-router-dom';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @name ReturnToProducts
 * @description - A component when rendered redirects the user to the products page
 * @returns - An empty JSX component
 */
export const ReturnToProducts = () => {
  const history = useHistory();
  history.push('/');
  return (<></>);
};

/**
 * @name getPurchaseHistory
 * @description - Retrieves a users purchase history
 * @param {*} email - The user's email address
 * @returns - All purchasess associated with a given email
 */
export const getPurchaseHistory = async (email) => {
  const fetchPromise = HttpHelper(`/purchases/${email}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    });
  return fetchPromise;
};

/**
 * @name putProfileData
 * @param {*} email - The user's email address
 * @param {*} profileData - Profile payload being updated
 * @param {*} setApiError - sets error if API fails
 */
export const putProfileData = async (profileData, setApiError, id) => {
  await HttpHelper(`${Constants.USERS_ENDPOINT}/${id}`, 'PUT', profileData)
    .then((response) => {
      if (response.ok) {
        setApiError(false);
      }
    })
    .catch(() => {
      setApiError(true);
    });
};
