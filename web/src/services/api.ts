import axios from 'axios';

const api = axios.create({
  // COMENTE A LINHA DO IMPORT.META:
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // COLE O LINK DIRETO AQUI:
  baseURL: 'https://drop-manager-api.onrender.com',
});

export default api;