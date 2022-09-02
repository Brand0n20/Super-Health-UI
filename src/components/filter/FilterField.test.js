import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import FilterFields from './FilterFields';
import { fetchColors, fetchOptions } from './FetchOptionsService';

jest.mock('./FetchOptionsService');

describe('Filter Component Tests', () => {
  it('shows error msg text when database is not connected', async () => {
    fetchOptions.mockImplementation((endpoint, setBrands, setApiError) => {
      setApiError(true);
    });
    const user = userEvent.setup();
    render(<FilterFields />);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[0]);
    expect(screen.getByTestId('errMsg')).toHaveTextContent(
      'Oops, something went wrong'
    );
  });

  it('the options will be populated with provided information', async () => {
    fetchOptions.mockImplementation((endpoint, setBrands, setApiError) => {
      setApiError(false);
      setBrands(['Nike', 'New Balance', 'Under Armour']);
    });
    const user = userEvent.setup();
    render(<FilterFields />);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[0]);
    expect(screen.getByText('Nike')).toBeInTheDocument();
  });

  it('the color options will be populated with provided color dictionary', async () => {
    fetchColors.mockImplementation((setColors, setApiError) => {
      setApiError(false);
      setColors(['Fountain Blue', 'Pink', 'Mandy']);
    });
    const user = userEvent.setup();
    render(<FilterFields />);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[3]);
    expect(screen.getByText('Fountain Blue')).toBeInTheDocument();
  });

  it('the checkbox is checked when clicked once', async () => {
    fetchOptions.mockImplementation((endpoint, setBrands, setApiError) => {
      setApiError(false);
      setBrands(['Nike', 'New Balance', 'Under Armour']);
    });
    const user = userEvent.setup();
    const { container } = render(<FilterFields />);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[0]);
    await user.click(container.querySelectorAll('.filterCheckbox')[0]);
    expect(container.querySelectorAll('.checked-item')[0]).toHaveTextContent(
      'Nike'
    );
  });

  it('the checkbox is unchecked when clicked twice', async () => {
    fetchOptions.mockImplementation((endpoint, setBrands, setApiError) => {
      setApiError(false);
      setBrands(['Nike', 'New Balance', 'Under Armour']);
    });
    const user = userEvent.setup();
    const { container } = render(<FilterFields />);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[0]);
    await user.click(container.querySelectorAll('.filterCheckbox')[0]);
    await user.click(container.querySelectorAll('.filterCheckbox')[1]);
    await user.click(container.querySelectorAll('.filterCheckbox')[0]);
    expect(
      container.querySelectorAll('.not-checked-item')[0]
    ).toHaveTextContent('Nike');
  });

  it('the price filter has information when user enters information', async () => {
    const user = userEvent.setup();
    const { container } = render(<FilterFields />);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[5]);
    await user.type(container.querySelectorAll('.filterInput')[0], '500');
    expect(screen.queryByDisplayValue('500')).toBeInTheDocument();
  });

  it('the checkbox filters are cleared when clear filter button is clicked', async () => {
    fetchOptions.mockImplementation((endpoint, setBrands, setApiError) => {
      setApiError(false);
      setBrands(['Nike', 'New Balance', 'Under Armour']);
    });
    fetchOptions.mockImplementation(
      (endpoint, setDemographics, setApiError) => {
        setApiError(false);
        setDemographics(['Men', 'Women', 'Kids']);
      }
    );
    const user = userEvent.setup();
    const { container } = render(<FilterFields />);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[0]);
    await user.click(container.querySelectorAll('.filterCheckbox')[0]);
    await user.click(container.querySelectorAll('.filterCheckbox')[1]);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[2]);
    await user.click(container.querySelectorAll('.filterCheckbox')[3]);
    await user.click(container.querySelectorAll('.filterCheckbox')[4]);
    await user.click(screen.getByText('Clear Filters'));
    expect(container.querySelectorAll('.checked-item')).toHaveLength(0);
  });

  it('the price filters are cleared when clear filter button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<FilterFields />);
    await user.click(screen.getAllByTestId('ExpandMoreIcon')[5]);
    await user.type(container.querySelectorAll('.filterInput')[0], '500');
    await user.type(container.querySelectorAll('.filterInput')[1], '1500');
    await user.click(screen.getByText('Clear Filters'));
    expect(screen.queryByDisplayValue('500')).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue('1500')).not.toBeInTheDocument();
  });
});
