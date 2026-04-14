import axios from "axios";
const API = import.meta.env.VITE_API_URL;
const REST_API_BASE_URL = `${API}/api/employees`;
const api = axios.create({
  baseURL: REST_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const listEmployees = () => api.get("");
export const createEmployee = (employee) => api.post("", employee);
export const getEmployee = (employeeId) => api.get(`/${employeeId}`);
export const updateEmployee = (employeeId, employee) =>
  api.put(`/${employeeId}`, employee);
export const deleteEmployee = (employeeId) =>
  api.delete(`/${employeeId}`);
