import { Link, useLocation } from 'react-router-dom';
import { CircleUser, UserPen, ShoppingBag, Bell, MessageSquare, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUserStore from '@/stores/userStore';
import { handleLogout } from '@/utils/logout';
import { toast } from 'sonner';

export default function UserDropdown() {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  const onLogout = async () => {
    toast.info('Logged out successfully');
    await handleLogout();
  };

  const isActive = (path) => (location.pathname === path ? 'text-primary bg-primary/5' : 'text-content');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-brand/20 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100 transition-colors">
          <CircleUser className="text-brand" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {/* User Info */}
        <div className="border-b px-4 py-2">
          <p className="text-content font-heading tracking-wide">{user?.username}</p>
          <p className="text-lighter truncate text-sm">{user?.email}</p>
        </div>

        {/* Navigation Links */}
        <DropdownMenuItem asChild>
          <Link to="/user/profile" className={`${isActive('/user/profile')} flex items-center`}>
            <UserPen className="mr-2 h-4 w-4" /> User Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to="/user/orders"
            state={{ tab: 'orderList' }}
            className={`${isActive('/user/orders')} flex items-center`}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Order List
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/user/orders" state={{ tab: 'notif' }} className={`${isActive('/user/orders')} flex items-center`}>
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/users/reviews" className={`${isActive('/users/reviews')} flex items-center`}>
            <MessageSquare className="mr-2 h-4 w-4" /> Reviews
          </Link>
        </DropdownMenuItem>

        {/* Logout */}
        <div className="border-t">
          <DropdownMenuItem onClick={onLogout} className="text-brand flex items-center">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
