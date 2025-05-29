import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const InputStyle =
  "border-black border-2 rounded-md md:text-xl text-sm md:w-[300px] w-[200px] bg-gray-100 p-2 focus:ring-2 focus:outline-none focus:ring-black hover:ring-1 hover:ring-black transition-colors";

function UserSettings() {
  const [getInfo, setGetInfo] = useState({
    username: "",
    email: "",
    contact_number: "",
    address: "",
  });

  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setGetInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleUpdateInfo = (event) => {
    event.preventDefault();
    axios
      .put("/api/users/", getInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("User information updated successfully:", response.data);
        response.data && setGetInfo(response.data);
      })
      .catch((error) => {
        console.error("Error updating user information:", error);
      });
  };

  return (
    <>
      <section className="max-w-screen md:h-full h-screen bg-yellow-100 bg-cover bg-fixed bg-no-repeat">
        <div className="flex flex-col items-center  pt-20">
          <div className="flex flex-row md:mb-10 mb-3">
            <div className="flex items-center justify-center bg-[#EA1A20] lg:w-[250px] w-[100px] md:h-[450px] h-[300px] rounded-2xl rounded-tr-none rounded-br-none shadow-lg p-8 mt-10 border-2 border-black">
              <h1 className="lg:text-4xl text-sm font-bold text-white text-center">
                Personal Informations
              </h1>
            </div>
            <div className="flex flex-col lg:w-[650px] w-[250px] md:h-[450px] h-[300px] bg-[#FF5C61] rounded-2xl rounded-tl-none rounded-bl-none shadow-lg p-5 pl-3 mt-10 md:gap-y-10 gap-y-5 border-2 border-l-0 border-black">
              <input
                className={InputStyle}
                type="text"
                value={getInfo?.username}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, username: e.target.value })
                }
              />
              <input
                type="text"
                className={InputStyle}
                value={getInfo?.email}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, email: e.target.value })
                }
              />
              <input
                type="text"
                className={InputStyle}
                placeholder="Phone Number"
                value={getInfo?.contact_number}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, contact_number: e.target.value })
                }
              />
              <input
                type="text"
                className="border-black border-2 rounded-md md:text-xl text-sm md:w-[600px] w-[200px] bg-gray-100 p-2 focus:ring-2 focus:outline-none focus:ring-black hover:ring-1 hover:ring-black transition-colors"
                placeholder="Address"
                value={getInfo?.address}
                onChange={(e) =>
                  setGetInfo({ ...getInfo, address: e.target.value })
                }
              />

              <div className="flex items-center justify-end ">
                <button
                  className="border-black border-2 bg-[#FFD700] p-3 rounded-md md:text-2xl  text-md font-medium"
                  onClick={handleUpdateInfo}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:mb-10 mb-">
            <div className="flex items-center justify-center bg-[#EA1A20] lg:w-[250px] w-[100px] md:h-[400px] h-[300px] rounded-2xl rounded-tr-none rounded-br-none shadow-lg p-8 mt-10 border-2 border-black">
              <h1 className="lg:text-4xl text-sm font-bold text-white text-center">
                Account Password
              </h1>
            </div>
            <div className="flex flex-col lg:w-[650px] w-[250px] md:h-[400px] h-[300px] bg-[#FF5C61] rounded-2xl rounded-tl-none rounded-bl-none shadow-lg p-5 pl-3 mt-10 md:gap-y-10 gap-y-5 border-2 border-l-0 border-black">
              <input
                type="text"
                className={InputStyle}
                placeholder="Current Password"
              />
              <input
                type="text"
                className={InputStyle}
                placeholder="New Password"
              />
              <input
                type="text"
                className={InputStyle}
                placeholder="Confirm New Password"
              />
              <div className="flex items-center justify-end ">
                <button className="border-black border-2 bg-[#FFD700] p-3 rounded-md md:text-2xl  text-md font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserSettings;
