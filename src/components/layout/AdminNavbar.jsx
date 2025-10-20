import { Bell, User, HelpCircle, LogOut } from 'lucide-react';
import useUserStore from '@/stores/userStore';
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-react';
import { Button } from '@/components/ui/button';
import { handleLogout } from '@/utils/logout';
import { useLocation } from 'react-router-dom';
import ThemeToggle from '../filters/ThemeToggle';

function AdminNavbar() {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  const getCurrentPageName = () => {
    const path = location.pathname;
    const routeSegment = path.replace(/^\/admin\//, '').split('/')[0];

    // map paths to display names
    const pageNames = {
      dashboard: 'Dashboard',
      'add-product': 'Add Product',
      'edit-product': 'Edit Product',
      products: 'Product Management',
      'account-management': 'Account Management',
      logs: 'Admin Activity Logs',
      notifs: 'Notifications',
      sales: 'Sales',
      order: 'Orders',
      inventory: 'Inventory',
      'walk-in-orders': 'Walk-in Orders',
      'create-walk-in': 'Walk-in Ordering',
      'promotion/management': 'Promotion Management',
    };

    if (routeSegment === 'edit-product' || routeSegment === 'order') {
      return pageNames[routeSegment] + ' Details';
    }

    return pageNames[routeSegment] || routeSegment || 'Admin';
  };

  const currentPageName = getCurrentPageName();

  return (
    <nav className="bg-card border-content flex items-center justify-between border-b p-4">
      {/* Page title */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">{currentPageName}</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button variant="ghost" size="sm" title="Help & Support">
          <HelpCircle className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" title="Help & Support">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User dropdown */}
        <Dropdown
          label={
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                <User className="h-4 w-4" />
              </div>
              <span className="text-content ml-2 text-sm font-medium">{user.username}</span>
            </>
          }
          inline
          placement="bottom-end"
        >
          <DropdownHeader>
            <span className="text-lighter block truncate text-sm">{user?.email || 'Not signed in'}</span>
          </DropdownHeader>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Account Settings</DropdownItem>
          <DropdownItem>Personal Notifications</DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={LogOut} onClick={handleLogout} className="text-red-600">
            Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </nav>
  );
}

export default AdminNavbar;
