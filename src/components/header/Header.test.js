import React from 'react';
import {
  render, screen
} from '@testing-library/react';
import App from '../app/App';

test('renders the nav', () => {
  render(<App />);

  expect(screen.queryByTestId('nav-bar')).toBeInTheDocument();
});

test('renders the custom link', () => {
  render(<App />);
  expect(screen.queryByTestId('patients')).toBeInTheDocument();
});
