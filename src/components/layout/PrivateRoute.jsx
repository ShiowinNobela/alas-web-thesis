// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '@/stores/userStore';

const PrivateRoute = () => {
  const { isAuthenticated, hasCheckedAuth } = useUserStore();

  if (!hasCheckedAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h3 className=""> Loading...</h3>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/LoginPage" replace />;
};

export default PrivateRoute;
