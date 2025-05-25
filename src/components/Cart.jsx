import { MdDeleteForever } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai"
import axios from "axios";
import { useState, useEffect } from "react";
import CouponPopUp from "../pages/CouponPopUp";
import { Link } from "react-router-dom";


function Cart() {

  const [getCartItems, setGetCartItems] = useState([]);
  const [getSubTotal, setGetSubTotal] = useState(0); // Cart
  const [Open, setOpen] = useState(false) //Coupon Modal



  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then(async(response) => {
      await getCart(response.data.id);
      console.log("User data:", response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);


  const handleRemove = async (id) => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const userdata = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = await userdata.data;
      const product = await axios.delete(
          `/api/cart/${response.id}`,
          {
            productId: id.toString(),
          })
      console.log("Product removed from cart:", product);
      } catch (error) {
        console.error("Error parsing user data:", error);   
      }}


  const getCart = async (user_id) => {
    try {
      const response = await axios.get(`/api/cart/${user_id}`);
      setGetSubTotal(parseFloat(response.data.data.cart_total));
      setGetCartItems(response.data.data.items);
  
      console.log(response.data.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }



  return (
    <>
 
    <div className="mt-20 flex flex-col items-end">
        <div className="bg-amber-300 w-[400px] h-full">
          <div className="flex flex-row justify-evenly items-center border-2 border-b-0 border-black">
          <h1 className="text-3xl text-center font-bold mt-3 my-10"> My Cart </h1>
          <AiOutlineClose className="lg:hidden bg-blue-400 rounded-full p-3 w-[50px] h-[50px] mt-3 my-10 " /> 
          </div>

        
          <div className="h-[480px] border-black border-2 pt-2 overflow-auto">
            { getCartItems.map((d) => (
              <div className="bg-[#FFFFFF] w-[370px] h-[90px] px-1 py-1 mx-auto border-1 shadow-md shadow-black mb-5">
                <div className="grid grid-cols-5 gap-1">
                  <img className="lg:h-[80px] lg:w-[80px] w-[40px] h-[40px] row-span-2 mx-3 py-1" />
                  <h1 className="font-bold col-span-3 text-center"> {d.name} </h1>
                  <MdDeleteForever color='red' className="h-[30px] w-[30px]" onClick={handleRemove} />
                  <FaPlus className="mx-auto h-[20px] w-[20px]"/>
                  <FaMinus className="mx-auto h-[20px] w-[20px] " />
                  <p className="mx-1 border-1 text-xl text-center"> {d.quantity}  </p>
                  <p className="mx-1 text-xl text-center">  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-2 h-[150px] border-t-0  ">
            <div className="grid grid-cols-2 pb-3">
            <p className="flex items-start pl-3 text-xl font-bold"> Subtotal: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold "> ₱ {getSubTotal} </p>
            <p className="flex items-start pl-3 text-xl font-bold"> Coupon Value: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold"> ₱  </p>
            </div>

            <div className="flex flex-col items-center ">
              <div className="bg-[#FFFFFF] border-[#EA1A20] border-1 flex flex-row w-[350px] justify-around items-center px-3 py-3 shadow-md shadow-black">
                <p className="text-xl font-semibold"> Pick Coupon: </p>
                <div className="text-[#FFFFFF] text-xl font-semibold bg-[#EA1A20] px-8 py-2" onClick={() => 
                    {
                      setOpen(true)
                      
                    }}> Coupon </div>
                    <CouponPopUp open={Open}  onClose={() => setOpen(false)} /> 
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 px-2 py-4 mx-auto border-l-2">
            <p className="flex flex-col items-start pl-3 text-xl font-bold"> Total: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold"> ₱ {getSubTotal} </p>
          </div>
          
          <div className="flex items-center justify-center pb-6 border-l-2 border-b-2">
          <Link to="/CheckoutPage">
          <div className="text-center shadow-md shadow-black text-[#FFFFFF] text-xl font-semibold bg-[#EA1A20] px-8 py-2 w-[350px]">
                Checkout
          </div>
          </Link>
          </div>
        </div>
    </div>
    </>
  )
}

export default Cart