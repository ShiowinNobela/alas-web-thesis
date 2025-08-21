import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/bigComponents/ProductCard.jsx';
import Cart from '@/components/bigComponents/Cart.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import useCartStore from '@/stores/cartStore';
import useUserStore from '@/stores/userStore';

function ProductPage() {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('/api/products');
      return res.data;
    },
  });

  const handleAddToCart = (product, quantity = 1) => {
    if (!isLoggedIn) {
      navigate('/LoginPage');
      return;
    }

    addItem(product, quantity);
  };

  return (
    <div className="bg-neutral min-h-screen">
      <div className="flex">
        <div className="mx-auto h-screen flex-1 overflow-y-auto">
          <div className="flex flex-col items-center justify-center py-8">
            <h1 className="font-heading text-content text-4xl">
              Our Flavorful Lineup
            </h1>
            <p className="text-lighter text-lg">
              From mild to wild - find your perfect heat level
            </p>
          </div>
          <div className="flex-l mx-auto max-w-6xl px-4 pb-20">
            {isLoading ? (
              <Skeleton className="h-[20px] w-[100px] rounded-full" />
            ) : isError ? (
              <p className="text-center">Failed to load products.</p>
            ) : (
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {isLoggedIn && (
          <div className="sticky top-0 hidden h-auto w-64 overflow-y-auto border-l border-gray-200 bg-white lg:block">
            <Cart />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
