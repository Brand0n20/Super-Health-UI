import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import validator from '../../utils/Validator';
import './AddReview.css';
import customToast from '../customizable-toast/customToast';
import { fetchReviewsByProductId, postReview } from './ReviewService';
import AddReviewForm from './AddReviewForm';

const emptyReview = {
  title: '',
  rating: 0,
  comment: '',
  postedDate: ''
};

const emptyRatingError = {
  errorState: false, errorMessage: <br />
};

/**
 * Validate the form
 * @author Franc Laghom
 * @param {Object} reviewData - The data to validate
 * @returns - The validation object with result of the validated form.
 */
const validateAddReviewForm = (reviewData) => {
  validator.initialize(reviewData);
  validator.checkEmptyFields('only', ['title'], 'Title must not be empty or contain only whitespace');
  validator.checkLength({ rangeType: 'at-most', range: 50 }, 'only', ['title'], 'Cannot have more than 50 characters');
  validator.checkLength({ rangeType: 'at-most', range: 2000 }, 'only', ['comment'], 'Cannot have more than 2000 characters');

  return validator;
};

/**
 * Ensur that the rating is not zero.
 * @author Franc Laghom
 * @param {number} rating -The rating to validate
 * @returns -The validation object with result of the validated rating.
 */
const validateRating = (rating) => {
  let ratingErrorResult = { errorState: true, errorMessage: 'Rating is required' };
  if (rating !== 0) {
    ratingErrorResult = { ...emptyRatingError };
    return ratingErrorResult;
  }
  return ratingErrorResult;
};

/**
 * Generate the adding review feature.
 * @author Franc Laghom
 * @param {Object} param0 - An object containing the product, the post function, and the fuction
 * to update the content of the review page.
 * @returns - The add review component.
 */
const AddReview = ({
  product, productId, setReviews, setApiError
}) => {
  let reviewToPost = emptyReview;
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(emptyReview);
  const [updateProductReviews, setUpdateProductReviews] = useState(true);
  const [validationData, setValidationData] = useState(validator.initialize(emptyReview));
  const [ratingError, setRatinError] = useState({
    valueNotProvided: true,
    errorMessage: null
  });

  /**
   * Control the redering of the add review button.
   * @author Franc Laghom
   */
  const handleOpen = () => { setOpen(true); };

  /**
   * Reset all state to their initial value
   * @author Franc Laghom
   */
  const handleClose = () => {
    setOpen(() => false);
    setReview(() => emptyReview);
    setRatinError(() => emptyRatingError);
    setValidationData(() => validator.initialize(emptyReview));
    if (updateProductReviews) {
      setUpdateProductReviews(() => false);
    } else {
      setUpdateProductReviews(() => true);
    }
  };

  /**
   * @describtion Complete the data submitted by the user.
   * @author Franc Laghom
   */
  const updateReviewInformation = () => {
    reviewToPost = {
      ...review,
      rating: review.rating / 20,
      postedDate: new Date().toLocaleDateString(),
      product,
      user: JSON.parse(sessionStorage.getItem('user')).user
    };
  };

  /**
   * Capture data provided by the user on input fields.
   * @author Franc Laghom
   * @param {HTML Event} evt -The event of intering data.
   */
  const handleOnChange = (evt) => {
    // eslint-disable-next-line eqeqeq
    if (typeof (evt) == 'number') {
      setReview(() => ({
        ...review,
        rating: evt
      }));
    } else {
      setReview({
        ...review,
        [evt.target.id]: evt.target.value
      });
      switch (evt.target.id) {
        case 'comment':
          if (evt.target.value.length >= 2000) {
            customToast(`The ${evt.target.id} field is limitted to 2000 characters`, 'warn');
          }
          break;
        default:
          if (evt.target.value.length === 50) {
            customToast(`The ${evt.target.id} field is limited to 50 characters`, 'warn');
          }
      }
    }
  };

  /**
   * Send the form or prevent it to be send if there is an error.
   * @author Franc Laghom
   * @param {HTML Event} e - The form submission event.
   * @returns - Errors messages if any, or post the review.
   */
  const handleSave = async (e) => {
    e.preventDefault();
    updateReviewInformation();
    const validatorResults = validateAddReviewForm(reviewToPost);
    setRatinError(() => validateRating(reviewToPost.rating));

    if (!validatorResults.isValidForm() || ratingError.valueNotProvided
    || reviewToPost.rating === 0) {
      setValidationData(validatorResults.getResults());
      return;
    }
    setValidationData(validator.initialize(emptyReview));
    postReview(reviewToPost);
    handleClose();
  };

  useEffect(() => {
    fetchReviewsByProductId(productId, setReviews, setApiError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProductReviews]);

  return (
    <div>
      { !open ? (<button type="button" onClick={handleOpen} id="addReview">Add Review</button>) : null}
      {open ? (
        <AddReviewForm
          review={review}
          handleClose={handleClose}
          handleOnchange={handleOnChange}
          handleSave={handleSave}
          validationData={validationData}
          ratingFieldError={ratingError}
        />
      ) : null}
      <ToastContainer theme="colored" />
    </div>
  );
};

export default AddReview;
