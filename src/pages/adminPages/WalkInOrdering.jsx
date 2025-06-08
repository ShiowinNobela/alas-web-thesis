import { useEffect, useState } from "react";
import axios from "axios";
import NewSideBar from "../../components/newSideBar";
import { Toaster, toast } from "sonner";
import Description from "../../components/Chinges/Description";
import { FaPlus, FaMinus } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import WalkInPopUp from "../../components/WalkInPopUp.jsx";

function WalkInOrdering() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount_amount, setDiscount] = useState(0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = Math.max(0, subtotal - Number(discount_amount) || 0);
  const [userInput, setUserInput] = useState({
    customer_name: "",
    customer_email: "",
    notes: "",
  });

  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/walkInOrders/", {
        ...userInput,
        discount_amount: Number(discount_amount),
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });
      toast.success("Order placed!");
      setCartItems([]);
      setUserInput({ customer_name: "", customer_email: "", notes: "" });
      setDiscount(0);
    } catch (err) {
      console.log(err);
      toast.error("Failed to place order");
    }
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const existing = cartItems.find((item) => item.id === selectedProduct.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...selectedProduct, quantity }]);
    }
    setOpen(false);
    setQuantity(1);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleChangeCartQuantity = (id, delta) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  return (
    <>
      <div className="h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]">
        <NewSideBar />
        <div className="min-h-full w-100% ml-5 flex flex-col items-center justify-center gap-5 overflow-auto">
          <div className="flex flex-row shadow-2xl drop-shadow-2xl">
            <div className=" p-10 bg-white border-r">
              <form className="max-w-5xl" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="Customer_Name"
                      placeholder=" "
                      required
                      value={userInput.customer_name}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          customer_name: e.target.value,
                        })
                      }
                      id="floating_customer_name"
                      className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      for="floating_customer_name"
                      className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Customer Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="customer_email"
                      placeholder=" "
                      required
                      value={userInput.customer_email}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          customer_email: e.target.value,
                        })
                      }
                      className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      for="floating_customer_email"
                      className="peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Customer Email
                    </label>
                  </div>
                </div>
                <Description
                  label="Notes"
                  value={userInput.notes}
                  onChange={(e) =>
                    setUserInput({ ...userInput, notes: e.target.value })
                  }
                />

                <div className="flex flex-col items-center justify-center">
                  <div className="border-1 my-5 p-3 overflow-y-scroll grid grid-cols-3 h-100 ">
                    {data.map((d) => (
                      <div
                        key={d.id}
                        className="flex flex-col items-center justify-center border-1 h-50 w-40 mb-2"
                        onClick={() => {
                          setOpen(true);
                          setSelectedProduct(d);
                        }}
                      >
                        <div className="bg-red-300 w-30 h-30"></div>
                        <h1>{d.name}</h1>
                        <p>{d.price}</p>

                        <WalkInPopUp
                          open={open && selectedProduct?.id === d.id}
                          onClose={() => setOpen(false)}
                        >
                          <div className="p-3">
                            <h1>{d.name}</h1>
                            <input
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(Number(e.target.value))
                              }
                            />
                          </div>
                          <div className="flex justify-center gap-4">
                            <button
                              type="button"
                              onClick={handleAddToCart}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                              Add to Cart
                            </button>
                            <button
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                              onClick={() => setOpen(false)}
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </WalkInPopUp>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Checkout
                </button>
              </form>
            </div>
            {/* Cart Section */}
            <div className="bg-white w-100 p-5">
              <div className="flex flex-col items-center justify-center">
                <h1 className="font-semibold text-2xl">Cart</h1>
                <div className="bg-[#ffffff] w-full rounded-xl shadow-sm border border-[#e0ded8] mb-4 p-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No items in cart
                    </p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center mb-2"
                      >
                        <div className="flex flex-col">
                          <h2 className="text-lg font-semibold text-[#1c1a1a] text-center mb-2">
                            {item.name}
                          </h2>
                          <div className="grid grid-cols-3 gap-2 items-center">
                            <FaPlus
                              className="cursor-pointer text-[#1c1a1a] hover:text-[#EA1A20] mx-auto"
                              onClick={() =>
                                handleChangeCartQuantity(item.id, 1)
                              }
                            />
                            <FaMinus
                              className="cursor-pointer text-[#1c1a1a] hover:text-[#EA1A20] mx-auto"
                              onClick={() =>
                                handleChangeCartQuantity(item.id, -1)
                              }
                            />
                            <p className="text-center font-bold text-[#1c1a1a]">
                              {item.price} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <TiDeleteOutline
                          className="text-[#d80c0c] w-5 h-5 cursor-pointer"
                          onClick={() => handleRemoveFromCart(item.id)}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* Totals */}
              <div className="border-t border-[#bdbdb8] p-2">
                <div className="flex justify-between text-md font-semibold text-[#403e3e]">
                  <p>Subtotal:</p>
                  <p>₱ {subtotal}</p>
                </div>
                <div className="flex justify-between items-center text-md font-semibold text-[#403e3e]">
                  <p>Discount:</p>
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <p>₱ </p>
                    <input
                      type="number"
                      className="h-10 w-30 border-0 border-b"
                      value={discount_amount}
                      min={0}
                      max={subtotal}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xl font-extrabold text-[#403e3e] mt-3 uppercase">
                  <p>Total:</p>
                  <p>₱ {total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors />
    </>
  );
}

export default WalkInOrdering;
