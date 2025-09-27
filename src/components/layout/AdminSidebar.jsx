import { Link, useLocation } from 'react-router-dom';
import { handleLogout } from '@/utils/logout';
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
} from 'lucide-react';
import { toast } from 'sonner';

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

  const onLogout = async () => {
    toast.info('Logged out successfully');
    await handleLogout();
  };

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center p-2 font-normal rounded-lg text-sm ${
      isActive ? 'bg-secondary text-black' : 'text-white hover:bg-secondary/50'
    } group cursor-pointer`;
  };

  const getIconColor = (path) => (location.pathname === path ? 'black' : 'white');

  return (
    <div className="h-screen w-[250px] flex-shrink-0 border-r-2 border-[#122661] bg-[#121b2c] px-2">
      {/* Logo Section */}
      <div className="flex items-center p-3">
        <img
          src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
          alt="Alas Delis and Spices Logo"
          className="h-10 object-contain"
        />
      </div>

      {/* Navigation Starts here */}
      <nav className="px-2">
        <ul className="flex flex-col gap-2">
          {/* Admin Dashboard */}
          <li>
            <Link to="/Admin/DashBoard">
              <div className={getNavItemClass('/Admin/DashBoard')}>
                <LayoutDashboard className="mx-2" color={getIconColor('/Admin/DashBoard')} />
                <span className="ml-2 flex-1 text-left whitespace-nowrap">Dashboard</span>
              </div>
            </Link>
          </li>

          {/* Walk In Ordering */}
          <li>
            <Link to="/Admin/WalkInOrdering">
              <div className={getNavItemClass('/Admin/WalkInOrdering')}>
                <ShoppingCart className="mx-2" color={getIconColor('/Admin/WalkInOrdering')} />
                <span className="ml-2 flex-1 text-left whitespace-nowrap">Walk In Ordering</span>
              </div>
            </Link>
          </li>

          {/* Management Group */}
          <li>
            <button
              type="button"
              className="hover:bg-secondary/50 group flex w-full items-center rounded-lg p-3 font-normal text-white"
              onClick={() => setIsManagementOpen(!isManagementOpen)}
            >
              <Layers className="mx-2 size-5 text-white" />
              <span className="ml-2 flex-1 text-left whitespace-nowrap">Management</span>
              <ChevronDown className={`size-5 transition-transform ${isManagementOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`overflow-hidden ${isManagementOpen ? '' : 'hidden'}`}>
              <ul className="space-y-2 pl-4">
                {managementItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>
                      <div className={getNavItemClass(item.path)}>
                        <item.icon className="mx-2 size-5" color={getIconColor(item.path)} />
                        <span className="ml-2 flex-1 text-left whitespace-nowrap">{item.name}</span>
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
                <CreditCard className="mx-2" color={getIconColor('/Admin/SalesPage')} />
                <span className="ml-2 flex-1 text-left whitespace-nowrap">Sales Summary</span>
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
              <span className="ml-2 flex-1 text-left whitespace-nowrap">Activities</span>
              <ChevronDown className={`transition-transform ${isActivitiesOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`overflow-hidden ${isActivitiesOpen ? '' : 'hidden'}`}>
              <ul className="space-y-1 py-1 pl-4">
                {activitiesItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>
                      <div className={getNavItemClass(item.path)}>
                        <item.icon className="mx-2" color={getIconColor(item.path)} />
                        <span className="ml-2 flex-1 text-left whitespace-nowrap">{item.name}</span>
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
              onClick={onLogout}
            >
              <LogOut className="mx-2" />
              <span className="ml-2 flex-1 text-left whitespace-nowrap">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
