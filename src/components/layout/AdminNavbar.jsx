import { Bell, Settings, User, Database, HelpCircle, LogOut } from 'lucide-react';
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
    <nav className="bg-card border-content flex h-14 items-center justify-between border-b px-4">
      {/* Page title */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">{currentPageName}</h1>
      </div>

      {/* Middle: status */}
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground hidden items-center gap-3 text-sm md:flex">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center gap-1">
            <Database className="h-3 w-3" />
            <span>DB: 45ms</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button variant="ghost" size="sm" title="Help & Support">
          <HelpCircle className="h-4 w-4" />
        </Button>

        {/* Notifications */}
        <Dropdown label={<Bell className="h-4 w-4" />} inline placement="bottom-end">
          <DropdownHeader className="flex items-center justify-between">
            <span className="text-sm font-medium">Notifications</span>
          </DropdownHeader>
          <DropdownItem>
            <div>
              <p className="text-sm font-medium">New user registered</p>
              <p className="text-lighter text-xs">john.doe@example.com</p>
              <p className="text-lighter mt-1 text-xs">2 minutes ago</p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div>
              <p className="text-sm font-medium">Server maintenance</p>
              <p className="text-lighter text-xs">2:00 AM - 4:00 AM</p>
              <p className="text-lighter mt-1 text-xs">1 hour ago</p>
            </div>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem>
            <div className="text-lighter text-center text-sm">View all</div>
          </DropdownItem>
        </Dropdown>

        <Button variant="ghost" size="sm" title="Settings">
          <Settings className="h-4 w-4" />
        </Button>

        {/* User dropdown */}
        <Dropdown
          label={
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
              <User className="h-4 w-4" />
            </div>
          }
          inline
          placement="bottom-end"
        >
          <DropdownHeader>
            <span className="block text-sm font-medium">{user?.username || 'Guest'}</span>
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
