/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import { fetchProducts } from './ProductPageService';
import MenuContainer from '../filter-menu/MenuContainer';
import ProductModal from '../modal/ProductModal';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = ({ updateUserTime }) => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [productInfo, setProductInfo] = useState([]);

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
            <ProductCard
              product={product}
              setProductInfo={setProductInfo}
              setIsOpen={setIsOpen}
              updateUserTime={updateUserTime}
            />
          </div>
          )
        )}
      </div>
      <ProductModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        productInfo={productInfo}
        updateUserTime={updateUserTime}
      />
    </div>
  );
};

export default ProductPage;
