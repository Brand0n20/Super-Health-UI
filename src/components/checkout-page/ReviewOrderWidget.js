import {
  React, useEffect, useState, memo
} from 'react';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import {
  getShippingCost, getSubtotal, fetchShippingCost, getTaxAmount, totalCost
} from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = ({ state, updateUserTime }) => {
  const [shippingCost, setShippingCost] = useState({});
  const {
    state: { products }
  } = useCart();

  useEffect(() => {
    fetchShippingCost(`${state}`, setShippingCost);
  }, [products, state]);

  const emptyMsg = 'Your cart is empty! Please add products to your cart.';

  return (
    <>
      <p className={styles.emptyMsg}>{!products.length && emptyMsg}</p>
      {products.map(({
        price, title, description, quantity, imageSrc
      }) => (
        <OrderItem
          key={title}
          price={price}
          title={title}
          description={description}
          quantity={quantity}
          imageSrc={imageSrc}
          updateUserTime={updateUserTime}
        />
      ))}
      <hr />
      <div className={styles.subtotal}>
        <div>
          <p>Subtotal</p>
        </div>
        <div className={styles.price}>
          <p>{getSubtotal(products)}</p>
        </div>
      </div>
      <div className={styles.subtotal}>
        <div>
          <p>Taxes</p>
        </div>
        <div className={styles.price}>
          <p>{getTaxAmount(products, shippingCost)}</p>
        </div>
      </div>
      <div className={styles.subtotal}>
        <div>
          <p>Shipping Cost</p>
        </div>
        <div className={styles.price}>
          <p>{getShippingCost(products, state, shippingCost)}</p>
        </div>
      </div>
      <div className={styles.subtotal}>
        <div>
          <h2>Total Cost</h2>
        </div>
        <div className={styles.price}>
          <h2>{totalCost(products, state, shippingCost)}</h2>
        </div>
      </div>
    </>
  );
};

export default memo(ReviewOrderWidget);
