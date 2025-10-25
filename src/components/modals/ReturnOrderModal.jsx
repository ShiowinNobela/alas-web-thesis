import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { toast } from 'sonner';

function ReturnOrderModal({
  open,
  onClose,
  reason,
  onReasonChange,
  contactNumber,
  onContactChange,
  onConfirm,
  returnImage,
  setReturnImage,
  isLoading = false,
  uploadingImage = false,
}) {
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Validate file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setReturnImage(file);
    }
  };

  const removeImage = () => {
    setReturnImage(null);
  };

  const isSubmitting = isLoading || uploadingImage;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request a Return</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Please provide a reason, your contact number, and optionally upload an image of the product.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Reason Field */}
          <div className="space-y-2">
            <Label htmlFor="return-reason">Reason *</Label>
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
            <Label htmlFor="contact-number">Contact Number *</Label>
            <Input
              id="contact-number"
              type="tel"
              value={contactNumber}
              onChange={(e) => onContactChange(e.target.value)}
              placeholder="09XXXXXXXXX"
            />
          </div>

          {/* Image Upload Field */}
          <div className="space-y-2">
            <Label htmlFor="return-image">Product Image (Optional)</Label>
            {!returnImage ? (
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="return-image"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                  </div>
                  <Input
                    id="return-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={URL.createObjectURL(returnImage)}
                    alt="Product for return"
                    className="h-full w-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">Image preview - click the X to remove</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isSubmitting} className="bg-pink-500 text-white hover:bg-pink-600">
            {uploadingImage ? 'Uploading Image...' : isLoading ? 'Submitting...' : 'Submit Return'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReturnOrderModal;
