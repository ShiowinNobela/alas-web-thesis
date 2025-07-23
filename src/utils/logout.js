export const handleLogout = async ({ redirectTo = '/LoginPage' } = {}) => {
  try {
    // 1. Call backend to clear cookie
    await fetch('http://localhost:3000/api/users/logout', {
      method: 'POST',
      credentials: 'include', // Send cookies
    });

    // 2. Clear local storage and Zustand store
    localStorage.removeItem('user');

    const { default: useUserStore } = await import('@/stores/userStore');
    useUserStore.getState().clearUser();

    // 3. Redirect
    window.location.href = redirectTo;
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
