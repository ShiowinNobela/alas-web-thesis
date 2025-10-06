import { Skeleton } from '@/components/ui/skeleton.jsx';

function ListCardSkeleton({ items = 5 }) {
  return (
    <div className="max-w-md animate-pulse space-y-4 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6 dark:divide-gray-700 dark:border-gray-700">
      {[...Array(items)].map((_, idx) => (
        <div key={idx} className={`flex items-center justify-between ${idx !== 0 ? 'pt-4' : ''}`}>
          <div>
            <Skeleton className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600" />
            <Skeleton className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}

export default ListCardSkeleton;
