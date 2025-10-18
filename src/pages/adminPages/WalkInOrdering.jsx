import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Card, TextInput } from 'flowbite-react';
import { MilkOff, Minus, Plus, Search, ShoppingCart, X } from 'lucide-react';
import { Modal, ModalHeader, ModalBody, Label, Button } from 'flowbite-react';

function WalkInOrdering() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [discount_amount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  const filteredProducts = data.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
      <div className="bg-admin h-full p-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid-cols-4 gap-4 lg:grid">
            {/* Products and Customer Info */}
            <Card className="col-span-3 flex-1 ring-1">
              <h1 className="text-content text-2xl font-bold">Make a Walk-in Order</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lighter">Available Products</h2>
                    <span className="text-content">{filteredProducts.length} products</span>
                  </div>

                  <TextInput
                    id="search"
                    type="text"
                    icon={Search}
                    placeholder="Search products..."
                    value={searchTerm}
                    className="mb-4"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    color="gray"
                  />

                  {/* Products Grid with Fixed Height */}
                  <div className="h-screen overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-4 p-1 sm:grid-cols-3 lg:grid-cols-4">
                      {filteredProducts.map((d) => (
                        <Card
                          key={d.id}
                          imgSrc={d.image}
                          imgAlt={d.name}
                          className="group cursor-pointer ring-1 transition-all duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                          onClick={() => {
                            setOpen(true);
                            setSelectedProduct(d);
                          }}
                        >
                          <h3 className="font-heading line-clamp-1 font-bold">{d.name}</h3>
                          <div className="text-lighter text-sm">
                            <p>
                              Stock: <span className="text-content">{d.stock_quantity}</span>
                            </p>
                            <p>
                              Reserved Stock: <span className="text-content">{d.reserved_quantity}</span>
                            </p>
                          </div>
                          <p className="font-bold text-emerald-500">₱{d.price}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </Card>

            <Card className="flex h-full ring-1">
              <div className="flex h-full flex-col justify-start gap-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="text-xl text-blue-600 dark:text-blue-400" />
                    <h2 className="font-bold">Order Summary</h2>
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-red-500 transition-colors hover:text-red-700 dark:hover:text-red-400"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>

                <div className="space-y-4 overflow-y-auto p-1">
                  {cartItems.length === 0 ? (
                    <Card className="mx-auto py-8 text-center ring-1">
                      <MilkOff className="text-lighter mx-auto mb-3 size-20" />
                      <p className="text-content">No items in cart</p>
                      <p className="text-lighter text-sm">Select products to add to order</p>
                    </Card>
                  ) : (
                    cartItems.map((item) => (
                      <Card key={item.id} className="ring-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-heading text-content line-clamp-1 font-bold">{item.name}</h3>
                            <p className="font-bold text-emerald-500">₱{item.price}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="p-1 text-red-500 transition-colors hover:text-red-700 dark:hover:text-red-400"
                          >
                            <X className="text-xl" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleChangeCartQuantity(item.id, -1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                            >
                              <Minus className="text-xs" />
                            </button>
                            <span className="min-w-8 text-center font-semibold text-gray-800 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleChangeCartQuantity(item.id, 1)}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500"
                            >
                              <Plus className="text-xs" />
                            </button>
                          </div>
                          <span className="font-bold text-gray-800 dark:text-white">
                            ₱{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </Card>
                    ))
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="mt-4 space-y-3 border-t border-gray-200 pt-4 dark:border-gray-600">
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
                          className="w-20 [appearance:textfield] border-b border-gray-300 px-1 py-1 text-right focus:border-orange-500 focus:outline-none dark:border-gray-600 dark:bg-transparent dark:text-white"
                          value={discount_amount}
                          min={0}
                          max={subtotal}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-lg font-bold text-gray-800 dark:border-gray-600 dark:text-white">
                      <span>Total:</span>
                      <span className="text-orange-600 dark:text-orange-400">₱{total.toLocaleString()}</span>
                    </div>

                    <Button
                      color="blue"
                      className="flex w-full items-center justify-center gap-2 font-semibold"
                      onClick={() => setConfirmOpen(true)}
                      disabled={cartItems.length === 0}
                    >
                      <ShoppingCart className="mr-2" />
                      Checkout Order
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        <Modal show={open} size="md" onClose={() => setOpen(false)} popup>
          <ModalHeader />
          <ModalBody>
            <div className="space-y-6">
              <h2 className="text-center text-xl font-bold text-gray-800 dark:text-white">{selectedProduct?.name}</h2>

              <div className="flex items-center gap-4">
                <img
                  src={selectedProduct?.image}
                  alt={selectedProduct?.name}
                  className="h-24 w-24 rounded-lg bg-gray-50 object-contain p-2 dark:bg-gray-600"
                />
                <div>
                  <p className="text-lg font-bold text-orange-600 dark:text-orange-400">₱{selectedProduct?.price}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Select quantity</p>
                </div>
              </div>

              <div>
                <Label htmlFor="quantity" value="Quantity" />
                <TextInput
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Enter quantity"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  color="blue"
                  className="flex-1"
                  onClick={() => {
                    handleAddToCart();
                    setOpen(false);
                  }}
                >
                  Add to Cart
                </Button>
                <Button color="gray" className="flex-1" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal show={confirmOpen} size="md" onClose={() => setConfirmOpen(false)} popup>
          <ModalHeader />
          <ModalBody>
            <div className="space-y-4">
              <h3 className="text-center text-xl font-semibold text-gray-800 dark:text-white">Confirm Walk-in Order</h3>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                You can enter optional customer information before confirming.
              </p>

              <div>
                <Label htmlFor="customer_name" value="Customer Name (optional)" />
                <TextInput
                  id="customer_name"
                  type="text"
                  value={userInput.customer_name}
                  onChange={(e) => setUserInput({ ...userInput, customer_name: e.target.value })}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <Label htmlFor="customer_email" value="Customer Email (optional)" />
                <TextInput
                  id="customer_email"
                  type="email"
                  value={userInput.customer_email}
                  onChange={(e) => setUserInput({ ...userInput, customer_email: e.target.value })}
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="notes" value="Order Notes (optional)" />
                <TextInput
                  id="notes"
                  type="text"
                  value={userInput.notes}
                  onChange={(e) => setUserInput({ ...userInput, notes: e.target.value })}
                  placeholder="e.g. Add extra sauce..."
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button
                  color="blue"
                  onClick={(e) => {
                    handleSubmit(e);
                    setConfirmOpen(false);
                  }}
                >
                  Confirm Order
                </Button>
                <Button color="gray" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default WalkInOrdering;
