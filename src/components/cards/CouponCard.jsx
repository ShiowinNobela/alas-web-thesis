import PropTypes from 'prop-types';
import { X, TicketPercent } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function CouponCard({ code, onRemove, discount, fromLoyalty }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.25 }}
      className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl border-y border-dashed border-amber-400 bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 px-5 py-3"
    >
      {/* Decorative ticket cutouts */}
      <div className="bg-background absolute top-1/2 left-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
      <div className="bg-background absolute top-1/2 right-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 rounded-full"></div>

      {/* Left side info */}
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-amber-200 p-2">
          <TicketPercent size={18} className="text-amber-700" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-amber-800">{fromLoyalty ? 'Loyalty Reward' : code}</p>
          {discount ? (
            <p className="text-xs font-medium text-amber-600">Discount: ₱{discount.toFixed(2)}</p>
          ) : (
            <p className="text-xs font-medium text-amber-600">Coupon applied</p>
          )}
        </div>
      </div>

      {/* Remove button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={onRemove}
        className="hover:text-primary text-content hover:bg-red-100"
        title="Remove coupon"
      >
        <X size={16} />
      </Button>
    </motion.div>
  );
}

CouponCard.propTypes = {
  code: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  discount: PropTypes.number,
  fromLoyalty: PropTypes.bool,
};

export default CouponCard;
