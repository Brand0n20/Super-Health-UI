import {
  React, useState, useEffect, useRef
} from 'react';
import styles from './ReviewCard.module.css';
import ReviewStars from './ReviewStars';

/**
 * @author Kevin Davis
 * @name ReviewCard
 * @description Component to render a review card for the product page
 * @return component
 */

const ReviewCard = ({
  title, comment, rating, user, postedDate
}) => {
  const reviewBox = useRef();
  const [showMore, setShowMore] = useState(false);
  const [showMoreButtonText, setShowMoreButtonText] = useState('Show More');

  const showMoreClass = showMoreButtonText === 'Show More' ? '' : styles['show-more'];

  /**
   * @author Kevin Davis
   * @description Handles the state of the Show More button for review cards
   */

  const handleShowMore = () => {
    if (showMoreButtonText === 'Show More') {
      setShowMoreButtonText('Show Less');
    } else {
      setShowMoreButtonText('Show More');
    }
  };

  useEffect(() => {
    if (reviewBox.current.clientHeight >= 188) {
      setShowMore(true);
    }
  }, []);

  return (
    <div className={styles['review-container']}>
      <div className={`${styles.review} ${showMoreClass}`} ref={reviewBox}>
        <div className={styles['review-title']}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <p className={styles['avatar-default']}>{`${user.firstName[0]}${user.lastName[0]}`}</p>
            </div>
            <div className={styles['username-star-box']}>
              <p>{`${user.firstName} ${user.lastName}`}</p>
              <ReviewStars rating={rating} />
              <p className={styles['posted-date']}>{`Posted ${postedDate}`}</p>
            </div>
          </div>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles['review-description']}>{comment}</p>
        {showMore && <button type="button" className={styles['show-more-btn']} onClick={handleShowMore}>{showMoreButtonText}</button>}
      </div>
    </div>

  );
};

export default ReviewCard;
