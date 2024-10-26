// Action Types
export const GET_ALL_PRODUCTS_REQUEST = 'GET_ALL_PRODUCTS_REQUEST';
export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_FAILURE = 'GET_ALL_PRODUCTS_FAILURE';

export const GET_PRODUCT_BY_ID_REQUEST = 'GET_PRODUCT_BY_ID_REQUEST';
export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const GET_PRODUCT_BY_ID_FAILURE = 'GET_PRODUCT_BY_ID_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const APPROVE_PRODUCT_REQUEST = 'APPROVE_PRODUCT_REQUEST';
export const APPROVE_PRODUCT_SUCCESS = 'APPROVE_PRODUCT_SUCCESS';
export const APPROVE_PRODUCT_FAILURE = 'APPROVE_PRODUCT_FAILURE';

export const REJECT_PRODUCT_REQUEST = 'REJECT_PRODUCT_REQUEST';
export const REJECT_PRODUCT_SUCCESS = 'REJECT_PRODUCT_SUCCESS';
export const REJECT_PRODUCT_FAILURE = 'REJECT_PRODUCT_FAILURE';

const apiCall = async (url, method = 'GET', body) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const getAllProducts = () => async (dispatch) => {
  console.log('getAllProducts');
  dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
  try {
    const data = await apiCall('/api/products');
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
  try {
    const data = await apiCall(`/api/products/${id}`);
    dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
}

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const data = await apiCall('/api/products', 'POST', product);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const data = await apiCall(`/api/products/${id}`, 'PUT', product);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const data = await apiCall(`/api/products/${id}`, 'DELETE');
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const approveProduct = (id) => async (dispatch) => {
  dispatch({ type: APPROVE_PRODUCT_REQUEST });
  try {
    const data = await apiCall(`/api/products/${id}/approve`, 'POST');
    dispatch({ type: APPROVE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: APPROVE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const rejectProduct = (id) => async (dispatch) => {
  dispatch({ type: REJECT_PRODUCT_REQUEST });
  try {
    const data = await apiCall(`/api/products/${id}/reject`, 'POST');
    dispatch({ type: REJECT_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REJECT_PRODUCT_FAILURE, payload: error.message });
  }
};
