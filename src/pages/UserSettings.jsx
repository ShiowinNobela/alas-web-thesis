import { LuUserPen } from "react-icons/lu";
import { LuShoppingBag } from "react-icons/lu";
import { RiArchiveStackLine } from "react-icons/ri";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import UserSideBar from "./UserSideBar";

function UserSettings() {
  return (
    <div className="min-h-screen ml-50 bg-gradient-to-b from-[#e8e6c2] to-[#eaeae7] flex justify-center items-center px-4 pt-15">
      <UserSideBar />
        {/* User Information */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-[#8d8987] text-[#ffffff] p-8 rounded-3xl shadow-md flex flex-col">
              <p className="text-3xl lg:text-4xl font-bold mb-8 uppercase">User Info</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
              <p className="mb-2 text-[#ffffff]">Username</p>
                <input
                  type="text"
                  id="name"
                  className="h-12 px-4 rounded-md text-[#000000]"
                />
              </div>

              <div className="flex flex-col">
              <p className="mb-2 text-[#ffffff]">Email</p>
              <input
                type="email"
                id="email"
                className="h-12 px-4 rounded-md text-[#000000]"
              />
              </div>
            </div>

            <div className="flex flex-col mt-6">
              <p className="mb-2 text-[#ffffff]">Contact Number</p>
              <input
              type="text"
              id="subject"
              className="h-12 px-4 rounded-md text-[#000000]"
              />
            </div>

            <div className="flex flex-col mt-6">
              <p className="mb-2 text-[#ffffff]">Address</p>
              <textarea
              id="message"
              rows={4}
              className="px-4 py-3 rounded-md text-[#000000] resize-none"
              />
            </div>

              <button className="mt-8 h-12 w-full bg-[#ffffff] border-1 border-[#5b5b58] text-[#000000] uppercase font-semibold rounded-md hover:bg-[#6c6c6a] hover:text-[#ffffff] transition">
            Save Info
              </button>
            </div>

        {/* User Password */}
          <div className="flex-1 bg-[#8d8987] text-[#ffffff] p-8 rounded-3xl shadow-md flex flex-col">
            <p className="text-3xl lg:text-4xl font-bold mb-8 uppercase">User Password</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <p className="mb-2 text-[#ffffff]">Current Password</p>
                <input
                type="password"
                id="currentPassword"
                className="h-12 px-4 rounded-md text-[#000000]"
                />
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-[#ffffff]">New Password</p>
                <input
                type="password"
                id="newPassword"
                className="h-12 px-4 rounded-md text-[#000000]"
                />
              </div>
            </div>

              <div className="flex flex-col mt-6">
                <p className="mb-2 text-[#ffffff]">Confirm New Password</p>
                <input
              type="password"
              id="confirmPassword"
              className="h-12 px-4 rounded-md text-[#000000]"
                />
              </div>

              <button className="mt-8 h-12 w-full bg-[#ffffff] border-1 border-[#5b5b58] text-[#000000] uppercase font-semibold rounded-md hover:bg-[#6c6c6a] hover:text-[#ffffff] transition">
            Update Password
              </button>
        </div>
          </div>
    
    </div>

  );
}

export default UserSettings