import Constants from '../../utils/constants';
import HttpHelper from '../../utils/HttpHelper';
import customToast from '../customizable-toast/customToast';

/**
 * @name fetchPurchasesByProductId
 * @description Utilizes HttpHelper to get purchases based on product ID
 * @param {*} productId product ID
 * @param {*} setApiError sets error if API fails
 * @param {*} setPurchases sets purchases on successful response
 */

export const fetchPurchasesByProductId = async (productId, setPurchases, setApiError) => {
  await HttpHelper(`${Constants.PURCHASE_ENDPOINT}/product/${productId}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setPurchases)
    .catch(() => {
      setApiError(true);
      customToast(
        'There was an issue connecting to the database. Please try again later.',
        'error'
      );
    });
};

/**
 * @name fetchProductIsLinkedToPurchase
 * @description Utilizes HttpHelper to help determine whether a product is linked to a purchase
 * @param {*} productid product ID
 * @param {*} setIsLinkedToPurchase sets whether a product is linked to a purchase
 * @param {*} setApiError sets error if API fails
 */

export const fetchProductIsLinkedToPurchase = async (
  productId,
  setIsLinkedToPurchase,
  setApiError
) => {
  let isLinkedToPurchase = false;
  await HttpHelper(`${Constants.PURCHASE_ENDPOINT}/product/${productId}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then((data) => {
      if (data.length > 0) {
        isLinkedToPurchase = true;
      }
    }).catch(() => {
      setApiError(true);
    });

  setIsLinkedToPurchase(isLinkedToPurchase);
  return isLinkedToPurchase;
};

/**
 * @name fetchUniqueProductReviewIDs
 * @description Utilizes HttpHelper to get all the unique product ID's that are linked to a review
 * @param {*} setProductReviewIDs sets a list of unique product IDs
 * @param {*} setApiError sets error if API fails
 */

export const fetchUniqueProductReviewIDs = async (setProductReviewIDs, setApiError) => {
  await HttpHelper(`${Constants.REVIEWS_ENDPOINT}/products/id/distinct`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then((data) => {
      setProductReviewIDs(new Set(data));
    }).catch(() => {
      setApiError(true);
    });
};

/**
 * @name updateProduct
 * @description Utilizes HttpHelper to update a product
 * @param {*} product product
 * @param {*} setApiError sets error if API fails
 */

export const updateProduct = async (product, setApiError) => {
  await HttpHelper(`${Constants.PRODUCTS_ENDPOINT}`, 'PUT', product)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(() => customToast('Product Successfully Updated!', 'success')).catch(() => {
      setApiError(true);
    });
};

/**
 * @name deleteProduct
 * @description Utilizes HttpHelper to delete a product
 * @param {*} product product
 * @param {*} setApiError sets error if API fails
 */

export const deleteProduct = async (product, setApiError) => {
  await HttpHelper(`${Constants.PRODUCTS_ENDPOINT}`, 'DELETE', product).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(Constants.API_ERROR);
  }).then(() => customToast('Product Successfully Deleted!', 'success')).catch(() => {
    setApiError(true);
  });
};
