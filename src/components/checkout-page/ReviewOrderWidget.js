import { React, useEffect, useState } from 'react';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import { getShippingCost, getSubtotal, fetchShippingCost } from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = ({ state }) => {
  const [shippingCost, setShippingCost] = useState({});

  useEffect(() => {
    fetchShippingCost(`${state}`, setShippingCost);
  }, [state]);

  const {
    state: { products }
  } = useCart();
  const emptyMsg = 'Your cart is empty! Please add products to your cart.';
  return (
    <>
      <p className={styles.emptyMsg}>
        {!products.length && emptyMsg}
      </p>
      {products.map(({
        price, title, description, quantity
      }) => (
        <OrderItem
          key={title}
          price={price}
          title={title}
          description={description}
          quantity={quantity}
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
          <p>Shipping Cost</p>
        </div>
        <div className={styles.price}>
          <p>{getShippingCost(products, state, shippingCost)}</p>
        </div>
      </div>
      <div>
        <div>
          <p>Total Cost</p>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderWidget;
