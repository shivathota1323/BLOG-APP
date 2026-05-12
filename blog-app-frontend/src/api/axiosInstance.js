import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.MODE === 'production' ? "" : "https://blog-app-shiva-blbo.onrender.com"),
  withCredentials: true,
});

export default api;
