import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import ErrorBoundary from '@/components/errorUI/ErrorBoundary'
import ErrorState from '@/components/States/ErrorState'
import WishlistList from '@/components/wishlist/WishlistList'
import RemoveConfirmModal from '@/components/wishlist/RemoveWishlistModal'
import EmptyWishlistState from '@/components/wishlist/EmptyWishlistState'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export default function WishlistPage() {
  const user = JSON.parse(localStorage.getItem('user'))
  const queryClient = useQueryClient()
  const [removeSelectedItem, setRemoveSelectedItem] = useState(null)

  // Fetch wishlist
  const { data: wishlist = [], isLoading, isError, error } = useQuery({
    queryKey: ['user-wishlist', user.id],
    queryFn: async () => {
      const res = await axios.get('/api/wishlist')
      return res.data.data
    },
  })

  // Mutation to remove from wishlist
  const removeMutation = useMutation({
    mutationFn: async (product_id) => {
      const res = await axios.delete(`/api/wishlist/${product_id}`)
      return res.data.data
    },
    onSuccess: (_, product_id) => {
      queryClient.invalidateQueries(['user-wishlist', user.id])
      setRemoveSelectedItem(null)
    },
  })

  const handleRemove = (product_id) => {
    setRemoveSelectedItem(product_id)
  }

  const confirmRemove = async () => {
    if (removeSelectedItem) {
      removeMutation.mutate(removeSelectedItem)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  }

  if (isError) {
    return (
      <ErrorState
        error={error}
        onRetry={() => queryClient.invalidateQueries(['user-wishlist', user.id])}
        title="Failed to load your wishlist"
        retryText="Try Again"
      />
    )
  }

  return (
    <ErrorBoundary>
      <motion.section className="min-h-screen bg-neutral" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-20 h-20 rounded-full top-25 left-15 animate-pulse bg-gradient-to-br from-pink-200 to-red-300 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute w-16 h-16 rounded-full top-45 right-20 animate-pulse bg-gradient-to-br from-purple-200 to-pink-300 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>

        <main className="relative max-w-5xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
          <motion.div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 mr-2 text-pink-500" />
              <h1 className="text-5xl font-semibold text-content font-heading">My Wishlist</h1>
            </div>
            <p className="max-w-2xl mx-auto text-lg text-lighter">
              Keep track of your favorite products!
            </p>
          </motion.div>

          {isLoading && <div className="py-10 text-center text-lighter">Loading wishlist...</div>}

          {!isLoading && wishlist.length === 0 && <EmptyWishlistState />}

          {!isLoading && wishlist.length > 0 && (
            <div className="w-full max-w-6xl">
              <WishlistList wishlist={wishlist} onRemove={handleRemove} />
            </div>
          )}

          <RemoveConfirmModal 
            open={!!removeSelectedItem}
            onCancel={() => setRemoveSelectedItem(null)}
            onConfirm={confirmRemove}
          />
        </main>
      </motion.section>
    </ErrorBoundary>
  )
}
