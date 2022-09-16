import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */

export const fetchProducts = async (url, setProducts, setApiError) => {
  await HttpHelper(`${Constants.PRODUCTS_ENDPOINT}${url}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProducts)
    .catch(() => {
      setApiError(true);
    });
};

/**
 * @author Kevin Davis
 * @name fetchProductsById
 * @description Utilizes HttpHelper to make a request to get one product by product id
 * @param {number} productId
 * @param {*} setProduct sets state for a product
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */

export const fetchProductsById = async (productId, setProduct, setApiError) => {
  await HttpHelper(`${Constants.PRODUCTS_ENDPOINT}/${productId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProduct)
    .catch(() => {
      setApiError(true);
    });
};
