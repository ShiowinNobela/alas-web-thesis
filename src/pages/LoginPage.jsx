import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import PromptLink from "../components/PromptLink";
import PrimaryButton from "../components/PrimaryButton";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();

    const newErrors = {
      username: username.trim() ? "" : "Username is required",
      password: password.trim() ? "" : "Password is required",
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      toast.error("Please fill in all required fields!");

      return;
    }

    axios.defaults.withCredentials = true;

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

              window.location.href =
                userData.role_name === "admin" ? "/Admin/DashBoard" : "/";
            });
        }
      })
      .catch((err) => {
        const res = err.response;

        if (!res) {
          toast.error("No response from server!");
          return;
        }

        if (res.status === 401) {
          toast.error("Please input a valid account!");
          return;
        }

        // Show general message
        const msg = res.data?.message || "An unexpected error occurred";
        toast.error(msg);

        // If we have per-field errors, update state
        if (res.data?.error) {
          setErrors((prev) => ({
            ...prev,
            ...res.data.error,
          }));
        }
      });
  };

  if (window.localStorage.getItem("user")) {
    window.location.href = "/";
  }

  return (
    <>
      <section className="min-h-full bg-gray-50 flex flex-col justify-start sm:justify-center items-center px-4 py-8">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 sm:p-8 text-content">
          <div className="space-y-6">
            <div className="space-y-1">
              <img
                src="./src/components/images/logo-alas1.jpg"
                alt="Alas Delis Logo"
                className="mx-auto w-20 h-20 object-contain shrink-0"
              />
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-center font-heading">
                SIGN IN
              </h1>
              <p className="text-sm text-gray-500 text-center">
                Welcome to Alas Delis and Spices.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <TextInput
                label="Username"
                type="text"
                value={username}
                onChange={setUsername}
                placeholder="username"
                error={errors.username}
              />

              <PasswordInput
                label="Password"
                value={password}
                onChange={setPassword}
                placeholder="********"
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-primary"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <PrimaryButton type="submit">Sign In</PrimaryButton>

              <PromptLink
                promptText="Don’t have an account yet?"
                linkText="CREATE ACCOUNT"
                to="/RegPage"
              />

              <p className="text-xs text-gray-400 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#" className="underline hover:text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-primary">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
      <Toaster richColors visibleToasts={1} />
    </>
  );
}

export default LoginPage;
