import axios from 'axios';
import { ProductService } from '../services/productService';

const API_BASE_URL = 'http://localhost:8080/api';

export class ProductController {

  static async getAllProducts() {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.map(product => new ProductService(product.id, product.name, product.price, product.description, product.status));
  }

  static async getProductById(id) {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return new ProductService(response.data.id, response.data.name, response.data.price, response.data.description, response.data.status);
  }

  static async getApprovedProducts() {
    const response = await axios.get(`${API_BASE_URL}/products/approve`);
    return response.data.map(product => new ProductService(product.id, product.name, product.price, product.description, product.status));
  }

  static async getPendingProducts() {
    const response = await axios.get(`${API_BASE_URL}/products/pending`);
    return response.data.map(product => new ProductService(product.id, product.name, product.price, product.description, product.status));
  }

  static async getRejectedProducts() {
    const response = await axios.get(`${API_BASE_URL}/products/reject`);
    return response.data.map(product => new ProductService(product.id, product.name, product.price, product.description, product.status));
  }
  
  static async createProduct(data) {
    const response = await axios.post(`${API_BASE_URL}/products`, data);
    return response.data;
  }

  static async updateProduct(id, data) {
    console.log('PRODUCT ID: ', id);
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, data);
      console.log('Product updated successfully');
      return response.data; 
    } catch (error) {
      console.error('Error updating product:', error.message || error);
      throw error;
    }
  }

  static async deleteProduct(id) {
    console.log('PRODUCT ID: ', id);
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
      console.log('Product deleted successfully');
      return response.data; 
    } catch (error) {
      console.error('Error deleting product:', error.message || error);
      throw error;
    }
  }

  static async approveProduct(id) {
    await axios.post(`${API_BASE_URL}/products/${id}/approve`);
  }

  static async rejectProduct(id) {
    await axios.post(`${API_BASE_URL}/products/${id}/reject`);
  }

  
  static async getProductsPagination(page, limit) {
    const response = await axios.get(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
    return response.data;
  }
}
