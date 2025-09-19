import { Link, useLocation } from 'react-router-dom';
import { handleLogout } from '@/utils/logout';
import DBlogo from '@/components/images/logo-alas1.jpg';
import { useState } from 'react';
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
  Layers,
  ShoppingCart,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useLowStockCheck = () => {
  return useQuery({
    queryKey: ['lowStockCheck'],
    queryFn: async () => {
      try {
        console.log('Fetching low stock status...');
        const res = await axios.get('/api/products/low-stock-check');
        console.log('Low stock response:', res.data);
        return res.data.data.hasLowStock || false;
      } catch (error) {
        console.error('Error checking low stock:', error);
        return false;
      }
    },
    refetchInterval: 30000,
    staleTime: 30000,
  });
};

const managementItems = [
  { path: '/Admin/AccountManagement', name: 'User Management', icon: User },
  { path: '/Admin/Orders', name: 'Orders Management', icon: Package },
  { path: '/Admin/WalkInOrdersTable', name: 'Walk In Orders', icon: Clipboard },
  { path: '/Admin/ProductManagement', name: 'Product Management', icon: Box },
  {
    path: '/Admin/InventoryManagement',
    name: 'Inventory Management',
    icon: Archive,
  },
];

const activitiesItems = [
  { path: '/Admin/NotificationPage', name: 'Activity Log', icon: Activity },
  { path: '/Admin/Notifs', name: 'Notifications', icon: Bell },
];

function Sidebar() {
  const location = useLocation();
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(true);
  const {data: hasLowStock = false} = useLowStockCheck();

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center p-2 font-normal rounded-lg ${
      isActive ? 'bg-secondary text-black' : 'text-white hover:bg-secondary/50'
    } group cursor-pointer`;
  };

  const getIconColor = (path) =>
    location.pathname === path ? 'black' : 'white';

  return (
    <div className="h-screen w-[280px] flex-shrink-0 border-r-2 border-[#122661] bg-[#121b2c] px-2">
      {/* Logo Section */}
      <div className="flex items-center p-3">
        <img
          src={DBlogo}
          alt="Alas Delis and Spices Logo"
          className="object-contain h-10"
        />
      </div>

      {/* Navigation Starts here */}
      <nav className="px-2">
        <ul className="flex flex-col gap-2">
          {/* Admin Dashboard */}
          <li>
            <Link to="/Admin/DashBoard">
              <div className={getNavItemClass('/Admin/DashBoard')}>
                <LayoutDashboard
                  className="mx-2"
                  color={getIconColor('/Admin/DashBoard')}
                />
                <span className="flex-1 ml-2 text-left whitespace-nowrap">
                  Dashboard
                </span>
              </div>
            </Link>
          </li>

          {/* Walk In Ordering */}
          <li>
            <Link to="/Admin/WalkInOrdering">
              <div className={getNavItemClass('/Admin/WalkInOrdering')}>
                <ShoppingCart
                  className="mx-2"
                  color={getIconColor('/Admin/WalkInOrdering')}
                />
                <span className="flex-1 ml-2 text-left whitespace-nowrap">
                  Walk In Ordering
                </span>
              </div>
            </Link>
          </li>

          {/* Management Group */}
          <li>
            <button
              type="button"
              className="flex items-center w-full p-3 font-normal text-white rounded-lg hover:bg-secondary/50 group"
              onClick={() => setIsManagementOpen(!isManagementOpen)}
            >
              <Layers className="mx-2 text-white size-5" />
              <span className="flex-1 ml-2 text-left whitespace-nowrap">
                Management
              </span>
              <ChevronDown
                className={`size-5 transition-transform ${isManagementOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`overflow-hidden ${isManagementOpen ? '' : 'hidden'}`}
            >
              <ul className="pl-4 space-y-2">
                {managementItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>
                      <div className={getNavItemClass(item.path)}>
                        <item.icon
                          className="mx-2 size-5"
                          color={getIconColor(item.path)}
                        />
                        <span className="flex-1 ml-2 text-left whitespace-nowrap">
                          {item.name}
                        </span>
                         {item.path === '/Admin/InventoryManagement' && hasLowStock && (
                          <AlertTriangle className="w-10 h-10 ml-2 text-yellow-500" />
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Sales Summary */}
          <li>
            <Link to="/Admin/SalesPage">
              <div className={getNavItemClass('/Admin/SalesPage')}>
                <CreditCard
                  className="mx-2"
                  color={getIconColor('/Admin/SalesPage')}
                />
                <span className="flex-1 ml-2 text-left whitespace-nowrap">
                  Sales Summary
                </span>
              </div>
            </Link>
          </li>

          {/* Activities Group */}
          <li>
            <button
              type="button"
              className="hover:bg-secondary/50 group flex w-full items-center rounded-lg p-1.5 font-normal text-white"
              onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
            >
              <Layers className="mx-2 text-white" />
              <span className="flex-1 ml-2 text-left whitespace-nowrap">
                Activities
              </span>
              <ChevronDown
                className={`transition-transform ${isActivitiesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`overflow-hidden ${isActivitiesOpen ? '' : 'hidden'}`}
            >
              <ul className="py-1 pl-4 space-y-1">
                {activitiesItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>
                      <div className={getNavItemClass(item.path)}>
                        <item.icon
                          className="mx-2"
                          color={getIconColor(item.path)}
                        />
                        <span className="flex-1 ml-2 text-left whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Logout Button */}
          <li>
            <button
              type="button"
              className="hover:bg-primary group flex w-full cursor-pointer items-center rounded-lg p-1.5 font-normal text-white"
              onClick={handleLogout}
            >
              <LogOut className="mx-2" />
              <span className="flex-1 ml-2 text-left whitespace-nowrap">
                Logout
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
