import api from "./api";

export const authService = {
  register: async (data) => {
    const response = await api.post("/auth/register", data);

    return response.data;
  },

  login: async (data) => {
    const response = await api.post("/auth/login", data);

    return response.data;
  },

  refresh: async (refreshToken) => {
    const response = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });

    return response.data;
  },

  logout: async (refreshToken) => {
    const response = await api.post("/auth/logout", {
      refresh_token: refreshToken,
    });

    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");

    return response.data;
  },
  
};