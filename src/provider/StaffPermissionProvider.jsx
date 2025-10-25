import { useEffect, useState } from 'react';
import usePermissionsStore from '@/stores/permissionStore';
import { socket } from '@/socket';
import useUserStore from '@/stores/userStore';
import { toast } from 'sonner';
import PropTypes from 'prop-types';

const AdminPermissionsProvider = ({ children }) => {
  const userRole = useUserStore((state) => state.user.role_name);
  const fetchPermissions = usePermissionsStore((state) => state.fetchPermissions);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (userRole === 'admin') return;

    fetchPermissions();

    const handlePermissionUpdate = () => {
      toast.success('🔄 Permissions have been updated.');
      fetchPermissions();
      setReloadKey((prev) => prev + 1); // triggers re-render
    };

    socket.on('permissions:updated', handlePermissionUpdate);

    return () => {
      socket.off('permissions:updated', handlePermissionUpdate);
    };
  }, [userRole, fetchPermissions]);

  return <div key={reloadKey}>{children}</div>; // re-render children
};

AdminPermissionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminPermissionsProvider;
