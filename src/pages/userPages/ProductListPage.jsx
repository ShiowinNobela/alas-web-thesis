import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/bigComponents/ProductCard.jsx';
import Cart from '@/components/bigComponents/Cart.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import useCartStore from '@/stores/cartStore';
import useUserStore from '@/stores/userStore';
import { Toaster } from 'sonner';
import { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';

function ProductPage() {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-neutral min-h-screen">
      <div className="flex">
        <div className="mx-auto h-screen flex-1 overflow-y-auto">
          <div className="flex flex-col items-center justify-center py-8">
            <h1 className="font-heading text-4xl">Our Sauce Collection</h1>
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
          <div className="hidden lg:block sticky top-0 h-auto w-64 overflow-y-auto border-l border-gray-200 bg-white">
            <Cart />
          </div>
        )}
      </div>    
      {isLoggedIn && (
        <button
          onClick={toggleCart}
          className="lg:hidden fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <ShoppingCart size={24} />
        </button>
      )}


      {isLoggedIn && isCartOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/50" onClick={toggleCart}>
          <div className="fixed right-0 top-0 h-full w-60 max-w-[90vw] bg-white shadow-lg transform transition-transform z-[60]">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="h-[calc(100vh-80px)] overflow-y-auto">
              <Cart />
            </div>
          </div>
        </div>
      )}

      <Toaster richColors position="top-center" />
    </div>
  );
}

export default ProductPage;
