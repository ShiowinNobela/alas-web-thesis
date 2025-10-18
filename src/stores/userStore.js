// userStore.js
import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  hasCheckedAuth: false,
  loading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      hasCheckedAuth: true,
      loading: false,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      hasCheckedAuth: true,
      loading: false,
    }),

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await axios.get('/api/users', { withCredentials: true });
      set({
        user: res.data,
        isAuthenticated: true,
        hasCheckedAuth: true,
        loading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        hasCheckedAuth: true,
        loading: false,
      });
    }
  },
}));

export default useUserStore;
