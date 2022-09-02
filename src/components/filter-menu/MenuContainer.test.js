import { render, screen } from '@testing-library/react';
import ProductPage from '../product-page/ProductPage';

const React = require('react');

describe('Test that the Menubutton is in the DOM', () => {
  it('Should confirm that the menuContainer is present in the DOM', () => {
    render(<ProductPage />);
    expect(screen.getAllByTestId('menuContainer')[0]).toBeInTheDocument();
  });
});
