import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext(null);

const parseToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return {
      userId: decoded.userId ?? decoded.id ?? decoded.user_id ?? null,
      role: decoded.role ?? null
    };
  } catch (err) {
    console.error('Failed to decode token', err);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [identity, setIdentity] = useState(() => parseToken(localStorage.getItem('authToken')));

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
      setIdentity(parseToken(token));
    } else {
      localStorage.removeItem('authToken');
      setIdentity(null);
    }
  }, [token]);

  const login = (jwt) => setToken(jwt);
  const logout = () => setToken(null);

  const value = useMemo(
    () => ({
      token,
      userId: identity?.userId ?? null,
      role: identity?.role ?? null,
      login,
      logout
    }),
    [token, identity]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
