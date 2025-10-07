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
    <div className="flex flex-col h-full bg-card">
      <div className="sticky top-0 z-10 p-4 shadow-sm bg-card">
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-primary" size={18} />
            <h1 className="text-content font-heading">Cart</h1>
            {!cartEmpty && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:text-black">{items.length}</span>
            )}
          </div>
          {!cartEmpty && <p className="text-sm text-brand dark:text-brand-dark font-heading">₱{subtotal}</p>}
        </div>
      </div>

      {!cartEmpty && (
        <div className="flex items-center justify-center gap-3 p-2 border-b text-content bg-admin">
          <Truck size={12} />
          <span className="text-xs">Free shipping</span>
          <div className="w-px h-3 bg-gray-300"></div>
          <ShieldCheck size={12} className="" />
          <span className="text-xs">Secure</span>
        </div>
      )}

      <main className="flex-1 p-3 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-2 animate-pulse">
              <ShoppingBag size={30} className="text-lighter" />
            </div>
            <p className="text-xs text-lighter">Loading cart...</p>
          </div>
        ) : cartEmpty ? (
          <div className="flex flex-col items-center justify-center h-full p-3 text-center">
            <div className="p-3 mb-3 bg-gray-100 rounded-full">
              <MilkOff size={30} className="text-gray-400" />
            </div>
            <h2 className="mb-1 text-sm font-semibold text-content">Cart is empty</h2>
            <p className="max-w-xs mb-4 text-xs text-lighter">Add items to your cart</p>
            {/* <Link to="/products">
              <Button className="gap-1 text-xs rounded-full" size="sm">
                <ShoppingBag size={14} />
                Shop Now
              </Button>
            </Link> */}
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <article key={item.product_id} className="flex gap-2 p-3 border-2 bg-card border-border rounded-2xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="flex-shrink-0 object-cover border border-border size-24 rounded-2xl"
                />

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="text-sm text-content font-heading line-clamp-2">{item.name}</h3>
                      <p className="text-content font-heading mt-0.5 text-xs">₱{parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      disabled={item.pendingAction === 'add'}
                      className={`flex-shrink-0 p-0.5 transition-colors ${
                        item.pendingAction === 'add'
                          ? 'text-lighter cursor-not-allowed'
                          : 'text-lighter hover:text-brand'
                      }`}
                    >
                      <Delete size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 rounded-full border border-gray-300 px-2 py-0.5">
                      <button
                        onClick={() => handleAdjust(item.product_id, item.quantity, false, item.stock_quantity)}
                        disabled={item.pendingAction === 'add'}
                        className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                          item.pendingAction === 'add'
                            ? 'text-lighter cursor-not-allowed bg-gray-100'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <Minus size={10} className="text-primary" />
                      </button>

                      <span className="w-4 text-xs font-medium text-center">
                        {item.pendingAction === 'add' ? '…' : item.quantity}
                      </span>

                      <button
                        onClick={() => handleAdjust(item.product_id, item.quantity, true, item.stock_quantity)}
                        disabled={item.pendingAction === 'add'}
                        className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${
                          item.pendingAction === 'add'
                            ? 'text-lighter cursor-not-allowed bg-gray-100'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <Plus size={10} className="text-primary" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold text-primary">₱{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {!cartEmpty && (
        <div className="sticky bottom-0 p-5 pb-8 border-t bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-content ">Subtotal:</span>
            <span className="text-base font-bold text-primary dark:text-brand-dark">₱{subtotal}</span>
          </div>
          <Link to="/CheckoutPage" className="block">
            <Button
              variant="CTA"
              size="sm"
              className="flex items-center justify-center w-full gap-1 py-2 text-xs font-bold text-white rounded-2xl"
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
