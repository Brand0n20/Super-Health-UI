/* eslint-disable max-len */
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as ChevronDown } from '../../assets/Chevron Down.svg';
import constants from '../../utils/constants';
import styles from './Product.module.css';
import ReviewCard from './ReviewCard';
import { fetchReviewsByProductId } from './ReviewService';
import { fetchProductsById } from './ProductPageService';

/**
 * @author Kevin Davis
 * @description Displays the components that make up a product page
 * @returns component
 */

const Product = () => {
  const [dateSortBy, setDateSortBy] = useState('Newest');
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState({});
  const [apiError, setApiError] = useState(false);
  const { productId } = useParams();

  const handleDateSortBy = () => {
    if (dateSortBy === 'Newest') {
      setDateSortBy('Oldest');
    } else {
      setDateSortBy('Newest');
    }
  };

  useEffect(() => {
    fetchReviewsByProductId(productId, setReviews, setApiError);
    fetchProductsById(productId, setProduct, setApiError);

    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <div className={styles['product-page']}>
      {apiError && <p>{constants.API_ERROR}</p>}
      <div className={styles['image-frame']}>
        <img src={product.imageSrc} alt="Jersey" className={styles.imageSrc} />
      </div>
      <div className={styles['product-description-box']}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
      <div className={styles['review-box']}>
        <div className={styles['review-header']}>
          <h2>Reviews</h2>
          <button className={styles['filter-button']} type="button" onClick={handleDateSortBy}>
            {dateSortBy}
            <ChevronDown style={dateSortBy === 'Oldest' ? { transform: 'rotate(180deg)' } : {}} data-testid="Chevron" />
          </button>
        </div>
        <div className={styles['review-list']}>
          {reviews.length === 0 && <p>There are currently no reviews for this product!</p>}
          {dateSortBy === 'Oldest' && reviews.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate)).map((review) => <ReviewCard title={review.title} comment={review.comment} postedDate={review.postedDate} rating={review.rating} user={review.user} key={review.id} />)}
          {dateSortBy === 'Newest' && reviews.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)).map((review) => <ReviewCard title={review.title} comment={review.comment} postedDate={review.postedDate} rating={review.rating} user={review.user} key={review.id} />)}
        </div>
      </div>
    </div>
  );
};

export default Product;
