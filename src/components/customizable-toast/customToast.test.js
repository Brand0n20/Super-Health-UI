import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';
import customToast from './customToast';

const React = require('react');

/**
 * Test that an informational toast notification pop up and containt the following test:
 * "This is an informational toast notification".
 */
describe('Test the info toast notification', () => {
  it('Should confirm that a toast was displayed with "This is an informational toast notification" as text.', async () => {
    const customButton = (
      <button
        onClick={() => customToast('This is an informational toast notification', 'info')}
        type="button"
        id="info"
        className="toast-test"
      >
        Informational Toast Example
      </button>
    );
    render([customButton, <ToastContainer />]);

    const button = screen.getByText('Informational Toast Example');
    user.click(button);
    const messageContent = 'This is an informational toast notification';

    await waitFor(() => screen.findByRole('alert'), { timeout: 4000 });
    expect(screen.getByRole('alert')).toHaveTextContent(messageContent);
  });
});

/**
 * Test that a successful toast notification pop up and containt the following test:
 * "This is a successful toast notification".
 */
describe('Test the success toast notification', () => {
  it('Should confirm that a toast was displayed with "This is a successful toast notification" as text.', async () => {
    const customButton = (
      <button
        onClick={() => customToast('This is a successful toast notification', 'success')}
        type="button"
        id="success"
        className="toast-test"
      >
        Successful Toast Example
      </button>
    );

    render([customButton, <ToastContainer />]);

    const button = screen.getByText('Successful Toast Example');
    user.click(button);
    const messageContent = 'This is a successful toast notification';

    await waitFor(() => screen.findByRole('alert'), { timeout: 4000 });
    expect(screen.getByRole('alert')).toHaveTextContent(messageContent);
  });
});

/**
 * Test that a warning toast notification pop up and containt the following test:
 * "This is a warning toast notification".
 */
describe('Test the warning toast notification', () => {
  it('Should confirm that a toast was displayed with "This is a warning toast notification" as text.', async () => {
    const customButton = (
      <button
        onClick={() => customToast('This is a warning toast notification', 'warn')}
        type="button"
        id="warning"
        className="toast-test"
      >
        Warning Toast Example
      </button>
    );

    render([customButton, <ToastContainer />]);

    const button = screen.getByText('Warning Toast Example');
    user.click(button);
    const messageContent = 'This is a warning toast notification';

    await waitFor(() => screen.findByRole('alert'), { timeout: 4000 });
    expect(screen.getByRole('alert')).toHaveTextContent(messageContent);
  });
});

/**
 * Test that an error toast notification pop up and containt the following test:
 * "This is an error toast notification".
 */
describe('Test the error toast notification', () => {
  it('Should confirm that a toast was displayed with "This is an error toast notification" as text.', async () => {
    const customButton = (
      <button
        onClick={() => customToast('This is an error toast notification', 'error')}
        type="button"
        id="error"
        className="toast-test"
      >
        Error Toast Example
      </button>
    );

    render([customButton, <ToastContainer />]);
    const button = screen.getByText('Error Toast Example');
    user.click(button);
    const messageContent = 'This is an error toast notification';

    await waitFor(() => screen.findByRole('alert'), { timeout: 4000 });
    expect(screen.getByRole('alert')).toHaveTextContent(messageContent);
  });
});

/**
 * Test that a generic toast notification pop up and containt the following test:
 * "This is a generic toast notification"
 */
describe('Test the generic toast notification', () => {
  it('Should confirm that a toast was displayed with "This is a generic toast notification" as text.', async () => {
    const customButton = (
      <button
        onClick={() => customToast('This is a generic toast notification')}
        type="button"
        id="generic"
        className="toast-test"
      >
        Generic Toast Example
      </button>
    );

    render([customButton, <ToastContainer />]);
    const button = screen.getByText('Generic Toast Example');
    user.click(button);
    const messageContent = 'This is a generic toast notification';

    await waitFor(() => screen.findByRole('alert'), { timeout: 4000 });
    expect(screen.getByRole('alert')).toHaveTextContent(messageContent);
  });
});
