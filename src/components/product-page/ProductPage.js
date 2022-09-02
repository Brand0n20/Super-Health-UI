/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import { fetchProducts } from './ProductPageService';
import MenuContainer from '../filter-menu/MenuContainer';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchProducts(`${url}`, setProducts, setApiError);
  }, [url]);

  return (
    <div>
      <ToastContainer theme="colored" />
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <div className={styles.filterMenu}>
        <MenuContainer setUrl={setUrl} />
      </div>
      <div className={styles.app}>
        {products.map(
          (product) => product.active && (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductPage;
