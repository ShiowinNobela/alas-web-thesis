import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Card } from '@/components/ui/card';

function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col rounded-xl p-4 shadow-sm">
      <div className="mb-4 flex w-full items-center justify-center overflow-hidden">
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-2 text-left">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="mt-2 h-5 w-24" />
        <div className="mt-4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </Card>
  );
}

export default ProductCardSkeleton;
