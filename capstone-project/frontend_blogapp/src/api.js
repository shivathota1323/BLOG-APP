import axios from "axios";

const localApiBaseUrl = "http://localhost:5000";
const productionApiBaseUrl = "https://blog-app-shiva-thota.onrender.com";
const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? productionApiBaseUrl : localApiBaseUrl);

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});
