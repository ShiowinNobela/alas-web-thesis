import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Flame, ShoppingCart, Star, Heart } from 'lucide-react';
import BackButton from '@/components/bigComponents/BackButton';
import AddToCartModal from '@/components/modals/AddToCartModal';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NotFoundPage from './NotFoundPage';
import ProductDetailsSkeleton from '@/components/skeletons/ProductDetailsSkeleton';
import ReviewSkeleton from '@/components/skeletons/ReviewSkeleton';
import { showWishlistToast } from '@/components/toasts/WishlistToast';

function ProductDetailsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { open, setOpen, quantity, setQuantity, handleAdd, handleAddToCart } = useAddToCart();

  const [inWishlist, setInWishlist] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await axios.get(`/api/products/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], isLoading: isLoadingReviews } = useQuery({
    queryKey: ['product-reviews', id],
    queryFn: async () => {
      const res = await axios.get(`/api/reviews/${id}`);
      return res.data.data;
    },
  });

  const { data: wishlistStatus } = useQuery({
    queryKey: ['wishlist-check', id],
    queryFn: async () => {
      const res = await axios.get(`/api/wishlist/check/${id}`);
      return res.data.data.inWishlist;
    },
    enabled: !!product,
  });

  useEffect(() => {
    if (product) setWishlistCount(product.wishlist_count || 0);
    if (wishlistStatus !== undefined) setInWishlist(wishlistStatus);
  }, [product, wishlistStatus]);

  const toggleWishlistMutation = useMutation({
    mutationFn: async () => {
      if (inWishlist) {
        const res = await axios.delete(`/api/wishlist/${id}`);
        return res.data.data.wishlist_count;
      } else {
        const res = await axios.post(`/api/wishlist`, { product_id: id });
        return res.data.data.wishlist_count;
      }
    },
    onSuccess: (count) => {
      showWishlistToast(product.name, inWishlist ? 'remove' : 'add');
      setInWishlist(!inWishlist);
      setWishlistCount(count);
    },
  });

  const handleWishlistClick = () => {
    if (!toggleWishlistMutation.isLoading) {
      toggleWishlistMutation.mutate();
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError) {
    if (error.response?.status === 404) return <NotFoundPage />;
    return <div>Error loading product</div>;
  }

  return (
    <div className="min-h-screen bg-neutral">
      <section className="overflow-hidden text-lighter">
        <div className="max-w-5xl px-5 py-8 mx-auto">
          <div className="w-full mb-4 lg:w-1/2">
            <BackButton />
          </div>

          {/* Product section */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <img
                src={product.image}
                alt={product.name || 'Product image'}
                className="object-cover object-center w-full h-64 rounded-2xl lg:h-auto"
              />
            </div>

            <div className="w-full mt-6 lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="text-sm text-lighter">{product.category}</h2>
              <h1 className="mb-1 text-3xl font-bold font-heading text-content">{product.name}</h1>

              {/* Rating */}
              <div className="flex mb-4">
                <span className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`size-5 ${
                        averageRating >= star
                          ? 'fill-yellow-400 text-yellow-400'
                          : averageRating >= star - 0.5
                          ? 'fill-yellow-300 text-yellow-300'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                  <span className="ml-3 text-lighter">
                    {reviews.length > 0
                      ? `${averageRating.toFixed(1)} / 5.0 (${reviews.length} ${reviews.length === 1 ? 'Review' : 'Reviews'})`
                      : 'No reviews yet'}
                  </span>
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

              {/* Add to Cart & Wishlist */}
              <div className="flex items-center gap-4">
                <Button onClick={handleAdd} className="flex gap-2 px-10">
                  <ShoppingCart className="size-4" />
                  Add to cart
                </Button>

                <Button
                  onClick={handleWishlistClick}
                  className={`flex items-center gap-2 px-6 ${
                    inWishlist ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  disabled={toggleWishlistMutation.isLoading || inWishlist === null}
                >
                  <Heart className="size-4" />
                  {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>

              {/* Wishlist count */}
              <p className="mt-2 text-gray-600">
                {wishlistCount} {wishlistCount === 1 ? 'person has' : 'people have'} this in their wishlist
              </p>
            </div>
          </div>

          {/* Reviews */}
          <section className="pt-8 mt-10 border-t border-gray-200">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">Customer Reviews</h2>

            {isLoadingReviews && <ReviewSkeleton items={3} />}

            {!isLoadingReviews && reviews.length === 0 && (
              <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
            )}

            {!isLoadingReviews && reviews.length > 0 && (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`size-4 ${
                            review.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-200">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{review.username}</p>
                    <p className="text-gray-700 dark:text-gray-200">{review.review_text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      {/* Add to Cart Modal */}
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
