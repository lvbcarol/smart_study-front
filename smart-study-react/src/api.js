import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // ou seu link da render/vercel se estiver hospedado
  withCredentials: true, // se usar cookies para autenticação
});

export default API;
