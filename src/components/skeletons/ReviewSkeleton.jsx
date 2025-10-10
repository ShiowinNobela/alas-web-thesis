import { Skeleton } from '@/components/ui/skeleton';

function ReviewSkeleton({ items = 3 }) {
  return (
    <div className="space-y-6">
      {[...Array(items)].map((_, idx) => (
        <div key={idx} className="pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            
            {/* Star placeholders */}
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded-full" />
            ))}
            <Skeleton className="w-20 h-4 ml-2" />
          </div>
          <Skeleton className="w-32 h-4 mb-2" /> 
          <Skeleton className="w-full h-4" />   
          <Skeleton className="w-5/6 h-4" />  
        </div>
      ))}
    </div>
  );
}

export default ReviewSkeleton;
