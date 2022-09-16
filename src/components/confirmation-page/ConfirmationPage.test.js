import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import ConfirmationPage from './ConfirmationPage';

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
describe('ConfirmationPage', () => {
  /**
   * Tests the returned JSX on the condition for when there is no purchaseHistory
   */
  it('Returns some JSX', () => {
    const purchaseResponseObject = {
      id: 6,
      products: [{
        product: {
          id: 13,
          name: 'Elastic Hockey Tank Top'
        },
        quantity: 1
      }],
      deliveryAddress: {
        firstName: 'Andrew',
        lastName: 'Salerno',
        deliveryStreet: '123 Sesame St',
        deliveryStreet2: null,
        deliveryCity: 'Columbus',
        deliveryState: 'Ohio',
        deliveryZip: 12345
      },
      billingAddress: {
        billingStreet: '123 Sesame St',
        billingStreet2: null,
        billingCity: 'Columbus',
        billingState: 'Ohio',
        billingZip: 12345,
        email: 'asalerno@catalyte.io',
        phone: '123-456-7890'
      },
      creditCard: {
        cardholder: 'Andrew Salerno'
      }
    };

    const initialEntriesMock = { pathname: '/confirmation', state: { purchaseResponseObject } };

    render(
      <MemoryRouter
        initialEntries={[initialEntriesMock]}
      >
        <ConfirmationPage />
      </MemoryRouter>, container
    );
    const element = document.querySelector('button');
    fireEvent.click(element);
  });
});
