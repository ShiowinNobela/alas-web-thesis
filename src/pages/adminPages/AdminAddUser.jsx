import NewSidebar from '../../components/newSideBar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminAddUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [role, setRole] = useState(1);

  const Navigate = useNavigate();

  const handleCreatAdminUser = (event) => {
    event.preventDefault();
    const values = {
      username: username,
      email: email,
      password: password,
      role: role,
    };
    console.log(values);
    axios.post('/api/adminUser/register', values).then((res) => {
      console.log(res);
      Navigate('/Admin/AccountManagement');
    });
  };

  return (
    <>
      <div className="flex h-full flex-col overflow-x-auto bg-white">
        <div className="flex items-center">
          <form
            className="mx-auto flex h-8/10 w-2/3 flex-col gap-6 rounded-2xl border border-[#cccacb] bg-[#E2E0E1] p-5 shadow-xl"
            onSubmit={handleCreatAdminUser}
          >
            <h2 className="m-1 text-center text-3xl font-extrabold text-[#262626] uppercase">
              create new account
            </h2>

            {/* Input */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#262626] uppercase"
              >
                email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                className="w-full rounded-xl border-2 border-[#8e8888] bg-[#ffffff] px-4 py-3 text-[#262626] placeholder-[#bcbaba] transition duration-200 ease-in-out focus:border-[#7693c4] focus:ring-2 focus:ring-[#7693c4] focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-[#262626]"
              >
                username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Choose a username"
                className="focus:ring-[#7693c4]0 w-full rounded-xl border-2 border-[#8e8888] bg-[#ffffff] px-4 py-3 text-[#262626] placeholder-[#bcbaba] transition duration-200 ease-in-out focus:border-[#7693c4] focus:ring-2 focus:outline-none"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#262626] uppercase"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a strong password"
                className="w-full rounded-xl border-2 border-[#8e8888] bg-[#ffffff] px-4 py-3 text-[#262626] placeholder-[#bcbaba] transition duration-200 ease-in-out focus:border-[#7693c4] focus:ring-2 focus:ring-[#7693c4] focus:outline-none"
                onChange={(e) => SetPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-semibold text-[#262626] uppercase"
              >
                role
              </label>
              <select
                id="role"
                name="role"
                className="text-[#262626]focus:outline-none w-full appearance-none rounded-xl border-2 border-[#8e8888] bg-[#ffffff] px-4 py-3 pr-8 transition duration-200 ease-in-out focus:border-[#7693c4] focus:ring-2 focus:ring-[#7693c4]"
                onChange={(e) => setRole(Number(e.target.value))}
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
                className="focus:ring-opacity-75 mt-2 w-full rounded-xl bg-[#2b5db4] py-3 font-extrabold text-[#ffffff] uppercase shadow-md hover:bg-[#324057] focus:ring-4 focus:ring-[#7693c4] focus:outline-none"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminAddUser;
