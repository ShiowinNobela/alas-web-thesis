import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function RemoveConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-md p-6 bg-white shadow-2xl dark:bg-neutral rounded-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button
          className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
          onClick={onCancel}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Remove from Wishlist</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Are you sure you want to remove this item from your wishlist?
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Remove</Button>
        </div>
      </motion.div>
    </div>
  )
}
