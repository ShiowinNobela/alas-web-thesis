import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import WalkInPopUp from '../../components/WalkInPopUp.jsx';

function WalkInOrdering() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount_amount, setDiscount] = useState(0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - Number(discount_amount) || 0);
  const [userInput, setUserInput] = useState({
    customer_name: '',
    customer_email: '',
    notes: '',
  });

  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/walkInOrders/', {
        ...userInput,
        discount_amount: Number(discount_amount),
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });
      toast.success('Order placed!');
      setCartItems([]);
      setUserInput({ customer_name: '', customer_email: '', notes: '' });
      setDiscount(0);
    } catch (err) {
      console.log(err);
      toast.error('Failed to place order');
    }
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const existing = cartItems.find((item) => item.id === selectedProduct.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === selectedProduct.id ? { ...item, quantity: item.quantity + quantity } : item
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
      cartItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
    );
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center overflow-x-auto bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 p-6">
        <div className="flex min-h-full w-full flex-col overflow-auto p-5">
          <div className="mx-auto flex w-full max-w-[1400px] flex-row overflow-hidden rounded-2xl shadow-2xl drop-shadow-2xl">
            {/* form */}
            <div className="flex-grow border-r bg-white p-10">
              <form className="w-full" onSubmit={handleSubmit}>
                {/* customer info */}
                <div className="mb-5 grid md:grid-cols-2 md:gap-6">
                  <div className="group relative z-0 w-full">
                    <input
                      type="text"
                      name="Customer_Name"
                      required
                      value={userInput.customer_name}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          customer_name: e.target.value,
                        })
                      }
                      id="floating_customer_name"
                      placeholder=" "
                      className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm focus:border-blue-600 focus:ring-0 focus:outline-none"
                    />
                    <label
                      htmlFor="floating_customer_name"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600"
                    >
                      Customer Name
                    </label>
                  </div>

                  <div className="group relative z-0 w-full">
                    <input
                      type="text"
                      name="customer_email"
                      required
                      value={userInput.customer_email}
                      onChange={(e) =>
                        setUserInput({
                          ...userInput,
                          customer_email: e.target.value,
                        })
                      }
                      id="floating_customer_email"
                      placeholder=" "
                      className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm focus:border-blue-600 focus:ring-0 focus:outline-none"
                    />
                    <label
                      htmlFor="floating_customer_email"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600"
                    >
                      Email
                    </label>
                  </div>
                </div>

                {/* product list */}
                <div className="flex flex-col items-center justify-center">
                  <div className="my-5 grid max-h-[350px] w-full grid-cols-4 gap-4 overflow-y-auto p-3">
                    {data.map((d) => (
                      <div
                        key={d.id}
                        className="flex cursor-pointer flex-col items-center justify-center rounded border p-3 shadow-sm"
                        onClick={() => {
                          setOpen(true);
                          setSelectedProduct(d);
                        }}
                      >
                        <img src={d.image} alt="/" className="mb-2 h-[100px] w-[100px] object-contain" />
                        <h1 className="text-center font-semibold">{d.name}</h1>
                        <p className="text-gray-700">₱ {d.price}</p>

                        <WalkInPopUp open={open && selectedProduct?.id === d.id} onClose={() => setOpen(false)}>
                          <div className="p-3">
                            <h1 className="mb-2">{d.name}</h1>
                            <input
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(e) => setQuantity(Number(e.target.value))}
                              className="w-full rounded border px-2 py-1"
                            />
                          </div>
                          <div className="mt-4 flex justify-center gap-4">
                            <button
                              type="button"
                              onClick={handleAddToCart}
                              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            >
                              Add to Cart
                            </button>
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
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
                  className="mt-5 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none sm:w-auto"
                >
                  Checkout
                </button>
              </form>
            </div>

            {/* cart */}
            <div className="flex h-full w-[350px] flex-col bg-white">
              <div className="flex h-full flex-col p-5">
                <div className="mb-4 flex flex-col items-center justify-center">
                  <h1 className="mb-4 text-2xl font-semibold">Cart</h1>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex-1 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <p className="text-center text-gray-500">No items in cart</p>
                    ) : (
                      cartItems.map((item) => (
                        <div key={item.id} className="mb-2 flex items-center justify-between">
                          <div className="flex w-2/3 flex-col">
                            <h2 className="mb-2 text-center text-lg font-semibold">{item.name}</h2>
                            <div className="grid grid-cols-3 items-center gap-2">
                              <FaPlus
                                className="mx-auto cursor-pointer hover:text-orange-600"
                                onClick={() => handleChangeCartQuantity(item.id, 1)}
                              />
                              <FaMinus
                                className="mx-auto cursor-pointer hover:text-orange-600"
                                onClick={() => handleChangeCartQuantity(item.id, -1)}
                              />
                              <p className="text-center font-bold">
                                ₱ {item.price} x {item.quantity}
                              </p>
                            </div>
                          </div>
                          <TiDeleteOutline
                            className="h-5 w-5 cursor-pointer text-red-600"
                            onClick={() => handleRemoveFromCart(item.id)}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  {/* total */}
                  <div className="mt-auto border-t pt-4">
                    <div className="text-md mb-2 flex justify-between font-semibold">
                      <p>Subtotal:</p>
                      <p>₱ {subtotal}</p>
                    </div>
                    <div className="text-md mb-2 flex items-center justify-between font-semibold">
                      <p>Discount:</p>
                      <div className="flex flex-row items-center gap-2">
                        <p>₱</p>
                        <input
                          type="number"
                          className="h-10 w-20 border-b border-gray-400 px-2 focus:border-orange-500 focus:outline-none"
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

          <Toaster richColors />
        </div>
      </div>
    </>
  );
}

export default WalkInOrdering;
