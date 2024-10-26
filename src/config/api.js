// // import axios from 'lib/axios';
// import axios from 'axios';
// import { env } from '../config';
// import _ from 'lodash';

// const API_KEY_HEADER = {
//   'x-api-key': env.API_KEY,
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Headers': '*',
// };

// export const getProducts = async (url, params = {}) => {
//   const response = await axios.get(`${env.API}${url}`, {
//     params,
//     headers: API_KEY_HEADER,
//   });
//   return response.data;
// };

// export const getProductById = async (id) => {
//   const response = await axios.get(`${env.API}/products/${id}`, {
//     headers: API_KEY_HEADER,
//   });
//   return response.data;
// };

// export const createProduct = async (data) => {
//   const response = await axios.post(`${env.API}/products`, data, {
//     headers: {
//       ...API_KEY_HEADER,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };

// export const updateProduct = async (id, data) => {
//   const response = await axios.put(`${env.API}/products/${id}`, data, {
//     headers: {
//       ...API_KEY_HEADER,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };

// export const deleteProduct = async (id) => {
//   const response = await axios.delete(`${env.API}/products/${id}`, {
//     headers: API_KEY_HEADER,
//   });
//   return response.data;
// };

// export const approveProduct = async (id) => {
//   const response = await axios.post(`${env.API}/products/${id}/approve`, null, {
//     headers: API_KEY_HEADER,
//   });
//   return response.data;
// };

// export const rejectProduct = async (id) => {
//   const response = await axios.post(`${env.API}/products/${id}/reject`, null, {
//     headers: API_KEY_HEADER,
//   });
//   return response.data;
// };
