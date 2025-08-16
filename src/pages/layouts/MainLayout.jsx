import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

function MainLayout() {
  return (
    <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main className="bg overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-center" richColors />
    </div>
  );
}

export default MainLayout;
