import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";

function GiveReview() {

  const {id} = useParams()
  const [showItems, setShowItems] = useState([])
  const [review, setReview] = useState({
    user_id : "",
    product_id : "",
    rating : 0,
    review_text : ""
  })
  const navigate = useNavigate();

  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
  if (!user?.token) return;

  axios.get("/api/users/", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((userRes) => {
      const userId = userRes.data.id; 

      axios.get(`/api/adminOrder/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          const items = response.data.data.items || [];
          setShowItems(items);
          setReview((prev) => ({
            ...prev,
            user_id: userId,
            product_id: items[0]?.product_id || "",
          }));
        })
        .catch((err) => {
          toast.error("Error");
          console.log(err);
        });
    })
    .catch((err) => {
      toast.error("Failed to get user info");
      console.log(err);
    });
}, [id]);

  

  const handleReview = (event) => {
  event.preventDefault();
  axios.post("/api/reviews", {
    ...review, // user_id is already set in review state
  })
    .then(() => {
      toast.success("Review submitted successfully!");
      setTimeout(() => {
        navigate("/ProductListPage");
      }, 1000);
    })
    .catch((err) => {
      toast.error("Failed to submit review.");
      console.log(err)
    })
}

  return (
    <>
    <Toaster richColors/>
      <section className="bg-yellow-100 min-h-full py-10 flex justify-center">
        <div className="flex flex-col justify-center items-center bg-white md:h-[500px] h-[700px] md:w-[800px] w-[360px] rounded-md shadow-lg shadow-black/50 border-black border-2">
          <div className="md:w-[600px] w-[300px] flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mb-5">
              Leave a review for us!
            </h1>
            <div className="flex md:flex-row flex-col mb-5 gap-21">
              <div className="flex flex-col items-center justify-center mr-10">
                <h1>Purchase Items:</h1>
                {showItems.length === 0 ? (
                  <span className="text-gray-400 col-span-2">No items found.</span>
                  ) : (
                  <div className="text-xs p-1">
                    {showItems[0].product_name} x {showItems[0].quantity}
                  </div>
                )}
                
              </div>

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl">Rate Us using Stars!</h1>
                <div className="flex flex-row gap-x-3 p-3">
                  {/* Rating */}
                    <div className="flex flex-row justify-end items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          <input
                            id={`hs-ratings-readonly-${star}`}
                            type="radio"
                            className="hidden"
                            name="hs-ratings-readonly"
                            value={star}
                            checked={review.rating === star}
                            onChange={() => setReview({ ...review, rating: star })}
                          />
                          <label htmlFor={`hs-ratings-readonly-${star}`} className="cursor-pointer">
                            <svg
                              className={`shrink-0 size-10 ${
                                review.rating >= star ? "text-yellow-400" : "text-gray-300"
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
              className=" md:w-[600px] w-[330px] h-[150px]  bg-[#FFFFFF] border-1 border-black rounded-lg p-5 mb-5"
              onChange={e => setReview({ ...review, review_text: e.target.value })}
            ></textarea>

            <div className="flex justify-between items-center md:w-[600px] gap-x-5 ">
              <button className=" bg-[#EA1A20] md:p-5 p-2 m-2 text-white text-xl rounded-2xl border-2 border-black " 
              onClick={() => navigate("/ProductListPage")}>
                Cancel
              </button>
              <button className=" bg-[#EA1A20] md:p-5 p-2 m-2 text-white text-xl rounded-2xl border-2 border-black "
              onClick={handleReview}>
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
