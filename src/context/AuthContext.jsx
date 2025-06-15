import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // For demo purposes, hardcode admin credentials
    if (email === 'admin@videobelajar.com' && password === 'admin123') {
      setUser({
        email,
        role: 'admin'
      });
      return true;
    }
    // For regular users, just check if email and password are provided
    if (email && password) {
      setUser({
        email,
        role: 'user'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
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
