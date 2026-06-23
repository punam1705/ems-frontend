import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const REST_API_BASE_URL = `${API}/api/leave-request`;

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

// Create leave request
export const createLeaveRequest = (leaveRequest) =>
  api.post("", leaveRequest);

// Get all leave requests
export const listLeaveRequests = () =>
  api.get("");

// Get single leave request
export const getLeaveRequest = (id) =>
  api.get(`/${id}`);

// Update status (APPROVED, REJECTED, CANCELLED)
export const updateLeaveStatus = (id, status) =>
  api.put(`/${id}?status=${status}`);

// Delete leave request
export const deleteLeaveRequest = (id) =>
  api.delete(`/${id}`);