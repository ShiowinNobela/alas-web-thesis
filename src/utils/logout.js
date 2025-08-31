export const handleLogout = async ({ redirectTo = '/LoginPage' } = {}) => {
  try {
    // Use relative path - will work with your axios baseURL config
    const { default: axios } = await import('@/lib/axios-config');
    await axios.post('/api/users/logout');
  } catch (error) {
    console.warn(
      'Logout API call failed, performing client-side cleanup:',
      error
    );
    // Continue with cleanup even if API call fails
  }

  // Always perform client-side cleanup
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  const { default: useUserStore } = await import('@/stores/userStore');
  useUserStore.getState().clearUser();

  window.location.href = redirectTo;
};
