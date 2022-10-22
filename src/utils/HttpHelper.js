import Constants from './constants';

const Timeout = (time) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller;
};
/**
 * @name HttpHelper
 * @description - Utility method for using fetch in a convenient manner
 * @param {string} route address to ping
 * @param {string} method http method
 * @param {Object} payload object to send
 * @return {Promise} - Promise from the fetch call
 */
const HttpHelper = (route, method, payload) => fetch(Constants.BASE_URL_API + route,
  {
    method,
    signal: Timeout(8).signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify(payload)
  });

export default HttpHelper;
