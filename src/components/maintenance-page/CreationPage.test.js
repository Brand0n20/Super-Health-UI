import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import CreationPage from './CreationPage';
import postProducts from './CreationPageService';

jest.mock('./CreationPageService');
let container = null;

describe('CreationPage Component Tests', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('shows success msg toast when a product is created', async () => {
    const user = userEvent.setup();

    postProducts.mockImplementation(({}, setApiError, history) => {});
    render(<CreationPage />, container);
    const messageContent = 'Product successfully created! Now redirecting to maintenance page.';
    await user.click(screen.getByTestId('addButton'));
    expect(screen.findByText(messageContent)).toBeInTheDocument;
  });

  it('shows error msg toast when a product can not be created', async () => {
    const user = userEvent.setup();
    postProducts.mockImplementation(({}, setApiError, history) => {
      setApiError(true);
    });
    render(<CreationPage />, container);
    const messageContent = 'Product successfully created! Now redirecting to maintenance page.';
    await user.click(screen.getByTestId('addButton'));
    expect(screen.findByText(messageContent)).toBeInTheDocument;
  });
});
