import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducer';

const store = configureStore({
  reducer: productReducer,
});

export default store;
