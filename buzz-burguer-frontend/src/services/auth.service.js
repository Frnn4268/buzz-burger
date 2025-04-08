import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

const authService = {
  register: (name, email, password, role) => {
    return axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      role 
    });
  },
  
  login: (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password });
  }
};

export default authService;