// src/components/RoleBasedRoute.jsx
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '@/stores/userStore';
import { handleLogout } from '@/utils/logout';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, hasCheckedAuth, user } = useUserStore();
  const [redirect, setRedirect] = useState(false);

  // Automatically logout if role is not allowed
  useEffect(() => {
    if (hasCheckedAuth && isAuthenticated && !allowedRoles.includes(user?.role_name)) {
      handleLogout().then(() => setRedirect(true));
    }
  }, [hasCheckedAuth, isAuthenticated, user, allowedRoles]);

  if (!hasCheckedAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!isAuthenticated || redirect) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

RoleBasedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoleBasedRoute;
