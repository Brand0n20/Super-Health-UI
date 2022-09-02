import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Product from './Product';
import { fetchReviewsByProductId } from './ReviewService';
import { fetchProductsById } from './ProductPageService';

jest.mock('./ProductPageService.js');
jest.mock('./ReviewService.js');

describe('Product Component Test', () => {
  it('renders image for product', async () => {
    const route = '/reviews/product/2';
    render(
      <MemoryRouter initialEntries={[route]}>
        <Product />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/jersey/i)).toBeInTheDocument();
  });

  it('renders reviews filter', async () => {
    const route = '/reviews/product/2';
    render(
      <MemoryRouter initialEntries={[route]}>
        <Product />
      </MemoryRouter>
    );
    expect(screen.getByText('Newest')).toBeInTheDocument();
    expect(screen.getByTestId('Chevron')).toBeInTheDocument();
  });

  it('renders review cards', async () => {
    const route = '/reviews/product/2';

    fetchReviewsByProductId.mockImplementation((id, setReviews, setApiError) => {
      setReviews([{
        title: 'Awesome Product!', comment: 'This product is amazing!', postedDate: '9/21/22', rating: 3.5, user: { firstName: 'Kevin', lastName: 'Davis' }
      }]);
    });

    render(
      <MemoryRouter initialEntries={[route]}>
        <Product />
      </MemoryRouter>
    );

    expect(await screen.findByText('Reviews')).toBeInTheDocument();

    expect(await screen.findByText('Awesome Product!')).toBeVisible();

    expect(await screen.findByText('This product is amazing!')).toBeVisible();

    expect(await screen.findByText('Posted 9/21/22')).toBeVisible();

    expect(await screen.findByText('Kevin Davis')).toBeVisible();
  });

  it('renders a description box', async () => {
    const route = '/reviews/product/2';

    fetchProductsById.mockImplementation((id, setProduct, setApiError) => {
      setProduct({ name: 'Awesome Football', description: 'This is an amazing football for anyone!' });
    });

    render(
      <MemoryRouter initialEntries={[route]}>
        <Product />
      </MemoryRouter>
    );

    expect(await screen.findByText('Awesome Football')).toBeInTheDocument();
    expect(await screen.findByText('This is an amazing football for anyone!'));
  });

  it("renders server error if it can't connect to the database", async () => {
    const route = '/reviews/product/2';
    fetchProductsById.mockImplementation((id, setProduct, setApiError) => {
      setApiError(true);
    });

    render(
      <MemoryRouter initialEntries={[route]}>
        <Product />
      </MemoryRouter>
    );

    expect(screen.getByText('Oops, something went wrong')).toBeInTheDocument();
  });

  it('switches filter text when user clicks on filter', async () => {
    const route = '/reviews/product/2';
    render(
      <MemoryRouter initialEntries={[route]}>
        <Product />
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await user.click(screen.getByText('Newest'));

    expect(screen.getByText('Oldest')).toBeInTheDocument();

    await user.click(screen.getByText('Oldest'));

    expect(screen.getByText('Newest')).toBeInTheDocument();
  });
});
