import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Card } from '@/components/ui/card';

function ProductCardSkeleton() {
  return (
    <Card className="group z-10 flex flex-col gap-5 border-0 bg-white p-4">
      {/* Image placeholder */}
      <div className="relative overflow-hidden rounded-md p-2">
        <Skeleton className="h-40 w-full rounded-md" />
      </div>

      {/* Info placeholders */}
      <div className="mt-2 flex-1 space-y-2 text-left">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Button placeholder */}
      <Skeleton className="mt-2 h-8 w-full rounded-md" />

      {/* Price + Add to Cart */}
      <div className="mt-2 flex items-center justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </Card>
  );
}

export default ProductCardSkeleton;
