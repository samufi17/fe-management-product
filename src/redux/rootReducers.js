import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productSlice';

const combineReducer = combineReducers({
  products: productReducer
})

export default combineReducer;