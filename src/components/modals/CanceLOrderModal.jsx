import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import PropTypes from 'prop-types';

export default function CancelOrderModal({
  open,
  onClose,
  note,
  onNoteChange,
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel this order?</DialogTitle>
          <DialogDescription>
            Please provide a reason for canceling this order. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <label
            htmlFor="cancel-reason"
            className="text-sm font-medium text-gray-700"
          >
            Cancellation Reason
          </label>
          <Textarea
            id="cancel-reason"
            placeholder="e.g., I made a mistake in my order"
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Dismiss
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={!note.trim()}
          >
            Confirm Cancellation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

CancelOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  onNoteChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
