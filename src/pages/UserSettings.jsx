import UserSideBar from "./UserSideBar";
import axios from "axios";
import { useEffect, useState} from "react";
import {Toaster, toast} from 'sonner'

function UserSettings() {

  const [getInfo, setGetInfo] = useState({
      username: "",
      email: "",
      contact_number: "",
      address: "",
    });

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios.get("/api/users", {
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

    const handleUpdateInfo = (event) => {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .put("/api/users/", getInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("User information updated successfully:", response.data);
        response.data && setGetInfo(response.data);
        toast.success('Info Update Successful');
      })
      .catch((error) => {
        console.error("Error updating user information:", error);
        toast.error('Invalid Input!');
      });
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-[#e8e6c2] to-[#eaeae7] grid grid-cols-[0.1fr_0.9fr]">
      <UserSideBar/>
        {/* User Information */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 p-10 h-full">
            {/* Left Side */}
            <div className="bg-[#8d8987] text-[#ffffff] p-8 rounded-3xl shadow-md flex flex-col h-8/11">
              <p className="text-3xl lg:text-4xl font-bold mb-5 uppercase">User Info</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
              <p className="mb-2 text-[#ffffff]">Username</p>
                <input
                  value={getInfo?.username}
                  onChange={(e) =>
                  setGetInfo({ ...getInfo, username: e.target.value })}
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
                value={getInfo?.email}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, email: e.target.value })
                }
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
              value={getInfo?.contact_number}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, contact_number: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col mt-6">
              <p className="mb-2 text-[#ffffff]">Address</p>
              <textarea
              id="message"
              rows={2}
              className="px-4 py-3 rounded-md text-[#000000] resize-none"
              value={getInfo?.address}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, address: e.target.value })
                }
              />
            </div>

              <button className="mt-8 h-12 w-full bg-[#ffffff] border-1 border-[#5b5b58] text-[#000000] uppercase font-semibold rounded-md hover:bg-[#6c6c6a] hover:text-[#ffffff] transition"
              onClick={handleUpdateInfo}>
            Save Info
              </button>
            </div>

        {/* User Password */}
        {/* Right Side */}
          <div className="flex-1 bg-[#8d8987] text-[#ffffff] p-8 rounded-3xl shadow-md flex flex-col h-5/9">
            <p className="text-3xl lg:text-4xl font-bold mb-5 uppercase">User Password</p>

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
    <Toaster richColors/>
    </div>

  );
}

export default UserSettings