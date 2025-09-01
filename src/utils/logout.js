import axios from 'axios';
import useUserStore from '@/stores/userStore';

export const handleLogout = async ({ redirectTo = '/LoginPage' } = {}) => {
  try {
    // 1. Call backend logout
    await axios.post('/api/users/logout', {}, { withCredentials: true });

    // 2. Clear local storage and Zustand store
    localStorage.removeItem('user');
    useUserStore.getState().clearUser();

    // 3. Redirect
    window.location.href = redirectTo;
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
