// layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
