import { useNavigate } from 'react-router-dom';

// If you're calling this from a React component
export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
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

    // Use React Router navigation instead of window.location
    navigate('/LoginPage', { replace: true });
  };

  return handleLogout;
};
