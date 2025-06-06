import DisplayPicture from "../components/images/bg-1.jpg";
import Product from "../components/images/product1.jpg";
import Cart from "../components/Cart.jsx";
import React, { useState, useEffect } from "react";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductPage() {
  const [data, setData] = useState([]);
  const [limData, setLimData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    window.localStorage.getItem("user")
    axios
      .get("/api/products")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // const filteredOrders = statusFilter === "All"
  //   ? data
  //   : data.filter(order => order.role_name.toLowerCase() === statusFilter.toLowerCase());

  // useEffect(() => {
  //   axios.get("/api/limited-offer")
  //   .then((res) => setLimData(res.data))
  //   .catch((err) => console.log(err));
  // })

  return (
    <>
      <section className="max-w-screen bg-yellow-100 ">
        <div className="grid grid-cols-[0.75fr_0.25fr] gap-5 h-full w-full">
          {/* Left Side */}
          <div className="p-10 flex flex-col gap-5">
            {/* Search Box placeholder */}
            <div className="h-10 w-2/5 bg-[#FAF9F6] pt-1 pl-3 rounded-2xl border-2 border-[#595959] flex justify-between">
              <p>search</p>
              <PiMagnifyingGlassLight className=" mx-3 h-7 w-7" />{" "}
            </div>
            {/* Product List */}
            <div className="p-2 grid grid-cols-4 gap-3">
              {data 
                .filter(d => d.stock_quantity > 0)
                .map((d)  => (
                  <Link to={`/ProductDetailsPage/${d.id}`}>
                    <div className="flex flex-col mx-auto justify-center items-center lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] ">
                      <img
                        src={d.image}
                        alt="/"
                        className="lg:w-[250px] lg:h-[250px] w-[150px] h-[150px] pb-3"
                      />
                      <div className="grid grid-cols-2 justify-around gap-8">
                        <p className="font-semibold"> {d.name} </p>
                        <p className="font-bold"> {d.price} </p>
                        {/* Add Button of Add to Cart and Buy Now! */}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          {/* Right Side */}
          <div className="bg-red-500 h-full">
            <Cart/>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
