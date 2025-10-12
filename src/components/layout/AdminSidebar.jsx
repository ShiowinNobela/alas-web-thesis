import { Link, useLocation } from 'react-router-dom';
import { handleLogout } from '@/utils/logout';
import {
  LayoutDashboard,
  LogOut,
  User,
  Package,
  Clipboard,
  Box,
  Archive,
  CreditCard,
  Activity,
  Bell,
  ShoppingCart,
  Ticket,
} from 'lucide-react';
import { toast } from 'sonner';
import { socket } from '@/socket';
import { useState, useEffect } from 'react';
import { useDashboardData } from '@/pages/layouts/AdminLayout';

const sidebarItems = [
  { path: '/Admin/DashBoard', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/Admin/WalkInOrdering', name: 'Walk In Ordering', icon: ShoppingCart },
  { path: '/Admin/AccountManagement', name: 'User Management', icon: User },
  { path: '/Admin/Orders', name: 'Orders Management', icon: Package },
  { path: '/Admin/WalkInOrdersTable', name: 'Walk In Orders', icon: Clipboard },
  { path: '/Admin/ProductManagement', name: 'Product Management', icon: Box },
  { path: '/Admin/InventoryManagement', name: 'Inventory Management', icon: Archive },
  { path: '/Admin/SalesPage', name: 'Sales Summary', icon: CreditCard },
  { path: '/Admin/NotificationPage', name: 'Activity Log', icon: Activity },
  { path: '/Admin/Notifs', name: 'Notifications', icon: Bell },
  { path: '/Admin/promotion/management', name: 'Promotion Management', icon: Ticket },
];

function Sidebar() {
  const location = useLocation();
  const [criticalInventory, setCriticalInventory] = useState(false);

  const {data, isLoading} = useDashboardData();
  const lowStock = data?.data?.lowStock || [];
  const lowStockCount = lowStock.length;

  useEffect(() => {
    if(!isLoading) {
      setCriticalInventory(lowStockCount > 0);
    }
  }, [lowStockCount, isLoading]);

  useEffect(() => {
    if (location.pathname === '/Admin/InventoryManagement') {
    setCriticalInventory(false);
  }
  }, [location.pathname]);
  
  useEffect(() => {
    const handleCritical = (payload) => {
      console.log('Received inventory:critical', payload);
      setCriticalInventory(true);
      toast.warning(payload?.message || 'Low stock alert!');
    };

    socket.on('inventory:critical', handleCritical);
    return () => {
      socket.off('inventory:critical', handleCritical);
    };
  }, []);

  const onLogout = async () => {
    toast.info('Logged out successfully');
    await handleLogout();
  };

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center p-2 rounded-2xl text-sm ${
      isActive ? 'text-red-400 hover:bg-gray-700' : 'text-white hover:bg-gray-700'
    } group cursor-pointer`;
  };

  return (
    <div className="border-lighter flex h-screen w-[250px] flex-col justify-between border-r bg-gray-800">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center p-3">
          <img
            src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
            alt="Alas Delis and Spices Logo"
            className="object-contain h-10"
          />
          <h1 className="ml-4 text-2xl font-bold text-white font-heading">Alas Admin</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <div className={getNavItemClass(item.path)}>
                    <item.icon className="mx-2 size-5" />
                    <span className="relative flex-1 ml-2 text-sm text-left whitespace-nowrap">{item.name}
                      {item.path === '/Admin/InventoryManagement' && criticalInventory && (
                        <span className='absolute -right-3 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white'> 
                         !
                        </span>
                      )}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Section: Logout */}
      <div className="p-3">
        <button
          type="button"
          className="flex items-center w-full p-2 font-normal text-white cursor-pointer hover:bg-primary group rounded-2xl"
          onClick={onLogout}
        >
          <LogOut className="mx-2 size-5" />
          <span className="flex-1 ml-2 text-sm text-left whitespace-nowrap">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
