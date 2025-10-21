import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import useUserStore from '@/stores/userStore';

function UnauthorizedPage() {
  const userRole = useUserStore((state) => state.user.role_name);

  const redirectUrl = userRole === 'admin' || userRole === 'staff' ? '/admin/dashboard' : '/';
  const buttonText = userRole === 'admin' || userRole === 'staff' ? 'Go to Admin Dashboard' : 'Go to Home';

  return (
    <section className="bg-admin flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-2 flex items-center justify-center gap-2">
        <AlertTriangle className="text-error size-30" />
        <h2 className="text-3xl font-bold">Unauthorized</h2>
      </div>
      <p className="mt-2 max-w-xl text-gray-600">
        You do not have permission to access this page. Please contact your administrator if you believe this is an
        error.
      </p>
      <Link to={redirectUrl} className="mt-4 block">
        <Button size="lg">{buttonText}</Button>
      </Link>
    </section>
  );
}

export default UnauthorizedPage;
