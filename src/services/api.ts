import axios from "axios";
import { getBaseUrl } from "../utils/helper";

const api = axios.create({
  baseURL: `${getBaseUrl()}`,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    const costumerId = sessionStorage.getItem("costumerId");

    if (token && costumerId) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert("Sua sessão expirou. Você será redirecionado para o login.");
      sessionStorage.removeItem("token");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
