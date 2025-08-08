import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Flame, ShoppingCart, Star } from 'lucide-react';
import BackButton from '@/components/bigComponents/BackButton';
import AddToCartModal from '@/components/modals/AddToCartModal';
import { useAddToCart } from '@/hooks/useAddToCart';
import { Toaster } from 'sonner';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { open, setOpen, quantity, setQuantity, handleAdd, handleAddToCart } =
    useAddToCart();

  useEffect(() => {
    axios
      .get('/api/products/' + id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-neutral min-h-screen">
      <section className="text-lighter overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-8">
          <div className="mb-4 w-full lg:w-1/2">
            <BackButton />
          </div>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <img
                src={product.image}
                alt={product.name || 'Product image'}
                className="h-64 w-full rounded object-cover object-center lg:h-auto"
              />
            </div>

            {/* Product details */}
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="text-lighter text-sm tracking-widest">
                {product.category}
              </h2>
              <h1 className="font-heading text-content mb-1 text-3xl">
                {product.name}
              </h1>
              <div className="mb-4 flex">
                <span className="flex items-center">
                  <Star className="size-5 fill-yellow-400 text-black" />
                  <Star className="size-5 fill-yellow-400 text-black" />
                  <Star className="size-5 fill-yellow-400 text-black" />
                  <Star className="size-5 fill-yellow-400 text-black" />
                  <Star className="size-5" />
                  <span className="text-lighter ml-3">(4 Reviews)</span>
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="mt-6 mb-5 flex items-center border-b-2 border-gray-100 pb-5">
                <div className="flex">
                  <span className="mr-3">Spice Level</span>
                  <Flame className="size-5 fill-amber-500 text-red-400" />
                  <Flame className="size-5 fill-amber-500 text-red-400" />
                  <Flame className="size-5 fill-amber-500 text-red-400" />
                </div>
              </div>
              <div className="flex">
                <span className="title-font text-content text-2xl font-medium">
                  ₱ {parseFloat(product.price).toFixed(2)}
                </span>
                <Button
                  onClick={handleAdd}
                  className="ml-auto flex gap-2 px-10"
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
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default ProductDetailsPage;
