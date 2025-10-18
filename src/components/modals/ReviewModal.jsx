import { Button, Label } from 'flowbite-react';
import { useState } from 'react';

function ReviewModal({ show, onClose, onSubmit, review, isLoading }) {
  const [action, setAction] = useState('');

  if (!show) return null;

  const handleSubmit = () => {
    if (!action) return;
    onSubmit(action);
    setAction('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Moderate Review</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            ✕
          </button>
        </div>

        {/* Body */}
        {review ? (
          <div className="space-y-3">
            <p>
              <strong>User:</strong> {review.username}
            </p>
            <p>
              <strong>Product:</strong> {review.product_name}
            </p>
            <p>
              <strong>Rating:</strong> {review.rating}
            </p>
            <p>
              <strong>Review:</strong> {review.review_text || '(no text)'}
            </p>

            <div className="space-y-2">
              <Label htmlFor="action">Select Action</Label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="action"
                    value="flag"
                    checked={action === 'flag'}
                    onChange={(e) => setAction(e.target.value)}
                    disabled={isLoading}
                  />
                  Flag (Hide from customers)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="action"
                    value="approve"
                    checked={action === 'approve'}
                    onChange={(e) => setAction(e.target.value)}
                    disabled={isLoading}
                  />
                  Approve (Make visible)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="action"
                    value="remove"
                    checked={action === 'remove'}
                    onChange={(e) => setAction(e.target.value)}
                    disabled={isLoading}
                  />
                  Remove (Delete)
                </label>
              </div>
            </div>
          </div>
        ) : (
          <p>No review selected.</p>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <Button onClick={handleSubmit} disabled={!action || isLoading} variant="default">
            {isLoading ? 'Saving…' : 'Save'}
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
