import { useNavigate } from 'react-router-dom';

export const handleLogout = async () => {
  try {
    const { default: axios } = await import('@/lib/axios-config');
    await axios.post('/api/users/logout');
  } catch (error) {
    console.warn('Logout API call failed:', error);
  }

  // Clear client state
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  const { default: useUserStore } = await import('@/stores/userStore');
  useUserStore.getState().clearUser();

  // Use window.location for redirect (works everywhere)
  window.location.href = '/LoginPage';
};

// Optional: Create a hook version for components
export const useLogout = () => {
  const navigate = useNavigate();

  return async () => {
    try {
      const { default: axios } = await import('@/lib/axios-config');
      await axios.post('/api/users/logout');
    } catch (error) {
      console.warn('Logout API call failed:', error);
    }

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    const { default: useUserStore } = await import('@/stores/userStore');
    useUserStore.getState().clearUser();

    navigate('/LoginPage', { replace: true });
  };
};
