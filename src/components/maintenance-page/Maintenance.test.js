import React from 'react';
import {
  render, screen
} from '@testing-library/react';
import MaintenancePage from './MaintenancePage';

test('renders the table', () => {
  render(<MaintenancePage />);

  expect(screen.getByTestId('table')).toBeInTheDocument();
});
