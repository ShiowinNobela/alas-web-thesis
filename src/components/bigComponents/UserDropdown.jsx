import { LuUserPen, LuShoppingBag } from 'react-icons/lu';
import { MdOutlineNotificationsActive, MdOutlineLogout } from 'react-icons/md';
import { LucidePersonStanding } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useUserStore from '@/stores/userStore';
import { handleLogout } from '@/utils/logout';

export default function UserDropdown() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-200 transition-colors">
          <LucidePersonStanding />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-medium text-gray-900">{user?.username}</p>
          <p className="truncate text-sm text-gray-500">{user?.email}</p>
        </div>

        <DropdownMenuItem onClick={() => navigate('/UserSettings')} className="flex items-center">
          <LuUserPen className="mr-2" /> User Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate('/UserOrderPage', { state: { tab: 'orderList' } })}
          className="flex items-center"
        >
          <LuShoppingBag className="mr-2" /> Order List
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate('/UserOrderPage', { state: { tab: 'notif' } })}
          className="flex items-center"
        >
          <MdOutlineNotificationsActive className="mr-2" /> Notification
        </DropdownMenuItem>

        <div className="border-t">
          <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
            <MdOutlineLogout className="mr-2" /> Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
