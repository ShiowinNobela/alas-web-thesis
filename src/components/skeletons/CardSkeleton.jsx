import { Skeleton } from '@/components/ui/skeleton.jsx';

function CardSkeleton({ height = "h-24", width = "w-full", className = "" }) {
  return (
    <div className={`rounded-xl bg-white shadow-sm p-4 ${width} ${height} ${className}`}>
      <Skeleton className="w-1/3 h-6 mb-2" />
      <Skeleton className="w-1/2 h-8" />
    </div>
  );
}

export default CardSkeleton;