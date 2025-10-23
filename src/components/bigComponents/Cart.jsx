import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useCartStore from '@/stores/cartStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Delete, MilkOff, Minus, Plus, ShoppingCart, ShoppingBag, ArrowRight } from 'lucide-react';
import CouponCard from '../cards/CouponCard';
import { AnimatePresence } from 'framer-motion';
import LoyaltyDialog from '../modals/LoyaltyModal';

function Cart() {
  const {
    items,
    fetchCart,
    cart_total,
    final_total,
    discount,
    coupon_code,
    isLoading,
    adjustQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [loyaltyOpen, setLoyaltyOpen] = useState(false);
  const [couponInput, setCouponInput] = useState('');

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleAdjust = (productId, currentQty, isIncrement, stock) => {
    const newQty = isIncrement ? currentQty + 1 : currentQty - 1;
    if (newQty >= 1 && newQty <= stock) {
      adjustQuantity(productId, newQty);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    await applyCoupon(couponInput.trim());
    setCouponInput('');
  };

  const subtotal = cart_total.toFixed(2);
  const finalTotal = final_total.toFixed(2);
  const cartEmpty = items.length === 0;

  return (
    <div className="bg-card flex h-full flex-col">
      {/* Header */}
      <div className="bg-card sticky top-0 z-10 p-3 shadow-sm sm:p-4">
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-primary" size={18} />
            <h1 className="text-content font-heading">Cart</h1>
            {!cartEmpty && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:text-black">{items.length}</span>
            )}
          </div>
          {!cartEmpty && <p className="text-brand font-heading text-sm">₱{subtotal}</p>}
        </div>
      </div>

      {/* Main cart */}
      <main className="flex-1 overflow-y-auto p-3">
        {isLoading ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-2 animate-pulse">
              <ShoppingBag size={30} className="text-lighter" />
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
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <article
                key={item.product_id}
                className="bg-card border-primary/50 flex gap-2 rounded-xl border p-2 sm:gap-3 sm:rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="border-border size-16 flex-shrink-0 rounded-xl border object-cover sm:size-20 sm:rounded-2xl"
                />

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1 pr-1">
                      <h3 className="text-content font-heading line-clamp-2 tracking-tight">{item.name}</h3>
                      <p className="text-content font-heading mt-0.5 text-sm">₱{parseFloat(item.price).toFixed(2)}</p>
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
                      <Delete size={20} className="text-amber-500" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-gray-300 px-2 py-1 sm:py-0.5">
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

                      <span className="w-4 text-center text-sm font-medium">
                        {item.pendingAction === 'add' ? '…' : item.quantity}
                      </span>

                      <button
                        onClick={() => handleAdjust(item.product_id, item.quantity, true, item.stock_quantity)}
                        disabled={item.pendingAction === 'add'}
                        className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors sm:h-5 sm:w-5 ${
                          item.pendingAction === 'add'
                            ? 'text-lighter cursor-not-allowed bg-gray-100'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <Plus size={10} className="text-primary" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-primary text-xs font-semibold">₱{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Bottom summary */}
      {!cartEmpty && (
        <div className="bg-card sticky bottom-0 space-y-3 border-t p-4 pb-6 sm:p-5 sm:pb-8">
          {/* Coupon section */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <AnimatePresence>
              {coupon_code ? (
                <CouponCard key={coupon_code} code={coupon_code} discount={discount} onRemove={removeCoupon} />
              ) : (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs"
                  />
                  <Button size="sm" variant="outline" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-2">
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-amber-200 via-amber-200 to-yellow-200 py-5 text-black hover:bg-amber-400"
              onClick={() => setLoyaltyOpen(true)}
            >
              View Claimed Rewards
            </Button>
            {loyaltyOpen && (
              <LoyaltyDialog
                open={loyaltyOpen}
                onOpenChange={setLoyaltyOpen}
                onSelectCoupon={async (code) => {
                  await applyCoupon(code.trim());
                  setCouponInput('');
                  setLoyaltyOpen(false);
                }}
              />
            )}
          </div>

          {/* Totals */}
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₱{subtotal}</span>
            </div>

            <div className={`flex justify-between ${discount > 0 ? 'text-green-600' : 'text-lighter'}`}>
              <span>Discount</span>
              <span>-₱{discount.toFixed(2)}</span>
            </div>

            <div className="text-primary flex justify-between font-semibold">
              <span>Total</span>
              <span>₱{finalTotal}</span>
            </div>
          </div>

          <Link to="/user/checkout" className="block">
            <Button
              variant="CTA"
              size="sm"
              className="flex w-full items-center justify-center gap-1 rounded-2xl py-2 text-xs font-bold text-white"
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
