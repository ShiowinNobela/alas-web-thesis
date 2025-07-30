//import { MdDeleteForever } from "react-icons/md";
import { FaPlus, FaMinus } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';
//import CouponPopUp from "../pages/CouponPopUp";
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { TiDeleteOutline } from 'react-icons/ti';
import { BsCart } from 'react-icons/bs';

function Cart({ cartUpdated }) {
  const [getCartItems, setGetCartItems] = useState([]);
  const [getSubTotal, setGetSubTotal] = useState(0); // Cart
  //const [Open, setOpen] = useState(false); //Coupon Modal
  const cartCount = getCartItems.length;
  //const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [cartItemsQuantity, setCartItemsQuantity] = useState([]);
  const [couponValue, setCouponValue] = useState(0);

  useEffect(() => {
    getCart();
  }, [cartUpdated]);

  const getCart = async () => {
    try {
      const response = await axios.get(`/api/cart/me`);
      const { cart_total, items } = response.data.data;
      setGetSubTotal(parseFloat(cart_total));
      setGetCartItems(items);
      setCartItemsQuantity(items.map((item) => item.quantity));
      console.log(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`/api/cart/me`, {
        data: { productId },
      });

      console.log('Product removed:', res.data);
      if (res.status === 200 || res.status === 201) {
        await getCart();
        if (getCartItems.length === 1) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleAdjust = async (productId, quantity, isIncrement, stock) => {
    try {
      if (isIncrement) {
        if (quantity < stock) quantity++;
      } else {
        if (quantity > 1) quantity--;
      }

      const res = await axios.put(`/api/cart/me`, {
        productId,
        quantity,
      });

      if (res.status === 200) {
        await getCart();
      }
    } catch (error) {
      console.error('Error adjusting quantity:', error);
    }
  };

  return (
    <div className="full min-h-full border-1 border-[#bdbdb8] bg-[#f5f5f3]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#cccabf] py-2 pl-3">
        <div className="flex h-10 w-70 items-center bg-[#FAF9F6] p-2 pt-4 pb-4 text-3xl font-extrabold uppercase">
          <p>My Cart</p>
          <BsCart className="ml-2 h-7 w-7" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="screen h-85 overflow-y-auto p-4">
        {getCartItems.map((d) => (
          <div
            key={d.product_id}
            className="mb-4 w-full rounded-xl border border-[#e0ded8] bg-[#ffffff] p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              {/* Left: Name and Quantity */}
              <div>
                <h2 className="mb-2 text-center text-lg font-semibold text-[#1c1a1a]">
                  {d.name}
                </h2>
                <div className="grid grid-cols-3 items-center gap-2">
                  <FaPlus
                    className="mx-auto cursor-pointer text-[#1c1a1a] hover:text-[#EA1A20]"
                    onClick={() =>
                      handleAdjust(
                        d.product_id,
                        d.quantity,
                        true,
                        d.stock_quantity
                      )
                    }
                  />
                  <FaMinus
                    className="mx-auto cursor-pointer text-[#1c1a1a] hover:text-[#EA1A20]"
                    onClick={() =>
                      handleAdjust(
                        d.product_id,
                        d.quantity,
                        false,
                        d.stock_quantity
                      )
                    }
                  />
                  <p className="text-center font-bold text-[#1c1a1a]">
                    {d.quantity}
                  </p>
                </div>
              </div>

              {/* Right: Price & Subtotal */}
              <div className="text-right">
                <p className="text-sm text-[#6b6b6b]">
                  ₱ {parseFloat(d.price).toFixed(2)} each
                </p>
                <p className="text-lg font-semibold text-[#1c1a1a]">
                  ₱ {(parseFloat(d.price) * d.quantity).toFixed(2)}
                </p>
              </div>

              <TiDeleteOutline
                className="ml-4 h-5 w-5 cursor-pointer text-[#d80c0c]"
                onClick={() => handleRemove(d.product_id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t border-[#bdbdb8] p-2 px-6">
        <div className="mt-3 flex justify-between text-xl font-extrabold text-[#403e3e] uppercase">
          <p>Total:</p>
          <p>₱ {(getSubTotal - couponValue).toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-center pt-4">
        {cartCount !== 0 ? (
          <Link to="/CheckoutPage">
            <div className="text-md w-60 max-w-md rounded-lg bg-[#db2026] px-10 py-2 text-center font-semibold text-white shadow-lg transition hover:bg-red-800">
              Checkout
            </div>
          </Link>
        ) : (
          <div
            className="text-md w-60 max-w-md cursor-pointer rounded-lg bg-[#EA1A20] px-10 py-3 text-center font-semibold text-white uppercase shadow-lg"
            onClick={() =>
              toast.error("You can't checkout without an item in your cart!")
            }
          >
            Checkout
          </div>
        )}
        <Toaster richColors />
      </div>
    </div>
  );
}

export default Cart;

{
  /* Coupon
            <div className="flex justify-center my-1">
              <div className="w-[90%] max-w-md bg-[#f5f5f3] border border-[#db2026] rounded-xl flex items-center justify-between px-6 py-3 shadow-sm">
                <p className="text-md font-semibold text-[#403e3e] uppercase">Pick Coupon:</p>
                <button
                  onClick={() => setOpen(true)}
                  className="bg-[#db2026] text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 uppercase"
                >
                  Coupon
                </button>
                <CouponPopUp open={Open} onClose={() => setOpen(false)} onApply={handleCouponUse} />
              </div>
            </div> */

  {
    /* <div className="flex justify-between text-md font-semibold text-[#403e3e]">
          <p>Subtotal:</p>
          <p>₱ {getSubTotal}</p>
        </div> */
  }
  {
    /* <div className="flex justify-between text-md font-semibold text-[#403e3e]">
          <p>Coupon Value:</p>
          <p>₱ {couponValue}</p>
        </div> */
  }

  // const handleCouponUse = async (coupon) => {
  //   setSelectedCoupon(coupon);
  //   try {
  //     const user = JSON.parse(window.localStorage.getItem("user"));
  //     const response = await axios.get(`/api/coupons/apply/${coupon.code}`, {
  //       params: { userId: user.id },
  //     });
  //     console.log("Coupon API response:", response.data);
  //     const amount = parseFloat(response.data.data.amount) || 0;
  //     setCouponValue(amount);
  //   } catch (err) {
  //     console.log(err);
  //     setCouponValue(0);
  //   }
  // };
}
