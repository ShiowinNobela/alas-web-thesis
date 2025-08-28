import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  hasCheckedAuth: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      hasCheckedAuth: true,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      hasCheckedAuth: true,
    }),
}));

export default useUserStore;
