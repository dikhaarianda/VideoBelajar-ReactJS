import { useDispatch, useSelector } from 'react-redux';

// Custom hooks untuk Redux
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hook untuk user authentication
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  const isInitializing = useAppSelector((state) => state.user.isInitializing);
  
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  return {
    user: currentUser,
    loading,
    error,
    isInitializing,
    isAdmin,
    dispatch
  };
};
