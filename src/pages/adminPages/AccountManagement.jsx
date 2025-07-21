import NewSideBar from "../../components/newSideBar";
import { useState } from "react";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";
import {
  HiUserCircle,
  HiUserGroup,
  HiOutlineUsers,
  HiIdentification,
} from "react-icons/hi";

const fetchUser = async () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const res = await axios.get("/api/users", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
};

const fetchAdminUsers = async () => {
  const res = await axios.get("/api/adminUser");
  return res.data.data || [];
};

function AccountManagement() {
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchUser,
    onSuccess: (data) => {
      if (data.role_name !== "admin") {
        window.location.href = "/";
      }
    },
    onError: () => {
      console.error("Unable to fetch user.");
    },
  });

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: fetchAdminUsers,
  });

  const roleTabs = [
    { label: "All", value: "All", icon: HiUserCircle },
    { label: "Admin", value: "admin", icon: HiUserGroup },
    { label: "Staff", value: "staff", icon: HiOutlineUsers },
    { label: "Customer", value: "customer", icon: HiIdentification },
  ];

  const toggleUserStatus = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const user = JSON.parse(window.localStorage.getItem('user'));
      const response = await axios.patch(`/api/adminUser/manage/${id}`, 
        {
          is_active: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const filteredOrders =
    statusFilter === "All"
      ? users
      : users.filter(
          (user) => user.role_name.toLowerCase() === statusFilter.toLowerCase()
        );

  return (
    <div className="h-screen w-screen overflow-x-clip overflow-y-auto bg-neutral grid grid-cols-[0.20fr_0.80fr]">
      <NewSideBar />
      <div className="min-h-full w-full flex flex-col gap-5 overflow-auto">
        <main className="min-h-full bg-[#E2E0E1] px-4 py-7">
          <div className="max-w-screen-2xl mx-auto bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            {/* Tabs + Add Button */}
            <div className="flex flex-col gap-4 px-4 py-4 border-b sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div className="flex flex-wrap gap-2">
                {["All", "admin", "staff", "customer"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setStatusFilter(role)}
                    className={`rounded-md px-4 py-2 text-sm font-semibold capitalize transition ${
                      statusFilter === role
                        ? "bg-admin text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <Link to="/Admin/AdminAddUser">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-black shadow hover:bg-secondary/80 focus:ring-2 focus:ring-secondary"
                >
                  <IoPersonAddOutline className="h-5 w-5" />
                  Add User
                </button>
              </Link>
            </div>

            {/* Table */}
            {isLoading ? (
              <div className="p-6 text-center text-gray-600">
                Loading users...
              </div>
            ) : isError ? (
              <div className="p-6 text-center text-red-600">
                Failed to load users.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-fixed divide-y divide-gray-200">
                  <thead className="sticky top-0 z-10 bg-admin text-white uppercase text-xs">
                    <tr>
                      <th className="w-[21%] px-6 py-3">Username</th>
                      <th className="w-[5%] px-6 py-3">Role</th>

                      <th className="w-[35%] px-6 py-3 hidden lg:table-cell">
                        Address
                      </th>
                      <th className="w-[15%] px-6 py-3 hidden lg:table-cell">
                        Contact
                      </th>
                      <th className="w-[24%] px-6 py-3">Status</th>
                      <th className="w-[18%] px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {filteredOrders.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition duration-150 ease-in-out"
                      >
                        <td className="w-[21%] px-6 py-4 text-sm text-gray-800">
                          <div className="font-medium text-blue-600">
                            {user.username ?? "–"}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {user.email ?? "–"}
                          </div>
                        </td>

                        <td className="w-[5%] px-6 py-4 text-sm text-gray-600 capitalize">
                          {user.role_name ?? "–"}
                        </td>

                        <td className="w-[35%] px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                          {user.address ?? "–"}
                        </td>

                        <td className="w-[18%] px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                          {user.contact_number ?? "–"}
                        </td>

                        <td className="w-[24%] px-6 py-4 text-sm text-center">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                              user.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="w-[18%] px-6 py-4 text-center flex items-center gap-3">
                          {/* Toggle Active Button */}
                          <button
                            onClick={() =>
                              toggleUserStatus.mutate({
                                id: user.id,
                                newStatus: !user.is_active,
                              })
                            }
                            className="text-gray-600 hover:text-gray-800"
                            title="Toggle Active"
                            disabled={toggleUserStatus.isLoading}
                          >
                            {user.is_active ? (
                              <MdToggleOn
                                size={24}
                                className="text-green-500"
                              />
                            ) : (
                              <MdToggleOff size={24} className="text-red-500" />
                            )}
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() =>
                              navigate(`/Admin/AdminUserEdit/${user.id}`)
                            }
                            className="text-indigo-600 hover:text-indigo-900 transition"
                            title="Edit User"
                          >
                            <FaEdit className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AccountManagement;
//   return (
//     <>
//       <div className="h-screen w-screen overflow-x-clip overflow-y-auto bg-neutral grid grid-cols-[0.20fr_0.80fr]">
//         <NewSideBar />
//         <main className="min-h-full flex flex-col gap-3 overflow-auto px-4 py-7">
//           <div className="h-screen w-100% bg-[#E2E0E1] flex flex-col items-center">
//             <h1 className="py-5 text-3xl font-semibold ">Account Management</h1>
//             <Link to="/Admin/AdminAddUser">
//               <button className="fixed p-5 m-2 top-0 right-10 border-1 bg-orange-300 rounded-2xl">
//                 {" "}
//                 Add Admin / Staff
//               </button>
//             </Link>
//             <div className="2xl:w-7xl w-4xl">
//               <div className="flex justify-center items-center">
//                 <ul className="flex justify-between w-3xl py-5">
//                   <li>
//                     <button
//                       className={`text-center px-10 py-3 rounded-2xl font-semibold
//                     ${
//                       statusFilter === "All"
//                         ? "bg-amber-800 text-white"
//                         : "bg-orange-300"
//                     }
//                     hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
//                       onClick={() => setStatusFilter("All")}
//                     >
//                       All
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className={`text-center px-10 py-3 rounded-2xl font-semibold
//                     ${
//                       statusFilter === "admin"
//                         ? "bg-amber-800 text-white"
//                         : "bg-orange-300"
//                     }
//                     hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
//                       onClick={() => setStatusFilter("admin")}
//                     >
//                       Admin
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className={`text-center px-10 py-3 rounded-2xl font-semibold
//                     ${
//                       statusFilter === "staff"
//                         ? "bg-amber-800 text-white"
//                         : "bg-orange-300"
//                     }
//                     hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
//                       onClick={() => setStatusFilter("staff")}
//                     >
//                       Staff
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className={`text-center px-10 py-3 rounded-2xl font-semibold
//                     ${
//                       statusFilter === "customer"
//                         ? "bg-amber-800 text-white"
//                         : "bg-orange-300"
//                     }
//                     hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
//                       onClick={() => setStatusFilter("customer")}
//                     >
//                       Customer
//                     </button>
//                   </li>
//                   <li>
//                     <input
//                       className="p-3 border-1 border-black rounded-2xl"
//                       type="text"
//                       name="Search"
//                       id="Search"
//                       placeholder="Search!"
//                     />
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="flex justify-center items-center pt-10 ">
//               <table className="border-1 border-black 2xl:w-7xl w-4xl text-center">
//                 <tr>
//                   <th className="p-2.5 border-black border-1">Username</th>
//                   <th className="p-2.5 border-black border-1 2xl:table-cell hidden">
//                     Address
//                   </th>
//                   <th className="p-2.5 border-black border-1 2xl:table-cell hidden">
//                     Contact Num#
//                   </th>
//                   <th className="p-2.5 border-black border-1">Role</th>
//                   <th className="p-2.5 border-black border-1">Email</th>
//                   <th className="p-2.5 border-black border-1">Edit</th>
//                 </tr>

//                 {filteredOrders &&
//                   filteredOrders.map((d) => (
//                     <tr>
//                       <td className="p-2.5 border-black border-1">
//                         {" "}
//                         {d.username}{" "}
//                       </td>
//                       <td className="p-2.5 border-black border-1 2xl:table-cell hidden ">
//                         {" "}
//                         {d.address}{" "}
//                       </td>
//                       <td className="p-2.5 border-black border-1 2xl:table-cell hidden ">
//                         {" "}
//                         {d.contact_number}{" "}
//                       </td>
//                       <td className="p-2.5 border-black border-1">
//                         {" "}
//                         {d.role_name}{" "}
//                       </td>
//                       <td className="p-2.5 border-black border-1">
//                         {" "}
//                         {d.email}{" "}
//                       </td>
//                       <td className="p-2.5 border-black border-1">
//                         <FaEdit
//                           className="mx-auto cursor-pointer w-[30px] h-[30px] "
//                           onClick={() => {
//                             navigate(`/Admin/AdminUserEdit/${d.id}`);
//                           }}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

//
