import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PropTypes from 'prop-types';

export default function LoyaltyDialog({ open, onOpenChange, onSelectCoupon }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['claimed-rewards'],
    queryFn: async () => {
      const res = await axios.get('/api/loyalty/claimed');
      return res.data.data;
    },
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Loyalty Rewards</DialogTitle>
          <DialogDescription>Select a reward to use as a coupon.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="text-lighter text-sm">Loading rewards...</p>
        ) : error ? (
          <p className="text-error text-sm">Failed to load rewards.</p>
        ) : (
          <div className="mt-2 space-y-3">
            {data && data.length > 0 ? (
              data.map((reward) => (
                <div
                  key={reward.claimed_id}
                  className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl border-y border-dashed border-amber-400 bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-200 px-5 py-3"
                >
                  <div className="bg-background absolute top-1/2 left-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                  <div className="bg-background absolute top-1/2 right-0 h-6 w-6 translate-x-1/2 -translate-y-1/2 rounded-full"></div>

                  <div className="flex flex-col">
                    <p className="text-sm font-semibold tracking-wide text-amber-800">Loyalty Reward!</p>

                    <p className="text-xs font-medium text-amber-600">
                      Discount: {reward.discount_value}% ({reward.discount_type})
                    </p>

                    <p className="mt-1 text-[10px] text-amber-700">
                      Claimed: {new Date(reward.claimed_at).toLocaleString()}
                    </p>
                  </div>

                  <Button size="sm" className="ml-4 rounded-full" onClick={() => onSelectCoupon(reward.coupon_code)}>
                    Use
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-lighter text-sm">No rewards claimed yet.</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

LoyaltyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSelectCoupon: PropTypes.func.isRequired,
};
