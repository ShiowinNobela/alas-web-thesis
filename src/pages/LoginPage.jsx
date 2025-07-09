import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import PromptLink from '../components/PromptLink';
import PrimaryButton from '../components/PrimaryButton';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleLogin = (event) => {
    event.preventDefault();

    const newErrors = {
      username: username.trim() ? '' : 'Username is required',
      password: password.trim() ? '' : 'Password is required',
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      toast.error('Please fill in all required fields!');

      return;
    }

    axios.defaults.withCredentials = true;

    axios
      .post('/api/users/login/', {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem('user', JSON.stringify(response.data));

          return axios
            .get('/api/users', {
              headers: {
                Authorization: `Bearer ${response.data.token}`,
              },
            })
            .then((res) => {
              const userData = res.data;

              window.location.href =
                userData.role_name === 'admin' ? '/Admin/DashBoard' : '/';
            });
        }
      })
      .catch((err) => {
        const res = err.response;

        if (!res) {
          toast.error('No response from server!');
          return;
        }

        if (res.status === 401) {
          toast.error('Please input a valid account!');
          return;
        }

        // Show general message
        const msg = res.data?.message || 'An unexpected error occurred';
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

  if (window.localStorage.getItem('user')) {
    window.location.href = '/';
  }

  return (
    <>
      <section className="flex min-h-full flex-col items-center justify-start px-4 py-8 sm:justify-center">
        <div className="text-content bg-card w-full max-w-md rounded-lg p-6 shadow-md sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <img
                src="./src/components/images/logo-alas1.jpg"
                alt="Alas Delis Logo"
                className="mx-auto h-20 w-20 shrink-0 object-contain"
              />
              <h1 className="font-heading text-center text-3xl leading-tight font-bold tracking-tight">
                SIGN IN
              </h1>
              <p className="text-center text-sm text-gray-500">
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
                    className="focus:ring-primary h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-2"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-primary text-sm font-medium hover:underline"
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

              <p className="text-center text-xs text-gray-400">
                By clicking continue, you agree to our{' '}
                <a href="#" className="hover:text-primary underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="hover:text-primary underline">
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
