// src/services/api.ts
import axios from 'axios';

// Esta linha mágica usa a variável de ambiente que vamos configurar na Vercel.
// Se ela não existir (quando estamos rodando localmente), usa o endereço localhost.
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  // A baseURL agora aponta para o endereço do seu servidor online ou local
  baseURL: API_URL, 
});

// Interceptor para adicionar o token de autenticação a todas as requisições
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de resposta para facilitar a depuração
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;