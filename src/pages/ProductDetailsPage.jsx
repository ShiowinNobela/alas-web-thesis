import Modal from "../components/ThankYouPopUp.jsx";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/Chinges/BackButton.jsx";
import StarImg from "../components/images/star.png"

function ProductDetailsPage() {
  const [Open, setOpen] = useState(false);
  const { id } = useParams();
  const [reviewDetails, setReviewDetails] = useState([])
  const [data, setData] = useState([]);
  const [prodQuantity, setProdQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/products/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() =>{
    axios.get("/api/reviews/" + id)
    .then((response) => setReviewDetails(response.data.data))
    .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const userdata = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = await userdata.data;
      const product = await axios.post(`/api/cart/${response.id}`, {
        productId: id.toString(),
        quantity: prodQuantity,
      });
      navigate("/ProductListPage");
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  };

  return (
    <>
      <section className="w-screen h-screen bg-[#e9e5e5] bg-cover flex flex-col items-center justify-start px-10 py-10 overflow-auto">  
  
        <div className="self-start mb-2">
          <BackButton
            onClick={() => {
              window.location.href = "/ProductListPage";
            }}
          />
        </div>

        <div className="grid grid-cols-[60fr_40fr] gap-10 w-4/5 max-h-4/5 bg-[#f8f7f7] p-6 rounded-lg shadow-lg border-1 border-[#b4afaf]">
          <div className="grid grid-cols-[40fr_60fr]">
            <div className="flex items-center justify-center">
            <img src={data.image} alt="/" className="h-100 w-100 mx-auto rounded-sm  border-1 border-[#dfdddd] shadow-sm" />
            </div>
            {/* product name */}
            <div className="flex flex-col justify-around mb-6 ml-10">
              <div>
              <h1 className="font-black text-4xl mb-4 lg:mb-0">{data.name}</h1>
              <h2 className="text-2xl font-bold text-green-700 mt-2 "> ₱ {data.price}</h2>
              </div>
              <div>
              <h1 className="text-xl pb-1">What to expect?</h1>
              <p className="font-extralight text-gray-700">{data.description}</p>
              </div>
              <div className="flex flex-col gap-1">

                {/* quantity + price */}
                <div className="mb-6">
                  <label className="text-lg font-semibold mr-1">Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    value={prodQuantity}
                    onChange={(e) => setProdQuantity(e.target.value)}
                    max={data.stock_quantity}
                    className="border border-black px-2 py-1 w-24 rounded"
                  />
                
                </div>

                {/* add to cart + buy now */}
                <div className="flex flex-col gap-4 ">
                  <div className="flex items-center justify-center border border-[#EA1A20] px-6 py-3 text-l font-semibold shadow-md rounded-md cursor-pointer hover:bg-[#fdd] transition uppercase"
                    onClick={handleAddToCart}
                  >
                  <FaShoppingCart className="mr-2 h-6 w-6" />
                    Add to Cart
                  </div>

                <div className="bg-[#EA1A20] text-white text-xl text-center px-6 py-3 font-bold rounded-md cursor-pointer shadow-md hover:bg-red-800 transition uppercase"
                    onClick={() => setOpen(true)}
                  >
                  Buy Now
                </div>
                </div>
              </div>
            </div>
          </div>

              {/* reviews */}
              <div className="flex flex-col border-l">
                <h2 className="text-2xl font-bold text-center mb-4">Reviews</h2>
                  <h3 className="text-lg ml-3 mb-4">Total reviews: {reviewDetails.length}</h3>
                    <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
                      {reviewDetails.map((d, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 p-4 rounded shadow-lg bg-white ml-3"
                        >
                          <h3 className="font-semibold">Name: {d.username}</h3>
                          <div className="flex flex-row items-center gap-x-3">
                          <h4>Rating: {d.rating} / 5 </h4>
                          <img src={StarImg} alt="/" className="h-8 w-8" />
                          </div>
                          <h4>Review:</h4>
                          <p>{d.review_text}</p>
                        </div>
                      ))}
                    </div>
              </div>
            </div>

              {/* Modal */}
              <Modal open={Open} onClose={() => setOpen(false)}>
                <div className="text-center w-[400px] h-[200px] p-6 flex flex-col justify-between">
                  <h1 className="text-3xl font-bold">Do you want to complete the transaction?</h1>
                  <p className="text-lg mt-2">Click Confirm to complete the transaction!</p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button className="bg-[#EA1A20] w-[150px] rounded-full p-3 text-white font-bold cursor-pointer">
                      Confirm
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="bg-gray-500 w-[150px] rounded-full p-3 text-white font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Modal>
            </section>

    </>
  );
}

export default ProductDetailsPage;