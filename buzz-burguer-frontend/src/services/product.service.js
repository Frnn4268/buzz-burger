import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getProducts = (params = {}) => {
  return axiosInstance.get('/product', { params });
};

const getProduct = (id) => {
  return axiosInstance.get(`/product/${id}`);
};

const createProduct = (productData) => {
  return axiosInstance.post('/product', productData);
};

const editProduct = (id, productData) => {
  return axiosInstance.put(`/product/${id}`, productData);
};

const deleteProduct = (id) => {
  return axiosInstance.delete(`/product/${id}`);
};

export default {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
};
