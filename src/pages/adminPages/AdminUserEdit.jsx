import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function AdminUserEdit() {

    const { id } = useParams();
    const [data, setData] = useState("");
    const navigate = useNavigate();

    const getRoleId = (roleName) => {
            if (roleName === "admin") return "1";
            if (roleName === "customer") return "2";
            if (roleName === "staff") return "3";
            return "";
        };


    useEffect(() => {
        axios.get(`/api/adminUser/` + id)
        .then((response) => {
            setData(response.data.data);
            console.log("User Data:", response.data.data);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    const handleUpdate = (e) => {
         e.preventDefault();
        const updatedData = {
            ...data,
            role_id: getRoleId(data.role_name),  
        };
        // console.log("role_name:", data.role_name, "role_id:", updatedData.role_id);
        axios.put(`/api/adminUser/` + id, updatedData )
        .then((response) => {
            console.log("User updated successfully:", response.data);
            navigate('/Admin/AccountManagement')
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    }
    


  return (
    <div className='h-screen w-screen'>
    <Sidebar/>
        <div className="h-screen w-screen bg-[#E2E0E1] pl-[256px] flex flex-col items-center ">
            <h1 className='py-5 text-3xl font-semibold '>Edit User</h1>
            <div className="w-4xl bg-white p-5 rounded-lg shadow-md border-1 ">
              <form className='flex flex-col'>
                <div className="flex flex-row">
                    <div className="flex flex-col justify-center w-1/4  ">
                        <p class="me">Username :</p>
                    </div>
                    <input type="text" placeholder="Username" className="p-3 m-2 border-1 border-black rounded-2xl w-100" 
                    value={data.username || ""} onChange={e => setData({...data, username: e.target.value})} required/>
                </div>
                
                <div className="flex flex-row">
                    <div className="flex flex-col justify-center w-1/4">
                        <p class="me">Email :</p>
                    </div>
                    <input type="text" placeholder="Email" className="p-3 m-2 border-1 border-black rounded-2xl w-100" 
                    value={data.email || ""} onChange={e => setData({...data, email: e.target.value})} required/>
                </div>

                <div className="flex flex-row">
                    <div className="flex flex-col justify-center w-1/4">
                        <p class="me">Address :</p>
                    </div>
                    <input type="text" placeholder="Address" className="p-3 m-2 border-1 border-black rounded-2xl w-100"
                    value={data.address || ""} onChange={e => setData({...data, address: e.target.value})} required />
                </div>

                <div className="flex flex-row">
                    <div className="flex flex-col justify-center w-1/4">
                        <p class="me">Contact Number :</p>
                    </div>
                    <input type="text" placeholder="Contact Number" className="p-3 m-2 border-1 border-black rounded-2xl w-100"
                    value={data.contact_number || ""} onChange={e => setData({...data, contact_number: e.target.value})} required/>
                </div>
                
                <div className="flex flex-row mb-5">
                    <div className="flex flex-col justify-center w-1/4">
                        <p class="me">User Role :</p>
                    </div>
                        <select className="p-3 m-2 border-1 border-black rounded-2xl w-100"
                        value={data.role_name || ""} onChange={e => setData({...data, role_name: e.target.value})} required>
                            <option value={"admin"}>admin</option>
                            <option value={"staff"}>staff</option>
                            <option value={"customer"}>customer</option>
                        </select>
                </div>
                
                <hr />
                <div className="flex flex-col mt-5 mb-5">
                    <h1 className="text-2xl font-semibold mb-5 text-center">Admin Password Update</h1>

                    <div className="flex flex-row">
                        <div className="flex flex-col justify-center w-1/4">
                            <p class="me"> Current Password :</p>
                        </div>
                        <input type="password" placeholder="Current Password" className="p-3 m-2 border-1 border-black rounded-2xl w-100" />
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-center w-1/4">
                            <p class="me"> New Password :</p>
                        </div>
                        <input type="password" placeholder="New Password" className="p-3 m-2 border-1 border-black rounded-2xl w-100" />
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col justify-center w-1/4">
                            <p class="me"> Confirm New Password :</p>
                        </div>
                        <input type="password" placeholder="Confirm New Password" className="p-3 m-2 border-1 border-black rounded-2xl w-100" />
                    </div>

                </div>
                <button type="submit" className='p-3 m-2 bg-orange-300 rounded-xl w-50' onClick={handleUpdate}>Update User</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default AdminUserEdit