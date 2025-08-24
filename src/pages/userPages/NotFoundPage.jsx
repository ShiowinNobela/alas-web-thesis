import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle, CircleQuestionMark } from 'lucide-react';

function NotFoundPage() {
  return (
    <section className="bg-neutral min-h-screen p-8">
      <CircleQuestionMark className="text-primary size-10" />
      <div className="flex items-center gap-2">
        <AlertTriangle className="text-primary" />
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      </div>
      <p className="mt-2 text-gray-600">
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
