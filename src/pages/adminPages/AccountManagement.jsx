import NewSideBar from '../../components/newSideBar';
import { useState } from 'react';
import { MdToggleOn, MdToggleOff } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoPersonAddOutline } from 'react-icons/io5';
import {
  HiUserCircle,
  HiUserGroup,
  HiOutlineUsers,
  HiIdentification,
} from 'react-icons/hi';

const fetchUser = async () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const res = await axios.get('/api/users', {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
};

const fetchAdminUsers = async () => {
  const res = await axios.get('/api/adminUser');
  return res.data.data || [];
};

function AccountManagement() {
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUser,
    onSuccess: (data) => {
      if (data.role_name !== 'admin') {
        window.location.href = '/';
      }
    },
    onError: () => {
      console.error('Unable to fetch user.');
    },
  });

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: fetchAdminUsers,
  });

  const roleTabs = [
    { label: 'All', value: 'All', icon: HiUserCircle },
    { label: 'Admin', value: 'admin', icon: HiUserGroup },
    { label: 'Staff', value: 'staff', icon: HiOutlineUsers },
    { label: 'Customer', value: 'customer', icon: HiIdentification },
  ];

  const toggleUserStatus = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const response = await axios.patch(`/api/adminUser/manage/${id}`, {
        is_active: newStatus,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  const filteredOrders =
    statusFilter === 'All'
      ? users
      : users.filter(
          (user) => user.role_name.toLowerCase() === statusFilter.toLowerCase()
        );

  return (
    <div className="flex h-full flex-col overflow-x-auto bg-white">
      <section className="bg-gray-50">
        <main className="min-h-full bg-[#E2E0E1] p-4">
          <div className="mx-auto max-w-screen-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
            {/* Tabs + Add Button */}
            <div className="flex flex-col gap-4 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div className="flex flex-wrap gap-2">
                {['All', 'admin', 'staff', 'customer'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setStatusFilter(role)}
                    className={`rounded-md px-4 py-2 text-sm font-semibold capitalize transition ${
                      statusFilter === role
                        ? 'bg-admin text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <Link to="/Admin/AdminAddUser">
                <button
                  type="button"
                  className="bg-secondary hover:bg-secondary/80 focus:ring-secondary inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-black shadow focus:ring-2"
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
                  <thead className="bg-admin sticky top-0 z-10 text-xs text-white uppercase">
                    <tr>
                      <th className="w-[21%] px-6 py-3">Username</th>
                      <th className="w-[5%] px-6 py-3">Role</th>

                      <th className="hidden w-[35%] px-6 py-3 lg:table-cell">
                        Address
                      </th>
                      <th className="hidden w-[15%] px-6 py-3 lg:table-cell">
                        Contact
                      </th>
                      <th className="w-[24%] px-6 py-3">Status</th>
                      <th className="w-[18%] px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {filteredOrders.map((user) => (
                      <tr
                        key={user.id}
                        className="transition duration-150 ease-in-out hover:bg-gray-50"
                      >
                        <td className="w-[21%] px-6 py-4 text-sm text-gray-800">
                          <div className="font-medium text-blue-600">
                            {user.username ?? '–'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.email ?? '–'}
                          </div>
                        </td>

                        <td className="w-[5%] px-6 py-4 text-sm text-gray-600 capitalize">
                          {user.role_name ?? '–'}
                        </td>

                        <td className="hidden w-[35%] px-6 py-4 text-sm text-gray-600 lg:table-cell">
                          {user.address ?? '–'}
                        </td>

                        <td className="hidden w-[18%] px-6 py-4 text-sm text-gray-600 lg:table-cell">
                          {user.contact_number ?? '–'}
                        </td>

                        <td className="w-[24%] px-6 py-4 text-center text-sm">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                              user.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-600'
                            }`}
                          >
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>

                        <td className="flex w-[18%] items-center gap-3 px-6 py-4 text-center">
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
                            className="text-indigo-600 transition hover:text-indigo-900"
                            title="Edit User"
                          >
                            <FaEdit className="h-5 w-5" />
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
      </section>
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
