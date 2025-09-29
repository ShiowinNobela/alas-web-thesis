import Navbar from '@/components/layout/UserNavbar';
import { Outlet } from 'react-router';
import Footer from '@/components/layout/UserFooter';
import useUserStore from '@/stores/userStore';
import { lazy, Suspense } from 'react';
import LoadingFallback from './LoadingFallback';

function ProductListLayout() {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  const Cart = isLoggedIn ? lazy(() => import('@/components/bigComponents/Cart.jsx')) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex flex-1">
        <div className={`flex flex-1 flex-col ${isLoggedIn ? 'lg:mr-72' : ''}`}>
          <main>
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </main>

          <Footer />
        </div>

        {isLoggedIn && Cart && (
          <aside className="bg-card fixed top-[64px] right-0 hidden h-[calc(100vh-64px)] w-76 overflow-y-auto border-l shadow-lg lg:block">
            <Suspense fallback={null}>
              <Cart />
            </Suspense>
          </aside>
        )}
      </div>
    </div>
  );
}

export default ProductListLayout;
