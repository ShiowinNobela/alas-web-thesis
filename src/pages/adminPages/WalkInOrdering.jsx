import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { FaPlus, FaMinus, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import WalkInPopUp from '../../components/WalkInPopUp.jsx';

function WalkInOrdering() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount_amount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProducts = data.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  return (
    <>
      <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left Section - Customer Info & Products */}
            <div className="flex-1 p-6 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Walk-in Order</h1>
              </div>

              {/* Customer Info */}
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Customer Information</h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="customer_name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        id="customer_name"
                        required
                        value={userInput.customer_name}
                        onChange={(e) => setUserInput({ ...userInput, customer_name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <label htmlFor="customer_email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="customer_email"
                        required
                        value={userInput.customer_email}
                        onChange={(e) => setUserInput({ ...userInput, customer_email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Products Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Available Products</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{filteredProducts.length} products</span>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  {/* Products Grid with Fixed Height */}
                  <div className="pr-2 overflow-y-auto h-96">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                      {filteredProducts.map((d) => (
                        <div
                          key={d.id}
                          className="p-3 transition-all duration-200 bg-white border border-transparent cursor-pointer group dark:bg-gray-700 rounded-xl hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-400"
                          onClick={() => {
                            setOpen(true);
                            setSelectedProduct(d);
                          }}
                        >
                          <div className="flex items-center justify-center p-2 mb-3 overflow-hidden border border-gray-200 rounded-lg aspect-square bg-gray-50 dark:bg-gray-600 dark:border-gray-500">
                            <img 
                              src={d.image} 
                              alt={d.name}
                              className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-105" 
                            />
                          </div>
                          <h3 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
                            {d.name}
                          </h3>
                          <p className="font-bold text-orange-600 dark:text-orange-400">₱{d.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  type="submit"
                  disabled={cartItems.length === 0}
                  className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <FaShoppingCart />
                  Checkout Order
                </button>
              </form>
            </div>

            {/* Right Section - Cart */}
            <div className="w-full p-6 bg-white shadow-lg lg:w-96 dark:bg-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FaShoppingCart className="text-xl text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Order Summary</h2>
                </div>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 transition-colors hover:text-red-700 dark:hover:text-red-400"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Cart Items */}
              <div className="pr-2 space-y-4 overflow-y-auto max-h-96">
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <FaShoppingCart className="mx-auto mb-3 text-4xl text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400">No items in cart</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Select products to add to order</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="font-bold text-orange-600 dark:text-orange-400">₱{item.price}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="p-1 text-red-500 transition-colors hover:text-red-700 dark:hover:text-red-400"
                        >
                          <TiDeleteOutline className="text-xl" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleChangeCartQuantity(item.id, -1)}
                            className="flex items-center justify-center w-6 h-6 transition-colors bg-gray-200 rounded-full dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            <FaMinus className="text-xs" />
                          </button>
                          <span className="font-semibold text-center text-gray-800 dark:text-white min-w-8">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleChangeCartQuantity(item.id, 1)}
                            className="flex items-center justify-center w-6 h-6 transition-colors bg-gray-200 rounded-full dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                          >
                            <FaPlus className="text-xs" />
                          </button>
                        </div>
                        <span className="font-bold text-gray-800 dark:text-white">
                          ₱{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Totals */}
              {cartItems.length > 0 && (
                <div className="pt-4 mt-4 space-y-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₱{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Discount:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">₱</span>
                      <input
                        type="number"
                        className="w-20 px-1 py-1 text-right border-b border-gray-300 [appearance:textfield] dark:border-gray-600 focus:border-orange-500 focus:outline-none dark:bg-transparent dark:text-white"
                        value={discount_amount}
                        min={0}
                        max={subtotal}
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                    </div>
                  </div>
                    
                  <div className="flex items-center justify-between pt-3 text-lg font-bold text-gray-800 border-t border-gray-200 dark:text-white dark:border-gray-600">
                    <span>Total:</span>
                    <span className="text-orange-600 dark:text-orange-400">₱{total.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Popup */}
        <WalkInPopUp open={open} onClose={() => setOpen(false)}>
          <div className="p-6 bg-white rounded-lg w-xs dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">{selectedProduct?.name}</h2>
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={selectedProduct?.image} 
                alt={selectedProduct?.name}
                className="object-contain w-20 h-20 p-2 rounded-lg bg-gray-50 dark:bg-gray-600"
              />
              <div>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">₱{selectedProduct?.price}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Select quantity</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white [appearance:textfield]"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 px-4 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </WalkInPopUp>

      </div>
    </>
  );
}

export default WalkInOrdering;
