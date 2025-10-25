import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import RHFTextInput from '@/components/rhform/RHFTextInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import CreateLoyaltyRewardModal from '@/components/modals/CreateLoyaltyRewardModal';
import { Button, Card } from 'flowbite-react';

function PromotionManagement() {
  const { control, handleSubmit, reset, setValue } = useForm();
  const [selectedReward, setSelectedReward] = useState(null);

  const {
    data: rewardsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['loyaltyRewards'],
    queryFn: () => axios.get('/api/loyalty/admin').then((res) => res.data.data),
  });

  // Mutation to create coupon
  const mutation = useMutation({
    mutationFn: (newCoupon) => axios.post('/api/coupons', newCoupon).then((res) => res.data),
    onSuccess: () => {
      toast.success('Coupon created successfully!');
      reset({
        code: '',
        description: '',
        discount_type: '',
        discount_value: '',
        is_active: '',
        starts_at: '',
        expires_at: '',
        usage_limit: '',
        per_user_limit: '',
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });

  const onCouponSubmit = (data) => {
    mutation.mutate({
      ...data,
      discount_value: Number(data.discount_value),
      is_active: data.is_active === 'true',
      usage_limit: Number(data.usage_limit),
      per_user_limit: Number(data.per_user_limit),
    });
  };

  return (
    <div className="flex flex-col p-4 overflow-auto bg-admin">
      <main className="w-full p-6 border shadow bg-card rounded-xl ring-1">
        {/* Header */}
        <div className="flex items-center w-full gap-3 mb-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Promotion Management</h1>
            <span className="text-sm text-lighter">Manage coupons and promotions</span>
          </div>
        </div>

        {/* Coupon Form */}
        <div className="grid grid-cols-3 gap-5">
          <Card className="rounded-2xl ring-1">
            <div>
              <h2 className="text-lg font-bold">Coupon Creation</h2>
              <span className="text-sm text-lighter">Create and manage your discount coupons</span>
            </div>
            <form onSubmit={handleSubmit(onCouponSubmit)} className="flex flex-col gap-6">
              <RHFTextInput
                name="code"
                control={control}
                label="Coupon Code *"
                placeholder="e.g. TESTCOUPON2"
                rules={{ required: 'Code is required' }}
              />
              <RHFTextInput
                name="description"
                control={control}
                label="Description *"
                placeholder="Coupon description"
                rules={{ required: 'Description is required' }}
              />
              {/* Discount Type */}
              <div className="flex flex-col gap-2">
                <label htmlFor="discount_type" className="text-sm font-medium">
                  Discount Type *
                </label>
                <Select id="discount_type" onValueChange={(value) => setValue('discount_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <RHFTextInput
                name="discount_value"
                control={control}
                label="Discount Value *"
                placeholder="e.g. 10"
                type="number"
                rules={{ required: 'Discount value is required' }}
              />
              {/* Status */}
              <div className="flex flex-col gap-2">
                <label htmlFor="active_status" className="text-sm font-medium">
                  Status *
                </label>
                <Select id="active_status" onValueChange={(value) => setValue('is_active', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <RHFTextInput
                name="starts_at"
                control={control}
                label="Start Date *"
                placeholder="YYYY-MM-DD HH:mm:ss"
                rules={{ required: 'Start date is required' }}
              />
              <RHFTextInput
                name="expires_at"
                control={control}
                label="Expiry Date *"
                placeholder="YYYY-MM-DD HH:mm:ss"
                rules={{ required: 'Expiry date is required' }}
              />
              <RHFTextInput
                name="usage_limit"
                control={control}
                label="Usage Limit *"
                placeholder="e.g. 100"
                type="number"
                rules={{ required: 'Usage limit is required' }}
              />
              <RHFTextInput
                name="per_user_limit"
                control={control}
                label="Per User Limit *"
                placeholder="e.g. 20"
                type="number"
                rules={{ required: 'Per user limit is required' }}
              />
              <div className="flex justify-end col-span-1 md:col-span-2">
                <Button type="submit" color="gray" disabled={mutation.isLoading} className="w-full px-8 md:w-auto">
                  {mutation.isLoading ? 'Creating...' : 'Create Coupon'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Loyalty Rewards Table to be updated because wtf */}
          <Card className="col-span-2 overflow-auto rounded-2xl ring-1">
            <div className="flex flex-col justify-start h-full">
              <div className="mb-4">
                <h2 className="text-lg font-bold">Loyalty Rewards</h2>
                <span className="text-sm text-lighter">Manage loyalty rewards here</span>
              </div>
              {isLoading ? (
                <p>Loading rewards...</p>
              ) : isError ? (
                <p className="text-error">Failed to fetch rewards</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-none">
                    <tr>
                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">Required Orders</th>
                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">Coupon Code</th>
                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">Discount</th>
                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">Active</th>
                      <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rewardsData.map((reward, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{reward.required_orders || '-'}</td>
                        <td className="px-4 py-2">{reward.coupon_code || '-'}</td>
                        <td className="px-4 py-2">
                          {reward.discount_value
                            ? reward.discount_type === 'percentage'
                              ? `${reward.discount_value}%`
                              : `$${reward.discount_value}`
                            : '-'}
                        </td>
                        <td className="px-4 py-2">{reward.active ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-2">
                          <Button size="xs" onClick={() => setSelectedReward(reward)}>
                            Add Reward
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>
      </main>

      {selectedReward && (
        <CreateLoyaltyRewardModal
          show={!!selectedReward}
          onClose={() => setSelectedReward(null)}
          selectedReward={selectedReward}
        />
      )}
    </div>
  );
}

export default PromotionManagement;
