import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';
import debounce from 'lodash/debounce';
import { showCartToast } from '@/components/toasts/CartToast.jsx';

const useCartStore = create((set, get) => {
  const debouncedMap = new Map();

  // Helper for recalculating totals if coupon exists
  const recalcTotals = (newCartTotal) => {
    const { coupon_code, discount, cart_total } = get();

    // No coupon, just sync normally
    if (!coupon_code || cart_total === 0) {
      set({
        cart_total: newCartTotal,
        discount: 0,
        final_total: newCartTotal,
      });
      return;
    }

    // If coupon exists, keep the discount proportional
    const discountRate = discount / cart_total;
    const newDiscount = newCartTotal * discountRate;
    const newFinalTotal = newCartTotal - newDiscount;

    set({
      cart_total: newCartTotal,
      discount: newDiscount,
      final_total: newFinalTotal,
    });
  };

  return {
    // --- State ---
    items: [],
    cart_total: 0,
    discount: 0,
    final_total: 0,
    coupon_code: null,
    isLoading: false,

    fetchCart: async () => {
      set({ isLoading: true });
      try {
        const res = await axios.get('/api/cart/me');
        const data = res.data.data;

        set({
          items: Array.isArray(data.items) ? data.items : [],
          cart_total: parseFloat(data.cart_total || 0),
          discount: parseFloat(data.discount || 0),
          final_total: parseFloat(data.final_total || data.cart_total || 0),
          coupon_code: data.coupon_code || null,
        });
      } catch (err) {
        toast.error('Failed to load cart: ' + err);
      } finally {
        set({ isLoading: false });
      }
    },

    addItem: async (product, quantity) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((i) => i.product_id === product.id);

      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        get().adjustQuantity(product.id, newQty);
        return;
      }

      const newItem = {
        product_id: product.id,
        name: product.name,
        image: product.image,
        price: parseFloat(product.price),
        quantity,
        stock_quantity: product.stock_quantity,
        pendingAction: 'add',
      };

      const newCartTotal = get().cart_total + product.price * quantity;

      set({
        items: [...currentItems, newItem],
      });
      recalcTotals(newCartTotal);
      showCartToast(product.name);

      try {
        await axios.post('/api/cart/me', { productId: product.id, quantity });
        set({
          items: get().items.map((i) => (i.product_id === product.id ? { ...i, pendingAction: null } : i)),
        });
      } catch {
        toast.error('Failed to add item to cart');
        set({
          items: currentItems,
        });
        recalcTotals(get().cart_total);
      }
    },

    adjustQuantity: (productId, newQty) => {
      const currentItems = get().items;
      const item = currentItems.find((i) => i.product_id === productId);
      if (!item || newQty === item.quantity) return;

      const priceDiff = (newQty - item.quantity) * parseFloat(item.price);
      const newCartTotal = get().cart_total + priceDiff;

      set({
        items: currentItems.map((i) => (i.product_id === productId ? { ...i, quantity: newQty } : i)),
      });
      recalcTotals(newCartTotal);

      // Debounce API call
      if (!debouncedMap.has(productId)) {
        debouncedMap.set(
          productId,
          debounce(async (productId, quantity) => {
            try {
              await axios.put('/api/cart/me', { productId, quantity });
            } catch (err) {
              toast.error('Failed to update quantity: ' + err);
            }
          }, 300)
        );
      }

      debouncedMap.get(productId)(productId, newQty);
    },

    removeItem: async (productId) => {
      const currentItems = get().items;
      const item = currentItems.find((i) => i.product_id === productId);
      if (!item || item.pendingAction) return;

      const priceDiff = item.quantity * parseFloat(item.price);
      const newCartTotal = get().cart_total - priceDiff;

      // Optimistic removal
      set({
        items: currentItems.filter((i) => i.product_id !== productId),
      });
      recalcTotals(newCartTotal);
      toast.info('Item removed from cart');

      try {
        await axios.delete('/api/cart/me', { data: { productId } });
      } catch (err) {
        toast.error('Failed to remove item: ' + err);
        set({
          items: currentItems,
        });
        recalcTotals(get().cart_total);
      }
    },

    applyCoupon: async (couponCode) => {
      const toastId = toast.loading(`Applying "${couponCode}"...`);
      try {
        const res = await axios.post('/api/cart/apply-coupon', { coupon_code: couponCode });
        const data = res.data?.data;

        if (data) {
          set({
            coupon_code: data.coupon?.code || couponCode,
            discount: parseFloat(data.discount || 0),
            cart_total: parseFloat(data.cartTotal || get().cart_total),
            final_total: parseFloat(data.finalTotal || get().cart_total),
          });
        }

        toast.success(`Coupon applied!`);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to apply coupon');
      } finally {
        toast.dismiss(toastId);
      }
    },

    removeCoupon: async () => {
      const toastId = toast.loading('Removing coupon...');
      try {
        const res = await axios.delete('/api/cart/coupon');
        if (res.data?.status === 'success') {
          set({
            coupon_code: null,
            discount: 0,
          });

          // refetch just to be safe
          await get().fetchCart();

          toast.info('Coupon removed');
        } else {
          toast.error('Failed to remove coupon');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to remove coupon');
      } finally {
        toast.dismiss(toastId);
      }
    },
  };
});

export default useCartStore;
