import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatePresence } from 'framer-motion';
import { Delete, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '@/stores/cartStore';
import { useState } from 'react';
import CouponCard from './CouponCard';

function CartSummaryCard({ shippingFee = 0 }) {
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
  
  // Calculate total including shipping fee
  const subtotal = cart_total || 0;
  const total = (subtotal - discount) + shippingFee;

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
        <button className="text-sm cursor-pointer border-content hover:border-b" onClick={() => navigate('/menu')}>
          Go Back to Menu
        </button>
      </CardHeader>

      {/* CART ITEMS */}
      <CardContent className="mt-4 space-y-3">
        {isLoading ? (
          <p className="text-sm text-lighter">Loading cart...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-lighter">Your cart is empty. Add items to proceed</p>
        ) : (
          items.map((item) => (
            <article key={item.product_id} className="flex items-center gap-3 p-3 border rounded-2xl">
              <img src={item.image} alt={item.name} className="flex-shrink-0 object-cover border size-24 rounded-2xl" />

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className="text-content font-heading line-clamp-2">{item.name}</h3>
                    <p className="text-primary font-heading mt-0.5 text-sm">₱{parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="hover:text-primary text-lighter flex-shrink-0 p-0.5 transition-colors"
                  >
                    <Delete className="size-7" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 rounded-full border border-gray-300 px-2 py-0.5">
                    <button
                      onClick={() => handleAdjust(item.product_id, item.quantity, false, item.stock_quantity)}
                      className="flex items-center justify-center w-5 h-5 transition-colors rounded-full hover:bg-gray-100"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="w-4 text-xs font-medium text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleAdjust(item.product_id, item.quantity, true, item.stock_quantity)}
                      className="flex items-center justify-center w-5 h-5 transition-colors rounded-full hover:bg-gray-100"
                    >
                      <Plus size={10} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-content">₱{(item.price * item.quantity).toFixed(2)}</p>
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
      <div className="flex flex-col gap-1 px-8 pt-6 text-sm text-right border-t">
        <div className="flex justify-end gap-2 text-gray-600">
          <span>Subtotal</span>
          <span>₱{subtotal.toFixed(2)}</span>
        </div>
        
        <div className={`flex justify-end gap-2 ${discount > 0 ? 'text-emerald-500' : 'text-lighter'}`}>
          <span>Discount</span>
          <span>- ₱{discount?.toFixed(2) || 0}</span>
        </div>
        
        {/* Shipping Fee Row */}
        {shippingFee > 0 && (
          <div className="flex justify-end gap-2 text-gray-600">
            <span>Shipping Fee</span>
            <span>₱{shippingFee.toFixed(2)}</span>
          </div>
        )}
        
        {/* Total Row */}
        <div className="flex justify-end gap-2 pt-2 mt-2 font-semibold border-t text-primary">
          <span>Total</span>
          <span>₱{total.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
}

export default CartSummaryCard;