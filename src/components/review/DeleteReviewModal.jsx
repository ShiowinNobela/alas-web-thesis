import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeleteConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        className="dark:bg-neutral relative w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Close button */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onCancel}>
          <X className="h-5 w-5" />
        </button>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <AlertTriangle className="text-error h-10 w-10" />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-bold">Delete Review?</h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this review? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-2">
          <Button variant="outline" className="w-30" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="destructive" className="w-30" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
