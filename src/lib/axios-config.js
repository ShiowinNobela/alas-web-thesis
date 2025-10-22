import axios from 'axios';

axios.defaults.baseURL = import.meta.env.PROD ? 'https://flux-backend-2.onrender.com' : 'http://localhost:3000';
axios.defaults.withCredentials = true;

// Connection warming function
const warmUpBackend = () => {
  // Only warm up in production
  if (import.meta.env.PROD) {
    // Use HEAD request to minimize data transfer
    fetch(axios.defaults.baseURL + '/api/products', {
      method: 'HEAD',
      priority: 'low', // Low priority so it doesn't block important requests
      credentials: 'include',
      headers: {
        'Origin': 'https://alashotsauce.com',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    .then(() => console.log('Backend connection warmed up'))
    .catch(() => {}); // Silent fail - don't worry if it fails
  }
};

// Warm up connection when module loads (page load)
warmUpBackend();

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