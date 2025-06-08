import Cart from "../components/Cart.jsx";
import React, { useState, useEffect } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";

function ProductPage() {
  const [data, setData] = useState([]);
  const [limData, setLimData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [newData, setNewData] = useState([])
  const navigate = useNavigate();
  const [cartUpdated, setCartUpdated] = useState(false);
  

  const user = window.localStorage.getItem("user");
  const isLoggedIn = !!user;

  useEffect(() => {
    window.localStorage.getItem("user")
    axios
      .get("/api/products")
      .then((res) => {
        setData(res.data)
        setNewData([...res.data])
      } )
      .catch((err) => console.log(err));
  }, []);

  

    const handleAddToCart = async (product) => {
      const user = window.localStorage.getItem("user");
      if (!user) {
        navigate("/LoginPage");
        return;
      }
      try {
        const parsedUser = JSON.parse(user);
        const userdata = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });
        const response = userdata.data;
        await axios.post(`/api/cart/${response.id}`, {
          productId: product.id.toString(),
          quantity: 1, 
        });
        setCartUpdated((prev) => !prev);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };


  return (
      <div
        className={
          isLoggedIn
            ? "grid grid-cols-[0.75fr_0.25fr] max-w-screen bg-[#f2efef] h-full"
            : "max-w-screen bg-[#f2efef] h-full"
        }
      >
          {/* Left Side */}
          <div className={isLoggedIn ? "" : "w-full"}>
            <div className="pt-5 pl-5 flex flex-col gap-5 min-h-fit ">
              {/* Search Box placeholder */}
              <div className="h-10 w-2/5 bg-[#FAF9F6] pt-1 pl-3 rounded-2xl border-2 border-[#595959] flex justify-between cursor-pointer">
                <p>search</p>
                <PiMagnifyingGlassLight className=" mx-3 h-7 w-7" />{" "}
              </div>
              {/* Product List */}
              <div className="grid grid-cols-4 gap-4 h-[89%] ml- overflow-y-auto overflow-x-hidden">
                {newData 
                  .filter(d => d.stock_quantity > 0)
                  .map((d)  => (
                    
                  // products
                    <div className="flex flex-col items-center justify-center bg-[#e1dfdf] p-6 mr-5 rounded-md shadow-md">
                      <img
                        src={d.image}
                        alt={d.name}
                        className="mb-4 w-50 h-55  object-cover rounded-sm"
                      />
                      <div className="text-center mb-2">
                        <p className="text-lg font-semibold mb-1">{d.name}</p>
                        <p className="text-xl font-bold text-[#000000]">{d.price}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <button
                          className="bg-[#db2026] text-[#ffffff] font-semibold text-sm py-2 px-4 rounded hover:bg-red-800 transition"
                          onClick={() => handleAddToCart(d)}
                        >
                          Add To Cart
                        </button>
                        <button
                          className="bg-gray-200 text-[#363535] font-semibold text-s py-2 px-4 rounded hover:bg-gray-400 transition"
                          onClick={() => navigate(`/ProductDetailsPage/${d.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>  
          {/* Right Side */}
          {isLoggedIn && (
            <Cart cartUpdated={cartUpdated} />
          )}
        </div>
  );
}

export default ProductPage;
