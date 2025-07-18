import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import CouponPopUp from "../pages/CouponPopUp";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { TiDeleteOutline } from "react-icons/ti";
import { BsCart } from "react-icons/bs";

function Cart({ cartUpdated }) {
  const [cartState, setCartState] = useState({
    items: [],
    originalTotal: 0,
    discount: 0,
    finalTotal: 0,
    appliedCoupon: null
  });
  const cartCount = cartState.items.length;
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [Open, setOpen] = useState(false);

  // Apply coupon handler
  const applyCoupon = async (couponCode) => {
    setIsApplyingCoupon(true);
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const userRes = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const userId = userRes.data.id;

      const response = await axios.post('/api/coupons/validate', {
        couponCode,
        userId
      });

      console.log("Coupon response:", response.data); // Debug log

      if (response.data && response.data.status === "success") {
        toast.success("Coupon applied successfully!");
        window.localStorage.setItem("couponCode", couponCode);
        
        // Parse the response data correctly
        const responseData = response.data.data;
        
        setCartState({
          items: responseData.items || cartState.items,
          originalTotal: parseFloat(responseData.originalTotal) || 0,
          discount: parseFloat(responseData.discount) || 0,
          finalTotal: parseFloat(responseData.finalTotal) || 0,
          appliedCoupon: responseData.appliedCoupon || { code: couponCode }
        });
        
        setOpen(false);
      } else {
        toast.error(response.data?.message || "Failed to apply coupon.");
      }
    } catch (err) {
      console.error("Coupon error:", err);
      toast.error(err.response?.data?.message || "Invalid coupon or error applying coupon.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Remove coupon handler
  const removeCoupon = async () => {
    setIsApplyingCoupon(true);
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const userRes = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const userId = userRes.data.id;

      const response = await axios.post('/api/coupons/remove', {
        userId
      });

      console.log("Remove coupon response:", response.data); // Debug log

      if (response.data && response.data.status === "success") {
        toast.success("Coupon removed successfully!");
        window.localStorage.removeItem("couponCode");
        
        // Parse the response data correctly
        const responseData = response.data.data;
        
        setCartState({
          items: responseData.items || cartState.items,
          originalTotal: parseFloat(responseData.originalTotal) || 0,
          discount: parseFloat(responseData.discount) || 0,
          finalTotal: parseFloat(responseData.finalTotal) || 0,
          appliedCoupon: responseData.appliedCoupon || null
        });
      } else {
        toast.error("Failed to remove coupon.");
      }
    } catch (err) {
      console.error("Remove coupon error:", err);
      toast.error("Error removing coupon.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(async (response) => {
        await getCart(response.data.id);
        console.log("User data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [cartUpdated]);

  const handleRemove = async (id) => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      const userdata = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const response = await userdata.data;
      const product = await axios.delete(`/api/cart/${response.id}`, {
        data: { productId: id },
      });
      console.log("Product removed from cart:", product.data);
      if (product.status === 200 || product.status === 201) {
        getCart(response.id);
        if (cartCount === 1) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  };

  const getCart = async (user_id) => {
    try {
      const response = await axios.get(`/api/cart/${user_id}`);
      
      // Map the cart data to the new cartState structure
      setCartState({
        items: response.data.data.items || [],
        originalTotal: parseFloat(response.data.data.cart_total) || 0,
        discount: parseFloat(response.data.data.total_discount) || 0,
        finalTotal: parseFloat(response.data.data.total_after_discount) || parseFloat(response.data.data.cart_total) || 0,
        appliedCoupon: response.data.data.applied_coupon || null
      });
      
      console.log(response.data.data.items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleAdjust = async (id, quantity, isIncrement, stock) => {
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
        }
      }
      const product = await axios.put(`/api/cart/${response.id}`, {
        productId: id,
        quantity: quantity,
      });
      console.log("Item is adjusted cart:", product.data);
      if (product.status === 200) {
        getCart(response.id);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  };

  const handleCouponUse = async (coupon) => {
    await applyCoupon(coupon.code);
  };

  return (
    <div className="min-h-full full bg-[#f5f5f3] border-1 border-[#bdbdb8]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#cccabf] pl-3 py-2">
        <div className="flex items-center h-10 w-70 text-3xl font-extrabold bg-[#FAF9F6] p-2 pb-4 pt-4 uppercase">
          <p>My Cart</p>
          <BsCart className="h-7 w-7 ml-2" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="overflow-y-auto h-85 screen p-4">
        {cartState.items.map((d) => (
          <div
            key={d.product_id}
            className="bg-[#ffffff] w-full rounded-xl shadow-sm border border-[#e0ded8] mb-4 p-4"
          >
            <div className="flex justify-between items-start">
              {/* Left: Name and Quantity */}
              <div>
                <h2 className="text-lg font-semibold text-[#1c1a1a] mb-2 text-center">
                  {d.name}
                </h2>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <FaPlus
                    className="cursor-pointer text-[#1c1a1a] hover:text-[#EA1A20] mx-auto"
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
                    className="cursor-pointer text-[#1c1a1a] hover:text-[#EA1A20] mx-auto"
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
                className="text-[#d80c0c] w-5 h-5 cursor-pointer ml-4"
                onClick={() => handleRemove(d.product_id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Input */}
      <div className="flex justify-center my-1">
        <div className="w-[90%] max-w-md bg-[#f5f5f3] border border-[#db2026] rounded-xl flex items-center justify-between px-6 py-3 shadow-sm">
          {cartState.appliedCoupon ? (
            <>
              <div>
                <p className="text-md font-semibold text-[#403e3e] uppercase">Applied Coupon:</p>
                <p className="text-sm text-[#6b6b6b]">{cartState.appliedCoupon.code}</p>
              </div>
              <button
                onClick={removeCoupon}
                disabled={isApplyingCoupon}
                className="bg-[#d80c0c] text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 uppercase"
              >
                {isApplyingCoupon ? "Removing..." : "Remove"}
              </button>
            </>
          ) : (
            <>
              <p className="text-md font-semibold text-[#403e3e] uppercase">Pick Coupon:</p>
              <button
                onClick={() => setOpen(true)}
                disabled={isApplyingCoupon}
                className="bg-[#db2026] text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 uppercase"
              >
                {isApplyingCoupon ? "Applying..." : "Coupon"}
              </button>
            </>
          )}
        </div>
      </div>

      <CouponPopUp 
        open={Open} 
        onClose={() => setOpen(false)} 
        onApply={handleCouponUse} 
      />

      {/* Total */}
      <div className="border-t border-[#bdbdb8] p-2 px-6">
        <div className="flex justify-between text-xl font-extrabold text-[#403e3e] mt-3 uppercase">
          <p>Subtotal:</p>
          <p>₱ {cartState.originalTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-xl font-extrabold text-[#403e3e] mt-3 uppercase">
          <p>Discount:</p>
          <p>- ₱ {cartState.discount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-xl font-extrabold text-[#403e3e] mt-3 uppercase">
          <p>Total:</p>
          <p>₱ {cartState.finalTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="flex justify-center pt-4">
        {cartCount !== 0 ? (
          <Link to="/CheckoutPage">
            <div className="w-60 max-w-md bg-[#db2026] text-white text-md font-semibold px-10 py-2 rounded-lg hover:bg-red-800 shadow-lg transition text-center">
              Checkout
            </div>
          </Link>
        ) : (
          <div
            className="w-60 max-w-md bg-[#EA1A20] text-white text-md font-semibold px-10 py-3 rounded-lg shadow-lg text-center cursor-pointer uppercase"
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

  
}
