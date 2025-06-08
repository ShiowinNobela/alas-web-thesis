import { LuUserPen } from "react-icons/lu";
import { LuShoppingBag } from "react-icons/lu";
import { RiArchiveStackLine } from "react-icons/ri";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserSideBar({ setActiveSwitch }) {
  //NEW USER SIDEBAR

  const navigate = useNavigate();
  const [getInfo, setGetInfo] = useState({
    username: "",
    email: "",
    contact_number: "",
    address: "",
  });

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setGetInfo(response.data);
        console.log("User data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="h-screen w-10% bg-gradient-to-b from-[#e8e6c2] to-[#eaeae7] flex justify-center items-center px-4 pt-16">
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-20 left-0 z-40 w-64 h-[calc(100vh-5rem)] transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-screen w-10% px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            {/* Sidebar content */}
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white text-xl font-semibold"
              >
                <span class="ms-3">Hi there, {getInfo?.username}</span>
              </a>
            </li>

            {/* User settings ) */}
            <button
              onClick={() => navigate("/UserSettings")}
              type="button"
              class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <LuUserPen className="h-6 w-8" />
              <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                User Settings
              </span>
            </button>
            <li
              onClick={() => {
                navigate("/UserOrderPage");
                setActiveSwitch("orderList");
              }}
            >
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="h-8 w-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <LuShoppingBag />
                </svg>
                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Order List
                </span>
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="h-8 w-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <RiArchiveStackLine />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Order Archive</span>
              </a>
            </li> */}
            <li
              onClick={() => {
                navigate("/UserOrderPage", { state: { tab: "notif" } });
                setActiveSwitch("notif");
              }}
            >
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="h-8 w-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <MdOutlineNotificationsActive />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Notification</span>
              </a>
            </li>
          </ul>

          {/* Logout */}
          <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li
              onClick={() => {
                window.localStorage.removeItem("user");
                window.location.href = "/LoginPage";
              }}
            >
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  class="h-8 w-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 17 20"
                >
                  <MdOutlineLogout />
                </svg>
                <span class="ms-3">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default UserSideBar;
