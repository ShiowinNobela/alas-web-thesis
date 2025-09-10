import { Skeleton } from '@/components/ui/skeleton';

function ProductDetailsSkeleton() {
  return (
    <div className="bg-neutral min-h-screen">
      <section className="text-lighter overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-8">
          <div className="mt-14 flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-64 w-full rounded object-cover object-center lg:h-[440px]" />
            </div>

            {/* Right: Product details */}
            <div className="mt-6 w-full space-y-6 lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              {/* Category */}
              <Skeleton className="h-4 w-28" />

              {/* Product name */}
              <Skeleton className="h-8 w-2/3" />

              {/* Rating */}
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-5 rounded-full" />
                ))}
                <Skeleton className="ml-3 h-4 w-20" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Spice level */}
              <div className="flex items-center gap-3 border-b-2 border-gray-100 pb-5">
                <Skeleton className="h-4 w-20" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-5 rounded-full" />
                ))}
              </div>

              {/* Price + Button */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="ml-auto h-10 w-36 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailsSkeleton;
