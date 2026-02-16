import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://drop-manager.onrender.com/products',
});

export default api;