import { useEffect } from 'react';
import usePermissionsStore from '@/stores/permissionStore';
import { socket } from '@/socket'; // assuming you have this like in AdminLayout
import { toast } from 'sonner';

const AdminPermissionsProvider = ({ children }) => {
  const fetchPermissions = usePermissionsStore((state) => state.fetchPermissions);

  useEffect(() => {
    fetchPermissions();

    const handlePermissionUpdate = () => {
      toast.success('🔄 Permissions have been updated.');
      fetchPermissions();
    };

    socket.on('permissions:updated', handlePermissionUpdate);

    return () => {
      socket.off('permissions:updated', handlePermissionUpdate);
    };
  }, [fetchPermissions]);

  return <>{children}</>;
};

export default AdminPermissionsProvider;
