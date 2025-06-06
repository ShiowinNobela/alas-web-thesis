import Sidebar from "../../components/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="h-screen w-screen">
      <Sidebar />
      <div className="h-screen w-screen bg-[#E2E0E1] pl-[256px] flex flex-col items-center">
        <h1 className="text-3xl pt-3 font-bold">Admin Add User</h1>
        <div className="flex justify-center items-center pt-10">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleCreateAdminUser}
          >
            <input
              type="email"
              placeholder="Email"
              className="p-3 border border-black rounded-2xl w-80"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="p-3 border border-black rounded-2xl w-80"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-black rounded-2xl w-80"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div className="flex flex-col">
              <label htmlFor="role" className="p-2">
                User Role:
              </label>
              <select
                id="role"
                name="role"
                className="p-3 border border-black rounded-2xl w-80"
                onChange={(e) => setRole(Number(e.target.value))}
                value={role}
                required
              >
                <option value={1}>admin</option>
                <option value={2}>customer</option>
              </select>
            </div>
            <button
              type="submit"
              className="p-3 bg-orange-400 hover:bg-orange-500 text-white font-medium rounded-2xl transition"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAddUser;
