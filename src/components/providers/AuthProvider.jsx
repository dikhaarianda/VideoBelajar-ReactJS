import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserFromStorage } from '../../store/redux/userSlice';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from localStorage on app start
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          dispatch(setUserFromStorage(userData));
        } else {
          // If no user in localStorage, set isInitializing to false
          dispatch(setUserFromStorage(null));
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user'); // Remove corrupted data
        dispatch(setUserFromStorage(null));
      }
    };

    loadUserFromStorage();
  }, [dispatch]);

  return children;
}
