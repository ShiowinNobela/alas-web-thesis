import axios from 'axios';

axios.defaults.baseURL = import.meta.env.PROD ? 'https://flux-backend-1-5yv1.onrender.com' : 'http://localhost:3000';

axios.defaults.withCredentials = true;
const CSRF_HEADER = 'X-Flux-CSRF';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (['post', 'put', 'delete', 'patch'].includes(config.method)) {
      config.headers[CSRF_HEADER] = 'flux-client';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
