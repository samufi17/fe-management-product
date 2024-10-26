import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from './actions';

const initialState = {
  items: [],
  loading: false,
  status: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return { 
        ...state,
        loading: true,
        status: null };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        status: 'success'
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        status: action.payload
      };
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        status: null
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items,
        action.payload],
        status: 'created'
      };
    case CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        status: action.payload
      };
    case GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload
      };
    case GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        status: action.payload
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        status: null
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: 'updated'
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        status: action.payload
      };
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        status: null
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        items: state.items.filter(product => product.id !== action.payload),
        status: 'deleted'
      };

    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        status: action.payload
      };

    default:
      return state;
  }
};

export default productReducer;
