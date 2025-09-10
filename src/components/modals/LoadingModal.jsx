import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import loadingAnimation from '@/assets/animations/shopping-cart.json';

export default function LoadingModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 text-center sm:max-w-md">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="from-primary to-primary/75 bg-gradient-to-r py-4"
        >
          <div className="mx-auto h-32 w-32">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
              rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
              style={{
                height: '100%',
                width: '100%',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
              }}
            />
          </div>
        </motion.div>

        <div className="px-6 pb-6">
          <DialogHeader className="mb-4">
            <DialogTitle>
              <motion.span
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-content font-heading text-xl"
              >
                Just a moment...
              </motion.span>
            </DialogTitle>
          </DialogHeader>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-muted-foreground mb-4"
          >
            We're carefully placing your order
          </motion.p>

          <div className="bg-secondary mb-4 h-1.5 w-full overflow-hidden rounded-full">
            <motion.div
              className="bg-primary h-1.5 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 5,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-lighter text-xs"
          >
            This usually takes just a few seconds
          </motion.p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
