import { motion } from 'framer-motion'
import WishlistCard from './WishlistCard'

export default function WishlistList({ wishlist, onRemove }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      animate="visible"
    >
      {wishlist.map((item) => (
        <motion.div
          key={item.product_id}
          whileHover={{ scale: 1.02 }}
          className="flex flex-col h-full"
        >
          <WishlistCard item={item} onRemove={onRemove} />
        </motion.div>
      ))}
    </motion.div>
  )
}
