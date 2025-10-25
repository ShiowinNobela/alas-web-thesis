import Footer from '@/components/layout/UserFooter';
import Navbar from '@/components/layout/UserNavbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import LoadingFallback from './LoadingFallback';
import useUserSocket from '@/hooks/useUserSocket';
import useNotifications from '@/hooks/useNotifications';

function MainLayout() {
  useUserSocket();
  const { notifications, setNotifications } = useNotifications();

  return (
    <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto]">
      <Navbar notifications={notifications} setNotifications={setNotifications} />
      <main className="min-h-screen overflow-y-auto">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
