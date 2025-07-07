import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { LuUserPen, LuShoppingBag } from "react-icons/lu";
import { MdOutlineNotificationsActive, MdOutlineLogout } from "react-icons/md";

function UserSideBar({ setActiveSwitch }) {
  const navigate = useNavigate();
  const [getInfo, setGetInfo] = useState({
    username: "",
    email: "",
    contact_number: "",
    address: "",
  });

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (!user || !user.token) return;

    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setGetInfo(res.data))
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  return (
    <Sidebar aria-label="User Sidebar" className="h-full w-full">
      <SidebarItems>
        <div className="flex flex-col items-center text-center py-4 border-b border-gray-200">
          <div className="mt-2 text-base font-semibold text-gray-900">
            {getInfo?.username}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {getInfo?.email}
          </div>
        </div>

        <SidebarItemGroup>
          <SidebarItem
            href="#"
            icon={LuUserPen}
            onClick={() => navigate("/UserSettings")}
          >
            User Settings
          </SidebarItem>

          <SidebarItem
            href="#"
            icon={LuShoppingBag}
            onClick={() => {
              navigate("/UserOrderPage");
              setActiveSwitch("orderList");
            }}
          >
            Order List
          </SidebarItem>

          <SidebarItem
            href="#"
            icon={MdOutlineNotificationsActive}
            onClick={() => {
              navigate("/UserOrderPage", { state: { tab: "notif" } });
              setActiveSwitch("notif");
            }}
          >
            Notification
          </SidebarItem>
        </SidebarItemGroup>

        <SidebarItemGroup>
          <SidebarItem
            href="#"
            icon={MdOutlineLogout}
            onClick={() => {
              window.localStorage.removeItem("user");
              window.location.href = "/LoginPage";
            }}
          >
            Logout
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default UserSideBar;
