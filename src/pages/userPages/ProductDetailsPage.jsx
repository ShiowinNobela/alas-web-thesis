import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Flame, ShoppingCart, Star } from 'lucide-react';
import BackButton from '@/components/bigComponents/BackButton';
import AddToCartModal from '@/components/modals/AddToCartModal';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useQuery } from '@tanstack/react-query';
import NotFoundPage from './NotFoundPage';
import ImageWithTextSkeleton from '@/components/skeletons/ImageWithTextSkeleton';

function ProductDetailsPage() {
  const { id } = useParams();
  const { open, setOpen, quantity, setQuantity, handleAdd, handleAddToCart } =
    useAddToCart();

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['product', id],
    staleTime: 5 * 60 * 1000,
    retry: 2,
    queryFn: async () => {
      const res = await axios.get(`/api/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <>
      {ImageWithTextSkeleton({ 
        imageHeight: "h-64 lg:h-auto", 
        imageWidth: "w-full lg:w-1/2",
        imageRounded: "rounded",
      })}
      </>
    );
  }

  if (isError) {
    if (error.response?.status === 404) {
      return <NotFoundPage />;
    }
    return <div>Error loading product</div>;
  }

  return (
    <div className="min-h-screen bg-neutral">
      <section className="overflow-hidden text-lighter">
        <div className="max-w-5xl px-5 py-8 mx-auto">
          <div className="w-full mb-4 lg:w-1/2">
            <BackButton />
          </div>


          
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <img
                src={product.image}
                alt={product.name || 'Product image'}
                className="object-cover object-center w-full h-64 rounded lg:h-auto"
              />
            </div>

            {/* Product details */}
            <div className="w-full mt-6 lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="text-sm tracking-widest text-lighter">
                {product.category}
              </h2>
              <h1 className="mb-1 text-3xl font-heading text-content">
                {product.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <Star className="text-black size-5 fill-yellow-400" />
                  <Star className="text-black size-5 fill-yellow-400" />
                  <Star className="text-black size-5 fill-yellow-400" />
                  <Star className="text-black size-5 fill-yellow-400" />
                  <Star className="size-5" />
                  <span className="ml-3 text-lighter">(4 Reviews)</span>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex items-center pb-5 mt-6 mb-5 border-b-2 border-gray-100">
                <div className="flex">
                  <span className="mr-3">Spice Level</span>
                  <Flame className="text-red-400 size-5 fill-amber-500" />
                  <Flame className="text-red-400 size-5 fill-amber-500" />
                  <Flame className="text-red-400 size-5 fill-amber-500" />
                </div>
              </div>
              <div className="flex">
                <span className="text-2xl font-medium title-font text-content">
                  ₱ {parseFloat(product.price).toFixed(2)}
                </span>
                <Button
                  onClick={handleAdd}
                  className="flex gap-2 px-10 ml-auto"
                >
                  <ShoppingCart className="size-4" />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AddToCartModal
        open={open}
        setOpen={setOpen}
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        onConfirm={() => handleAddToCart(product, quantity)}
      />
    </div>
  );
}

export default ProductDetailsPage;
