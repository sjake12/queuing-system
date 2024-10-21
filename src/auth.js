import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true,
});

export const login = async (username, password) => {
  try {
    const response = await axios.post("/auth", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth");
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post("/refresh");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
  }
);

export default api;
