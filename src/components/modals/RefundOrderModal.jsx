import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function RefundOrderModal({ open, onClose, reason, onReasonChange, contactNumber, onContactChange, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Request Refund</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Textarea
            placeholder="Reason for refund..."
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
          />
          <Input
            placeholder="Contact number..."
            value={contactNumber}
            onChange={(e) => onContactChange(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Submit Refund</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RefundOrderModal;
