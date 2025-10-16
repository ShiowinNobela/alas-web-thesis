import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Loader2, ArrowLeft, Send } from 'lucide-react';

function GiveReview() {
  const { id: orderId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productIdParam = query.get('product_id');
  const navigate = useNavigate();

  const [review, setReview] = useState({
    rating: 0,
    review_text: '',
  });

  const [hoverRating, setHoverRating] = useState(0);

  const user = JSON.parse(window.localStorage.getItem('user'));
  const userId = user?.id;

  const { data: orderData, isLoading: isLoadingOrder } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const res = await axios.get(`/api/orders/${orderId}`);
      return res.data.data;
    },
    enabled: !!orderId,
  });

  const productToReview = orderData?.items?.find((item) => String(item.product_id) === String(productIdParam));

  const productName = productToReview?.product_name || '';
  const productImage = productToReview?.image || null;

  const ratingLabels = {
    1: 'Very Bad',
    2: 'Bad',
    3: 'Okay',
    4: 'Good',
    5: 'Excellent',
  };

  const createReviewMutation = useMutation({
    mutationFn: (reviewData) => axios.post('/api/reviews', reviewData),
    onSuccess: () => {
      toast.success('Review submitted successfully!');
      setTimeout(() => navigate('/menu'), 1000);
    },
    onError: (error) => {
      console.error('Review submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit review.');
    },
  });

  const handleReview = (e) => {
    e.preventDefault();

    //Checks everything before sending
    if (!userId) {
      toast.error('User not found. Please log in again.');
      navigate('/login');
      return;
    }

    if (!review.rating) {
      toast.error('Please select a rating before submitting.');
      return;
    }

    if (!productToReview?.product_id) {
      toast.error('Product information not available.');
      return;
    }

    if (!orderId) {
      toast.error('Order information not available.');
      return;
    }

    createReviewMutation.mutate({
      user_id: userId,
      order_id: orderId,
      product_id: productToReview.product_id,
      rating: review.rating,
      review_text: review.review_text,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  if (!isLoadingOrder && orderData && productIdParam && !productToReview) {
    toast.error('Product not found in this order');
    navigate('/orders');
    return null;
  }

  if (isLoadingOrder) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-yellow-50 to-orange-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="mb-4 h-12 w-12 rounded-full border-4 border-orange-200 border-t-orange-500"
          />
          <p className="text-xl text-orange-800">Loading product information...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute right-15 bottom-40 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-red-200 to-pink-300 opacity-20 delay-1000"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        ></motion.div>
      </div>

      <motion.section
        className="flex min-h-full justify-center bg-gradient-to-b from-yellow-50 to-orange-50 py-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex h-fit w-full max-w-4xl flex-col items-center justify-center rounded-xl border border-orange-200 bg-white/70 shadow-xl shadow-black/10 md:rounded-2xl"
          variants={itemVariants}
        >
          <CardHeader className="w-full rounded-t-xl bg-gradient-to-r from-red-500 to-orange-500 py-4 md:rounded-t-2xl">
            <div className="flex items-center">
              <CardTitle className="text-2xl font-bold text-white">Leave a Review</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="w-full p-6">
            <motion.div className="flex flex-col items-center" variants={itemVariants}>
              {/* Product Part*/}
              <div className="mb-6 flex flex-col items-center text-center">
                {productImage && (
                  <img
                    src={productImage}
                    alt={productName}
                    className="mb-3 h-24 w-24 rounded-lg object-cover shadow-md"
                  />
                )}
                <h2 className="text-lg text-gray-800">Reviewing</h2>
                <h3 className="text-2xl font-bold text-orange-600">{productName}</h3>
              </div>

              {/* Ratings */}
              <div className="mb-6 flex w-full flex-col gap-6 md:flex-row md:items-start">
                <motion.div
                  className="flex flex-col items-center rounded-lg bg-yellow-50 p-4 md:w-1/2"
                  variants={itemVariants}
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                    <Star className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Rate Your Experience</h3>
                  <div className="mb-2 flex flex-row items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isActive = star <= review.rating;
                      return (
                        <motion.span
                          key={star}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setReview({ ...review, rating: star })}
                          className="cursor-pointer"
                        >
                          <svg
                            className={`size-10 transition-all duration-200 ${
                              isActive ? 'fill-yellow-400' : 'fill-gray-300'
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                          </svg>
                        </motion.span>
                      );
                    })}
                  </div>
                  <p className="min-h-[1rem] text-center text-sm text-gray-600">
                    {ratingLabels[review.rating] || 'Select a rating'}
                  </p>
                </motion.div>

                {/* Review Part */}
                <motion.div
                  className="flex flex-col items-center rounded-lg bg-orange-50 p-4 md:w-1/2"
                  variants={itemVariants}
                >
                  <h3 className="mb-4 text-lg font-semibold">Share Your Thoughts</h3>
                  <textarea
                    placeholder="Tell us what you liked or what could be improved…"
                    className="h-32 w-full rounded-lg border border-orange-200 bg-white p-4 transition focus:border-transparent focus:ring-2 focus:ring-orange-500"
                    value={review.review_text}
                    maxLength={300}
                    onChange={(e) => setReview({ ...review, review_text: e.target.value })}
                  />
                  <p className="mt-1 self-end text-xs text-gray-500">{review.review_text.length}/300</p>
                </motion.div>
              </div>

              {/* Buttons */}
              <motion.div className="flex w-full flex-col gap-4 md:flex-row md:justify-between" variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  onClick={() => navigate(-1)}
                  disabled={createReviewMutation.isPending}
                >
                  <ArrowLeft size={18} />
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 font-medium text-white hover:from-red-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleReview}
                  disabled={createReviewMutation.isPending || !review.rating}
                >
                  {createReviewMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Review
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </CardContent>
        </motion.div>
      </motion.section>
    </>
  );
}

export default GiveReview;
