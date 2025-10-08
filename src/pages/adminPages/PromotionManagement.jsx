import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import BackButton from '@/components/bigComponents/BackButton.jsx';
import RHFTextInput from '@/components/rhform/RHFTextInput';
import { Button } from 'flowbite-react';

function PromotionManagement() {
  const { control, handleSubmit, reset } = useForm();

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
    <div className="bg-admin flex flex-col overflow-auto p-4">
      <main className="bg-card mx-auto w-full overflow-x-auto rounded-xl border p-6 shadow ring-1">
        <div className="mb-6 flex w-full items-center gap-3">
          <BackButton label="" className="py-6 ring-1" />
          <div className="flex flex-col">
            <span className="text-lighter text-sm">I know this needs changes, I wanna chill orayt</span>
            <h1 className="flex items-center gap-1 text-xl font-bold">Add Coupon</h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto grid w-full max-w-full grid-cols-1 gap-8 md:grid-cols-2"
        >
          <div className="flex flex-col gap-7 rounded-xl">
            <RHFTextInput
              name="code"
              control={control}
              label="Coupon Code"
              placeholder="e.g. TESTCOUPON2"
              rules={{ required: 'Code is required' }}
            />
            <RHFTextInput
              name="description"
              control={control}
              label="Description"
              placeholder="Coupon description"
              rules={{ required: 'Description is required' }}
            />
            <RHFTextInput
              name="discount_type"
              control={control}
              label="Discount Type"
              placeholder="percentage or fixed"
              rules={{ required: 'Discount type is required' }}
            />
            <RHFTextInput
              name="discount_value"
              control={control}
              label="Discount Value"
              placeholder="e.g. 10"
              type="number"
              rules={{ required: 'Discount value is required' }}
            />
            <RHFTextInput
              name="is_active"
              control={control}
              label="Is Active"
              placeholder="true or false"
              rules={{ required: 'This field is required' }}
            />
            <RHFTextInput
              name="starts_at"
              control={control}
              label="Start Date"
              placeholder="YYYY-MM-DD HH:mm:ss"
              rules={{ required: 'Start date is required' }}
            />
            <RHFTextInput
              name="expires_at"
              control={control}
              label="Expiry Date"
              placeholder="YYYY-MM-DD HH:mm:ss"
              rules={{ required: 'Expiry date is required' }}
            />
            <RHFTextInput
              name="usage_limit"
              control={control}
              label="Usage Limit"
              placeholder="e.g. 100"
              type="number"
              rules={{ required: 'Usage limit is required' }}
            />
            <RHFTextInput
              name="per_user_limit"
              control={control}
              label="Per User Limit"
              placeholder="e.g. 20"
              type="number"
              rules={{ required: 'Per user limit is required' }}
            />

            <Button type="submit" color="gray" disabled={mutation.isLoading} className="w-full">
              {mutation.isLoading ? 'Creating...' : 'Create Coupon'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default PromotionManagement;
