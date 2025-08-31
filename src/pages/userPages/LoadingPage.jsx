import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/stores/userStore';

function LoadingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, hasCheckedAuth, user } = useUserStore();
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTimedOut(true);
      navigate('/LoginPage', { replace: true });
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [navigate]);

  useEffect(() => {
    if (hasCheckedAuth) {
      if (isAuthenticated) {
        if (user?.role_name === 'admin') {
          navigate('/Admin/DashBoard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        navigate('/LoginPage', { replace: true });
      }
    }
  }, [isAuthenticated, hasCheckedAuth, navigate, user]);

  if (isTimedOut) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Login Timeout</h2>
          <p className="text-gray-500">Please try signing in again</p>
          <button
            onClick={() => navigate('/LoginPage')}
            className="text-brand mt-4 hover:underline"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-brand mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
        <h2 className="text-xl font-semibold">Signing you in...</h2>
        <p className="text-gray-500">Please wait a moment</p>
      </div>
    </div>
  );
}

export default LoadingPage;
