// layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/AdminSidebar';
import AdminNavbar from '@/components/layout/AdminNavbar';
import AdminFooter from '@/components/layout/AdminFooter';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden shadow-md">
        <AdminNavbar />
        <div className="bg-admin flex flex-1 flex-col overflow-auto">
          <main className="flex-1">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="text-muted-foreground border-t px-4 py-3 text-sm">
            <AdminFooter />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
