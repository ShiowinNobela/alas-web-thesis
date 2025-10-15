import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import ErrorBoundary from '@/components/errorUI/ErrorBoundary'
import ErrorState from '@/components/States/ErrorState'
import { useUserReviews } from '@/hooks/useUserReviews'
import ReviewList from '@/components/review/ReviewList'
import ReviewEditModal from '@/components/review/ReviewEditModal'
import EmptyReviewState from '@/components/review/EmptyReviewState'
import DeleteConfirmModal from '@/components/review/DeleteReviewModal'

export default function ReviewPage() {
  const user = JSON.parse(localStorage.getItem('user'))
  const { reviews, isLoading, isError, updateReview, deleteReview } = useUserReviews(user.id)

  const [editingReview, setEditingReview] = useState(null)
  const [updatedText, setUpdatedText] = useState('')
  const [updatedRating, setUpdatedRating] = useState(0)
  const [deleteSelectedReview, setDeleteSelectedReiew] = useState(null);

  const handleEditClick = (review) => {
    setEditingReview(review)
    setUpdatedText(review.review_text)
    setUpdatedRating(review.rating)
  }

  const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

  const handleSaveEdit = async () => {
    await updateReview(editingReview.review_id, {
      rating: updatedRating,
      review_text: updatedText,
    })
    setEditingReview(null)
  }

  const handleDelete = (review_id) => {
    setDeleteSelectedReiew(review_id)
  }

  const confirmDelete = async () => {
    if (deleteSelectedReview) {
      await deleteReview(deleteSelectedReview)
      setDeleteSelectedReiew(null)
    }
  }

  if (isError) {
    return (
      <ErrorState
        error={isError}
        onRetry={() => window.location.reload()}
        title="Failed to load your reviews"
        retryText="Try Again"
      />
    )
  }

  return (
    <ErrorBoundary>
      <motion.section className="min-h-screen bg-neutral" initial="hidden" animate="visible" variants={containerVariants}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-20 h-20 rounded-full top-25 left-15 animate-pulse bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
              <motion.div
                className="absolute w-16 h-16 delay-1000 rounded-full top-45 right-20 animate-pulse bg-gradient-to-br from-red-200 to-pink-300 opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              ></motion.div>
              <motion.div
                className="absolute w-12 h-12 delay-500 rounded-full bottom-55 left-20 animate-pulse bg-gradient-to-br from-orange-200 to-red-300 opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              ></motion.div>
            </div>

        <main className='relative max-w-5xl px-4 py-12 mx-auto sm:px-6 lg:px-8'>
          <motion.div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="w-12 h-12 mr-2 text-yellow-500" />
              <h1 className="text-5xl font-semibold text-content font-heading">My Reviews</h1>
            </div>
            <p className="max-w-2xl mx-auto text-lg text-lighter">
              Insert a witty line here XD
            </p>
          </motion.div>

          {isLoading && <div className="py-10 text-center text-lighter">
            Loading reviews...</div>
          }

          {!isLoading && reviews.length === 0 && 
            <EmptyReviewState />
          }

          {!isLoading && reviews.length > 0 && (
            <div className="w-full max-w-6xl">
              <ReviewList 
              reviews={reviews} 
              onEdit={handleEditClick} 
              onDelete={handleDelete} />
            </div>
          )}

          <DeleteConfirmModal 
            open={!!deleteSelectedReview}
            onCancel={() => setDeleteSelectedReiew(null)}
            onConfirm={confirmDelete}
          />

          <ReviewEditModal
            review={editingReview}
            rating={updatedRating}
            text={updatedText}
            setRating={setUpdatedRating}
            setText={setUpdatedText}
            onCancel={() => setEditingReview(null)}
            onSave={handleSaveEdit}
          />
        </main>
      </motion.section>
    </ErrorBoundary>
  )
}
