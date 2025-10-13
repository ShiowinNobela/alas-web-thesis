import { Navigate } from 'react-router-dom';
import usePermissionsStore from '@/stores/permissionStore';
import useUserStore from '@/stores/userStore';

const PermissionRoute = ({ permission, children }) => {
  const permissions = usePermissionsStore((state) => state.permissions);
  const userRole = useUserStore((state) => state.user.role);

  if (userRole === 'admin') return children;

  // If no permission is required, allow
  if (!permission) return children;

  // Staff: block if they lack the permission
  if (!permissions.includes(permission)) {
    return <Navigate to="/Admin/DashBoard" replace />;
  }

  return children;
};

export default PermissionRoute;
