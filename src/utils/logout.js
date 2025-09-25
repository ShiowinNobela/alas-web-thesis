// src/utils/logout.js
import axios from 'axios';
import useUserStore from '@/stores/userStore';

export const handleLogout = async () => {
  try {
    await axios.post('/api/users/logout', {}, { withCredentials: true });
    localStorage.removeItem('user');
    useUserStore.getState().clearUser();
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
