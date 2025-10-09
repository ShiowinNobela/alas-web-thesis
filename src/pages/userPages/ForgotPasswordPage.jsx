import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/bigComponents/TextInput';
import PasswordInput from '@/components/bigComponents/PasswordInput';
import PromptLink from '@/components/bigComponents/PromptLink';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = () => {
    // TODO: add send code logic here
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      toast.warning('Please enter your email address!');
      return;
    }
    
    if (!email.includes('@')) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      toast.error('Please enter a valid email address!');
      return;
    }
    
    setErrors(prev => ({ ...prev, email: '' }));
    
    // TODO: Implement actual send code logic
    toast.success('Verification code sent to your email!');
  };

  const handleVerifyCode = () => {
    // TODO: add code verification logic here
    if (!code.trim()) {
      setErrors(prev => ({ ...prev, code: 'Verification code is required' }));
      toast.warning('Please enter the verification code!');
      return;
    }
    
    setErrors(prev => ({ ...prev, code: '' }));
    
    // TODO: Implement actual code verification
    setStep(2);
    toast.success('Code verified! Please set your new password.');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    // TODO: add password reset logic here
    const newErrors = {
      password: newPassword.trim() ? '' : 'Password is required',
      confirmPassword: confirmPassword.trim() ? '' : 'Confirm Password is required',
    };

    if (newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
      toast.warning('Please fill in all required fields!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({
        password: 'Passwords do not match',
        confirmPassword: 'Passwords do not match',
      });
      toast.error('Passwords do not match!');
      return;
    }

    setErrors({ email: '', code: '', password: '', confirmPassword: '' });
    
    // TODO: Implement actual password reset
    toast.success('Password reset successfully!');
    navigate('/LoginPage');
  };

  return (
    <section className="flex items-center justify-center min-h-screen px-4 py-8 bg-neutral pb-30">
      <Card className="w-full max-w-md p-4 text-content sm:p-6">
        <div className="space-y-6">
          <div className="space-y-3 text-center">
            <img
              src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
              alt="Alas Delis Logo"
              className="object-contain w-16 h-16 mx-auto sm:w-20 sm:h-20"
            />
            <h1 className="text-2xl font-bold text-center text-content font-heading sm:text-3xl">
              {step === 1 ? 'FORGOT PASSWORD' : 'RESET PASSWORD'}
            </h1>
            <p className="text-sm text-center text-lighter sm:text-base">
              {step === 1
                ? 'Enter your email to receive a verification code.'
                : 'Set your new password to continue.'}
            </p>
          </div>

          {step === 1 && (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <TextInput
                label="Email"
                type="email"
                value={email}
                onChange={(val) => {
                  setEmail(val);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="name@example.com"
                error={errors.email}
                disabled={loading}
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-content">Verification Code</label>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                        setErrors((prev) => ({ ...prev, code: '' }));
                      }}
                      placeholder="Enter code"
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleSendCode} 
                    disabled={loading}
                    className="h-10 sm:w-auto whitespace-nowrap shrink-0 "
                  >
                    Send Code
                  </Button>
                </div>
                {errors.code && (
                  <p className="mt-1 text-sm text-red-500">{errors.code}</p>
                )}
              </div>
              
              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <Button
                type="button"
                className="w-full h-10 uppercase font-heading"
                onClick={handleVerifyCode}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </Button>


              <PromptLink promptText="Back to" linkText="SIGN IN" to="/LoginPage" />
            </form>
          )}

          {step === 2 && (
            <form className="space-y-4" onSubmit={handleResetPassword}>
              <PasswordInput
                label="New Password"
                value={newPassword}
                onChange={(val) => {
                  setNewPassword(val);
                  setErrors((prev) => ({ ...prev, password: '' }));
                }}
                placeholder="********"
                error={errors.password}
                disabled={loading}
              />

              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(val) => {
                  setConfirmPassword(val);
                  setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                placeholder="********"
                error={errors.confirmPassword}
                showRequirements={false}
                disabled={loading}
              />

              <Button 
                type="submit" 
                className="w-full uppercase font-heading" 
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>

              <PromptLink promptText="Back to" linkText="SIGN IN" to="/LoginPage" />
            </form>
          )}
        </div>
      </Card>
    </section>
  );
}

export default ForgotPasswordPage;