import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/animations/boilingsoup.json';

export default function LoadingModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-96 text-center">
        <DialogHeader>
          <DialogTitle>Placing your order...</DialogTitle>
        </DialogHeader>
        {/* Lottie Animation */}
        <div className="my-4">
          <Lottie animationData={loadingAnimation} loop={true} style={{ height: 200 }} />
        </div>
        <p>Please wait while we process your order.</p>
      </DialogContent>
    </Dialog>
  );
}
