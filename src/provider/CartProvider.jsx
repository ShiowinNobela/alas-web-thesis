// CartProvider.jsx
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useCartStore from '@/stores/cartStore';
import useUserStore from '@/stores/userStore';

const CartProvider = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user, fetchCart]);
  return children;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
