import { render, screen } from '@testing-library/react';
import MenuContainer from './MenuContainer';
import ProductPage from '../product-page/ProductPage';

const React = require('react');

describe('Test that the Menubutton is in the DOM', () => {
  it('Should confirm that the menuButton is present in the DOM', () => {
    render([<ProductPage />, <MenuContainer />]);

    expect(screen.getAllByTestId('menuButton-test-id')[0]).toBeInTheDocument();
  });
});

describe('Test that the Filter Menu component is in the DOM', () => {
  it('Should confirm that the Filter Menu component is present in the DOM', () => {
    render([<ProductPage />, <MenuContainer />]);
    expect(screen.getAllByTestId('menu-test-id')[0]).toBeInTheDocument();
  });
});
