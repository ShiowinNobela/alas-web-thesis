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
     <div className="h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]">
        <NewSideBar />
        <div className="h-screen w-100% bg-[#E2E0E1] flex flex-col items-center">
            <h1 className='py-5 text-3xl font-semibold '>Account Management</h1>
            <Link to ='/Admin/AdminAddUser'>
            <button className='fixed p-5 m-2 top-0 right-10 border-1 bg-orange-300 rounded-2xl'> Add Admin / Staff</button>
            </Link>
            <div className="2xl:w-7xl w-4xl">
              <div className='flex justify-center items-center'>
              <ul className="flex justify-between w-3xl py-5">
                <li > 
                  <button className={`text-center px-10 py-3 rounded-2xl font-semibold 
                    ${statusFilter === "All" ? "bg-amber-800 text-white" : "bg-orange-300"} 
                    hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
                  onClick={() =>  setStatusFilter("All")}>
                    All
                  </button>
                </li>
                <li > 
                  <button className={`text-center px-10 py-3 rounded-2xl font-semibold 
                    ${statusFilter === "admin" ? "bg-amber-800 text-white" : "bg-orange-300"} 
                    hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
                  onClick={() => setStatusFilter("admin")}>
                    Admin
                  </button>
                </li>
                <li > 
                  <button className={`text-center px-10 py-3 rounded-2xl font-semibold 
                    ${statusFilter === "staff" ? "bg-amber-800 text-white" : "bg-orange-300"} 
                    hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
                  onClick={() => setStatusFilter("staff")}>
                    Staff
                  </button>
                </li>
                <li > 
                  <button className={`text-center px-10 py-3 rounded-2xl font-semibold 
                    ${statusFilter === "customer" ? "bg-amber-800 text-white" : "bg-orange-300"} 
                    hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
                  onClick={() => setStatusFilter("customer")}>
                    Customer
                  </button>
                </li>
                <li>
                  <input className="p-3 border-1 border-black rounded-2xl" type="text" name="Search" id="Search"  placeholder="Search!"/>
                </li>
              </ul>  
              </div>    
            </div>
            <div className="flex justify-center items-center pt-10 ">

              <table className="border-1 border-black 2xl:w-7xl w-4xl text-center">
               <tr>
                  <th className="p-2.5 border-black border-1">Username</th>
                  <th className="p-2.5 border-black border-1 2xl:table-cell hidden">Address</th>
                  <th className="p-2.5 border-black border-1 2xl:table-cell hidden">Contact Num#</th>
                  <th className="p-2.5 border-black border-1">Role</th>
                  <th className='p-2.5 border-black border-1'>Email</th>
                  <th className="p-2.5 border-black border-1">Edit</th>
                </tr>

                { filteredOrders && filteredOrders.map((d) => (
                  <tr>
                    <td className="p-2.5 border-black border-1"> {d.username} </td>
                    <td className="p-2.5 border-black border-1 2xl:table-cell hidden "> {d.address} </td>
                    <td className="p-2.5 border-black border-1 2xl:table-cell hidden "> {d.contact_number} </td>
                    <td className="p-2.5 border-black border-1"> {d.role_name} </td>
                    <td className="p-2.5 border-black border-1"> {d.email} </td>
                    <td className="p-2.5 border-black border-1">
                    <FaEdit className="mx-auto cursor-pointer w-[30px] h-[30px] "  onClick={
                      () => {
                        navigate(`/Admin/AdminUserEdit/${d.id}`);
                      }
                    }/>
                    </td>
                  </tr>
                ))
               
                } 
              </table>
            </div>
        </div>        
    </div>

    </>
  )
}

export default AccountManagement