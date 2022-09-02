import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 * @author Kevin Davis
 * @description Utilizes HttpHelper to get reviews by product id
 * @param {number} productId
 * @param {*} setReviews sets state for reviews
 * @param {*} setApiError sets state for apiError
 * @return sets state for reviews if 200 response, else sets an apiError
 */

export const fetchReviewsByProductId = async (productId, setReviews, setApiError) => {
  await HttpHelper(`${Constants.REVIEWS_ENDPOINT}/product/${productId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    }).then(setReviews).catch(() => setApiError(true));
};

/**
 * @author Kevin Davis
 * @description Utilizes HttpHelper to get reviews by user id
 * @param {number} userId
 * @param {*} setReviews sets state for reviews
 * @param {*} setApiError sets state for apiError
 * @return sets state for reviews if 200 response, else sets an apiError
 */

export const fetchReviewsByUserId = async (userId, setReviews, setApiError) => {
  await HttpHelper(`${Constants.REVIEWS_ENDPOINT}/user/${userId}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(Constants.API_ERROR);
  }).then(setReviews).catch(() => setApiError(true));
};

/**
 * @author Kevin Davis
 * @description Utilizes HttpHelper to get the average review rating for a product by product id
 * @param {number} productId
 * @param {*} setRatingAverage sets state for rating average
 * @param {*} setApiError sets state for apiError
 * @return sets state for average rating if 200 response, else console.errors the error
 */

export const fetchRatingAverageByProductId = async (productId, setRatingAverage, setApiError) => {
  await HttpHelper(`${Constants.REVIEWS_ENDPOINT}/product/${productId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(Constants.API_ERROR);
    }).then((data) => {
      // eslint-disable-next-line max-len

      if (data.length !== 0) {
        const average = data
          .reduce((accumulator, review) => accumulator + review.rating, 0) / data.length;
        const roundedAverage = Math.round(average * 10) / 10;
        setRatingAverage(roundedAverage);
      }
    }).catch(() => setApiError(true));
};
