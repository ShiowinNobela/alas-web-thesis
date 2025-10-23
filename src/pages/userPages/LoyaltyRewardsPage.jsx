import { Button } from '@/components/ui/button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { CheckCircle, Gift, Loader2, Lock, Minus, ShoppingBag, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

function LoyaltyRewardsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['loyaltyProgress'],
    queryFn: () => axios.get('/api/loyalty/me').then((res) => res.data.data),
  });

  const claimRewardMutation = useMutation({
    mutationFn: (rewardId) => axios.post(`/api/loyalty/claim/${rewardId}`),
    onSuccess: () => {
      toast.success('Reward claimed successfully!');
      queryClient.invalidateQueries(['loyaltyProgress']);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to claim reward');
    },
  });

  if (isLoading) return <p className="mt-10 text-center">Loading rewards...</p>;
  if (isError) return <p className="text-error mt-10 text-center">Failed to load rewards.</p>;

  const { total_orders, rewards } = data;
  const totalCheckpoints = 8;

  // Map checkpoints 1-8 to rewards if available
  const checkpoints = Array.from({ length: totalCheckpoints }, (_, i) => {
    return rewards.find((r) => r.required_orders === i + 1) || null;
  });

  const completedCheckpoints = checkpoints.filter(
    (reward) => reward?.status === 'claimed' || reward?.status === 'claimable'
  ).length;

  return (
    <div className="bg-neutral min-h-screen px-4 py-12 md:px-20">
      <div className="mx-auto max-w-6xl pb-25">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="font-heading mb-2 text-5xl font-bold">Your Loyalty Progress</h1>
          <p className="text-lighter text-lg">Earn rewards with every order!</p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-16">
          <div className="absolute top-5 right-0 left-0 z-0 h-3 rounded-full bg-slate-200 shadow-inner"></div>
          <div
            className="to-primary absolute top-5 left-0 z-10 h-3 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 shadow-lg"
            style={{ width: `${(completedCheckpoints / checkpoints.length) * 100}%` }}
          ></div>

          <div className="relative z-20 flex justify-between">
            {checkpoints.map((reward, index) => {
              const isClaimed = reward?.status === 'claimed';
              const isClaimable = reward?.status === 'claimable';
              const noReward = reward === null;
              let bgColor = 'bg-slate-300 border-slate-400';
              let icon = <Lock className="text-lighter h-4 w-4" />;
              let ringColor = 'ring-slate-200';
              if (isClaimed) {
                bgColor = 'bg-gradient-to-br from-amber-400 to-amber-500 border-amber-600';
                icon = <CheckCircle className="h-5 w-5 text-white" />;
                ringColor = 'ring-amber-200';
              } else if (isClaimable) {
                bgColor = 'bg-gradient-to-br from-green-400 to-green-500 border-green-600';
                icon = <Gift className="h-5 w-5 text-white" />;
                ringColor = 'ring-green-200';
              } else if (noReward) {
                icon = <Minus className="h-4 w-4 text-slate-500" />;
              }
              return (
                <div key={index} className="relative z-20 flex flex-col items-center">
                  {/* Checkpoint Circle */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${bgColor} ${ringColor} shadow-lg ring-4 transition-all duration-300 hover:scale-110`}
                  >
                    {icon}
                  </div>
                  {/* Status Text */}
                  <span className="mt-3 rounded-full border bg-white px-2 py-1 text-center text-sm font-medium shadow-sm">
                    {noReward ? (
                      <span className="text-lighter flex items-center gap-1">
                        <Minus className="h-3 w-3" />
                        No reward
                      </span>
                    ) : isClaimed ? (
                      <span className="flex items-center gap-1 text-amber-500">
                        <CheckCircle className="h-3 w-3" />
                        Claimed
                      </span>
                    ) : isClaimable ? (
                      <span className="text-money flex items-center gap-1">
                        <Gift className="h-3 w-3" />
                        Claimable
                      </span>
                    ) : (
                      <span className="text-lighter flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Locked
                      </span>
                    )}
                  </span>
                  {/* Order Count */}
                  <div className="mt-1 text-xs font-medium text-slate-500">Order {index + 1}</div>
                  {/* Claim Button */}
                  {isClaimable && reward?.id && (
                    <Button
                      className="from-primary to-brand mt-3 transform bg-gradient-to-r px-6 font-semibold transition-all duration-300 hover:scale-105"
                      onClick={() => claimRewardMutation.mutate(reward.id)}
                      disabled={claimRewardMutation.isLoading}
                    >
                      {claimRewardMutation.isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Claiming...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Gift className="h-4 w-4" />
                          Claim Reward!
                        </span>
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Stats */}
        <Card className="mx-auto max-w-md">
          <div className="mb-4 flex items-center justify-center gap-3">
            <ShoppingBag className="text-lighter h-6 w-6" />
            <h3 className="text-content font-heading text-xl font-semibold">Your Progress</h3>
          </div>
          <div className="text-center">
            <p className="font-heading text-primary mb-4 text-4xl font-bold">{total_orders}</p>
            <p className="">Total Orders Completed</p>
            <div className="text-lighter mt-3 flex items-center justify-center gap-1 text-sm">
              <Star className="h-4 w-4 text-amber-500" />
              {completedCheckpoints} of {checkpoints.length} rewards unlocked
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default LoyaltyRewardsPage;
