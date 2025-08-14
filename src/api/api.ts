import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || API_BASE, // adjust as needed
  withCredentials: true, // for cookies (if using FastAPI + auth)
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
