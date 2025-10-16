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
  MessageSquareOff,
} from 'lucide-react';
import { toast } from 'sonner';
import usePermissionsStore from '@/stores/permissionStore';
import useUserStore from '@/stores/userStore';
import path from 'path';

const sidebarItems = [
  { path: '/Admin/DashBoard', name: 'Dashboard', icon: LayoutDashboard, permission: null, role: ['admin', 'staff'] },
  {
    path: '/Admin/WalkInOrdering',
    name: 'Walk In Ordering',
    icon: ShoppingCart,
    permission: 'create_walkin',
    role: ['staff', 'admin'],
  },
  {
    path: '/Admin/AccountManagement',
    name: 'User Management',
    icon: User,
    permission: 'manage_users',
    role: ['admin'],
  },
  {
    path: '/Admin/Orders',
    name: 'Orders Management',
    icon: Package,
    permission: 'manage_orders',
    role: ['staff', 'admin'],
  },
  {
    path: '/Admin/WalkInOrdersTable',
    name: 'Walk In Orders',
    icon: Clipboard,
    permission: 'view_walkin',
    role: ['staff', 'admin'],
  },
  {
    path: '/Admin/ProductManagement',
    name: 'Product Management',
    icon: Box,
    permission: 'manage_products',
    role: ['admin'],
  },
  {
    path: '/Admin/InventoryManagement',
    name: 'Inventory Management',
    icon: Archive,
    permission: 'view_inventory',
    role: ['staff', 'admin'],
  },
  {
    path: '/Admin/SalesPage',
    name: 'Sales Summary',
    icon: CreditCard,
    permission: 'view_sales',
    role: ['staff', 'admin'],
  },
  {
    path: '/Admin/NotificationPage',
    name: 'Activity Log',
    icon: Activity,
    permission: 'view_activity',
    role: ['admin'],
  },
  { path: '/Admin/Notifs', name: 'Notifications', icon: Bell, permission: 'view_notifications', role: ['admin'] },
  {
    path: '/Admin/promotion/management',
    name: 'Promotion Management',
    icon: Ticket,
    permission: 'manage_promotions',
    role: ['staff', 'admin'],
  },
  {
    path:'/Admin/ModerationPage',
    name:'Moderation Page',
    icon: MessageSquareOff,
    permission: 'manage_review',
    role: ['admin'],
  }
];

function Sidebar() {
  const location = useLocation();
  const permissions = usePermissionsStore((state) => state.permissions);
  const userRole = useUserStore((state) => state.user.role_name);

  const visibleItems = sidebarItems.filter((item) => {
    if (!item.permission) return item.role.includes(userRole);

    // admins see everything
    if (userRole === 'admin') return true;

    // staff see only items they have permission for
    return permissions.includes(item.permission) && item.role.includes(userRole);
  });

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
            {visibleItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <div className={getNavItemClass(item.path)}>
                    <item.icon className="mx-2 size-5" />
                    <span className="flex-1 ml-2 text-sm text-left whitespace-nowrap">{item.name}</span>
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
