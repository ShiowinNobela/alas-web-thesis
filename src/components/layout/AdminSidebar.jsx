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
} from 'lucide-react';
import { toast } from 'sonner';

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
];

function Sidebar() {
  const location = useLocation();

  const onLogout = async () => {
    toast.info('Logged out successfully');
    await handleLogout();
  };

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center p-2 rounded-lg text-sm ${
      isActive ? 'text-primary hover:bg-gray-700' : 'text-white hover:bg-gray-700'
    } group cursor-pointer`;
  };

  return (
    <div className="border-lighter flex h-screen w-[250px] flex-col justify-between border-r bg-gray-900">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center p-3">
          <img
            src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
            alt="Alas Delis and Spices Logo"
            className="h-10 object-contain"
          />
          <h1 className="font-heading ml-4 text-2xl font-bold text-white">Alas Admin</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex flex-col gap-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <div className={getNavItemClass(item.path)}>
                    <item.icon className="mx-2 size-5" />
                    <span className="ml-2 flex-1 text-left text-sm whitespace-nowrap">{item.name}</span>
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
          className="hover:bg-primary group flex w-full cursor-pointer items-center rounded-lg p-2 font-normal text-white"
          onClick={onLogout}
        >
          <LogOut className="mx-2 size-5" />
          <span className="ml-2 flex-1 text-left text-sm whitespace-nowrap">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
