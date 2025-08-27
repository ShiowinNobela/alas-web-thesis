import { MilkOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function ProductErrorState({ onRetry }) {
  return (
    <Card className="mx-auto max-w-2xl p-10 text-center shadow-sm">
      <div className="flex flex-col items-center gap-6">
        <MilkOff className="size-40 text-slate-400" />
        <div>
          <h2 className="text-content text-2xl font-semibold">
            Unable to load products
          </h2>
          <p className="text-lighter mt-3 text-base leading-relaxed">
            Something went wrong while fetching our sauces. This might be due to
            a weak internet connection, a temporary issue with our servers, or a
            glitch in the app. Please try again in a moment and see if that
            fixes it.
          </p>
        </div>
        <Button onClick={onRetry} className="mt-2">
          Retry
        </Button>
      </div>
    </Card>
  );
}

export default ProductErrorState;
