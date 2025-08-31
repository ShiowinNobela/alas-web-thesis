import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

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
      await axios.post('/api/users/login/', { username, password });

      navigate('/loading', { replace: true });
    } catch (err) {
      const res = err.response;

      if (!res) {
        toast.error('No response from server!');
      } else if (res.status === 401) {
        toast.error('Invalid credentials!');
      } else if (res.status === 403) {
        toast.error('Access forbidden. Please check your permissions.');
      } else {
        const msg = res.data?.message || 'Unexpected error';
        toast.error(msg);
      }

      if (res.data?.error) {
        setErrors((prev) => ({
          ...prev,
          ...res.data.error,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only auto-redirect if we're not in the middle of a login attempt
    const userRaw = window.localStorage.getItem('user');
    if (userRaw && !isLoading) {
      try {
        const user = JSON.parse(userRaw);
        if (user?.role_name === 'admin') {
          navigate('/Admin/DashBoard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch {
        window.localStorage.removeItem('user');
      }
    }
  }, [navigate, isLoading]);

  return (
    <>
      <section className="bg-neutral flex min-h-screen items-center justify-center px-4 py-8 pb-30">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"></div>
          <div className="absolute top-40 right-20 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-red-200 to-pink-300 opacity-20 delay-1000"></div>
          <div className="absolute bottom-40 left-20 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-orange-200 to-red-300 opacity-20 delay-500"></div>
        </div>
        <Card className="text-content w-full max-w-md sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <img
                src={Logo}
                alt="Alas Delis Logo"
                className="mx-auto h-20 w-20 shrink-0 object-contain"
              />

              <h1 className="text-content font-heading text-center text-3xl leading-tight font-bold tracking-tight">
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

              <Button
                type="submit"
                className="font-heading w-full! uppercase"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
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
    </>
  );
}

export default LoginPage;
