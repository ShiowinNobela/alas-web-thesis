import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function GiveReview() {

  const [showItems, setShowItems] = useState([])
  const [review, setReview] = useState({
    user_id : "",
    product_id : "P001",
    rating : 5,
    review_text : ""
  })
  const navigate = useNavigate();

  useEffect(() => {
     //useEffect for user can be changed later with the use params id and cart items thingy kapag may button hook na sya XD. So later on it is viable na there's no useEffect here only useState
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setShowItems(response.data);
        setReview((prev) => ({ //Convertion thingy for future ref.
        ...prev,
        user_id: response.data.id 
      }));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  //currently for testing ill only put reviews on P001

  

  const handleReview = (event) => {
    event.preventDefault();
    axios.post("/api/reviews" , review)
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
      <section className="max-h-screen h-screen w-full bg-yellow-100 bg-cover bg-no-repeat flex items-center justify-center">
        <div className="md:mt-0 mt-20 flex flex-col justify-center items-center bg-white md:h-[500px] h-[700px] md:w-[800px] w-[360px] rounded-md shadow-lg shadow-black/50 border-black border-2">
          <div className="md:w-[600px] w-[300px] flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mb-5">
              Leave a review for us!
            </h1>
            <div className="flex md:flex-row flex-col mb-5">
              <div className="flex flex-col items-center justify-center mr-10">
                <h1>Purchase Items:</h1>
                <div className=" grid grid-cols-2 border-1 border-black rounded-lg p-2 mb-5 h-[100px] w-[250px] overflow-auto bg-[#FFFFFF] ">
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl">Rate Us using Stars!</h1>
                <div className="flex flex-row gap-x-3 p-3">
                  <FaRegStar className=" h-[50px] w-[50px] " />
                  <FaRegStar className=" h-[50px] w-[50px] " />
                  <FaRegStar className=" h-[50px] w-[50px] " />
                  <FaRegStar className=" h-[50px] w-[50px] " />
                  <FaRegStar className=" h-[50px] w-[50px] " />
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
