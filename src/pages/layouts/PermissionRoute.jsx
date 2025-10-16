import { Navigate, Outlet } from 'react-router-dom';
import usePermissionsStore from '@/stores/permissionStore';
import useUserStore from '@/stores/userStore';

const PermissionRoute = ({ permission, adminOnly = false }) => {
  const permissions = usePermissionsStore((state) => state.permissions);
  const userRole = useUserStore((state) => state.user.role_name);

  // Admins bypass all checks
  if (userRole === 'admin') return <Outlet />;

  // Block staff if page is admin-only
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // If no specific permission required, allow
  if (!permission) return <Outlet />;

  // Block staff if they lack the required permission
  if (!permissions.includes(permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise, allow
  return <Outlet />;
};

export default PermissionRoute;
