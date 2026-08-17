import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminGoogleLogin, verifyAdminSession } from '../services/api';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('n3d_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('n3d_admin_token') || null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await verifyAdminSession();
          if (res.success) {
            setAdminUser(res.admin);
            localStorage.setItem('n3d_admin_user', JSON.stringify(res.admin));
          }
        } catch (err) {
          console.warn('[Auth Session Expired]', err.message);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const loginWithGoogle = async (credentialData) => {
    setAuthError(null);
    try {
      const response = await adminGoogleLogin(credentialData);
      if (response.success && response.token) {
        setToken(response.token);
        setAdminUser(response.admin);
        localStorage.setItem('n3d_admin_token', response.token);
        localStorage.setItem('n3d_admin_user', JSON.stringify(response.admin));
        return { success: true, admin: response.admin };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Google Authentication failed';
      setAuthError(errMsg);
      throw new Error(errMsg);
    }
  };

  const devLoginBypass = async () => {
    setAuthError(null);
    try {
      const response = await adminGoogleLogin({
        credential: 'dev-admin-token',
        email: 'nouman3dvisuals@gmail.com',
        name: 'Nouman Admin (Dev Mode)'
      });
      if (response.success && response.token) {
        setToken(response.token);
        setAdminUser(response.admin);
        localStorage.setItem('n3d_admin_token', response.token);
        localStorage.setItem('n3d_admin_user', JSON.stringify(response.admin));
        return { success: true };
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      setAuthError(errMsg);
      throw new Error(errMsg);
    }
  };

  const logout = () => {
    setToken(null);
    setAdminUser(null);
    setAuthError(null);
    localStorage.removeItem('n3d_admin_token');
    localStorage.removeItem('n3d_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        token,
        isAuthenticated: !!token && !!adminUser,
        loading,
        authError,
        loginWithGoogle,
        devLoginBypass,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
