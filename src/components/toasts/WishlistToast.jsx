import { Heart, X, HeartCrack } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const showWishlistToast = (productName, action = 'add') => {
  const isAdd = action === 'add';

  toast.custom(
    (t) => (
      <div className="group border-primary via-primary active from-brand to-brand relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-lg border-2 bg-gradient-to-br p-4 transition-all duration-200 hover:scale-[1.02]">
        {/* Heart icon */}
        <div className={`text-white shadow-lg relative flex h-10 w-10 items-center justify-center rounded-full p-2 ${isAdd ? 'bg-red-500' : 'bg-gray-500'} shadow-inner`}>
          {isAdd? <Heart className="w-5 h-5" fill="currentColor" /> : <HeartCrack className="w-5 h-5" fill="currentColor" /> }
        </div>

        <div className="flex-1">
          <motion.p
            className="text-sm font-bold text-white drop-shadow-sm"
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
            className="text-xs font-medium text-white"
            initial={{ x: 8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 400,
            }}
          >
            {isAdd ? 'Added to wishlist ' : 'Removed from wishlist'}
          </motion.p>
        </div>

        {/* Close button */}
        <motion.button
          className="p-1 ml-2 text-white transition-colors rounded-full hover:text-gray-200"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t.id);
          }}
        >
          <X className="size-5" />
        </motion.button>

        {/* Shimmer effect */}
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
      duration: 4000,
      position: 'bottom-center',
    }
  );
};
