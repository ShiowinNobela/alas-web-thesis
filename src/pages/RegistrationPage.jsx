import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const Navigate = useNavigate();

  const handleCreatUser = (event) => {
    event.preventDefault();
    axios.post("/api/users/register/", values).then((res) => {
      console.log(res);
      Navigate("/LoginPage");
    });
  };

  return (
    <>
      <section className="w-full h-full py-8 flex items-center justify-center bg-[url('./src/components/images/bg-1.jpg')] bg-cover bg-center">
        <div className="flex w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-[#d47849] text-white p-10 gap-4">
            <img
              src="./src/components/images/logo-alas1.jpg"
              alt="Alas Delis Logo"
              className="w-32 h-32 object-contain mb-2"
            />
            <h1 className="text-2xl font-semibold text-center">
              Spice up your life with
            </h1>
            <h2 className="text-4xl font-extrabold text-yellow-200">
              Flavorful
            </h2>
            <h2 className="text-4xl font-extrabold text-yellow-200">
              Savory Spices
            </h2>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col gap-6 text-center text-black overflow-auto">
            <h1 className="text-xl font-bold uppercase">
              Register for <span className="text-[#d47849]">Alas Delis</span>
            </h1>

            <div className="flex flex-col gap-4 text-left">
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className="rounded-md p-2 border border-gray-300 outline-none focus:ring-2 focus:ring-[#d47849]"
              />

              <label className="text-sm font-semibold">Username</label>
              <input
                type="text"
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
                className="rounded-md p-2 border border-gray-300 outline-none focus:ring-2 focus:ring-[#d47849]"
              />

              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="rounded-md p-2 border border-gray-300 outline-none focus:ring-2 focus:ring-[#d47849]"
              />

              <label className="text-sm font-semibold">Confirm Password</label>
              <input
                type="password"
                className="rounded-md p-2 border border-gray-300 outline-none focus:ring-2 focus:ring-[#d47849]"
              />
            </div>

            <button
              onClick={handleCreatUser}
              className="mt-4 bg-[#d47849] hover:bg-[#bf663a] text-white px-6 py-2 rounded-md transition-all uppercase"
            >
              Register
            </button>

            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/LoginPage"
                className="text-[#d47849] font-semibold hover:underline"
              >
                Login here!
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegistrationPage;
