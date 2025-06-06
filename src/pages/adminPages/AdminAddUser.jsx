import NewSideBar from '../../components/newSideBar'
import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios';



function AdminAddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(1);

  const navigate = useNavigate();

  const handleCreateAdminUser = (event) => {
    event.preventDefault();

    const values = {
      username,
      email,
      password,
      role,
    };

    console.log(values);

    axios
      .post("/api/adminUser/register", values)
      .then((res) => {
        console.log(res);
        navigate("/Admin/AccountManagement");
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        // Optionally: toast.error("Error creating user");
      });
  };

        return (
            <>

    <div className='h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]'>
        <NewSideBar/>
        <div className="h-screen w-100% bg-[#E2E0E1] pl-[256px] flex flex-col items-center">
            <h1 className="text-3xl pt-3 font-bold">Admin Add User</h1>
            <div className="flex justify-center items-center pt-10 ">
                <form className="flex flex-col gap-4" onSubmit={handleCreateAdminUser}> 
                    <input type="text" placeholder="Email" className="p-3 border-1 border-black rounded-2xl"
                    onChange={e => setEmail(e.target.value)} />
                    <input type="text" placeholder="Username" className="p-3 border-1 border-black rounded-2xl"
                    onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" className="p-3 border-1 border-black rounded-2xl"
                     onChange={e => setPassword(e.target.value)}/>
                    <div className="flex flex-row gap-x-4">
                        <label for="role" className="p-3">User role:</label>
                            <select id="role" name="role" className="p-3 border-1 border-black rounded-2xl" onChange={e => setRole(Number(e.target.value))} value={role}>
                                <option value={1}>admin</option>
                                <option value={2}>customer</option>
                            </select>
                    </div>
                    <button type="submit" className='p-3 bg-orange-300 rounded-2xl' >Add User</button>
                </form>
            </div>    
        </div>
    </div>
    </>
  );
}

export default AdminAddUser;
