import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import TextInput from '../components/TextInput';
import PromptLink from '../components/PromptLink';
import PasswordInput from '@/components/PasswordInput';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    axios.defaults.withCredentials = true;

    // axios.interceptors.response.use(
    //   (res) => res,
    //   (error) => {
    //     if (error.response?.status === 401) {
    //       localStorage.removeItem('user');
    //       window.location.href = '/LoginPage';
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  }, []);

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

  useEffect(() => {
    const userRaw = window.localStorage.getItem('user');
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        if (user?.role_name === 'admin') {
          window.location.href = '/Admin/DashBoard';
        } else if (user?.token) {
          window.location.href = '/';
        }
      } catch {
        window.localStorage.removeItem('user'); // Corrupted
      }
    }
  }, []);

  return (
    <>
      <section className="flex min-h-full flex-row items-center justify-start gap-4 px-4 py-8 sm:justify-center">
        <Card className="text-content w-full max-w-md rounded-md p-6 shadow-sm sm:p-8">
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
                showRequirements={false}
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

              <Button type="submit" className="font-heading w-full! uppercase">
                Sign In
              </Button>

              <PromptLink
                promptText="Don’t have an account yet?"
                linkText="Create an account"
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
        </Card>
      </section>
      <Toaster richColors visibleToasts={1} />
    </>
  );
}

export default LoginPage;
