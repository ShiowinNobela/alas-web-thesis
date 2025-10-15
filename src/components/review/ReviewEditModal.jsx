import { motion } from 'framer-motion'
import { X, Star } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ReviewEditModal({
  review,
  rating,
  text,
  setRating,
  setText,
  onCancel,
  onSave,
}) {
  const renderStars = () => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 cursor-pointer ${
            star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          } hover:scale-110 transition-transform`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  )

  if (!review) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="relative w-full max-w-lg p-6 bg-white shadow-2xl dark:bg-neutral rounded-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button
          className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
          onClick={onCancel}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="mb-4 text-xl font-bold">Edit Review</h2>
        <div className="space-y-3">
          {renderStars()}
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </motion.div>
    </div>
  )
}
