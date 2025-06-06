import NewSideBar from "../../components/newSideBar";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoPersonAddOutline } from "react-icons/io5";



function AccountManagement() {
  const [statusFilter, setStatusFilter] = useState("All");
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => {
      const userData = response.data;
      if (userData.role_name !== "admin") {
        window.location.href = "/";
    }})
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);

    const [data, setData] = useState()
    useEffect(() => {
      axios.get('/api/adminUser')
      .then(res => setData(res.data.data || []))
      .catch(err => console.log(err))
    }, []) 

     const filteredOrders = statusFilter === "All"
    ? data
    : data.filter(order => order.role_name.toLowerCase() === statusFilter.toLowerCase());

        return (
          <>
          <div className="max-h-full w-screen bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr] h-screen">
              <NewSideBar />

              {/* Background */}
              <div className="bg-[#E2E0E1] items-center h-full overflow-hidden">
                
                {/* Add role button */}
                <div class="flex justify-end px-4 pt-7 pb-3">
                <Link to ='/Admin/AdminAddUser'>
                  <button type="button" class="text-[#ffffff] bg-[#44a830] hover:bg-[#2d801c] focus:ring-1 focus:outline-none focus:ring-[#4e9140] font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center me-2">
                    <svg class="w-8 h-8 me-1 pt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                      <IoPersonAddOutline/>
                    </svg>
                      ADD ROLE
                  </button>
                </Link>
                </div>
                {/* Filter buttons */}
                <div class="flex justify-center p-2 gap-6">
                  <button className={`text-center px-6 rounded-2xl font-semibold ${statusFilter === "All" ? "bg-[#2d6096] text-[#ffffff]" : "bg-[#2d6096]"} hover:bg-[#123e6c] border-1 border-[#2d6096] focus:outline-2 focus:outline-offset-2 focus:outline-[#2d6096]`}
                    onClick={() =>  setStatusFilter("All")}>
                      All
                  </button>

                  <button className={`text-center px-10 py-3 rounded-2xl font-semibold 
                    ${statusFilter === "admin" ? "bg-[#737679] text-[#ffffff]" : "bg-[#737679]"} hover:bg-[#6e7072] border-1 border-[#4c4d4f] focus:outline-2 focus:outline-offset-2 focus:outline-[#999da2]`}
                    onClick={() => setStatusFilter("admin")}>
                      Admin
                  </button>
                      
                  <button className={`text-center px-10 py-3 rounded-2xl font-semibold ${statusFilter === "staff" ? "bg-[#737679] text-[#ffffff]" : "bg-[#737679]"} hover:bg-[#6e7072] border-1 border-[#4c4d4f] focus:outline-2 focus:outline-offset-2 focus:outline-[#999da2]`}
                    onClick={() => setStatusFilter("staff")}>
                      Staff
                  </button>
                
                  <button className={`text-center px-10 py-3 rounded-2xl font-semibold ${statusFilter === "customer" ? "bg-[#737679] text-[#ffffff]" : "bg-[#737679]"} hover:bg-[#6e7072] border-1 border-[#4c4d4f] focus:outline-2 focus:outline-offset-2 focus:outline-[#999da2]`}
                    onClick={() => setStatusFilter("customer")}>
                      Customer
                  </button>

                </div>
                  
                  {/* Table */}
                  <div class="flex justify-center rounded-2xl mt-5 h-full"> 
                    <div class="h-5/8 overflow-auto bg-[#ffffff] rounded-2xl pb-5">
                      <table class="min-w-full divide-y divide-[#a1a2a3]">
                        <thead class="bg-[#ffffff]">
                          <tr>
                            <th scope="col" class="px-6 py-3 text-left text-s font-semibold text-[#224160] uppercase tracking-wider rounded-2xl">
                              username
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-s font-semibold text-[#224160] uppercase tracking-wider hidden lg:table-cell">
                              address
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-s font-semibold text-[#224160] uppercase tracking-wider hidden lg:table-cell">
                              contact number
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-s font-semibold text-[#224160] uppercase tracking-wider">
                              role
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-s font-semibold text-[#224160] uppercase tracking-wider">
                              email
                            </th>
                            <th scope="col" class="relative rounded-2xl px-6 py-3">
                              <span class="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>

                  {/* Users */}
                  <tbody class="bg-[#ffffff] divide-y divide-[#a1a2a3]">
                    {filteredOrders && filteredOrders.map((d) => (
                      <tr key={d.id} class="hover:bg-[#c8c5c5] transition duration-150 ease-in-out">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3888d8]">
                          {d.username}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-[#636567] hidden lg:table-cell">
                          {d.address}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-[#636567] hidden lg:table-cell">
                          {d.contact_number}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-[#636567]">
                          {d.role_name}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-[#636567]">
                          {d.email}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <FaEdit
                            class="mx-auto cursor-pointer w-6 h-6 text-[#123992]"
                              onClick={() => {
                                navigate(`/Admin/AdminUserEdit/${d.id}`);
                                      }}
                          />
                        </td>
                      </tr>
                            ))}
                  </tbody>
                      </table>
                    </div>
                  </div>        
              </div>
          </div>
          </>
        )
      }

      export default AccountManagement