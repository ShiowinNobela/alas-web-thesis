import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import PasswordInput from '@/components/bigComponents/PasswordInput';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/bigComponents/TextInput';
import PromptLink from '@/components/bigComponents/PromptLink';
import Logo from '/logo-alas1.jpg';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async (event) => {
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

    try {
      // Step 1: Log in and set cookie
      await axios.post('/api/users/login/', { username, password }, { withCredentials: true });

      // Step 2: Fetch current user using the cookie
      const res = await axios.get('/api/users', { withCredentials: true });
      const userData = res.data;

      // Optional: store user info (no tokens)
      window.localStorage.setItem('user', JSON.stringify(userData));

      // Step 3: Redirect
      if (userData.role_name === 'admin' || userData.role_name === 'staff') {
        window.location.href = '/Admin/DashBoard';
      } else {
        window.location.href = '/ProductListPage';
      }
    } catch (err) {
      const res = err.response;

      if (!res) {
        toast.error('No response from server!');
        return;
      }

      if (res.status === 401) {
        toast.error('Invalid credentials!');
        return;
      }

      const msg = res.data?.message || 'Unexpected error';
      toast.error(msg);

      if (res.data?.error) {
        setErrors((prev) => ({
          ...prev,
          ...res.data.error,
        }));
      }
    }
  };

  useEffect(() => {
    // Optional auto-redirect if user already in localStorage
    const userRaw = window.localStorage.getItem('user');
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        if (user?.role_name === 'admin') {
          window.location.href = '/Admin/DashBoard';
        } else {
          window.location.href = '/';
        }
      } catch {
        window.localStorage.removeItem('user'); // Clean up corrupted data
      }
    }
  }, []);

  return (
    <>
      <section className="bg-neutral flex min-h-screen items-center justify-center px-4 py-8 pb-30">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"></div>
          <div className="absolute top-40 right-20 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-red-200 to-pink-300 opacity-20 delay-1000"></div>
          <div className="absolute bottom-40 left-20 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-orange-200 to-red-300 opacity-20 delay-500"></div>
        </div>
        <Card className="text-content w-full max-w-md p-4 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <img src={Logo} alt="Alas Delis Logo" className="mx-auto h-20 w-20 shrink-0 object-contain" />

              <h1 className="text-content font-heading text-center text-3xl leading-tight font-bold tracking-tight">
                SIGN IN
              </h1>
              <p className="text-center text-sm text-gray-500">Welcome to Alas Delis and Spices.</p>
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
                <a href="#" className="text-primary text-sm font-medium hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="font-heading w-full! uppercase">
                Sign In
              </Button>

              <PromptLink promptText="Don’t have an account yet?" linkText="Create an account" to="/RegPage" />

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
    </>
  );
}

export default LoginPage;
