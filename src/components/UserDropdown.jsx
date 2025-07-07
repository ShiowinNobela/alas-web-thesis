import { useState, useRef, useEffect } from "react";
import { LuUserPen, LuShoppingBag } from "react-icons/lu";
import { MdOutlineNotificationsActive, MdOutlineLogout } from "react-icons/md";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

export default function UserDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Circle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-primary/20 transition-colors border border-gray-300 cursor-pointer"
      >
        <PersonOutlineIcon className="text-black" fontSize="medium" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 z-50"
          >
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium text-gray-900">
                {user?.username}
              </p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>

            <ul className="py-1 text-sm text-gray-700">
              <li>
                <button
                  onClick={() => {
                    navigate("/UserSettings");
                    setOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                >
                  <LuUserPen className="mr-2" /> User Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/UserOrderPage", { state: { tab: "orderList" } });
                    setOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                >
                  <LuShoppingBag className="mr-2" /> Order List
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/UserOrderPage", { state: { tab: "notif" } });
                    setOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                >
                  <MdOutlineNotificationsActive className="mr-2" /> Notification
                </button>
              </li>
            </ul>

            <div className="border-t">
              <button
                onClick={() => {
                  window.localStorage.removeItem("user");
                  window.location.href = "/LoginPage";
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <MdOutlineLogout className="mr-2" /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

UserDropdown.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};
