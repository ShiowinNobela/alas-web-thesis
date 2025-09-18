import { MessageSquare } from 'lucide-react'; // icon for reviews
import { Button } from '@/components/ui/button';

const ReviewPage = () => {
  return (
    <div className="bg-neutral flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Icon */}
      <MessageSquare className="text-muted-foreground mb-4 h-16 w-16" />

      {/* Title */}
      <h1 className="font-heading text-content mb-2 text-3xl font-bold">Review Page</h1>

      {/* Subtitle */}
      <p className="text-muted-foreground mb-6 max-w-md">
        This is a placeholder for the Review Page. Here, users will be able to read and edit their reviews about our
        products.
      </p>

      {/* Action button */}
      <Button>Go Back Home</Button>
    </div>
  );
};

export default ReviewPage;
