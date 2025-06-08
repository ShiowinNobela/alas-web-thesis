import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

function LoginPage() {
  const [username, setUserLog] = useState("");
  const [password, setPasswordLog] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  axios.defaults.withCredentials = true;

  const handleLogin = () => {
    axios
      .post("/api/users/login/", {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem("user", JSON.stringify(response.data));
          return axios
            .get("/api/users", {
              headers: {
                Authorization: `Bearer ${response.data.token}`,
              },
            })
            .then((res) => {
              const userData = res.data;
              toast.success(
                `Login Successful${
                  userData.role_name === "admin" ? " Admin" : ""
                }!`
              );
              setTimeout(() => {
                window.location.href =
                  userData.role_name === "admin" ? "/Admin/DashBoard" : "/";
              }, 1000);
            });
        }
      })
      .catch((err) => {
        const msg =
          err.response?.status === 401
            ? "Please input a valid account!"
            : err.response?.data?.message || "An unexpected error occurred";
        toast.error(msg);
      });
  };

  if (window.localStorage.getItem("user")) {
    window.location.href = "/";
  }

  return (
    <>
      <section className="w-full h-full overflow-y-hidden flex justify-center items-center bg-[url('./src/components/images/bg-1.jpg')] bg-cover bg-center">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full max-h-[95vh] p-6 flex flex-col gap-4 text-center text-black overflow-auto">
          <img
            src="./src/components/images/logo-alas1.jpg"
            alt="Alas Delis Logo"
            className="mx-auto w-24 h-24 object-contain mb-2 shrink-0"
          />

          <h1 className="text-xl font-bold uppercase">
            Welcome to{" "}
            <span className="text-[#d47849]">Alas Delis and Spices</span>
          </h1>

          <div className="flex flex-col gap-3 text-left">
            <label className="text-sm font-semibold">Username</label>
            <input
              type="text"
              onChange={(e) => setUserLog(e.target.value)}
              className="rounded-md p-2 border border-gray-300 outline-none focus:ring-2 focus:ring-[#d47849]"
            />

            <label className="text-sm font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPasswordLog(e.target.value)}
                className="rounded-md p-2 border border-gray-300 outline-none focus:ring-2 focus:ring-[#d47849] w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-600 hover:text-gray-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a10.058 10.058 0 012.59-4.282M3 3l18 18"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.88 9.88a3 3 0 104.24 4.24"
                    />
                  </svg>
                )}
              </button>
            </div>

            <label className="flex items-center gap-2 text-sm mt-2">
              <input type="checkbox" />
              Remember me
            </label>
          </div>

          <button
            onClick={handleLogin}
            className="mt-3 bg-[#d47849] hover:bg-[#bf663a] text-white px-6 py-2 rounded-md transition-all uppercase"
          >
            Login
          </button>

          <p className="text-sm">
            New Here?{" "}
            <Link
              to="/RegPage"
              className="text-[#d47849] font-semibold hover:underline"
            >
              Create an account now!
            </Link>
          </p>
        </div>
      </section>

      <Toaster richColors />
    </>
  );
}

export default LoginPage;
