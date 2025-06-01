import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from 'sonner';

function LoginPage() {
  const [username, setUserLog] = useState("");
  const [password, setPasswordLog] = useState("");

  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    axios.post("/api/users/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Login successful");
          window.localStorage.setItem("user", JSON.stringify(response.data));

          return axios.get("/api/users", {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          }).then((response) => {
            const userData = response.data;
            console.log(userData);
            if (userData.role_name === "admin") {
              toast.success('Login Successful Admin!');
              setTimeout(() => {
                  window.location.href = "/Admin/DashBoard";
              }, 1000);
          } 
            else {
              toast.success('Login Successful');
              setTimeout(() => {
                  window.location.href = "/";
              }, 1000);
            }
          })
          
  }})
  .catch((err) => {
            if (err.response && err.response.status === 401) {
            toast.error('Please Input a Valid Account!');
          } else {
            toast.error('An unexpected error occurred');
        }
          }
)}


  if (window.localStorage.getItem("user")) {  
    window.location.href = "/";
  }
    

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-[url('./src/components/images/bg-1.jpg')] bg-center bg-no-repeat ">
      <Toaster  richColors />
        <div className="flex h-[700px] w-[400px] flex-col items-center justify-center text-center p-10  rounded-2xl max-md:hidden">
          <h1 className="font-semibold text-7xl text-white">
            Spice up your life with{" "}
            <h1 className=" text-[#EA1A20] font-black"> Flavorful </h1>and{" "}
            <h1 className=" text-[#EA1A20] font-black"> Savory Spices</h1>
          </h1>
        </div>
        <div className="w-[650px] max-md:hidden"></div>

        <div className="flex text-white">
          <div className="flex flex-col items-center justify-center text-center p-5 gap-7  rounded-2xl">
            <h1 className="text-2xl font-bold">
              Welcome To{" "}
              <h1 className="text-[#EA1A20]">Alas Delis and Spices</h1>
            </h1>
            <div className="flex flex-col text-lg text-left gap-1">
              <span>Username</span>
              <input
                type="text"
                className="rounded-md p-1 border-1 outline-none focus:border-black focus:bg-slate-100  focus:text-black text-black" 
                onChange={(e) => setUserLog(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-lg text-left gap-1">
              <span>Password</span>
              <input
                type="password"
                className="rounded-md p-1 border-1 outline-none focus:border-black focus:bg-slate-100  focus:text-black text-black"
                onChange={(e) => setPasswordLog(e.target.value)} 
              />
              <div className="flex gap-1 items-center">
                <input type="checkbox" />
                <span className="text-sm"> Remember Password </span>
              </div>
            </div>

            <button
              className="px-10 py-2 text-lg rounded-md bg-gradient-to-tr from-red-600 to-yellow-400 cursor-pointer"
              onClick={handleLogin }
            >
              Login
            </button>

            <Link to="/RegPage">
              <p className="text-sm">
                New to the Website?{" "}
                <a href="#" className="border-b cursor-pointer">
                  {" "}
                  Create an Account now!
                </a>
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
