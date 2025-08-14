// components/CartToast.jsx
import { ShoppingCart, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// you can make custom toasts this whole time???
export const showCartToast = (productName) => {
  toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => toast.dismiss(t.id)}
        className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-50 to-white px-5 py-4 shadow-lg shadow-emerald-100/50 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/30 hover:shadow-emerald-200/50"
      >
        <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-emerald-400 opacity-70" />

        {/* Main content */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 p-2 text-emerald-600">
          <ShoppingCart className="h-5 w-5" />
          <motion.div
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            +
          </motion.div>
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-emerald-900">
            {productName}
          </p>
          <p className="text-xs text-emerald-600/80">
            Successfully added to cart!
          </p>
        </div>

        {/* Close button */}
        <button
          className="ml-2 rounded-full p-1 text-emerald-400 opacity-0 transition-all duration-200 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
        >
          <X className="h-4 w-4" />
        </button>

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-emerald-400/30"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </motion.div>
    ),
    {
      duration: 5000,
    }
  );
};
