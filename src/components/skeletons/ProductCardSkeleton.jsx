import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Card } from '@/components/ui/card';

function ProductCardSkeleton() {
  return (
    <Card className="flex flex-row items-start gap-4 rounded-lg p-4 shadow-sm">
      <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-1/2" />

        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </Card>
  );
}

export default ProductCardSkeleton;
