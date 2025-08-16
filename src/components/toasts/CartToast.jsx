// components/CartToast.jsx
import { ShoppingCart, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const showCartToast = (productName) => {
  toast.custom(
    (t) => (
      <div className="group hover:border-primary border-primary/70 relative flex transform-gpu cursor-pointer items-center gap-3 overflow-hidden rounded-xl border bg-gradient-to-br from-amber-100 via-amber-200 to-orange-100 p-4 transition-all duration-200 hover:scale-[1.02] active:scale-95">
        {/* Cart icon */}
        <div className="text-primary shadow-primary/25 relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-100 p-2 shadow-inner">
          <ShoppingCart className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <motion.p
            className="text-sm font-bold text-amber-900 drop-shadow-sm"
            initial={{ x: 8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.1,
              type: 'spring',
              stiffness: 500,
            }}
          >
            {productName}
          </motion.p>
          <motion.p
            className="text-xs font-medium text-amber-700/90"
            initial={{ x: 8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 400,
            }}
          >
            Added to cart 🌶️
          </motion.p>
        </div>

        {/* Close button */}
        <motion.button
          className="ml-2 rounded-full p-1 text-amber-500 transition-colors hover:text-amber-700"
          whileHover={{ scale: 1.2, rotate: 70 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
        >
          <X className="h-4 w-4" />
        </motion.button>

        {/* Progress bar */}
        <motion.div
          className="from-primary to-primary absolute bottom-0 left-0 h-1 bg-gradient-to-r via-orange-400"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 5, ease: 'linear' }}
        />

        {/* Shimmer effect - fixed */}
        <motion.div
          className="absolute inset-y-0 w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ left: '-50%' }}
          animate={{ left: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    ),
    {
      duration: 5000,
    }
  );
};
