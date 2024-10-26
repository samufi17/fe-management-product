import React, { createContext, useReducer, useEffect } from 'react';
import productReducer from '../redux/reducer';
import { getAllProducts as fetchAllProducts } from '../redux/actions';

// Create Context
export const ProductContext = createContext();

// Provider Component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    loading: false,
    status: '',
  });

  const getAllProducts = () => {
    fetchAllProducts(dispatch);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
