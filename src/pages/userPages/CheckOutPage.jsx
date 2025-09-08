import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { checkoutSchema } from '@/validations/checkoutSchema';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import BackButton from '@/components/bigComponents/BackButton';
import TextInput from '@/components/bigComponents/TextInput';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useUserStore from '@/stores/userStore';
import LoadingModal from '@/components/modals/LoadingModal';
import useCartStore from '@/stores/cartStore';
import CartSummaryCard from '@/components/bigComponents/CartSummaryCard';

function CheckOutPage() {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const user = useUserStore((state) => state.user);
  const [formErrors, setFormErrors] = useState({});
  const [getInfo, setGetInfo] = useState({
    payment_method: '',
    address: user?.address || '',
    notes: '',
    reference_number: '',
    account_name: '',
    contact_number: user?.contact_number || '',
    username: user?.username || '',
    email: user?.email || '',
  });

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const placeOrderMutation = useMutation({
    mutationFn: (orderData) => axios.post('/api/orders', orderData),
    onSuccess: () => {
      toast.success('Order placed successfully!');
      setGetInfo({
        payment_method: '',
        address: user?.address || '',
        notes: '',
        reference_number: '',
        account_name: '',
        contact_number: user?.contact_number || '',
        username: user?.username || '',
        email: user?.email || '',
      });
      setFormErrors({});
      setIsModalOpen(false);
      navigate('/UserOrderPage');
    },
    onError: (err) => {
      setIsModalOpen(false);
      if (err.response?.status === 400) {
        toast.error('Failed to place order: Bad Request');
      } else {
        toast.error('An unexpected error occurred');
      }
    },
  });

  const handleConfirmOrder = async () => {
    try {
      await checkoutSchema.validate(getInfo, { abortEarly: false });
      setFormErrors({});
      setIsModalOpen(true); // Show modal while loading
      placeOrderMutation.mutate(getInfo);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        err.inner.forEach((e) => (errors[e.path] = e.message));
        setFormErrors(errors);
        toast.error('Please fill in all required fields');
      } else {
        console.error(err);
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <section className="bg-neutral min-h-screen py-8">
      <main className="relative mx-auto max-w-2xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-0 mt-4">
          <BackButton />
        </div>

        <div className="mx-auto flex flex-col items-center justify-center pb-8">
          <h1 className="text-content font-heading text-5xl">Checkout</h1>
          <p className="text-lighter mt-2">Complete your order by filling the form below</p>
        </div>

        <div className="space-y-7">
          {/* PERSONAL INFORMATION */}
          <Card className="gap-5 p-8">
            <CardTitle className="text-xl">Personal Information</CardTitle>
            <CardDescription>
              Your username and email are autofilled automatically but you can still change your phone number and
              delivery address.
            </CardDescription>
            <TextInput label="Name *" value={getInfo.username || ''} readOnly />
            <TextInput label="Email *" value={getInfo.email || ''} readOnly />
            <TextInput
              label="Phone Number *"
              type="tel"
              value={getInfo.contact_number || ''}
              onChange={(value) => setGetInfo({ ...getInfo, contact_number: value })}
              error={formErrors.contact_number}
              placeholder="Your Phone Number"
            />
            <div className="mt-4">
              <label htmlFor="checkout-address" className="text-lighter mb-1 block text-sm font-medium">
                Delivery Address *
              </label>
              <Textarea
                id="checkout-address"
                placeholder="Your complete address"
                value={getInfo.address || ''}
                onChange={(e) => setGetInfo({ ...getInfo, address: e.target.value })}
                className={formErrors.address ? 'border-red-500' : ''}
                rows={3}
              />
              {formErrors.address && <p className="mt-1 text-xs text-red-500">{formErrors.address}</p>}
            </div>
          </Card>

          {/* PAYMENT INFORMATION */}
          <Card className="p-8">
            <CardTitle className="text-xl">Payment Information</CardTitle>
            <div className="mb-4">
              <label htmlFor="checkout-payment-method" className="text-lighter mb-1 block text-sm font-medium">
                Payment Method *
              </label>
              <select
                id="checkout-payment-method"
                value={getInfo.payment_method || ''}
                onChange={(e) => setGetInfo({ ...getInfo, payment_method: e.target.value })}
                className={`text-lighter w-full rounded border px-3 py-2 shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  formErrors.payment_method ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option disabled value="">
                  -- select an option --
                </option>
                <option value="GCash">GCash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="Maya">Maya</option>
              </select>
              {formErrors.payment_method && <p className="mt-1 text-xs text-red-500">{formErrors.payment_method}</p>}
            </div>
            <TextInput
              label="Account Name *"
              value={getInfo.account_name || ''}
              onChange={(value) => setGetInfo({ ...getInfo, account_name: value })}
              error={formErrors.account_name}
              placeholder="Your GCash or Bank Account Name"
            />
            <TextInput
              label="Reference Number *"
              value={getInfo.reference_number || ''}
              onChange={(value) => setGetInfo({ ...getInfo, reference_number: value })}
              error={formErrors.reference_number}
              placeholder="Reference Number"
            />
          </Card>

          {/* ORDER NOTES */}
          <Card className="p-8">
            <CardTitle className="text-xl">Additional Information</CardTitle>
            <div>
              <label htmlFor="checkout-order-notes" className="text-lighter mb-1 block text-sm font-medium">
                Order Notes
              </label>
              <Textarea
                id="checkout-order-notes"
                placeholder="Any special instructions for your order"
                value={getInfo.notes || ''}
                onChange={(e) => setGetInfo({ ...getInfo, notes: e.target.value })}
                rows={3}
              />
            </div>
          </Card>

          <CartSummaryCard />
          <Button
            onClick={handleConfirmOrder}
            size="lg"
            variant="CTA"
            className="w-full py-7"
            disabled={placeOrderMutation.isLoading || items.length === 0}
          >
            {placeOrderMutation.isLoading ? 'Placing Order...' : 'Confirm Order'}
          </Button>
          <p className="mx-auto flex items-center justify-center text-xs">
            By Clicking Confirm you agree to our terms and conditions
          </p>
        </div>
      </main>
      <LoadingModal isOpen={isModalOpen} onClose={setIsModalOpen} />
    </section>
  );
}

export default CheckOutPage;
