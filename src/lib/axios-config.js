import axios from 'axios';

axios.defaults.baseURL = import.meta.env.PROD ? 'https://flux-backend-2.onrender.com' : 'http://localhost:3000';

axios.defaults.withCredentials = true;

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
