/* eslint-disable max-len */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { CirclePicker } from 'react-color';
import { ToastContainer } from 'react-toastify';
import Modal from './Modal';
import styles from './ProductModal.module.css';
import customToast from '../customizable-toast/customToast';
import { useCart } from '../checkout-page/CartContext';
import QuantityPicker from './QuantityPicker';

/**
 * @name ProductModal
 * @param {open} open control open status of modal
 * @param {onClose} onClose control close status of modal
 * @param {productInfo} productInfo product information fetched from product card
 * @param {updateUserTime} updateUserTime update last active time in user profile
 * @returns a modal containing basic product information and quantity picker and add to cart button
 */
const ProductModal = ({
  open, onClose, productInfo, updateUserTime
}) => {
  const [value, setValue] = useState(1);
  const itemColors = [
    `${productInfo.primaryColorCode}`,
    `${productInfo.secondaryColorCode}`
  ];
  const { dispatch } = useCart();

  /**
   * @name onAdd
   * @description Add product to cart with number specified with quantity picker
   */
  const onAdd = () => {
    updateUserTime();
    customToast('The product is successfully added to cart!', 'success');
    dispatch({
      type: 'add',
      product: {
        id: productInfo.id,
        title: productInfo.name,
        price: productInfo.price,
        description: productInfo.description,
        quantity: value,
        imageSrc: productInfo.imageSrc
      }
    });
  };

  /**
   * @name handleBlur
   * @description a toast will pop up when quantity value does not pass form validation
   */
  const handleBlur = () => {
    if (!/^[1-9]\d*$/g.test(value)) {
      setValue(1);
      customToast('The input need to be a positive integer.', 'error');
    }
  };
  return (
    <>
      <ToastContainer theme="colored" />
      <Modal open={open} onClose={onClose} className={styles.productModal}>
        <div className={styles.container}>
          <div className={styles.pictureContainer}>
            <img
              src={productInfo.imageSrc}
              alt="productPicture"
              className={styles.productPicture}
            />
          </div>
          <div className={styles.grid}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} className={styles.label}>
                <h4>{productInfo.name}</h4>
              </Grid>
              <Grid item xs={12} sm={12}>
                {productInfo.description}
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={styles.label}>
                Brand:
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {productInfo.brand}
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={styles.label}>
                Category:
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {productInfo.category}
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={styles.label}>
                Type:
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {productInfo.type}
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={styles.label}>
                Price:
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                $
                {productInfo.price}
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={styles.label}>
                Color:
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {' '}
              </Grid>
              <Grid item xs={12} sm={6} md={2} className={styles.colorSwatch}>
                <div>
                  <CirclePicker colors={itemColors} circleSize={30} />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                {' '}
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <QuantityPicker min={1} value={value} setValue={setValue} handleBlur={handleBlur} />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <button
                  type="button"
                  onClick={onAdd}
                  className={styles.addCartButton}
                >
                  Add to Cart
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProductModal;
