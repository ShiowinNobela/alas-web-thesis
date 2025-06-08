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
      <div className="h-full w-screen bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]">
        <NewSideBar />
        <div className="  h-full w-full flex flex-col items-center justify-center gap-5 overflow-auto">
          <div className="flex flex-row shadow-2xl drop-shadow-2xl">
            
            {/* form */}
            <div className="p-10 bg-white border-r rounded-l-2xl">
              <form className="max-w-5xl" onSubmit={handleSubmit}>
                
                {/* customer info */}
                <div className="grid md:grid-cols-2 md:gap-6 mb-5">
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="Customer_Name"
                      required
                      value={userInput.customer_name}
                      onChange={(e) =>
                        setUserInput({ ...userInput, customer_name: e.target.value })
                      }
                      id="floating_customer_name"
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      htmlFor="floating_customer_name"
                      className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Customer Name
                    </label>
                  </div>

                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="customer_email"
                      required
                      value={userInput.customer_email}
                      onChange={(e) =>
                        setUserInput({ ...userInput, customer_email: e.target.value })
                      }
                      id="floating_customer_email"
                      placeholder=" "
                      className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                      htmlFor="floating_customer_email"
                      className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Remarks
                    </label>
                  </div>
                </div>

                {/* remarks */}
                <Description
                  label="Notes"
                  value={userInput.notes}
                  onChange={(e) =>
                    setUserInput({ ...userInput, notes: e.target.value })
                  }
                />

                {/* prodlist */}
                <div className="flex flex-col items-center justify-center">
                  <div className="my-5 p-3 grid grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
                      {data.map((d) => (
                        <div
                          key={d.id}
                          className="flex flex-col items-center justify-center border p-3 rounded shadow-sm cursor-pointer"
                          onClick={() => {
                            setOpen(true);
                            setSelectedProduct(d);
                          }}
                        >
                          <img src={d.image} alt="/" className="w-35 h-35 mb-2" />
                          <h1 className="font-semibold">{d.name}</h1>
                          <p className="text-gray-700">₱ {d.price}</p>

                          <WalkInPopUp
                            open={open && selectedProduct?.id === d.id}
                            onClose={() => setOpen(false)}
                          >
                            <div className="p-3">
                              <h1 className="mb-2">{d.name}</h1>
                              <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-full border rounded px-2 py-1"
                              />
                            </div>
                            <div className="flex justify-center gap-4 mt-4">
                              <button
                                type="button"
                                onClick={handleAddToCart}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                              >
                                Add to Cart
                              </button>
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                            </div>
                          </WalkInPopUp>
                        </div>
                      ))}
                    </div>
                  </div>

                {/* checkout button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-5"
                >
                  Checkout
                </button>
              </form>
            </div>

                {/* cart */}
                <div className="flex flex-col h-full bg-white w-full max-w-md p-5 rounded-r-md">
                  <div className="flex flex-col items-center justify-center mb-4">
                    <h1 className="font-semibold text-2xl mb-4">Cart</h1>

                          <div className="min-h-[400px] max-h-[500px] flex flex-col">
                            <div className="flex-1 overflow-y-auto">
                            {cartItems.length === 0 ? (
                              <p className="text-center text-gray-500">No items in cart</p>
                            ) : (
                              cartItems.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between items-center mb-2"
                                >
                                  <div className="flex flex-col w-2/3">
                                    <h2 className="text-lg font-semibold text-center mb-2">
                                      {item.name}
                                    </h2>
                                    <div className="grid grid-cols-3 gap-2 items-center">
                                      <FaPlus
                                        className="cursor-pointer hover:text-[#EA1A20] mx-auto"
                                        onClick={() => handleChangeCartQuantity(item.id, 1)}
                                      />
                                      <FaMinus
                                        className="cursor-pointer hover:text-[#EA1A20] mx-auto"
                                        onClick={() => handleChangeCartQuantity(item.id, -1)}
                                      />
                                      <p className="text-center font-bold">
                                        ₱ {item.price} x {item.quantity}
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

                      {/* total */}
                      <div className="pt-4">
                      <div className="border-t pt-4 w-full">
                        <div className="flex justify-between text-md font-semibold mb-2">
                          <p>Subtotal:</p>
                          <p>₱ {subtotal}</p>
                        </div>
                        <div className="flex justify-between items-center text-md font-semibold mb-2">
                          <p>Discount:</p>
                          <div className="flex flex-row items-center gap-2">
                            <p>₱</p>
                            <input
                              type="number"
                              className="h-10 w-20 border-b border-gray-400 px-2"
                              value={discount_amount}
                              min={0}
                              max={subtotal}
                              onChange={(e) => setDiscount(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between text-xl font-extrabold uppercase">
                          <p>Total:</p>
                          <p>₱ {total}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <Toaster richColors />
          </div>
        </div>
    </>
  );
}

export default WalkInOrdering;