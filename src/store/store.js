import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import kursusReducer from './redux/kursusSlice';

// Konfigurasi Redux Store
export const store = configureStore({
  reducer: {
    user: userReducer, // Daftarkan user reducer
    kursus: kursusReducer, // Daftarkan kursus reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
