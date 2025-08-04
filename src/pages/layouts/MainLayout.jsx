import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main className="bg overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
