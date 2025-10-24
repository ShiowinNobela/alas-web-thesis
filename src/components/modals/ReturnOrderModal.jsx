import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function ReturnOrderModal({
  open,
  onClose,
  reason,
  onReasonChange,
  contactNumber,
  onContactChange,
  onConfirm,
  isLoading = false, // optional prop
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Return</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Please provide a short reason and your contact number so we can process your return.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Reason Field */}
          <div className="space-y-2">
            <Label htmlFor="return-reason">Reason</Label>
            <Textarea
              id="return-reason"
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder="Enter your reason for return..."
              className="resize-none"
            />
          </div>

          {/* Contact Field */}
          <div className="space-y-2">
            <Label htmlFor="contact-number">Contact Number</Label>
            <Input
              id="contact-number"
              type="tel"
              value={contactNumber}
              onChange={(e) => onContactChange(e.target.value)}
              placeholder="09XXXXXXXXX"
            />
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading} className="bg-pink-500 text-white hover:bg-pink-600">
            {isLoading ? 'Submitting...' : 'Submit Return'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReturnOrderModal;
