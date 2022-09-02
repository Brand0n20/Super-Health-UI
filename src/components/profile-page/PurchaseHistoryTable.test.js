import React from 'react';
import { NavLink } from 'react-router-dom';
import PurchaseHistoryTable from './PurchaseHistoryTable';

/**
 * Tests the ValidateStreetTwo error messages and status
 */
describe('PurchaseHistoryTable', () => {
  const purchaseHistory = [];

  const actualJSXElement = PurchaseHistoryTable(purchaseHistory);
  const expectedJSXElement = (
    <>
      <p>Y ou have not yet made any purchases.</p>
      <NavLink to="/">Browse our product catalogue.</NavLink>
    </>
  );

  it('Returns JSX', () => {
    expect(actualJSXElement).toEqual(expectedJSXElement);
  });
});
