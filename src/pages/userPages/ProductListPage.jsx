import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/bigComponents/ProductCard.jsx';
import useUserStore from '@/stores/userStore';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import { Card } from 'flowbite-react';
import ErrorState from '@/components/States/ErrorState';


function ProductPage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  const {
    data: products = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['products'],
    staleTime: 5 * 60 * 1000,
    retry: 2,
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
    <ErrorBoundary>

    <div className="h-full bg-neutral">
      <div className="flex pb-40">
        <div className="flex-1 h-full mx-auto">
          <div className="flex flex-col items-center justify-center py-10">
            <h1 className="px-4 text-3xl font-heading text-content md:text-5xl">Our Flavorful Lineup</h1>
            <p className="text-lg text-lighter">From mild to wild - find your perfect heat level</p>
          </div>
          <div className="max-w-6xl pb-20 mx-auto flex-l md:px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {[...Array(10)].map((_, index) => (
                  <Card key={index} className="ring-1 animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-300 rounded"></div>
                      <div className="flex items-center justify-between">
                        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                        <div className="w-1/3 h-6 bg-gray-300 rounded"></div>
                      </div>
                      <div className="h-10 bg-gray-300 rounded"></div>
                    </div>
                  </Card>
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
              <div className="px-1 mx-auto max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
}

export default ProductPage;
