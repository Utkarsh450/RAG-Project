import { createContext, useEffect, useState } from "react";

import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setLoading(false);

        return;
      }

      try {
        const userData = await authService.getMe();

        setUser(userData);
      } catch {
        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");

        setToken(null);

        setUser(null);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);

    localStorage.setItem("refreshToken", refreshToken);

    setToken(accessToken);

    const userData = await authService.getMe();

    setUser(userData);
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,

    token,

    loading,

    login,

    logout,

    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
