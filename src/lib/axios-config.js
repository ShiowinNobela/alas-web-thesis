// src/lib/axios-config.js
import axios from 'axios';

// Set the base URL for all axios requests
axios.defaults.baseURL = import.meta.env.PROD
  ? 'https://flux-backend-1-5yv1.onrender.com'
  : 'http://localhost:3000';

axios.defaults.withCredentials = true;

// Add a request interceptor to include the token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
