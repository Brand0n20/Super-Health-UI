import React from 'react';
import { Rating } from 'react-simple-star-rating';
import FormItem from '../form/FormItem';
import './AddReviewForm.css';

/**
 * @author Franc Laghom
 * Wrapper to give space between input fields
 * @param { JSX Components } param0 -Components to be wrapped.
 * @returns The newly formed component
 */
const WrapInput = ({ children }) => (
  <div className="wrapInput">{children}</div>
);

/**
 * @author Franc Laghom
 * Wrapper to give space between text area input fields
 * @param { JSX Components } param0 -Components to be wrapped.
 * @returns The newly formed component
 */
const TextAreaWrapper = ({ children }) => (
  <div className="wrapTestArea">{children}</div>
);

/**
 * Generate the review form
 * @author Franc Laghom
 * @param {Object} param0 -Fields values change's and buttons click's handlers
 * @returns The form component
 */
const AddReviewForm = ({
  review, handleClose, handleOnchange, handleSave, validationData, ratingFieldError
}) => (
  <div>
    <form className="reviewForm" onSubmit={handleSave}>
      <h2 id="newReview">New Review</h2>
      <WrapInput>
        <FormItem
          placeholder="Review title..."
          type="text"
          id="title"
          label="Title"
          onChange={handleOnchange}
          value={review.title}
          isError={validationData.title.isError}
          errorMessage={validationData.title.errorMessage}
          maxLength={50}
        />
      </WrapInput>
      <WrapInput>
        <div>
          <p id="rating">Rating</p>
          <Rating
            ratingValue={review.rating}
            onClick={handleOnchange}
            id="ratingInput"
            size={20}
          />
          <div><span id="ratingError">{ratingFieldError.errorMessage}</span></div>
        </div>
      </WrapInput>
      <TextAreaWrapper>
        <FormItem
          placeholder="Your comment..."
          type="textarea"
          id="comment"
          label="Comment"
          onChange={handleOnchange}
          value={review.comment}
          isError={validationData.comment.isError}
          errorMessage={validationData.comment.errorMessage}
          maxLength={2000}
          rows={4}
        />
      </TextAreaWrapper>
      <br />
      <div className="saveOrCancle">
        <button type="button" onClick={handleClose} style={{ marginRight: '2px', marginBottom: '5px' }} id="cancel">Cancel</button>
        <button type="submit" style={{ marginRight: '2px', marginBottom: '5px' }} value="Save" id="save">Save</button>
      </div>
    </form>
  </div>
);

export default AddReviewForm;
