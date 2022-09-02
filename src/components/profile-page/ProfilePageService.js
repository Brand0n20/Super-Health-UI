import React from 'react';
import { useHistory } from 'react-router-dom';
import HttpHelper from '../../utils/HttpHelper';

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
 * @param {*} email - The users email address
 * @returns - All purchasess associated with a given email
 */
export const getPurchaseHistory = async (email) => {
  const fetchPromise = HttpHelper(`/purchases/${email}`, 'GET')
    .then((response) => response.json());
  return fetchPromise;
};
