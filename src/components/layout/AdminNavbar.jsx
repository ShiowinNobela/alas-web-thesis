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
    const routeSegment = path.replace(/^\/Admin\//, '').split('/')[0];

    // map paths to display names
    const pageNames = {
      DashBoard: 'Dashboard',
      AddProduct: 'Add Product',
      EditProduct: 'Edit Product',
      ProductManagement: 'Product Management',
      AccountManagement: 'Account Management',
      Orders: 'Orders',
      AdminOrderDetails: 'Order Details',
      PopUpInfoPage: 'Info Page',
      ViewOrder: 'View Order',
      InventoryManagement: 'Inventory',
      WalkInOrdersTable: 'Walk-in Orders',
      WalkInOrdering: 'Walk-in Ordering',
      SalesPage: 'Sales',
      NotificationPage: 'Notifications',
    };

    return pageNames[routeSegment] || routeSegment || 'Admin';
  };

  const currentPageName = getCurrentPageName();

  return (
    <nav className="bg-card border-content flex items-center justify-between border-b p-4">
      {/* Page title */}
      <div className="flex items-center gap-4">
        <h1 className="font-heading text-xl font-semibold">{currentPageName}</h1>
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
