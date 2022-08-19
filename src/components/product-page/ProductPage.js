import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import PriceFilter from '../filter/PriceFilter';
import CheckboxFilter from '../filter/CheckboxFilter';
import TypeArray from '../filter/TypeArray';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <CheckboxFilter
        title="Type"
        filterFields={TypeArray}
      />
      <PriceFilter />
      <div className={styles.app}>
        {products.map((product) => (
          product.active && (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
          )))}
      </div>
    </div>
  );
};

export default ProductPage;
