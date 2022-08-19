import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';
import customToast from '../customizable-toast/customToast';

/**
 * @name postProducts
 * @description Utilizes HttpHelper to make a post request to an API
 * @param {*} productData details on products to be created
 * @param {*} history useHistory to redirect page
 */
const postProducts = (productData, setApiError, history) => {
  HttpHelper(constants.PRODUCTS_ENDPOINT, 'POST', productData)
    .then((response) => {
      if (response.status === 201) {
        setApiError(false);
        customToast(
          'Product successfully created! Now redirecting to maintenance page.',
          'success'
        );
        setTimeout(() => {
          history.push('/maintenance');
        }, 3000);
      } else {
        setApiError(true);
        customToast(
          'There was an issue connecting to the database. Please try again later.',
          'error'
        );
      }
    })
    .catch((err) => {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setApiError(true);
        customToast(
          'There was an issue connecting to the database. Please try again later.',
          'error'
        );
      } else {
        setApiError(true);
        customToast(err.name + err.message, 'error');
      }
    });
};

export default postProducts;
