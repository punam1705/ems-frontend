import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const REST_API_BASE_URL = `${API}/api/projects`;

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

// Assign project
export const createProjectAssignment = (project) =>
  api.post("", project);

// Get all projects
export const listProjectAssignments = () =>
  api.get("");

// Get projects of one employee
export const getEmployeeProjects = (email) =>
  api.get(`/employee/${email}`);

// Update status
export const updateProjectStatus = (id, status) =>
  api.put(`/${id}?status=${status}`);

// Delete project
export const deleteProjectAssignment = (id) =>
  api.delete(`/${id}`);