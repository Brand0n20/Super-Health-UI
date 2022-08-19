import React from 'react';
import {
  render, screen, fireEvent
} from '@testing-library/react';
import App from '../app/App';

test('renders the logo', () => {
  render(<App />);

  expect(screen.getByRole('img', { name: 'logo' })).toBeInTheDocument();
});

test('renders the cart', () => {
  render(<App />);

  expect(screen.getByRole('img', { name: 'cartguy' })).toBeInTheDocument();
});

test('render the googlebutton', () => {
  render(<App />);

  expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled();
});

test('renders the products button', () => {
  render(<App />);

  expect(screen.getByRole('img', { name: 'products' })).toBeInTheDocument();
});

test('products button redirects to products page', () => {
  render(<App />);

  fireEvent.click(screen.getByTestId('productsButton'));

  expect(global.window.location.href).toContain('/products');
});
