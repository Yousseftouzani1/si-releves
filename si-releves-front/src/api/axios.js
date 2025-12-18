import axios from "axios";

// Base URL du backend (depuis .env)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 👉 Intercepteur pour ajouter le JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expiré ou invalide
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // Redirection simple vers login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
