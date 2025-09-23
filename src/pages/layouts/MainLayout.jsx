import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import LoadingFallback from './LoadingFallback';

function MainLayout() {
  return (
    <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main className="min-h-screen overflow-y-auto">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster richColors visibleToasts={1} />
    </div>
  );
}

export default MainLayout;
