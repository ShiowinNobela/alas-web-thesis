import { Link, useLocation } from 'react-router-dom';
import { handleLogout } from '@/utils/logout';
import DBlogo from '@/components/images/logo-alas1.jpg';
import { IoIosLogOut, IoIosNotifications } from 'react-icons/io';
import { FaBox } from 'react-icons/fa';
import {
  AiFillProduct,
  AiOutlineUser,
  AiOutlineUnorderedList,
  AiOutlineAppstore
} from 'react-icons/ai';
import { MdOutlinePointOfSale } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { SiLogstash } from 'react-icons/si';
import { useState } from 'react';
// Import Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

const managementItems = [
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
  },
  {
    path: '/Admin/WalkInOrdersTable',
    name: 'Walk In Orders',
    icon: FaBox,
    iconSize: { width: 25, height: 25 },
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
];

const activitiesItems = [
  {
    path: '/Admin/NotificationPage',
    name: 'Activity Log',
    icon: SiLogstash,
  },
  {
    path: '/Admin/Notifs',
    name: 'Notifications',
    icon: IoIosNotifications,
  },
];

// Animation variants
const sidebarVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12
    }
  }
};

const dropdownVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
      when: "afterChildren"
    }
  }
};

function Sidebar() {
  const location = useLocation();
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(true);

  const getNavItemClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center p-2 py-2 text-base font-normal rounded-lg ${
      isActive ? 'bg-secondary text-black' : 'text-white hover:bg-secondary/50'
    } group cursor-pointer`;
  };

  const getIconClass = (path) =>
    `${location.pathname === path ? 'text-black' : 'text-white'} mx-3 h-[30px] w-[30px]`;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="h-screen w-[300px] flex-shrink-0 border-r-2 border-[#122661] bg-[#121b2c]"
    >
      {/* Logo Section */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center p-4"
      >
        <img
          src={DBlogo}
          alt="Alas Delis and Spices Logo"
          className="object-contain h-12"
        />
      </motion.div>

      {/* Menu Items */}
      <nav className="px-2">
        <motion.ul 
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          className="flex flex-col gap-2"
        >
          {/* Dashboard */}
          <motion.li variants={itemVariants}>
            <Link to="/Admin/DashBoard">
              <div className={getNavItemClass('/Admin/DashBoard')}>
                <LuLayoutDashboard className={getIconClass('/Admin/DashBoard')} />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Dashboard
                </span>
              </div>
            </Link>
          </motion.li>

          {/* Walk In Ordering */}
          <motion.li variants={itemVariants}>
            <Link to="/Admin/WalkInOrdering">
              <div className={getNavItemClass('/Admin/WalkInOrdering')}>
                <ShoppingBasketIcon className={getIconClass('/Admin/WalkInOrdering')} />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Walk In Ordering
                </span>
              </div>
            </Link>
          </motion.li>

          {/* Management Group */}
          <motion.li variants={itemVariants}>
            <button
              type="button"
              className="flex items-center w-full p-2 text-base font-normal text-white rounded-lg hover:bg-secondary/50 group"
              onClick={() => setIsManagementOpen(!isManagementOpen)}
            >
              <AiOutlineAppstore className="mx-3 h-[30px] w-[30px] text-white" />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">Management</span>
              <motion.svg
                animate={{ rotate: isManagementOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </motion.svg>
            </button>
            
            <motion.div
              variants={dropdownVariants}
              initial={false}
              animate={isManagementOpen ? "open" : "closed"}
              className="overflow-hidden"
            >
              <ul className="py-2 space-y-2">
                {managementItems.map((item) => (
                  <motion.li 
                    key={item.path}
                    variants={itemVariants}
                  >
                    <Link to={item.path}>
                      <div className={getNavItemClass(item.path)}>
                        <item.icon
                          className={getIconClass(item.path)}
                          style={{
                            width: item.iconSize?.width || 30,
                            height: item.iconSize?.height || 30,
                          }}
                        />
                        <span className="flex-1 p-2 ml-3 text-left whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.li>

          {/* Sales Summary */}
          <motion.li variants={itemVariants}>
            <Link to="/Admin/SalesPage">
              <div className={getNavItemClass('/Admin/SalesPage')}>
                <MdOutlinePointOfSale className={getIconClass('/Admin/SalesPage')} />
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Sales Summary
                </span>
              </div>
            </Link>
          </motion.li>

          {/* Activities Group */}
          <motion.li variants={itemVariants}>
            <button
              type="button"
              className="flex items-center w-full p-2 text-base font-normal text-white rounded-lg hover:bg-secondary/50 group"
              onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
            >
              <SiLogstash className="mx-3 h-[30px] w-[30px] text-white" />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">Activities</span>
              <motion.svg
                animate={{ rotate: isActivitiesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </motion.svg>
            </button>
            
            <motion.div
              variants={dropdownVariants}
              initial={false}
              animate={isActivitiesOpen ? "open" : "closed"}
              className="overflow-hidden"
            >
              <ul className="py-2 space-y-2">
                {activitiesItems.map((item) => (
                  <motion.li 
                    key={item.path}
                    variants={itemVariants}
                  >
                    <Link to={item.path}>
                      <div className={getNavItemClass(item.path)}>
                        <item.icon className={getIconClass(item.path)} />
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.li>

          {/* Logout Button */}
          <motion.li 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center p-2 text-base font-normal text-white rounded-lg cursor-pointer hover:bg-primary group"
            onClick={handleLogout}
          >
            <IoIosLogOut className="mx-3 h-[30px] w-[30px]" />
            <span className="flex-1 ml-3 text-left whitespace-nowrap">
              Logout
            </span>
          </motion.li>
        </motion.ul>
      </nav>
    </motion.div>
  );
}

export default Sidebar;
