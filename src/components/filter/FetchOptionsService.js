import constants from '../../utils/constants';
import HttpHelper from '../../utils/HttpHelper';
import ColorArray from './ColorArray';

/**
 * @name fetchOptions
 * @description Utilizes HttpHelper to make a get request for filter options to an API
 * @param {*} endpoint the title of filter fields
 * @param {*} setOptions sets state for filters
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for the specific filter if 200 response, else sets state for apiError
 */
export const fetchOptions = async (endpoint, setOptions, setApiError) => {
  await HttpHelper(endpoint, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setOptions)
    .catch(() => {
      setApiError(true);
    });
};

/**
 * @name fetchColors
 * @description Utilizes HttpHelper to make a get request for colors to an API
 * @param {*} setOptions sets colors for color filter
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for colors if 200 response, else sets state for apiError
 */
export const fetchColors = async (setColors, setApiError) => {
  await HttpHelper(constants.COLORS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    }).then((data) => {
      const list = [];
      data.forEach((color) => {
        list.push(ColorArray[color]);
      });
      setColors(list);
    })
    .catch(() => {
      setApiError(true);
    });
};
