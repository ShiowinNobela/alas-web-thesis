import { Skeleton } from '@/components/ui/skeleton.jsx';

function CardSkeleton({ height = 'h-24', width = 'w-full', className = '' }) {
  return (
    <Skeleton className={`rounded-xl ${width} ${height} ${className}`}>
      <Skeleton className="mb-2 h-6 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
    </Skeleton>
  );
}

export default CardSkeleton;
