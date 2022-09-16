import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import { NavLink } from 'react-router-dom';
import PurchaseHistoryTable from './PurchaseHistoryTable';

/**
 * @description - Creates and returns a purchaseHistory response used for testing
 * @author - Andrew Salerno
 * @returns - A purchaseHistory Response Object
 */
const getPurchaseHistory = () => {
  const purchaseHistory = {
    purchaseKey: 1,
    purchaseDate: '10/22/2022',
    purchaseCost: 100.00,
    products: [{
      name: 'New Product',
      quantity: 12,
      productCost: 1200.00,
      productKey: 2
    }]
  };
  return purchaseHistory;
};

/**
 * @description - The Render Container used during testing
 * @author - Andrew Salerno
 */
let container = null;

/**
 * @description - Sets up a DOM element as a render target
 * @author - Andrew Salerno
 */
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

/**
 * @description - Cleans up testing environment
 * @author - Andrew Salerno
 */
afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

/**
 * @description - Tests the PurchaseHistoryTable component
 * @author - Andrew Salerno
 */
describe('PurchaseHistoryTable', () => {
  /**
   * Tests the returned JSX on the condition for when there is no purchaseHistory
   */
  it('Returns some JSX', () => {
    const purchaseHistory = [];

    const actualJSXElement = PurchaseHistoryTable({ purchaseHistory });
    const expectedJSXElement = (
      <>
        <p>You have not yet made any purchases.</p>
        <NavLink to="/">Browse our product catalogue.</NavLink>
      </>
    );
    expect(actualJSXElement).toEqual(expectedJSXElement);
  });

  /**
   * Presses the button used to expand the purchaseHistoryTables purchase items dropdown
   */
  it('Presses buttons', () => {
    const purchaseHistory = [];
    purchaseHistory.push(getPurchaseHistory());
    render(<PurchaseHistoryTable purchaseHistory={purchaseHistory} />, container);
    const element = document.querySelector('button');
    fireEvent.click(element);
    fireEvent.click(element);
  });
});
