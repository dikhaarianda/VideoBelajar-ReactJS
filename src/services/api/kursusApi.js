import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://685ec4de7b57aebd2afa8b01.mockapi.io/VideoBelajar';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all kursus
export const getKursus = () => api.get('/kursus');

// Get kursus by id
export const getKursusById = (id) => api.get(`/kursus/${id}`);

// Add new kursus
export const addKursus = (kursusData) => api.post('/kursus', kursusData);

// Update kursus
export const updateKursus = (id, kursusData) => api.put(`/kursus/${id}`, kursusData);

// Delete kursus
export const deleteKursus = (id) => api.delete(`/kursus/${id}`);

export default {
  getKursus,
  getKursusById,
  addKursus,
  updateKursus,
  deleteKursus,
};
