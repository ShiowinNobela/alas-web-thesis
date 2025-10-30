import { motion } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ReviewEditModal({ review, rating, text, setRating, setText, onCancel, onSave }) {
  const renderStars = () => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 cursor-pointer ${
            star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
          } transition-transform hover:scale-110`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );

  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="dark:bg-neutral relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button className="text-lighter absolute top-3 right-3 hover:text-gray-700" onClick={onCancel}>
          <X className="h-5 w-5" />
        </button>
        <h2 className="mb-4 text-xl font-bold">Edit Review</h2>
        <div className="space-y-3">
          {renderStars()}
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </motion.div>
    </div>
  );
}
