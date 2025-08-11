import React, { createContext, useState, useEffect } from 'react';

// 1️⃣ Create context
export const AuthContext = createContext();

// 2️⃣ Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // restore from localStorage if already logged in
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
