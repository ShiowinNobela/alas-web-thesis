// layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/AdminSidebar';
import AdminNavbar from '@/components/layout/AdminNavbar';
import AdminFooter from '@/components/layout/AdminFooter';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import LoadingFallback from './LoadingFallback';

const AdminLayout = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]">
      <aside className="sticky top-0 row-span-3 h-screen">
        <Sidebar />
      </aside>

      <AdminNavbar />

      <main className="bg-admin overflow-y-auto">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="text-muted-foreground border-t text-sm">
        <AdminFooter />
      </footer>

      <Toaster richColors visibleToasts={1} />
    </div>
  );
};

export default AdminLayout;
