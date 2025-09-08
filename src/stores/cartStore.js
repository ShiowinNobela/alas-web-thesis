import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'sonner';
import debounce from 'lodash/debounce';
import { showCartToast } from '@/components/toasts/CartToast.jsx';

const useCartStore = create((set, get) => {
  const debouncedMap = new Map();

  return {
    items: [],
    cart_total: 0,
    isLoading: false,

    fetchCart: async () => {
      set({ isLoading: true });
      try {
        const res = await axios.get('/api/cart/me');
        set({
          items: res.data.data.items,
          cart_total: parseFloat(res.data.data.cart_total || 0),
        });
      } catch (err) {
        toast.error('Failed to load cart' + err);
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
      };

      // Optimistic update
      set({
        items: [...currentItems, newItem],
        cart_total: get().cart_total + product.price * quantity,
      });

      try {
        await axios.post('/api/cart/me', {
          productId: product.id,
          quantity,
        });
        showCartToast(product.name);
      } catch (err) {
        // rollback
        toast.error('Failed to add item to cart');
        set({
          items: currentItems,
          cart_total: get().cart_total,
        });
      }
    },

    adjustQuantity: (productId, newQty) => {
      const currentItems = get().items;
      const item = currentItems.find((i) => i.product_id === productId);
      if (!item || newQty === item.quantity) {
        return;
      }

      const priceDiff = (newQty - item.quantity) * parseFloat(item.price);

      set({
        items: currentItems.map((item) => (item.product_id === productId ? { ...item, quantity: newQty } : item)),
        cart_total: get().cart_total + priceDiff,
      });

      // Create or reuse debounce per product
      if (!debouncedMap.has(productId)) {
        debouncedMap.set(
          productId,
          debounce(async (productId, quantity) => {
            try {
              await axios.put('/api/cart/me', { productId, quantity });
            } catch (err) {
              toast.error('Failed to update quantity' + err);
            }
          }, 300)
        );
      }

      debouncedMap.get(productId)(productId, newQty);
    },

    removeItem: async (productId) => {
      const currentItems = get().items;
      const item = currentItems.find((i) => i.product_id === productId);
      if (!item) {
        return;
      }

      const priceDiff = item.quantity * parseFloat(item.price);
      set({
        items: currentItems.filter((i) => i.product_id !== productId),
        cart_total: get().cart_total - priceDiff,
      });

      try {
        await axios.delete('/api/cart/me', { data: { productId } });
      } catch (err) {
        toast.error('Failed to remove item' + err);
        set({
          items: currentItems,
          cart_total: get().cart_total + priceDiff,
        });
      }
    },
  };
});

export default useCartStore;
