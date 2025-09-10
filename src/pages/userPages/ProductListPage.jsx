import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/bigComponents/ProductCard.jsx';
import useUserStore from '@/stores/userStore';
import { Card } from 'flowbite-react';
import ErrorState from '@/components/States/ErrorState';
import LoadingModal from '@/components/modals/LoadingModal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

function ProductPage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;
  const [open, setOpen] = useState(false);

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
          <div className="flex flex-col items-center justify-center py-10">
            <h1 className="font-heading text-content px-4 text-3xl md:text-5xl">Our Flavorful Lineup</h1>
            <p className="text-lighter text-lg">From mild to wild - find your perfect heat level</p>
            <Button onClick={() => setOpen(true)}>Open Loading Modal</Button>
          </div>
          <div className="flex-l mx-auto max-w-6xl pb-20 md:px-4">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {[...Array(10)].map((_, index) => (
                  <Card key={index} className="animate-pulse ring-1">
                    <div className="h-48 rounded-t-lg bg-gray-300"></div>
                    <div className="space-y-3 p-4">
                      <div className="h-6 rounded bg-gray-300"></div>
                      <div className="flex items-center justify-between">
                        <div className="h-6 w-1/3 rounded bg-gray-300"></div>
                        <div className="h-6 w-1/3 rounded bg-gray-300"></div>
                      </div>
                      <div className="h-10 rounded bg-gray-300"></div>
                    </div>
                  </Card>
                ))}
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
      <LoadingModal isOpen={open} onClose={setOpen} />
    </div>
  );
}

export default ProductPage;
