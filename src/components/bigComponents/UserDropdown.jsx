import { LuUserPen, LuShoppingBag } from 'react-icons/lu';
import { MdOutlineNotificationsActive, MdOutlineLogout } from 'react-icons/md';
import { CircleUser, LucidePersonStanding } from 'lucide-react';
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
        <button className="hover:bg-brand/25 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100 transition-colors">
          <CircleUser className="text-brand" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <div className="border-b px-4 py-3">
          <p className="text-content text-sm font-medium">{user?.username}</p>
          <p className="text-lighter truncate text-sm">{user?.email}</p>
        </div>

        <DropdownMenuItem onClick={() => navigate('/UserSettings')} className="text-content flex items-center">
          <LuUserPen className="mr-2" /> User Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate('/UserOrderPage', { state: { tab: 'orderList' } })}
          className="text-content flex items-center"
        >
          <LuShoppingBag className="mr-2" /> Order List
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate('/UserOrderPage', { state: { tab: 'notif' } })}
          className="text-content flex items-center"
        >
          <MdOutlineNotificationsActive className="mr-2" /> Notification
        </DropdownMenuItem>

        <div className="border-t">
          <DropdownMenuItem onClick={handleLogout} className="text-brand flex items-center">
            <MdOutlineLogout className="mr-2" /> Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
