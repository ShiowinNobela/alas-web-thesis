import Navbar from '@/components/layout/navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import Footer from '@/components/layout/footer';
import useUserStore from '@/stores/userStore';
import { lazy, Suspense } from 'react';

function ProductListLayout() {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  const Cart = isLoggedIn ? lazy(() => import('@/components/bigComponents/Cart.jsx')) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Main content area without overflow constraints */}
      <div className="flex flex-1">
        {/* Main content container */}
        <div className={`flex flex-1 flex-col ${isLoggedIn ? 'lg:mr-72' : ''}`}>
          <main>
            <Outlet />
          </main>

          <Footer />
        </div>

        {isLoggedIn && Cart && (
          <aside className="bg-card fixed top-[64px] right-0 hidden h-[calc(100vh-64px)] w-72 overflow-y-auto border-l shadow-lg lg:block">
            <Suspense fallback={null}>
              <Cart />
            </Suspense>
          </aside>
        )}
      </div>

      {/* Toast notifications */}
      <Toaster position="top-center" offset={90} richColors visibleToasts={1} />
    </div>
  );
}

export default ProductListLayout;
