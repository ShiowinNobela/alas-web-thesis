import { useEffect, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/AdminSidebar';
import AdminNavbar from '@/components/layout/AdminNavbar';
import AdminFooter from '@/components/layout/AdminFooter';
import { Suspense } from 'react';
import LoadingFallback from './LoadingFallback';
import { toast } from 'sonner';
import { socket } from '@/socket';
import { useQueryClient, useQuery } from '@tanstack/react-query';


const DashboardContext = createContext(null);
export const useDashboardData = () => useContext(DashboardContext);

const fetchDashboardMetrics = async () => {
  const res = await fetch ('/api/reports/dashboard', { credentials: 'include' });
  if (!res.ok)
    throw new Error('Failed to fetch Dashboard Metrics');
  return res.json();
};

const AdminLayout = () => {
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey:['dashboardMetrics'],
    queryFn: fetchDashboardMetrics,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    socket.connect();

    const handleConnect = async () => {
      socket.emit('join-admin');
    };

    const handleToast = (data) => {
      toast[data.type || 'info'](data.message);
    };

    const handleCriticalInventory = (product) => {
      toast.warning(`LOW STOCK! ${product.name} (${product.stock_quantity} left)`);
      //Invalidates when inventory:critical happens so it fetches LIKE MAGIC
      queryClient.invalidateQueries({queryKey:['dashboardMetrics']});
    };

    const handleError = (err) => {
      console.error('❌ Socket connection error:', err.message);
    };

    // Set up event listeners
    socket.on('connect', handleConnect);
    socket.on('toast', handleToast);
    socket.on('inventory:critical', handleCriticalInventory)
    socket.on('connect_error', handleError);

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up AdminLayout socket');
      socket.off('connect', handleConnect);
      socket.off('toast', handleToast);
      socket.off('inventory:critical', handleCriticalInventory);
      socket.off('connect_error', handleError);

      socket.disconnect();
    };
  }, []);

  return (
    <DashboardContext.Provider value={{ data, isLoading, error }}>
      <div className="grid min-h-screen w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]">
        <aside className="sticky top-0 h-screen row-span-3">
          <Sidebar />
        </aside>

        <AdminNavbar />

        <main className="overflow-y-auto bg-admin">
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>

        <footer className="text-sm border-t text-muted-foreground">
          <AdminFooter />
        </footer>
      </div>
    </DashboardContext.Provider>
  );
};

export default AdminLayout;
