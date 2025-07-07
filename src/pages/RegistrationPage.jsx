import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import { Toaster, toast } from "sonner";
import PasswordInput from "../components/PasswordInput";
import PromptLink from "../components/PromptLink";
import PrimaryButton from "../components/PrimaryButton";

function RegistrationPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const Navigate = useNavigate();

  const handleCreateUser = (event) => {
    event.preventDefault();

    const newErrors = {
      username: values.username.trim() ? "" : "Username is required",
      email: values.email.trim() ? "" : "Email is required",
      password: values.password.trim() ? "" : "Password is required",
      confirmPassword: values.confirmPassword.trim()
        ? ""
        : "Confirm Password is required",
    };

    if (
      newErrors.username ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields!");
      return;
    }

    if (!values.email.includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      toast.error("Please enter a valid email address!");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      }));
      toast.error("Passwords do not match!");
      return;
    }

    axios.defaults.withCredentials = true;

    axios
      .post("/api/users/register/", values)
      .then((res) => {
        console.log(res);
        setErrors({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        Navigate("/LoginPage");
      })
      .catch((err) => {
        console.error(err);

        const res = err.response;

        if (!res) {
          toast.error("No response from server!");
          return;
        }

        const msg = res.data?.message || "An unexpected error occurred";
        toast.error(msg);

        if (res.data?.error) {
          setErrors((prev) => ({
            ...prev,
            ...res.data.error,
          }));
        }
      });
  };

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
              <h1 className="text-3xl font-lg font-bold leading-tight tracking-tight text-center font-heading">
                CREATE ACCOUNT
              </h1>
              <p className="text-sm text-gray-500 text-center">
                Spice up your life with flavorful, savory spices.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleCreateUser}>
              <TextInput
                label="Email"
                type="email"
                value={values.email}
                onChange={(val) => setValues({ ...values, email: val })}
                placeholder="name@example.com"
                error={errors.email}
              />

              <TextInput
                label="Username"
                type="text"
                value={values.username}
                onChange={(val) => setValues({ ...values, username: val })}
                placeholder="username"
                error={errors.username}
              />

              <PasswordInput
                label="Password"
                value={values.password}
                onChange={(val) => setValues({ ...values, password: val })}
                placeholder="********"
                error={errors.password}
              />

              <PasswordInput
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={(val) =>
                  setValues({ ...values, confirmPassword: val })
                }
                placeholder="********"
                error={errors.confirmPassword}
              />

              <PrimaryButton type="submit">Register</PrimaryButton>

              <p className="text-xs text-gray-500 text-center">
                A verification email will be sent to confirm your account.
              </p>

              <PromptLink
                promptText="Already have an account?"
                linkText="SIGN IN"
                to="/LoginPage"
              />

              <p className="text-xs text-gray-400 text-center">
                By clicking Register, you agree to our{" "}
                <a href="#" className="underline hover:text-[#d47849]">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-[#d47849]">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
      <Toaster richColors />
    </>
  );
}

export default RegistrationPage;
