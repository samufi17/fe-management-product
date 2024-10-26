// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     activeKey: '1',
//     products: []
// };

// const currentValueSlice = createSlice({
//     name: 'currentValue',
//     initialState,
//     reducers: {
//         setProducts: (state, { payload }) => ({ ...state, products: payload }),
//     },
// });

// export const { setProducts } = currentValueSlice.actions;
// export default currentValueSlice.reducer;

/* Product Actions */
import * as productActions from './product/productActions';

export * from './combineReducer'