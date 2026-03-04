import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginApi, registerApi } from '../api/auth';

const AuthContext = createContext(null);
const STORAGE_KEY = 'authToken';

function parseJwt(token) {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || null);
  const [user, setUser] = useState(() => (token ? parseJwt(token) : null));

  useEffect(() => {
    if (token) setUser(parseJwt(token));
    else setUser(null);
  }, [token]);

  const saveToken = (t) => {
    setToken(t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch (e) {}
  };

  const clearToken = () => {
    setToken(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  };
  const login = async ({ username, password, remember = false }) => {
    const res = await loginApi({ username, password });
    if (!res.ok) return { ok: false, error: res.error || 'Login failed' };
    // if remember is true we persist to localStorage; otherwise keep token in memory only
    setToken(res.token);
    if (remember) {
      try { localStorage.setItem(STORAGE_KEY, res.token); } catch (e) {}
    } else {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    }
    return { ok: true };
  };

  const register = async ({ username, password, remember = false }) => {
    const res = await registerApi({ username, password });
    if (!res.ok) return { ok: false, error: res.error || 'Registration failed' };
    setToken(res.token);
    if (remember) {
      try { localStorage.setItem(STORAGE_KEY, res.token); } catch (e) {}
    } else {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    }
    return { ok: true };
  };

  const logout = () => {
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
