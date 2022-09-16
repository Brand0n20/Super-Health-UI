import { toPrice, getSubtotal } from './ReviewOrderWidgetService';

describe('ReviewOrderWidgetServiceTests', () => {
  describe('toPrice', () => {
    it('Converts decimals to price string', () => {
      const original = 3.14;
      const expected = '$3.14';
      expect(toPrice(original)).toEqual(expected);
    });

    it('adds decimal places to integers', () => {
      const original = 3;
      const expected = '$3.00';
      expect(toPrice(original)).toEqual(expected);
    });
  });

  describe('getSubtotal', () => {
    it('returns price for product array of varying quantity', () => {
      const products = [
        {
          quantity: 2,
          price: 9.99
        },
        {
          quantity: 1,
          price: 3.5
        }
      ];
      const expected = '$23.48';

      expect(getSubtotal(products)).toEqual(expected);
    });

    it('returns price for empty product array', () => {
      const products = [];
      const expected = '$0.00';

      expect(getSubtotal(products)).toEqual(expected);
    });
  });
});
