import NewSidebar from "../../components/newSideBar"
import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import { Sidebar } from "flowbite-react";


function AdminAddUser() {
 

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [role, setRole] = useState(1)


    const Navigate = useNavigate();

    const handleCreatAdminUser = (event) => {
        event.preventDefault();
        const values = 
            {
            username: username,
            email: email,
            password: password,
            role: role
        }
        console.log(values)
        axios.post('/api/adminUser/register', values           
        )
        .then(res => {
        console.log(res)
        Navigate('/Admin/AccountManagement')
        })
    }

        return (
            <>

            <div className='h-screen max-h-full overflow-x-clip overflow-y-auto bg-[#eceaeb] grid grid-cols-[0.20fr_0.80fr]'>
                <NewUserSideBar/>
                    <div className="flex items-center">
                        <form className="flex flex-col w-2/3 h-8/10 gap-6 p-5 bg-[#E2E0E1] rounded-2xl shadow-xl mx-auto border border-[#cccacb]" onSubmit={handleCreatAdminUser}>
                        <h2 className="text-3xl font-extrabold text-[#262626] text-center m-1 uppercase">create new account</h2>
                        
                        {/* Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-[#262626] mb-2 uppercase">email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 border-2 border-[#8e8888] rounded-xl bg-[#ffffff] text-[#262626] placeholder-[#bcbaba] focus:outline-none focus:border-[#7693c4] focus:ring-2 focus:ring-[#7693c4] transition duration-200 ease-in-out"
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-[#262626] mb-2 ">username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Choose a username"
                                    className="w-full px-4 py-3 border-2 border-[#8e8888] rounded-xl bg-[#ffffff] text-[#262626] placeholder-[#bcbaba] focus:outline-none focus:border-[#7693c4] focus:ring-2 focus:ring-[#7693c4]0 transition duration-200 ease-in-out"
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-[#262626] mb-2 uppercase">password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Create a strong password"
                                    className="w-full px-4 py-3 border-2 border-[#8e8888] rounded-xl bg-[#ffffff] text-[#262626] placeholder-[#bcbaba] focus:outline-none focus:border-[#7693c4] focus:ring-2 focus:ring-[#7693c4] transition duration-200 ease-in-out"
                                    onChange={e => SetPassword(e.target.value)}
                                    required
                                />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-semibold text-[#262626] mb-2 uppercase">role</label>
                                <select
                                    id="role"
                                    name="role"
                                    className="w-full px-4 py-3 border-2 border-[#8e8888] rounded-xl bg-[#ffffff] text-[#262626]focus:outline-none focus:border-[#7693c4] focus:ring-2 focus:ring-[#7693c4] appearance-none pr-8 transition duration-200 ease-in-out"
                                    onChange={e => setRole(Number(e.target.value))}
                                    value={role}
                                    >
                                    <option value={1}>Select role</option>
                                    <option value={2}>Admin</option>
                                    <option value={3}>Staff</option>
                                    <option value={4}>Customer</option>
                                </select>
                        </div>
                        <div className="w-1/6">
                            <button
                                type="submit"
                                className="w-full py-3 mt-2 bg-[#2b5db4] text-[#ffffff] font-extrabold rounded-xl shadow-md hover:bg-[#324057] focus:outline-none focus:ring-4 focus:ring-[#7693c4] focus:ring-opacity-75 uppercase"
                            >
                                Add User
                        </button>
                        </div>
                        </form>
                    </div>    
            </div>
            </>
        )
    }

export default AdminAddUser