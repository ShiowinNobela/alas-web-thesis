import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
  import { AlertTriangle } from 'lucide-react';

function NotFoundPage() {
  return (
    <section className="bg-neutral min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-2 ">
        <AlertTriangle className="text-red-500 size-30" />
        <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      </div>
      <p className="mt-2 max-w-xl text-gray-600">
        The page you are looking for doesn’t exist, may have been moved, or the
        link you followed might be broken. Please check the URL or return to the
        homepage.
      </p>
      <Link to="/" className="mt-4 block">
        <Button size="lg">Go back to Home</Button>
      </Link>
    </section>
  );
}

export default NotFoundPage;
