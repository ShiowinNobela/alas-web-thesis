import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import useCartStore from '@/stores/cartStore';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Delete, MilkOff, Minus, Plus, ShoppingCart } from 'lucide-react';

function Cart() {
  const {
    items,
    cart_total,
    isLoading,
    fetchCart,
    adjustQuantity,
    removeItem,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleAdjust = (productId, currentQty, isIncrement, stock) => {
    const newQty = isIncrement ? currentQty + 1 : currentQty - 1;
    if (newQty >= 1 && newQty <= stock) {
      adjustQuantity(productId, newQty);
    }
  };

  const subtotal = cart_total.toFixed(2);
  const cartEmpty = items.length === 0;

  return (
    <div className="flex h-[calc(100dvh-80px)] flex-col bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-2 shadow-sm">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-lg" />
          <h1 className="font-heading text-lg font-bold uppercase">Cart</h1>
          {!cartEmpty && (
            <span className="rounded-full bg-gray-200 p-2 text-xs">
              {items.length}
            </span>
          )}
        </div>
      </div>

      {/* Cart Items */}
      <main className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-xs text-gray-500">Loading...</p>
          </div>
        ) : cartEmpty ? (
          <div className="flex h-full flex-col items-center justify-center p-2">
            <p className="mb-2 text-sm text-gray-500">Your cart is empty</p>
            <MilkOff />
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <article
                key={item.product_id}
                className="flex items-center gap-2 rounded-md border bg-white p-2 text-sm shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-15 w-12 flex-shrink-0 rounded object-cover"
                />

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div className="font-heading line-clamp-2 pr-1 leading-tight">
                      {item.name}
                    </div>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Delete className="text-base" />
                    </button>
                  </div>

                  <div className="mt-0.5 flex justify-between text-xs">
                    <span className="text-lighter">
                      ₱{parseFloat(item.price).toFixed(2)}
                    </span>
                    <span className="font-medium">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border px-2 py-0.5">
                      <button
                        onClick={() =>
                          handleAdjust(
                            item.product_id,
                            item.quantity,
                            false,
                            item.stock_quantity
                          )
                        }
                        className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100"
                      >
                        <Minus className="text-[10px]" />
                      </button>
                      <span className="w-4 text-center text-xs">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleAdjust(
                            item.product_id,
                            item.quantity,
                            true,
                            item.stock_quantity
                          )
                        }
                        className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100"
                      >
                        <Plus className="text-[10px]" />
                      </button>
                    </div>
                    {item.stock_quantity > 0 && (
                      <span className="text-lighter text-xs">
                        {item.stock_quantity} left
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {!cartEmpty && (
        <div className="sticky bottom-0 border-t bg-white p-2 py-4 text-sm">
          <div className="mb-2 flex justify-between font-bold">
            <span>Subtotal:</span>
            <span>₱{subtotal}</span>
          </div>
          <Link to="/CheckoutPage" className="block">
            <Button
              variant="CTA"
              size="sm"
              className="w-full py-1 text-xs text-white"
            >
              Checkout
            </Button>
          </Link>
        </div>
      )}

      <Toaster richColors position="top-center" />
    </div>
  );
}

export default Cart;
