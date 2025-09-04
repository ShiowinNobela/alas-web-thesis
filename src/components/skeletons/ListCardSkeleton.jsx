import { Skeleton } from '@/components/ui/skeleton.jsx';

function ListCardSkeleton({ items = 5 }) {
  return (
    <div className="max-w-md p-4 space-y-4 bg-white border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      {[...Array(items)].map((_, idx) => (
        <div key={idx} className={`flex items-center justify-between ${idx !== 0 ? 'pt-4' : ''}`}>
          <div>
            <Skeleton className="h-2.5 w-24 mb-2.5 rounded-full bg-gray-300 dark:bg-gray-600" />
            <Skeleton className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <Skeleton className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}

export default ListCardSkeleton;