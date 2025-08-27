import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

function GiveReview() {
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productIdParam = query.get('product_id');

  const [productName, setProductName] = useState('');
  const [review, setReview] = useState({
    user_id: '',
    product_id: '',
    rating: 0,
    review_text: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const userRes = await axios.get('/api/users/', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        
        const userId = userRes.data.id;
        
        const orderRes = await axios.get(`/api/adminOrder/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        
        const items = orderRes.data.data.items || [];
        
        const productToReview = items.find(item => 
          String(item.product_id) === String(productIdParam)
        );

        if (!productToReview) {
          toast.error('Product not found in this order');
          navigate('/orders');
          return;
        }

        setProductName(productToReview.product_name);
        setReview(prev => ({
          ...prev,
          user_id: userId,
          product_id: productToReview.product_id,
        }));
        
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to load review data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, productIdParam]); 

  const handleReview = async (event) => {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem('user'));
    
    if (!review.rating || review.rating === 0) {
      toast.error('Please select a rating before submitting.');
      return;
    }

    try {
      await axios.post(
        '/api/reviews',
        {
          user_id: review.user_id,
          order_id: id,
          product_id: review.product_id,
          rating: review.rating,
          review_text: review.review_text,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      
      toast.success('Review submitted successfully!');
      setTimeout(() => {
        navigate('/ProductListPage');
      }, 1000);
    } catch (err) {
      console.error('Review submission error:', err);
      toast.error(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mb-4 border-4 border-orange-200 rounded-full border-t-orange-500"
          ></motion.div>
          <p className="text-xl text-orange-800">Loading product information...</p>
        </motion.div>
      </div>
    );
  }

  return (
  <>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-16 h-16 rounded-full top-20 left-10 animate-pulse bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      ></motion.div>
      <motion.div
        className="absolute w-12 h-12 delay-1000 rounded-full bottom-40 right-15 animate-pulse bg-gradient-to-br from-red-200 to-pink-300 opacity-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      ></motion.div>
    </div>
    <motion.section
      className="flex justify-center min-h-full py-10 bg-gradient-to-b from-yellow-50 to-orange-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-col items-center justify-center w-full max-w-4xl border border-orange-200 shadow-xl bg-white/50 rounded-xl shadow-black/10 md:rounded-2xl"
        variants={itemVariants}
      >
        <CardHeader className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-xl md:rounded-t-2xl">
          <div className="flex items-center">
            <CardTitle className="text-2xl font-bold text-white">
              Leave a Review
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="w-full p-6">
          <motion.div className="flex flex-col items-center" variants={itemVariants}>
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800">How was your experience with</h2>
              <h3 className="text-2xl font-bold text-orange-600">{productName}</h3>
            </div>

            <div className="flex flex-col w-full gap-6 mb-6 md:flex-row md:items-start">
              <motion.div 
                className="flex flex-col items-center p-4 rounded-lg bg-yellow-50 md:w-1/2"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-orange-100 rounded-full">
                  <Star className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Rate Your Experience</h3>
                <div className="flex flex-row items-center justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.span 
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <input
                        id={`hs-ratings-readonly-${star}`}
                        type="radio"
                        className="hidden"
                        name="hs-ratings-readonly"
                        value={star}
                        checked={review.rating === star}
                        onChange={() => setReview({ ...review, rating: star })}
                      />
                      <label
                        htmlFor={`hs-ratings-readonly-${star}`}
                        className="cursor-pointer"
                      >
                        <svg
                          className={`size-10 shrink-0 ${
                            review.rating >= star
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                        </svg>
                      </label>
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center p-4 rounded-lg bg-orange-50 md:w-1/2"
                variants={itemVariants}
              >
                <h3 className="mb-4 text-lg font-semibold">Share Your Thoughts</h3>
                <textarea
                  name="review"
                  id="review"
                  placeholder="What did you like about this product? What could be improved?"
                  className="w-full h-32 p-4 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  onChange={(e) =>
                    setReview({ ...review, review_text: e.target.value })
                  }
                ></textarea>
              </motion.div>
            </div>

            <motion.div 
              className="flex flex-col w-full gap-4 md:flex-row md:justify-between"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
                onClick={() => navigate(-1)}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 font-medium text-white transition-colors rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                onClick={handleReview}
              >
                Submit Review
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