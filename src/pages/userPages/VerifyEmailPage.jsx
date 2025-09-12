import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email...');

  //   useEffect(() => {
  //     setVerificationStatus('success');
  //     setMessage('Email verified successfully!');
  //   }, []);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      axios
        .get(`/api/users/verify-email`, { params: { token } })
        .then((res) => {
          setVerificationStatus('success');
          setMessage(res.data.message || 'Email verified successfully!');
        })
        .catch((err) => {
          console.error(err);
          setVerificationStatus('error');
          setMessage('Verification failed. Token may be invalid or expired.');
        });
    } else {
      setVerificationStatus('error');
      setMessage('No verification token found.');
    }
  }, [searchParams]);

  return (
    <div
      className="relative flex min-h-screen items-start justify-center p-4 sm:p-15"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/drq2wzvmo/image/upload/v1757687486/518272361_1069449178706167_7762680513728222205_n_sbufjz.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card content */}
      <Card className="bg-card relative z-10 w-full max-w-md p-8 text-center shadow-xl">
        {verificationStatus === 'loading' && <Loader2 className="text-primary mx-auto h-16 w-16 animate-spin" />}
        {verificationStatus === 'success' && <CheckCircle className="mx-auto h-16 w-16 text-green-500" />}
        {verificationStatus === 'error' && <XCircle className="mx-auto h-16 w-16 text-red-500" />}

        <h1 className="text-content font-heading mt-6 text-2xl">{message}</h1>

        {verificationStatus === 'success' && (
          <p className="text-lighter">You can now log in to your account and start exploring.</p>
        )}
        {verificationStatus === 'error' && (
          <p className="text-lighter">
            Please request a new verification email or contact support if the problem continues.
          </p>
        )}

        <div className="mt-2">
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default VerifyEmailPage;
