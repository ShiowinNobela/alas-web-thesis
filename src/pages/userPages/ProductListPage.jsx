import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/cards/ProductCard.jsx';
import useUserStore from '@/stores/userStore';
import ErrorState from '@/components/States/ErrorState';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';

import { Button } from '@/components/ui/button';
import { Filter, Flame, Milk, PhilippinePeso } from 'lucide-react';
// import { Milk } from 'lucide-react';

function ProductPage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1200)); // Loading simulation
      const res = await axios.get('/api/products');
      return res.data;
    },
  });

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/LoginPage');
      return;
    }
  };

  return (
    <div className="bg-neutral h-full">
      <div className="flex pb-40">
        <div className="relative h-full flex-1">
          {/* Should only appear on dev for now */}

          <div className="flex items-center justify-between py-10 pr-4 pl-6 md:px-20">
            <div>
              <h1 className="font-heading text-content text-3xl font-semibold md:text-4xl">Alas Menu and Spices</h1>
              <p className="text-lighter mt-2">From mild to wild - find your perfect heat level</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="lg" className="py-7">
                <Milk className="size-8" />
              </Button>
              <Button variant="outline" size="lg" className="py-7">
                <Flame className="size-8" />
              </Button>
              <Button variant="outline" size="lg" className="py-7">
                <PhilippinePeso className="size-8" />
              </Button>
              <Button variant="outline" size="lg" className="py-7">
                <Filter className="size-8" />
              </Button>
            </div>
          </div>

          {isLoggedIn ? (
            <div className="pr-4 pb-20 pl-6 md:px-20">
              {isLoading ? (
                <div className="grid grid-cols-2 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : isError ? (
                <ErrorState
                  error={isError}
                  onRetry={refetch}
                  title="Failed to load Products"
                  retryText="Retry Request"
                />
              ) : (
                <div className="grid grid-cols-2 md:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="pr-4 pb-20 pl-6 md:px-20">
              {isLoading ? (
                <div className="grid grid-cols-3 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : isError ? (
                <ErrorState
                  error={isError}
                  onRetry={refetch}
                  title="Failed to load Products"
                  retryText="Retry Request"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
