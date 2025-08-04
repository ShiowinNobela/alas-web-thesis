import {
  Bell,
  Settings,
  User,
  Clock,
  Database,
  HelpCircle,
} from 'lucide-react';
import useUserStore from '@/stores/userStore';
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from 'flowbite-react';
import { HiUser, HiBell, HiCog, HiLogout } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { handleLogout } from '@/utils/logout';

// Not sure yet what to actually put here
function AdminNavbar() {
  const user = useUserStore((state) => state.user);
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <nav className="bg-background flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-foreground text-lg font-semibold">
          Welcome to Admin Dashboard
        </h1>
      </div>

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
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{currentTime}</span>
          </div>
        </div>

        {/* <Dropdown
          label={
            <div className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </div>
          }
          inline
        >
          <DropdownHeader>
            <span className="block text-sm font-medium">Quick Actions</span>
          </DropdownHeader>
          <DropdownItem icon={HiUser}>Add User</DropdownItem>
          <DropdownItem icon={HiCog}>Create Project</DropdownItem>
          <DropdownItem icon={HiBell}>Send Notification</DropdownItem>
        </Dropdown> */}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" title="Help & Support">
          <HelpCircle className="h-4 w-4" />
        </Button>

        <Dropdown
          label={<Bell className="h-4 w-4" />}
          inline
          placement="bottom-end"
        >
          <DropdownHeader className="flex items-center justify-between">
            <span className="text-sm font-medium">Notifications</span>
          </DropdownHeader>
          <DropdownItem>
            <div>
              <p className="text-sm font-medium">New user registered</p>
              <p className="text-xs text-gray-500">john.doe@example.com</p>
              <p className="mt-1 text-xs text-gray-400">2 minutes ago</p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div>
              <p className="text-sm font-medium">Server maintenance</p>
              <p className="text-xs text-gray-500">2:00 AM - 4:00 AM</p>
              <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
            </div>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem>
            <div className="text-center text-sm text-gray-500">View all</div>
          </DropdownItem>
        </Dropdown>

        <Button variant="ghost" size="sm" title="Settings">
          <Settings className="h-4 w-4" />
        </Button>

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
            <span className="block text-sm font-medium">{user.username}</span>
            <span className="block truncate text-sm text-gray-500">
              {user.email}
            </span>
          </DropdownHeader>
          <DropdownItem icon={HiUser}>Profile</DropdownItem>
          <DropdownItem icon={HiCog}>Account Settings</DropdownItem>
          <DropdownItem icon={HiBell}>Personal Notifications</DropdownItem>
          <DropdownDivider />
          <DropdownItem
            icon={HiLogout}
            onClick={handleLogout}
            className="text-red-600"
          >
            Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </nav>
  );
}

export default AdminNavbar;
