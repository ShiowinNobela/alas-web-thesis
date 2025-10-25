import { useState, useEffect } from 'react';
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
import CartSummaryCard from '@/components/cards/CartSummaryCard';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LocationPickerModal from '@/components/modals/LocationPickerModal';
import { MapPin } from 'lucide-react';

function CheckOutPage() {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const user = useUserStore((state) => state.user);
  const [formErrors, setFormErrors] = useState({});
  const [referenceValidation, setReferenceValidation] = useState({ isValid: null, message: '' });
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
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [landmarkAddress, setLandmarkAddress] = useState('');
  const combinedAddress = `${getInfo.address}${landmarkAddress ? '  - (Landmark: ' + landmarkAddress + ')' : ''}`;

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce timer reference
  const [debounceTimer, setDebounceTimer] = useState(null);
  const hasReferenceError = getInfo.reference_number && referenceValidation.isValid === false;
  const isReferenceValidating = getInfo.reference_number && referenceValidation.isValid === null;

  // Mutation for checking reference number
  const checkReferenceMutation = useMutation({
    mutationFn: (referenceNumber) => axios.post(`/api/orders/check-reference/${referenceNumber}`),
    onSuccess: (response) => {
      setReferenceValidation({
        isValid: true,
        message: 'Your reference number looks good!',
      });
    },
    onError: (error) => {
      setReferenceValidation({
        isValid: false,
        message: error.response?.data?.message || 'Invalid reference number',
      });
    },
  });

  // Debounced reference number validation
  const validateReferenceNumber = (referenceNumber) => {
    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Reset validation state for empty input
    if (!referenceNumber.trim()) {
      setReferenceValidation({ isValid: null, message: '' });
      return;
    }

    // Set new timer for debounce (500ms delay)
    const timer = setTimeout(() => {
      checkReferenceMutation.mutate(referenceNumber);
    }, 500);

    setDebounceTimer(timer);
  };

  // Handle reference number change
  const handleReferenceNumberChange = (value) => {
    setGetInfo({ ...getInfo, reference_number: value });

    // Clear any existing errors when user starts typing
    if (formErrors.reference_number) {
      setFormErrors({ ...formErrors, reference_number: '' });
    }

    // Reset validation state
    setReferenceValidation({ isValid: null, message: '' });

    // Trigger debounced validation
    validateReferenceNumber(value);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const placeOrderMutation = useMutation({
    mutationFn: (orderData) => axios.post('/api/orders', orderData),
    onSuccess: (response) => {
      const { orderId } = response.data.data;
      toast.success('Order placed successfully!');
      useCartStore.setState({ items: [], cart_total: 0 });
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
      setReferenceValidation({ isValid: null, message: '' });
      setIsModalOpen(false);
      navigate(`/user/after-checkout/${orderId}`);
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
    if (hasReferenceError || isReferenceValidating) {
      toast.error('Please wait for reference number validation to complete');
      return;
    }

    try {
      await checkoutSchema.validate(getInfo, { abortEarly: false });
      setFormErrors({});
      setIsModalOpen(true);
      placeOrderMutation.mutate({
        ...getInfo,
        address: combinedAddress,
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        err.inner.forEach((e) => (errors[e.path] = e.message));
        setFormErrors(errors);
        toast.error('Please fill in all required fields');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleSaveLandmark = (address) => {
    setLandmarkAddress(address);
    toast.success('Location pinned successfully!');
  };

  const handleLandmarkErr = (res) => {
    toast.error(res);
  };

  return (
    <ErrorBoundary>
      <section className="bg-neutral min-h-screen py-8">
        <main className="relative mx-auto max-w-2xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="absolute top-0 left-0 mt-4">
            <BackButton />
          </div>

          <div className="mx-auto flex flex-col items-center justify-center pb-8">
            <h1 className="text-content font-heading text-5xl">Checkout</h1>
            <p className="text-lighter mt-2">Complete your order by filling the form below</p>
          </div>

          {/* PERSONAL INFORMATION */}
          <div className="space-y-7">
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
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="checkout-address" className="text-lighter mb-1 block text-sm font-medium">
                    Delivery Address *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsLocationModalOpen(true)}
                    className="text-primary flex items-center gap-1 text-sm hover:underline"
                  >
                    <MapPin size={16} />
                    Pin Location
                  </button>
                </div>
                <Textarea
                  id="checkout-address"
                  placeholder="Your complete address"
                  value={getInfo.address || ''}
                  onChange={(e) => setGetInfo({ ...getInfo, address: e.target.value })}
                  rows={3}
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="checkout-landmark" className="text-lighter mb-1 block text-sm font-medium">
                      Landmark Address (for faster delivery)
                    </label>
                    {landmarkAddress && (
                      <button
                        type="button"
                        onClick={() => setLandmarkAddress('')}
                        className="mb-1 cursor-pointer text-sm text-red-500 hover:underline"
                      >
                        Remove Landmark
                      </button>
                    )}
                  </div>
                  <Textarea
                    id="checkout-landmark"
                    placeholder="Landmark / Nearby location for rider"
                    value={landmarkAddress || ''}
                    rows={2}
                    readOnly
                  />
                </div>
              </div>
            </Card>

            <CartSummaryCard />

            {/* PAYMENT INFORMATION */}
            <Card className="p-8">
              <CardTitle className="text-xl">Payment Information</CardTitle>
              <CardDescription>
                Send the payment to any of the following methods and fill in the details below to confirm your order.
              </CardDescription>
              <div className="mb-4">
                <Label htmlFor="checkout-payment-method" className="text-lighter mb-1 block text-sm font-medium">
                  Payment Method *
                </Label>
                <Select
                  onValueChange={(value) => setGetInfo({ ...getInfo, payment_method: value })}
                  value={getInfo.payment_method || ''}
                >
                  <SelectTrigger
                    id="checkout-payment-method"
                    className={`text-lighter w-full cursor-pointer ${formErrors.payment_method ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="-- select an option --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GCash">GCash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Maya">Maya</SelectItem>
                  </SelectContent>
                </Select>
                {formErrors.payment_method && <p className="text-error mt-1 text-xs">{formErrors.payment_method}</p>}

                {getInfo.payment_method === 'GCash' ? (
                  <div className="mt-4 space-y-4">
                    <p className="text-lighter text-sm">
                      Scan the QR code below via GCash and fill the required details
                    </p>
                    <img
                      src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1760621075/DonateToMe_fyolkd.jpg"
                      alt={getInfo.payment_method}
                      className="w-full rounded-2xl object-contain"
                    />
                  </div>
                ) : getInfo.payment_method === 'bank_transfer' ? (
                  <div className="mt-4 space-y-4">
                    <p className="text-lighter text-sm">Bank Payment details I dont know this</p>
                    <div className="container flex h-10 flex-col items-center justify-center rounded-2xl bg-emerald-500">
                      <p className="mx-auto text-center font-bold text-white">This is a placeholder</p>
                    </div>
                  </div>
                ) : getInfo.payment_method === 'Maya' ? (
                  <div className="mt-4 space-y-4">
                    <p className="text-lighter text-sm">
                      {/* Scan the QR code below via Maya and fill the required details */}
                      This is a placeholder QR code for Maya payment. DO NOT USE.
                    </p>
                    <img
                      src="https://greensierra.ph/wp-content/uploads/elementor/thumbs/Copy-of-3.8X5INCHES-QR-Code-Standee-Template-qj129ev3osdr1lxzh4lj14ccrq0n8r53so2q7nuqqc.jpg"
                      alt={getInfo.payment_method}
                      className="w-full rounded-2xl object-contain"
                    />
                  </div>
                ) : null}
              </div>
              <TextInput
                label="Account Name *"
                value={getInfo.account_name || ''}
                onChange={(value) => setGetInfo({ ...getInfo, account_name: value })}
                error={formErrors.account_name}
                placeholder="Your GCash or Bank Account Name"
              />
              <div className="space-y-2">
                <TextInput
                  label="Reference Number *"
                  value={getInfo.reference_number || ''}
                  onChange={handleReferenceNumberChange}
                  error={
                    formErrors.reference_number ||
                    (referenceValidation.isValid === false ? referenceValidation.message : '')
                  }
                  placeholder="Reference Number"
                />
                {referenceValidation.isValid === true && (
                  <div className="text-sm text-green-600">{referenceValidation.message}</div>
                )}
                {checkReferenceMutation.isPending && (
                  <div className="text-sm text-blue-600">Checking reference number...</div>
                )}
              </div>
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

            <Button
              onClick={handleConfirmOrder}
              size="lg"
              variant="CTA"
              className="w-full py-7"
              disabled={
                placeOrderMutation.isLoading || items.length === 0 || hasReferenceError || isReferenceValidating
              }
            >
              {placeOrderMutation.isLoading ? 'Placing Order...' : 'Confirm Order'}
            </Button>
            <p className="mx-auto flex items-center justify-center text-xs">
              By Clicking Confirm you agree to our terms and conditions
            </p>
          </div>
        </main>

        <LocationPickerModal
          open={isLocationModalOpen}
          setOpen={setIsLocationModalOpen}
          onSave={handleSaveLandmark}
          onError={handleLandmarkErr}
        />

        <LoadingModal isOpen={isModalOpen} onClose={setIsModalOpen} />
      </section>
    </ErrorBoundary>
  );
}

export default CheckOutPage;
