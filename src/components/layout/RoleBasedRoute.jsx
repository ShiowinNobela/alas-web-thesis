// src/components/RoleBasedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '@/stores/userStore';
import { handleLogout } from '@/utils/logout';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, hasCheckedAuth, user } = useUserStore();

  if (!hasCheckedAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" replace />;
  }

  // If user is authenticated but role is not allowed
  if (!allowedRoles.includes(user.role_name)) {
    handleLogout({ redirectTo: '/LoginPage' });
    return <Navigate to="/LoginPage" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
