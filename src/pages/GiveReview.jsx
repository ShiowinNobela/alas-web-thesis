import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

function GiveReview() {
  const { id } = useParams();
  console.log('Submitting review with order_id:', id);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const productIdParam = query.get('productId');

  const [showItems, setShowItems] = useState([]);
  const [review, setReview] = useState({
    user_id: '',
    product_id: '',
    rating: 0,
    review_text: '',
  });
  const navigate = useNavigate();

  const user = JSON.parse(window.localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.token) return;

    axios
      .get('/api/users/', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((userRes) => {
        const userId = userRes.data.id;
        axios
          .get(`/api/adminOrder/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => {
            const items = response.data.data.items || [];
            setShowItems(items);
            // Find the product to review
            const productToReview =
              items.find((item) => {
                const itemProductId = String(item.product_id);
                const paramProductId = String(productIdParam);
                console.log('Comparing:', {
                  itemProductId,
                  paramProductId,
                  match: itemProductId === paramProductId,
                });
                return itemProductId === paramProductId;
              }) || items[0];

            console.log('Product data loaded:', {
              items,
              productIdParam,
              productToReview,
              userId,
              itemsWithIds: items.map((item) => ({
                id: item.product_id,
                name: item.product_name,
              })),
            });

            setReview((prev) => ({
              ...prev,
              user_id: userId,
              product_id: productToReview?.product_id || '',
            }));
          })
          .catch((err) => {
            toast.error('Error');
            console.log(err);
          });
      })
      .catch((err) => {
        toast.error('Failed to get user info');
        console.log(err);
      });
  }, [id, productIdParam]);

  const handleReview = async (event) => {
    event.preventDefault();
    if (!id) {
      toast.error('Order ID is missing. Cannot submit review.');
      return;
    }

    // Validation checks
    if (!review.user_id) {
      toast.error('User ID is missing. Please try refreshing the page.');
      return;
    }

    if (!review.product_id) {
      toast.error('Product ID is missing. Please try again.');
      return;
    }

    if (!review.rating || review.rating === 0) {
      toast.error('Please select a rating before submitting.');
      return;
    }

    console.log('Submitting review:', {
      user_id: review.user_id,
      order_id: id,
      product_id: review.product_id,
      rating: review.rating,
      review_text: review.review_text,
    });

    // Single product review with correct structure
    axios
      .post(
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
      )
      .then(() => {
        toast.success('Review submitted successfully!');
        setTimeout(() => {
          navigate('/ProductListPage');
        }, 1000);
      })
      .catch((err) => {
        console.error('Review submission error:', err.response?.data || err);
        toast.error(err.response?.data?.message || 'Failed to submit review.');
      });
  };

  return (
    <>
      <Toaster richColors />
      <section className="flex min-h-full justify-center bg-yellow-100 py-10">
        <div className="flex h-[700px] w-[360px] flex-col items-center justify-center rounded-md border-2 border-black bg-white shadow-lg shadow-black/50 md:h-[500px] md:w-[800px]">
          <div className="flex w-[300px] flex-col items-center justify-center md:w-[600px]">
            <h1 className="mb-5 text-2xl font-semibold">
              Leave a review for us!
            </h1>
            <div className="mb-5 flex flex-col gap-21 md:flex-row">
              <div className="mr-10 flex flex-col items-center justify-center">
                <h1>Purchase Items:</h1>
                {showItems.length === 0 ? (
                  <span className="col-span-2 text-gray-400">
                    No items found.
                  </span>
                ) : (
                  <div className="p-1 text-xs">
                    {showItems.find(
                      (item) => String(item.product_id) === productIdParam
                    )?.product_name || showItems[0]?.product_name}{' '}
                    x{' '}
                    {showItems.find(
                      (item) => String(item.product_id) === productIdParam
                    )?.quantity || showItems[0]?.quantity}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl">Rate Us using Stars!</h1>
                <div className="flex flex-row gap-x-3 p-3">
                  {/* Rating */}
                  <div className="flex flex-row items-center justify-end">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        <input
                          id={`hs-ratings-readonly-${star}`}
                          type="radio"
                          className="hidden"
                          name="hs-ratings-readonly"
                          value={star}
                          checked={review.rating === star}
                          onChange={() =>
                            setReview({ ...review, rating: star })
                          }
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
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <textarea
              name="review"
              id="review"
              placeholder="Leave your comment here!"
              className="mb-5 h-[150px] w-[330px] rounded-lg border-1 border-black bg-[#FFFFFF] p-5 md:w-[600px]"
              onChange={(e) =>
                setReview({ ...review, review_text: e.target.value })
              }
            ></textarea>

            <div className="flex items-center justify-between gap-x-5 md:w-[600px]">
              <button
                className="m-2 rounded-2xl border-2 border-black bg-[#EA1A20] p-2 text-xl text-white md:p-5"
                onClick={() => navigate('/ProductListPage')}
              >
                Cancel
              </button>
              <button
                className="m-2 rounded-2xl border-2 border-black bg-[#EA1A20] p-2 text-xl text-white md:p-5"
                onClick={handleReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GiveReview;
