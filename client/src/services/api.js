import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Vital Logs API
export const vitalLogsAPI = {
  getAll: () => api.get('/vitals'),
  create: (data) => api.post('/vitals', data),
  delete: (id) => api.delete(`/vitals/${id}`),
};

// Medications API
export const medicationsAPI = {
  getAll: () => api.get('/medications'),
  create: (data) => api.post('/medications', data),
  toggleTaken: (id) => api.patch(`/medications/${id}/taken`),
  delete: (id) => api.delete(`/medications/${id}`),
};

export default api;