import React, { useState } from 'react';
import { useCart } from './CartContext';
import styles from './OrderItem.module.css';
import { toPrice } from './ReviewOrderWidgetService';
import QuantityPicker from '../modal/QuantityPicker';
import RemoveItemModal from '../modal/RemoveItemModal';

/**
 * @name OrderItem
 * @description Displays a single item that is in the shopping cart
 * @return component
 */
const OrderItem = ({
  price, title, description, quantity, imageSrc, updateUserTime
}) => {
  const { dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Opens the removeItemModal
   * @author - Andrew Salerno
   */
  const onOpen = () => {
    setIsOpen(true);
  };

  /**
   * Closes the removeItemModal
   * @author - Andrew Salerno
   */
  const onCancel = () => {
    setIsOpen(false);
  };

  /**
   * Deletes an item from the shopping cart and then closes the removeItemModal
   * @author - Andrew Salerno
   */
  const onProceed = () => {
    updateUserTime();
    dispatch({
      type: 'delete',
      product: {
        title
      }
    });
    setIsOpen(false);
  };

  /**
   * @name confirmRemove
   * @description opens removeItemModal when quantity is 0 and user clicks off field
   */
  const confirmRemove = (e) => {
    if (quantity === 0 && !e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(true);
    }
    if (quantity === 0 || '') {
      dispatch({
        type: 'update',
        payload: {
          title,
          quantity: 1
        }
      });
    }
  };

  return (
    <div className={styles.orderItem}>
      <div className={styles.image}>
        <img
          src={imageSrc}
          alt="Product"
        />
      </div>
      <div className={styles.item}>
        <p className={styles.itemTitle}>{title}</p>
        <p>{description}</p>
        <div>
          Qty:
          <div
            role="button"
            tabIndex="0"
            className={styles.cartQtyPicker}
          >
            <QuantityPicker
              min={0}
              value={quantity}
              title={title}
              handleBlur={(e) => confirmRemove(e)}
            />
          </div>
        </div>
      </div>
      <div className={styles.center}>
        <span
          data-text="Remove from Cart"
          className={styles.tooltip}
        >
          <button
            type="button"
            className={styles.outline}
            onClick={onOpen}
          >
            <img
              className={styles.trashcanSize}
              src="/assets/trash-icon.svg"
              alt="Delete"
            />
          </button>
        </span>
        <div className={styles.price}>
          <p>{toPrice(quantity * price)}</p>
          {/* <p>{toPrice(value * price)}</p> */}
        </div>
      </div>

      <RemoveItemModal
        open={isOpen}
        onCancel={onCancel}
        onProceed={onProceed}
        title={title}
      />
    </div>
  );
};
export default OrderItem;
