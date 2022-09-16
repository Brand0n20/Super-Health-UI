/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from 'react';
import Modal from './Modal';
import styles from './DeleteProductModal.module.css';
import { updateProduct, deleteProduct } from '../maintenance-page/MaintenancePageService';
import { fetchProducts } from '../product-page/ProductPageService';

/**
 *  Delete Product Modal to handle product deletion on the Maintenance Page
 * @name DeleteProductModal
 * @returns React Component
 */

const DeleteProductModal = ({
  onClose,
  product,
  isLinkedToPurchase,
  setApiError,
  setProducts,
  setDeleteButtonClicked
}) => {
  useEffect(() => async () => {
    setDeleteButtonClicked(null);
    fetchProducts('', setProducts, setApiError);
  }, []);

  const promptText = isLinkedToPurchase ? 'Would You Like To Mark It Inactive Instead?' : `Delete ${product.name}?`;

  return (
    <Modal open onClose={onClose} className={styles.modal}>
      {isLinkedToPurchase && <p className={styles.statement}>{`${product.name} is part of one or more previous order(s)`}</p>}
      <p className={styles.prompt}>{promptText}</p>
      <div className={styles['button-container']}>
        <button
          className={styles['yes-button']}
          type="button"
          onClick={isLinkedToPurchase ? async () => {
            onClose();
            updateProduct({ ...product, active: false }, setApiError);
          } : async () => {
            onClose();
            deleteProduct(product, setApiError);
          }}
        >
          Yes
        </button>
        <button className={styles['no-button']} type="button" onClick={onClose}>No</button>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
