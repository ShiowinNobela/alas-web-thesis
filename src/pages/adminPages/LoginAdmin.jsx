import {Link} from 'react-router-dom'
import { useState } from "react";
import axios from "axios";


function LoginAdmin() {
  const [username, setUserLog] = useState("");
  const [password, setPasswordLog] = useState("");

  const handleLogin = () => {
    axios.post("/api/users/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Login successful");
          window.localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href = "/HomePage";
        } else {
          console.log("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  if (window.localStorage.getItem("user")) {  
    window.location.href = "/";
  }


  return (
    <>
    <section className="h-screen w-screen bg-gradient-to-r from-slate-300 to-slate-500 p-30 flex items-center justify-center text-3xl ">
            <div className="flex flex-col items-center shadow-2xl p-5 pb-10 space-y-10 ">
                <p>Admin Login</p>
                  <div className='flex flex-col text-lg text-left gap-1'>
                    <span>Username</span>
                    <input type="text" className='rounded-md p-1 border-1 outline-none focus:border-black focus:bg-slate-100' />
                  </div>

                  <div className='flex flex-col text-lg text-left gap-1'>
                    <span>Password</span>
                    <input type="text" className='rounded-md p-1 border-1 outline-none focus:border-black focus:bg-slate-100' />
                  </div>
                  <Link to='/DashBoard' >
                  <button className='px-10 py-2 text-lg rounded-md bg-gradient-to-tr from-red-600 to-yellow-400 cursor-pointer'>Login</button>
                  </Link>
            </div>
    </section>
    </>
  )
}

export default LoginAdmin