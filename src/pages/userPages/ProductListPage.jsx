import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/bigComponents/ProductCard.jsx';
import useUserStore from '@/stores/userStore';
import ErrorState from '@/components/States/ErrorState';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';

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
        <div className="mx-auto h-full flex-1">
          <div className="flex flex-col items-center justify-center pt-10 pb-7">
            <h1 className="font-heading text-content px-4 text-3xl md:text-5xl">Our Flavorful Lineup</h1>
            <p className="text-lighter p-4 text-center text-lg">From mild to wild - find your perfect heat level</p>
          </div>
          <div className="flex-l mx-auto max-w-6xl pb-20 md:px-4">
            {isLoading ? (
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : isError ? (
              <ErrorState error={isError} onRetry={refetch} title="Failed to load Products" retryText="Retry Request" />
            ) : (
              <div className="mx-auto max-w-7xl px-1">
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
  );
}

export default ProductPage;
