import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatePresence } from 'framer-motion';
import { Delete, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '@/stores/cartStore';
import { useState } from 'react';
import CouponCard from './CouponCard';

function CartSummaryCard() {
  const navigate = useNavigate();
  const {
    items,
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

  const [couponInput, setCouponInput] = useState('');

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

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl">Your Cart</CardTitle>
        <button className="border-content cursor-pointer text-sm hover:border-b" onClick={() => navigate('/menu')}>
          Go Back to Menu
        </button>
      </CardHeader>

      {/* CART ITEMS */}
      <CardContent className="mt-4 space-y-3">
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading cart...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty. Add items to proceed</p>
        ) : (
          items.map((item) => (
            <article key={item.product_id} className="flex items-center gap-3 rounded-2xl border p-3">
              <img src={item.image} alt={item.name} className="size-24 flex-shrink-0 rounded-2xl border object-cover" />

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1 pr-1">
                    <h3 className="text-content font-heading line-clamp-2">{item.name}</h3>
                    <p className="text-primary font-heading mt-0.5 text-sm">₱{parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="flex-shrink-0 p-0.5 text-gray-400 transition-colors hover:text-red-500"
                  >
                    <Delete className="size-7" />
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  {/* Quantity controls */}
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
                    <p className="text-content font-semibold">₱{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </CardContent>

      {/* COUPON SECTION */}
      <div className="w-full px-8">
        <div className="flex justify-end">
          <div className="w-full sm:w-1/2">
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
        </div>
      </div>

      {/* TOTALS */}
      <div className="flex flex-col gap-1 border-t px-8 pt-6 text-right text-sm">
        <div className="flex justify-end gap-2 text-gray-600">
          <span>Subtotal</span>
          <span>₱{cart_total?.toFixed(2) || 0}</span>
        </div>
        <div className={`flex justify-end gap-2 ${discount > 0 ? 'text-emerald-500' : 'text-lighter'}`}>
          <span>Discount</span>
          <span>- ₱{discount?.toFixed(2) || 0}</span>
        </div>
        <div className="text-primary flex justify-end gap-2 font-semibold">
          <span>Total</span>
          <span>₱{final_total.toFixed(2) || 0}</span>
        </div>
      </div>
    </Card>
  );
}

export default CartSummaryCard;
