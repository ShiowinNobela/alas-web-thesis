import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import NewSideBar from "../../components/newSideBar";

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
            toast.success("Edit Successful");
                setTimeout(() => {
                  navigate("/Admin/AccountManagement");
                }, 1000);
        })
        .catch((err) => {
            if (err.response && err.response.status === 500) {
                toast.error(err.response.data.message);
            }
            else {
                toast.error("Unexpected Error Occur")
            }
        });
    }
    
  return (
        <div className='h-screen max-h-full w-screen bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]'>
                <NewSideBar/>
                    <div className="bg-[#E2E0E1] flex flex-col overflow-auto items-center py-10">
                            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg border">
                                <p className="text-2xl font-semibold text-center mb-6 uppercase">user Information</p>
                                <form className="space-y-6" onSubmit={handleUpdate}>
                            
                            {/* Basic Info */}
                            {[
                                { label: "Username", value: data.username, key: "username" },
                                { label: "Email", value: data.email, key: "email" },
                                { label: "Address", value: data.address, key: "address" },
                                { label: "Contact Number", value: data.contact_number, key: "contact_number" },
                            ].map(({ label, value, key }) => (
                                <div className="flex items-center" key={key}>
                                <label className="w-1/4 font-medium">{label}:</label>
                                <input
                                    type="text"
                                    placeholder={label}
                                    className="w-full p-3 border border-gray-400 rounded-lg"
                                    value={value || ""}
                                    onChange={e => setData({ ...data, [key]: e.target.value })}
                                    required
                                />
                                </div>
                            ))}

                            {/* User Role */}
                            <div className="flex items-center">
                                <label className="w-1/4 font-medium">User Role:</label>
                                <select
                                className="w-full p-3 border border-gray-400 rounded-lg"
                                value={data.role_name || ""}
                                onChange={e => setData({ ...data, role_name: e.target.value })}
                                required
                                >
                                <option value="">Select role</option>
                                <option value="admin">admin</option>
                                <option value="staff">staff</option>
                                <option value="customer">customer</option>
                                </select>
                            </div>

        <hr className="my-6 border-[#474646]" />

                            {/* Password Update */}
                            <div>
                                <p className="text-2xl font-semibold text-center mb-6 uppercase">password</p>

                                {["Current Password", "New Password", "Confirm New Password"].map((label, idx) => (
                                <div className="flex items-center mb-4" key={label}>
                                    <label className="w-1/4 font-medium">{label}:</label>
                                    <input
                                    type="password"
                                    placeholder={label}
                                    className="w-full p-3 border border-gray-400 rounded-lg"
                                    required={idx !== 0} // Only current password is optional in some systems
                                    />
                                </div>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <button type="submit" className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-lg transition">
                                Update User
                                </button>
                            </div>
                                </form>
                            </div>
                    </div>
                    <Toaster richColors/>
        </div>
  )
}

export default AdminUserEdit
