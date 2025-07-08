import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUsers, addUser } from '../services/api/userApi';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user'); // Remove corrupted data
      } finally {
        setIsInitializing(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await getUsers();
      const users = response.data;
      const foundUser = users.find((u) => u.email === email);
      if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
        const userData = {
          email: foundUser.email,
          role: foundUser.role || 'user',
          id: foundUser.id,
          name: foundUser.name,
        };
        setUser(userData);
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Cek apakah email sudah terdaftar
      const existingUsers = await getUsers();
      const emailExists = existingUsers.data.find(user => user.email === userData.email);
      
      if (emailExists) {
        return false; // Email sudah ada
      }

      // Transform userData for API
      const { fullName, phone, confirmPassword, password, ...rest } = userData;
      const hashedPassword = bcrypt.hashSync(password, 5);
      const apiData = {
        name: fullName,
        telp: phone,
        password: hashedPassword,
        role: 'user', // Automatically set role as 'user' for all new registrations
        ...rest
      };
      const response = await addUser(apiData);
      if (response.status === 201) {
        return true; // Berhasil mendaftar
      }
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Remove from localStorage
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, loading, isInitializing }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
