import { Link, useLocation } from 'react-router-dom';
import { handleLogout } from '@/utils/logout';
import DBlogo from '@/components/images/logo-alas1.jpg';
import { IoIosLogOut, IoIosNotifications } from 'react-icons/io';
import { FaBox } from 'react-icons/fa';
import {
  AiFillProduct,
  AiOutlineUser,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { MdOutlinePointOfSale } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const menuItems = [
  {
    path: '/Admin/DashBoard',
    name: 'Dashboard',
    icon: LuLayoutDashboard,
  },
  {
    path: '/Admin/WalkInOrdering',
    name: 'Walk In Ordering',
    icon: ShoppingBasketIcon,
  },
  {
    path: '/Admin/AccountManagement',
    name: 'User Management',
    icon: AiOutlineUser,
  },
  {
    path: '/Admin/Orders',
    name: 'Orders Management',
    icon: FaBox,
    iconSize: { width: 25, height: 25 },
    iconClass: 'ml-4',
  },
  {
    path: '/Admin/ProductManagement',
    name: 'Product Management',
    icon: AiOutlineUnorderedList,
  },
  {
    path: '/Admin/InventoryManagement',
    name: 'Inventory Management',
    icon: AiFillProduct,
  },
  {
    path: '/Admin/SalesPage',
    name: 'Sales Summary',
    icon: MdOutlinePointOfSale,
  },
  {
    path: '/Admin/NotificationPage',
    name: 'Notification',
    icon: IoIosNotifications,
  },
];

function Sidebar() {
  const location = useLocation();

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center p-2 pb-4 pt-4 text-base font-normal rounded-lg ${
      isActive ? 'bg-secondary text-black' : 'text-white hover:bg-secondary/50'
    } group cursor-pointer`;
  };

  const getIconClass = (path) =>
    `${location.pathname === path ? 'text-black' : 'text-white'} mx-3 h-[30px] w-[30px]`;

  return (
    <div className="h-screen w-[300px] flex-shrink-0 border-r-2 border-[#122661] bg-[#121b2c]">
      {/* Logo Section */}
      <div className="flex items-center p-4">
        <img
          src={DBlogo}
          alt="Alas Delis and Spices Logo"
          className="h-12 object-contain"
        />
      </div>

      {/* Menu Items */}
      <nav className="px-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <Link to={item.path} key={item.path}>
              <li className={getNavItemClass(item.path)}>
                <item.icon
                  className={`${getIconClass(item.path)} ${item.iconClass || ''}`}
                  style={{
                    width: item.iconSize?.width || 30,
                    height: item.iconSize?.height || 30,
                  }}
                />
                <span className="ml-3 flex-1 text-left whitespace-nowrap">
                  {item.name}
                </span>
              </li>
            </Link>
          ))}

          {/* Logout Button */}
          <li
            className="hover:bg-primary group flex cursor-pointer items-center rounded-lg p-2 pt-4 pb-4 text-base font-normal text-white"
            onClick={handleLogout}
          >
            <IoIosLogOut className="mx-3 h-[30px] w-[30px]" />
            <span className="ml-3 flex-1 text-left whitespace-nowrap">
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
