import { productActionTypes } from './productActionTypes';

export const getProducts = () => async (dispatch) => {
  dispatch({ type: productActionTypes.GET_ALL_PRODUCTS_REQUEST });
  try {
    const response = await axios.get('/products');
    dispatch({ type: productActionTypes.GET_ALL_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: productActionTypes.GET_ALL_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const createProduct = (data) => async (dispatch) => {
  dispatch({ type: productActionTypes.CREATE_PRODUCT_REQUEST });
  try {
    const response = await axios.post('/products', data);
    dispatch({ type: productActionTypes.CREATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: productActionTypes.CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  dispatch({ type: productActionTypes.UPDATE_PRODUCT_REQUEST });
  try {
    const response = await axios.put(`/products/${id}`, data);
    dispatch({ type: productActionTypes.UPDATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: productActionTypes.UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: productActionTypes.DELETE_PRODUCT_REQUEST });
  try {
    await axios.delete(`/products/${id}`);
    dispatch({ type: productActionTypes.DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: productActionTypes.DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const getPendingProducts = () => async (dispatch) => {
  dispatch({ type: productActionTypes.GET_PENDING_PRODUCTS_REQUEST });
  try {
    const response = await axios.get('/products/pending');
    dispatch({ type: productActionTypes.GET_PENDING_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: productActionTypes.GET_PENDING_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const approveProduct = (id) => async (dispatch) => {
  dispatch({ type: productActionTypes.APPROVE_PRODUCT_REQUEST });
  try {
    await axios.post(`/products/${id}/approve`);
    dispatch({ type: productActionTypes.APPROVE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: productActionTypes.APPROVE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const rejectProduct = (id) => async (dispatch) => {
  dispatch({ type: productActionTypes.REJECT_PRODUCT_REQUEST });
  try {
    await axios.post(`/products/${id}/reject`);
    dispatch({ type: productActionTypes.REJECT_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: productActionTypes.REJECT_PRODUCT_FAILURE, payload: error.message });
  }
};
