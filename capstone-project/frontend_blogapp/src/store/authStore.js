import { create } from "zustand";
import { api } from "../api";

const normalizeUser = (user) => {
  if (!user) return null;

  return {
    ...user,
    id: user.id || user._id,
    _id: user._id || user.id,
  };
};

export const useAuth = create((set) => ({
  currentUser: null,
  loading: true,
  authChecked: false,
  isAuthenticated: false,
  error: null,

  login: async (userCred) => {
    try {
      set({ loading: true, currentUser: null, isAuthenticated: false, error: null });

      const res = await api.post("/auth/login", userCred);

      if (res.status === 200) {
        set({
          currentUser: normalizeUser(res.data?.payload),
          loading: false,
          authChecked: true,
          isAuthenticated: true,
          error: null,
        });
      }
    } catch (err) {
      console.log("err is ", err);
      set({
        loading: false,
        authChecked: true,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || err.response?.data?.error || "Login failed",
      });
    }
  },

  logout: async () => {
    try {
      const res = await api.get("/auth/logout");

      if (res.status === 200) {
        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
          loading: false,
          authChecked: true,
        });
      }
    } catch (err) {
      set({
        loading: false,
        authChecked: true,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || err.response?.data?.error || "Logout failed",
      });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await api.get("/auth/check-auth");

      set({
        currentUser: normalizeUser(res.data.payload),
        isAuthenticated: true,
        loading: false,
        authChecked: true,
        error: null,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
          authChecked: true,
        });
        return;
      }

      console.error("Auth check failed:", err);
      set({ loading: false, authChecked: true });
    }
  },
}));
