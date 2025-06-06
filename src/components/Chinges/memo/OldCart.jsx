import { MdDeleteForever } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai"
import axios from "axios";
import { useState, useEffect } from "react";
import CouponPopUp from "../pages/CouponPopUp";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function Cart() {


  const [getCartItems, setGetCartItems] = useState([]);
  const [getSubTotal, setGetSubTotal] = useState(0); // Cart
  const [Open, setOpen] = useState(false) //Coupon Modal
  const cartCount = getCartItems.length;
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponValue, setCouponValue] = useState(0);


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
          `/api/cart/${response.id}`
          ,
          {
            data: { productId: id }
          }
        )
      console.log("Product removed from cart:", product.data);
      if (product.status === 200 || product.status === 201) {
        getCart(response.id);
      if (cartCount === 1) {
        window.location.reload();
      }
        
      }
      } catch (error) {
        console.error("Error parsing user data:", error);   
      }}


  const getCart = async (user_id) => {
    try {
      const response = await axios.get(`/api/cart/${user_id}`);
      setGetSubTotal(parseFloat(response.data.data.cart_total));
      setGetCartItems(response.data.data.items);
      setCartItemsQuantity(response.data.data.items.map(item => item.quantity));
      console.log(response.data.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }


  const handleAdjust = async (id, quantity, isIncrement,stock) => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const userdata = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = await userdata.data;
      if (isIncrement) {
        if (quantity < stock) {
          quantity++;
        } 
     } else {
        if (quantity > 1) {
          quantity--;
        }}
      const product = await axios.put(
          `/api/cart/${response.id}`
          ,
          {
            productId: id,
            quantity: quantity
            }
        )
      console.log("Item is adjusted cart:", product.data);
      if(product.status === 200) {
      getCart(response.id);
      } 
      } catch (error) {
        console.error("Error parsing user data:", error);   
      }}

    
    const handleCouponUse = async (coupon) => {
      setSelectedCoupon(coupon);
      try {
        const user = JSON.parse(window.localStorage.getItem("user"));
        const response = await axios.get(
          `/api/coupons/apply/${coupon.code}`,
          {
            params: { userId: user.id }
          }
        );
        console.log("Coupon API response:", response.data);
        const amount = parseFloat(response.data.data.amount) || 0;
        setCouponValue(amount);
      } catch (err) {
        console.log(err);
        setCouponValue(0);
      }
    };

  return (
    <div className="bg-[#e7e6e2] h-full w-full">
          <div className="flex flex-row justify-evenly items-center border-1 border-b-0 border-[#cccabf]">
          <h1 className="text-3xl text-center font-bold mt-3 pb-3"> My Cart </h1>
          <AiOutlineClose className="lg:hidden bg-[#000000] rounded-full p-3 w-[50px] h-[50px] mt-3 my-10 " /> 
          </div>

        
          <div className="h-1/2 border-[#e7e6e2] border-2 pt-2 overflow-auto flex flex-col">
            { getCartItems.map((d) => (
              <div className="bg-[#FFFFFF] w-11/12 px-1 py-1 mx-auto border-1 shadow-md shadow-black mb-5">
                <div className="flex gap-1 px-5 justify-between">
                  {/* <img className="w-1/3 mx-3 py-1" /> */}
                  <div className="flex flex-col">
                    <h1 className="font-bold col-span-3 text-center"> {d.name} </h1>
                    <div className="grid grid-cols-3 gap-1">
                      <FaPlus className="mx-auto h-[20px] w-[20px]" onClick={() => handleAdjust(d.product_id, d.quantity, true, d.stock_quantity )}/>
                      <FaMinus className="mx-auto h-[20px] w-[20px] " onClick={() => handleAdjust(d.product_id, d.quantity, false, d.stock_quantity)}/>
                      <p className="mx-1 border-1 text-xl text-center"> {d.quantity}  </p>
                    </div>
                  </div>
                  
                
                  <div className="grid items-center">
                    <MdDeleteForever color='red' className="h-8 w-8" onClick={() => handleRemove(d.product_id)} />
                  </div>
                </div>
              </div>
            ))}
            
          </div>

          <div className="border-2 h-[150px] border-t-0  ">
            <div className="grid grid-cols-2 pb-3">
            <p className="flex items-start pl-3 text-xl font-bold"> Subtotal: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold "> ₱ {getSubTotal} </p>
            <p className="flex items-start pl-3 text-xl font-bold"> Coupon Value: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold"> ₱ {couponValue} </p>
            </div>

            <div className="flex flex-col items-center ">
              <div className="bg-[#FFFFFF] border-[#EA1A20] border-1 flex flex-row w-[350px] justify-around items-center px-3 py-3 shadow-md shadow-black">
                <p className="text-xl font-semibold"> Pick Coupon: </p>
                <div className="text-[#FFFFFF] text-xl font-semibold bg-[#EA1A20] px-8 py-2" onClick={() => 
                    {
                      setOpen(true)
                      
                    }}> Coupon </div>
                    <CouponPopUp open={Open}  onClose={() => setOpen(false)} onApply={handleCouponUse} /> 
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 px-2 py-4 mx-auto border-l-2">
            <p className="flex flex-col items-start pl-3 text-xl font-bold"> Total: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold"> ₱ {getSubTotal - couponValue} </p>
          </div>
          
          <div className="flex items-center justify-center pb-3 border-l-2 border-b-2">
          
          {cartCount !== 0 ?(
            <Link to="/CheckoutPage">
              <div className="text-center shadow-md shadow-black text-[#FFFFFF] text-xl font-semibold bg-[#EA1A20] px-8 py-2 w-[350px]">
                Checkout
              </div>
            </Link>
          ) : (
            <div className="text-center shadow-md shadow-black text-[#FFFFFF] text-xl font-semibold bg-[#EA1A20] px-8 py-2 w-[350px]" 
            onClick={ () => toast.error("You can't checkout without an item on your cart!")}>
                Checkout
              </div>
          )}
          <Toaster  richColors />
          </div>
        </div>
  )
}

export default Cart