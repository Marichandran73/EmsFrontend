import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const Usercontext = createContext();

const AuthProvider = ({ children } = {}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://emsbackend-z0kf.onrender.com/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Token verification failed:', error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <Usercontext.Provider value={{ user, login, logout, loading }}>
      {children}
    </Usercontext.Provider>
  );
};

export const useAuth = () => useContext(Usercontext);

export default AuthProvider;
