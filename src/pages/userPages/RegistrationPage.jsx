import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '@/components/bigComponents/TextInput';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PromptLink from '@/components/bigComponents/PromptLink';
import PasswordInput from '@/components/bigComponents/PasswordInput';

function RegistrationPage() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      username: values.username.trim() ? '' : 'Username is required',
      email: values.email.trim() ? '' : 'Email is required',
      password: values.password.trim() ? '' : 'Password is required',
      confirmPassword: values.confirmPassword.trim() ? '' : 'Confirm Password is required',
    };

    if (newErrors.username || newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
      toast.error('Please fill in all required fields!');
      return;
    }

    if (!values.email.includes('@')) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
      toast.error('Please enter a valid email address!');
      return;
    }

    if (values.password !== values.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        password: 'Passwords do not match',
        confirmPassword: 'Passwords do not match',
      }));
      toast.error('Passwords do not match!');
      return;
    }

    axios.defaults.withCredentials = true;

    axios
      .post('/api/users/register/', values)
      .then(() => {
        setErrors({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        Navigate('/login');
      })
      .catch((err) => {
        const res = err.response;

        if (!res) {
          toast.error('No response from server!');
          return;
        }

        const msg = res.data?.message || 'An unexpected error occurred';
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
      <section className="bg-neutral flex min-h-screen items-center justify-center px-4 py-8 pb-30">
        <Card className="text-content w-full max-w-md p-4 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
                alt="Alas Delis Logo"
                className="mx-auto h-20 w-20 shrink-0 object-contain"
              />
              <h1 className="font-lg font-heading text-center text-3xl leading-tight font-bold tracking-tight">
                CREATE ACCOUNT
              </h1>
              <p className="text-lighter text-center text-sm">Spice up your life with flavorful, savory spices.</p>
            </div>

            <form className="space-y-4" onSubmit={handleCreateUser}>
              <TextInput
                label="Email"
                type="email"
                value={values.email}
                onChange={(val) => {
                  setValues((prev) => ({ ...prev, email: val }));
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="name@example.com"
                error={errors.email}
              />

              <TextInput
                label="Username"
                type="text"
                value={values.username}
                onChange={(val) => {
                  setValues((prev) => ({ ...prev, username: val }));
                  setErrors((prev) => ({ ...prev, username: '' }));
                }}
                placeholder="username"
                error={errors.username}
              />

              <PasswordInput
                label="Input Password"
                value={values.password}
                onChange={(val) => {
                  setValues({ ...values, password: val });
                  setErrors((prev) => ({
                    ...prev,
                    password: val.trim() ? '' : 'Password is required',
                    confirmPassword:
                      values.confirmPassword && val !== values.confirmPassword ? 'Passwords do not match' : '',
                  }));
                }}
                placeholder="********"
                error={errors.password}
              />

              <PasswordInput
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={(val) => {
                  setValues({ ...values, confirmPassword: val });
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: val.trim()
                      ? val !== values.password
                        ? 'Passwords do not match'
                        : ''
                      : 'Confirm Password is required',
                  }));
                }}
                placeholder="********"
                error={errors.confirmPassword}
                showRequirements={false}
              />

              <Button type="submit" className="font-heading w-full! uppercase">
                Register
              </Button>

              <p className="text-center text-xs">A verification email will be sent to confirm your account.</p>

              <PromptLink promptText="Already have an account?" linkText="SIGN IN" to="/login" />

              <p className="text-lighter text-center text-xs">
                By clicking Register, you agree to our{' '}
                <a href="/terms-and-conditions" className="hover:text-primary underline">
                  Terms and Conditions
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
    </>
  );
}

export default RegistrationPage;
