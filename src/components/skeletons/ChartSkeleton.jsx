import { Skeleton } from '@/components/ui/skeleton.jsx';

function ChartSkeleton() {
  return (
    <Skeleton className="lg:col-span-4">
      <Skeleton className="h-64 w-100 rounded-xl" />;
    </Skeleton>
  );
}

export default ChartSkeleton;
