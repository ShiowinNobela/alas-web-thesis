import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import PasswordInput from '@/components/bigComponents/PasswordInput';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/bigComponents/TextInput';
import PromptLink from '@/components/bigComponents/PromptLink';
import useUserStore from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated, fetchUser } = useUserStore();

  const handleLogin = async (event) => {
    event.preventDefault();

    const newErrors = {
      username: username.trim() ? '' : 'Username is required',
      password: password.trim() ? '' : 'Password is required',
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      toast.warning('Please fill in all required fields!');
      return;
    }

    try {
      setLoading(true);

      await axios.post('/api/users/login/', { username, password }, { withCredentials: true });
      toast.success('Login successful!');
      await fetchUser();
    } catch (err) {
      const res = err.response;

      if (!res) {
        toast.error('No response from server!');
      } else if (res.status === 401) {
        toast.error('Invalid credentials!');
      } else if (res.status === 429) {
        toast.error('Too many login attempts. Please try again later.');
      } else {
        const msg = res.data?.message || 'Unexpected error';
        toast.error(msg);

        if (res.data?.error) {
          setErrors((prev) => ({ ...prev, ...res.data.error }));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (user.role_name === 'admin' || user.role_name === 'staff') {
      navigate('/Admin/DashBoard');
    } else {
      navigate('/user/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <section className="bg-neutral flex min-h-screen items-center justify-center px-4 py-8 pb-30">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">{/* ...background effects... */}</div>
      <Card className="text-content w-full max-w-md p-4 sm:p-8">
        <div className="space-y-6">
          <div className="space-y-1">
            <img
              src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
              alt="Alas Delis Logo"
              className="mx-auto h-20 w-20 object-contain"
            />
            <h1 className="text-content font-heading text-center text-3xl font-bold">SIGN IN</h1>
            <p className="text-lighter text-center text-sm">Welcome to Alas Delis and Spices.</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <TextInput
              label="Username"
              type="text"
              value={username}
              onChange={setUsername}
              placeholder="username"
              error={errors.username}
              disabled={loading}
            />

            <PasswordInput
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="********"
              error={errors.password}
              showRequirements={false}
              disabled={loading}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" disabled={loading} />
                Remember me
              </label>
              <button
                type="button"
                className="text-primary cursor-pointer border-none bg-transparent p-0 text-sm font-medium hover:underline"
                onClick={() => toast.info('Forgot password functionality coming soon!')}
                disabled={loading}
                aria-label="Forgot password"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="font-heading w-full uppercase" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <PromptLink promptText="Don’t have an account yet?" linkText="Create an account" to="/RegPage" />

            <p className="text-lighter text-center text-xs">
              By clicking continue, you agree to our{' '}
              <a href="/terms-of-service" className="hover:text-primary underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" className="hover:text-primary underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </Card>
    </section>
  );
}

export default LoginPage;
