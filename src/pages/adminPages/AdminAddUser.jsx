import Sidebar from "../../components/sidebar"
import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";


function AdminAddUser() {

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        role: 'admin'
      })

    const Navigate = useNavigate();

    const handleCreatAdminUser = (event) => {
        event.preventDefault();
        axios.post('/api/adminUser/register', values)
        .then(res => {
        console.log(res)
        Navigate('DashBoard')
        })
    }

  return (
    <>

    <div className='h-screen w-screen'>
        <Sidebar/>
        <div className="h-screen w-screen bg-[#E2E0E1] pl-[256px] flex flex-col items-center">
            <h1 className="text-3xl pt-3 font-bold">Admin Add User</h1>
            <div className="flex justify-center items-center pt-10 ">
                <form className="flex flex-col gap-4" onSubmit={handleCreatAdminUser}> 
                    <input type="text" placeholder="Email" className="p-3 border-1 border-black rounded-2xl"
                    onChange={e => setValues({...values, email: e.target.value})} />
                    <input type="text" placeholder="Username" className="p-3 border-1 border-black rounded-2xl"
                    onChange={e => setValues({...values, username: e.target.value})}/>
                    <input type="password" placeholder="Password" className="p-3 border-1 border-black rounded-2xl"
                     onChange={e => setValues({...values, password: e.target.value})}/>
                    {/* <div className="flex flex-row gap-x-4">
                        <label for="role" className="p-3">User role:</label>
                            <select id="role" name="role" className="p-3 border-1 border-black rounded-2xl">
                                <option value="admin">admin</option>
                                <option value="staff">staff</option>
                            </select>
                    </div> */}
                    <button type="submit" className='p-3 bg-orange-300 rounded-2xl' >Add User</button>
                </form>
            </div>    
        </div>
    </div>
    </>
  )
}

export default AdminAddUser