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

const getUsers = (params = {}) => {
  return axiosInstance.get('/user', { params });
};

const getUser = (id) => {
  return axiosInstance.get(`/user/${id}`);
};

const editUserStatus = (id, userData) => {
  return axiosInstance.put(`/user/${id}`, userData);
};

const deleteUser = (id) => {
  return axiosInstance.delete(`/user/${id}`);
};

export default {
  getUsers,
  getUser,
  editUserStatus,
  deleteUser
};
