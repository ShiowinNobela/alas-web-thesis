import Modal from "../components/ThankYouPopUp.jsx";
import Prod1 from "../components/images/product1.jpg";
import Alapeno from "../components/images/Alapeno.webp";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetailsPage() {
  const [Open, setOpen] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [prodQuantity, setProdQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/products/" + id)
      .then((res) => setData(res.data))
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
      <section className="bg-[url('./src/components/images/customer_bg2.png')] bg-cover bg-fixed bg-no-repeat max-w-screen max-h-full h-screen pt-5 flex flex-row items-center justify-center">
        <div className="flex flex-row">
          <div className="w-3xl h-[750px] pl-3 py-3 border-black border-3 mt-[80px] bg-[#E2E0E1]">
            <div className="flex flex-col ">
              <div className="border-b-3 mx-auto p-3">
                <img
                  src={Prod1}
                  alt="/"
                  className="lg:w-[400px] lg:h-[400px] w-[300px] h-[300px] shadow-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] "
                />
              </div>
              <div className="flex flex-row justify-evenly border-b-2 pb-3">
                <div className="flex flex-col items-start gap-y-[20px] ">
                  <h1 className="font-black lg:text-4xl text-2xl">
                    {" "}
                    {data.name}
                  </h1>
                  <p className="lg:text-2xl text-base">
                    Quantity:
                    <input
                      type="number"
                      min={1}
                      value={prodQuantity}
                      onChange={(e) => setProdQuantity(e.target.value)}
                      max={data.stock_quantity}
                      className="border-black border-1 w-[80px]"
                    />{" "}
                  </p>
                  <p className="lg:text-2xl text-base">
                    Size: =<select name="" id=""></select>{" "}
                  </p>
                  <div className="flex flex-row gap-x-1 items-center justify-center text-[#EA1A20] ">
                    <img src={Alapeno} alt="/" className="w-[50px] h-[50px]" />
                    <p>Rating:</p>
                    <p> 3/5 </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-y-5 ">
                  <h1 className="text-2xl pt-10">{data.price}</h1>

                  <div
                    className="flex flex-row border-[#EA1A20] border-2 lg:px-6 px:1 py-2 gap-2 lg:w-[250px] w-[150px] justify-center shadow-md shadow-black cursor-pointer"
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart className="lg:h-[40px] lg:w-[40px] h-[30px] w-[30px] " />
                    <p className="lg:text-2xl text-base"> Add to Cart </p>
                  </div>

                  <div
                    className="bg-[#EA1A20] lg:text-3xl text-xl px-6 py-2 text-[#FFFFFF] lg:w-[250px] w-[150px] text-center cursor-pointer shadow-md shadow-black"
                    onClick={() => setOpen(true)}
                  >
                    Buy Now!
                  </div>
                  <Modal open={Open} onClose={() => setOpen(false)}>
                    <div className="text-center w-[400px] h-[200px]">
                      <h1 className="text-3xl font-bold pb-5">
                        {" "}
                        Do you want to Complete the Transaction?
                      </h1>
                      <div>
                        <p className="text-lg ">
                          {" "}
                          Click Confirm to Complete the Transaction!
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-4 p-10 text-lg font-bold text-[#FFFFFF] ">
                        <button className="bg-[#EA1A20] w-[150px] rounded-full p-3 cursor-pointer">
                          {" "}
                          Confirm{" "}
                        </button>
                        <button
                          onClick={() => setOpen(false)}
                          className="bg-[#EA1A20] w-[150px] rounded-full p-3 cursor-pointer "
                        >
                          {" "}
                          Cancel{" "}
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>

              <div className="mx-auto p-2 text-justify">
                <h1> Description</h1>
                <p> {data.description} </p>
              </div>
            </div>
          </div>
          <div className=" pl-3 py-3 border-black border-3 mt-[80px] bg-[#E2E0E1] w-xl flex flex-col items-center ">
            <h1 className="text-2xl text-center">Reviews</h1>
            <h3>Total reviews: </h3>
            <div className="mt-5 border-1 p-2 w-4/5 shadow-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] ">
              <h1>Name: Torogobro</h1>
              <h2>Rating: 5 / 5</h2>
              <h3>Review: </h3>
              <p> The sauce are good and the delivery and process is fast </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetailsPage;
