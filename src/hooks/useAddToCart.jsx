import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '@/stores/cartStore';
import useUserStore from '@/stores/userStore';
import { toast } from 'sonner';

export function useAddToCart() {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = !!user;

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (!isLoggedIn) {
      toast.warning('You need to log in first', {
        action: {
          label: 'Log in',
          onClick: () => navigate('/LoginPage'),
        },
      });
      return;
    }
    setOpen(true);
  };

  const handleAddToCart = (product, quantity = 1) => {
    if (!product.id) {
      console.error('Invalid product object:', product);
      return;
    }
    addItem(product, quantity);
    setOpen(false);
    setQuantity(1);
  };

  return {
    open,
    setOpen,
    quantity,
    setQuantity,
    handleAdd,
    handleAddToCart,
  };
}
