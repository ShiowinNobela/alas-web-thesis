import axios from 'axios';
import useUserStore from '@/stores/userStore';

export const handleLogout = async ({ redirectTo = '/LoginPage' } = {}) => {
  try {
    await axios.post('/api/users/logout', {}, { withCredentials: true });

    localStorage.removeItem('user');
    useUserStore.getState().clearUser();

    window.location.href = redirectTo;
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
