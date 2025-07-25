import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const localData = localStorage.getItem('userInfo');
      return localData ? JSON.parse(localData) : null;
    } catch (error) {
      console.error("Failed to parse userInfo from localStorage:", error);
      return null; // Return null on error to avoid breaking the app
    }
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  const login = (data) => {
    setUserInfo(data);
  };

  const logout = () => {
    setUserInfo(null);
    // localStorage.removeItem('userInfo') is handled by useEffect
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};