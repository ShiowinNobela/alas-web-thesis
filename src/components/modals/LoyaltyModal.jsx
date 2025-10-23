import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '../ui/card';
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
                <Card key={reward.claimed_id} className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-4">
                  <div>
                    <p>
                      <span className="font-semibold">Discount:</span> {reward.discount_value}% ({reward.discount_type})
                    </p>

                    <p className="text-xs">Claimed on: {new Date(reward.claimed_at).toLocaleString()}</p>
                  </div>

                  <Button className="mt-1 w-full" onClick={() => onSelectCoupon(reward.coupon_code)}>
                    Use Coupon
                  </Button>
                </Card>
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
