import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/cards/ProductCard.jsx';
import useUserStore from '@/stores/userStore';
import ErrorState from '@/components/States/ErrorState';
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

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
        <div className="relative mx-auto h-full flex-1">
          <div className="flex flex-col items-center justify-center pt-10 pb-5">
            <h1 className="font-heading text-content px-4 text-3xl font-semibold md:text-5xl">Our Flavorful Lineup</h1>
            <p className="text-lighter p-4 text-center text-lg">From mild to wild - find your perfect heat level</p>
          </div>

          {/* Should only appear on dev for now */}
          {import.meta.env.MODE !== 'production' && (
            <div className="absolute top-0 left-0">
              <Drawer direction="left">
                <DrawerTrigger>
                  <Button>Open Filter Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>
                      Drawer Component I plan to add as a filter of this menu page because we dont have space anymore
                    </DrawerTitle>
                    <DrawerDescription>If someone is up to this then please do</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button className="w-full">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          )}

          <div className="flex-l mx-auto max-w-6xl pb-20 md:px-4">
            {isLoading ? (
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : isError ? (
              <ErrorState error={isError} onRetry={refetch} title="Failed to load Products" retryText="Retry Request" />
            ) : (
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 md:gap-6">
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
