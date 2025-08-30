import Navbar from '@/components/layout/navbar';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import Footer from '@/components/layout/footer';
import Cart from '@/components/bigComponents/Cart.jsx';
import useUserStore from '@/stores/userStore';

function ProductListLayout() {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

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

        {isLoggedIn && (
          <aside className="fixed top-[64px] right-0 hidden h-[calc(100vh-64px)] w-72 overflow-y-auto border-l bg-white shadow-lg lg:block">
            <Cart />
          </aside>
        )}
      </div>

      {/* Toast notifications */}
      <Toaster position="bottom-center" richColors visibleToasts={1} />
    </div>
  );
}

export default ProductListLayout;
