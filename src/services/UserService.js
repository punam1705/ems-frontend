// // UserService.js

// import axios from "axios";

// const API = import.meta.env.VITE_API_URL;

// export const listUsers = () => {
//   return axios.get(`${API}/api/user/all`);
// };

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API}/api/user`
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const listUsers = () => api.get("/all");