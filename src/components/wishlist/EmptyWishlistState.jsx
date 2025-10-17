import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EmptyWishlistState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Heart className="w-16 h-16 mb-4 text-pink-500" />
      <h3 className="mb-2 text-2xl font-semibold text-content">Your wishlist is empty</h3>
      <p className="max-w-md text-lighter">
        Add your favorite products to your wishlist and find them easily later!
      </p>
    </motion.div>
  )
}
