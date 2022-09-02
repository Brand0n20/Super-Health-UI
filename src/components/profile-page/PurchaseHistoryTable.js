import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ProfilePage.module.css';

/**
 * Event handler for View Items dropdown
 * @param {*} event - onClick event of a View Items button
 */
const onViewProducts = (event) => {
  event.target.classList.toggle(styles.active);
  const element = event.target;
  const content = event.target.nextElementSibling;
  if (content.style.display === 'block') {
    content.style.display = 'none';
    element.innerHTML = 'View Items';
  } else {
    content.style.display = 'block';
    element.innerHTML = 'Hide Items';
  }
};

/**
 * @name PurchaseHistoryTable
 * @description - Constructs a table component from purchase histroty data
 * @returns - JSX template of the purchases history table
 */
const PurchaseHistoryTable = ({ purchaseHistory }) => {
  if (purchaseHistory) {
    if (purchaseHistory.length !== 0) {
      purchaseHistory.sort((a, b) => b.purchaseKey - a.purchaseKey);
      purchaseHistory.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
      return (
        <table>
          <div className={styles.overFlow}>
            <thead>
              <th className={styles.sticky}>Purchase Date</th>
              <th className={styles.sticky}>Total Price</th>
              <th className={styles.sticky}>Items</th>
            </thead>
            <tbody>
              {purchaseHistory.map(({
                purchaseKey, purchaseDate, purchaseCost, products
              }) => (
                <tr key={purchaseKey} className={styles.rowHeight}>
                  <td className={styles.dateWidth}>{purchaseDate}</td>
                  <td>{`$${purchaseCost.toFixed(2)}`}</td>
                  <td className={styles.itemWidth}>
                    <button type="button" className={styles.collapsible} onClick={onViewProducts}>View Items</button>
                    <div className={styles.content}>
                      <table className={styles.centerMargin}>
                        <thead>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Cost</th>
                        </thead>
                        <tbody>
                          {products.map(({
                            productKey, name, quantity, productCost
                          }) => (
                            <tr key={productKey}>
                              <td>{name}</td>
                              <td>{quantity}</td>
                              <td>{`$${productCost.toFixed(2)}`}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </table>
      );
    }
  }
  return (
    <>
      <p>You have not yet made any purchases.</p>
      <NavLink to="/">Browse our product catalogue.</NavLink>
    </>
  );
};

export default PurchaseHistoryTable;
