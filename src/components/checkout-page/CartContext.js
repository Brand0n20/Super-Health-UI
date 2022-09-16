import React from 'react';

export const CartContext = React.createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'delete': {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.title !== action.product.title
        )
      };
    }
    case 'add': {
      const currentProduct = state.products.find(
        (stateProduct) => stateProduct.title === action.product.title
      );
      if (currentProduct !== undefined) {
        currentProduct.quantity += action.product.quantity;
        return {
          ...state,
          products: [...state.products]
        };
      }
      return {
        ...state,
        products: [...state.products, action.product]
      };
    }
    case 'update': {
      const currentProduct = state.products.find(
        (stateProduct) => stateProduct.title === action.payload.title
      );
      currentProduct.quantity = action.payload.quantity;
      return {
        ...state,
        products: [...state.products]
      };
    }

    case 'increment': {
      const currentProduct = state.products.find(
        (stateProduct) => stateProduct.title === action.payload
      );
      currentProduct.quantity += 1;
      return {
        ...state,
        products: [...state.products]
      };
    }

    case 'decrement': {
      const currentProduct = state.products.find(
        (stateProduct) => stateProduct.title === action.payload
      );
      if (currentProduct.quantity > 0) currentProduct.quantity -= 1;
      return {
        ...state,
        products: [...state.products]
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CartProvider({ children }) {
  // Cart needs initial products
  const initialProducts = {
    products: [],
    setProducts: () => {}
  };
  const [state, dispatch] = React.useReducer(cartReducer, initialProducts);

  const value = { state, dispatch };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart, cartReducer };
