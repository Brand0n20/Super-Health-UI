import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';

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
  sessionStorage.setItem('user', JSON.stringify({ user: '' }));
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
 * @description - Tests the ProfilePage component
 * @author - Andrew Salerno
 */
describe('ProfilePage', () => {
  /**
   * Makes api calls to get a users purchase history data
   */
  it('Renders for a user and makes api calls', () => {
    sessionStorage.setItem('user', JSON.stringify({ user: { email: 'asalerno@catalyte.io' } }));
    jest.spyOn(window, 'fetch').mockResolvedValue({ json: () => ({ purchaseHistory: '123' }) });
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>, container
    );
    const element = document.querySelectorAll('li');
    element.forEach((value) => fireEvent.click(value));
  });

  /**
   * Redirects to landing page when no user is logged in
   */
  it('Redirects when no user', () => {
    sessionStorage.setItem('user', JSON.stringify({ user: '' }));
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>, container
    );
    const element = document.querySelectorAll('li');
    element.forEach((value) => fireEvent.click(value));
  });
});
