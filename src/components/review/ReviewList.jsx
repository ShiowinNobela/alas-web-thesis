import { motion } from 'framer-motion'
import ReviewCard from './ReviewCard'

export default function ReviewList({ reviews, onEdit, onDelete }) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      animate="visible"
    >
      {reviews.map((review) => (
        <motion.div key={review.review_id} whileHover={{ scale: 1.02 }}>
          <ReviewCard review={review} onEdit={onEdit} onDelete={onDelete} />
        </motion.div>
      ))}
    </motion.div>
  )
}
