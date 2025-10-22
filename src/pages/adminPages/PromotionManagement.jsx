import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import BackButton from '@/components/bigComponents/BackButton.jsx';
import RHFTextInput from '@/components/rhform/RHFTextInput';
import { Button } from 'flowbite-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function PromotionManagement() {
  const { control, handleSubmit, reset, setValue } = useForm();

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

  const onSubmit = (data) => {
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
      <main className="w-full max-w-4xl p-6 mx-auto border shadow bg-card rounded-xl ring-1">
        {/* Header */}
        <div className="flex items-center w-full gap-3 mb-6">
          <BackButton className="py-6 ring-1" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Promotion Management</h1>
            <span className="text-sm text-lighter">Create and manage your discount coupons</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
        >
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
            <label className="text-sm font-medium">Discount Type *</label>
            <Select
              onValueChange={(value) => setValue('discount_type', value)}
            >
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

          {/* Is Active */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Status *</label>
            <Select
              onValueChange={(value) => setValue('is_active', value)}
            >
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

          {/* Submit Button */}
          <div className="flex justify-end col-span-1 md:col-span-2">
            <Button
              type="submit"
              color="gray"
              disabled={mutation.isLoading}
              className="w-full px-8 md:w-auto"
            >
              {mutation.isLoading ? 'Creating...' : 'Create Coupon'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default PromotionManagement;
