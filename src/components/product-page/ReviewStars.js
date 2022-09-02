import React from 'react';
import styles from './ReviewStars.module.css';
import { ReactComponent as StarMask } from '../../assets/Star Mask.svg';
import { ReactComponent as StarOutline } from '../../assets/Star Outline.svg';

/**
 * @author Kevin Davis
 * @description Star review component to display the star rating for a review card
 * @returns component
 */

const ReviewStars = ({ rating }) => {
  const ratingBarPercentage = (rating / 5) * 100;

  return (
    <div className={styles['review-stars']}>
      <div className={styles['rating-bar']} style={{ width: `${ratingBarPercentage}%` }} />
      <StarMask className={styles.mask} />
      <StarOutline className={styles.outline} />
    </div>
  );
};

export default ReviewStars;
