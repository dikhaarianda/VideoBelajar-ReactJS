import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://685ec4de7b57aebd2afa8b01.mockapi.io/VideoBelajar';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all users
export const getUsers = () => api.get('/users');

// Get user by id
export const getUserById = (id) => api.get(`/users/${id}`);

// Add new user (register)
export const addUser = (userData) => api.post('/users', userData);

// Update user
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);

// Delete user
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
