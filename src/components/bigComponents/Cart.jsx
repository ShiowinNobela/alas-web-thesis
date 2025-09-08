import { Link } from 'react-router-dom';
import useCartStore from '@/stores/cartStore';
import { Button } from '../ui/button';
import { Delete, MilkOff, Minus, Plus, ShoppingCart, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';

function Cart() {
  const { items, cart_total, isLoading, adjustQuantity, removeItem } = useCartStore();

  const handleAdjust = (productId, currentQty, isIncrement, stock) => {
    const newQty = isIncrement ? currentQty + 1 : currentQty - 1;
    if (newQty >= 1 && newQty <= stock) {
      adjustQuantity(productId, newQty);
    }
  };

  const subtotal = cart_total.toFixed(2);
  const cartEmpty = items.length === 0;

  return (
    <div className="bg-card flex h-[calc(100dvh-64px)] flex-col">
      <div className="bg-card sticky top-0 z-10 p-4 shadow-sm">
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-primary" size={18} />
            <h1 className="text-content font-bold">Cart</h1>
            {!cartEmpty && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:text-black">{items.length}</span>
            )}
          </div>
          {!cartEmpty && <p className="text-primary text-sm font-semibold">₱{subtotal}</p>}
        </div>
      </div>

      {!cartEmpty && (
        <div className="bg-neutral flex items-center justify-center gap-3 border-b px-2 py-2">
          <Truck size={12} className="text-lighter" />
          <span className="text-lighter text-xs">Free shipping</span>
          <div className="h-3 w-px bg-gray-300"></div>
          <ShieldCheck size={12} className="text-lighter" />
          <span className="text-lighter text-xs">Secure</span>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-3">
        {isLoading ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-2 animate-pulse">
              <ShoppingBag size={30} className="text-gray-300" />
            </div>
            <p className="text-lighter text-xs">Loading cart...</p>
          </div>
        ) : cartEmpty ? (
          <div className="flex h-full flex-col items-center justify-center p-3 text-center">
            <div className="mb-3 rounded-full bg-gray-100 p-3">
              <MilkOff size={30} className="text-gray-400" />
            </div>
            <h2 className="text-content mb-1 text-sm font-semibold">Cart is empty</h2>
            <p className="text-lighter mb-4 max-w-xs text-xs">Add items to your cart</p>
            {/* <Link to="/products">
              <Button className="gap-1 rounded-full text-xs" size="sm">
                <ShoppingBag size={14} />
                Shop Now
              </Button>
            </Link> */}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <article
                key={item.product_id}
                className="bg-card flex gap-2 rounded-lg border border-gray-200 p-2 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 flex-shrink-0 rounded-md border border-gray-100 object-cover"
                />

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1 pr-1">
                      <h3 className="text-content line-clamp-2 text-xs leading-tight font-medium">{item.name}</h3>
                      <p className="text-primary mt-0.5 text-xs font-semibold">₱{parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="flex-shrink-0 p-0.5 text-gray-400 transition-colors hover:text-red-500"
                    >
                      <Delete size={14} />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-gray-300 px-2 py-0.5">
                      <button
                        onClick={() => handleAdjust(item.product_id, item.quantity, false, item.stock_quantity)}
                        className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-4 text-center text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleAdjust(item.product_id, item.quantity, true, item.stock_quantity)}
                        className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-content text-xs font-semibold">₱{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {!cartEmpty && (
        <div className="bg-card sticky bottom-0 border-t p-5 pb-8 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-content text-sm">Subtotal:</span>
            <span className="text-primary text-base font-bold">₱{subtotal}</span>
          </div>
          <Link to="/CheckoutPage" className="block">
            <Button
              variant="CTA"
              size="sm"
              className="flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs font-bold text-white"
            >
              Checkout
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
