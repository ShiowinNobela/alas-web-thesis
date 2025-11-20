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
import { MapPin, Truck } from 'lucide-react';
import { STORE_LOCATION } from '@/components/cards/StoreLocationCard';
import { calculateDistance, calculateShippingFee, getZoneName } from '@/utils/shippingCalculator';

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
  const [landmark, setLandmark] = useState({ address: '', coordinates: null });
  const [shippingFee, setShippingFee] = useState(0);
  const [deliveryZone, setDeliveryZone] = useState('');
  
  const combinedAddress = `${getInfo.address}${landmark.address ? '  - (Landmark: ' + landmark.address + ')' : ''}`;

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounce timer reference
  const [debounceTimer, setDebounceTimer] = useState(null);
  const hasReferenceError = getInfo.reference_number && referenceValidation.isValid === false;
  const isReferenceValidating = getInfo.reference_number && referenceValidation.isValid === null;

  // Calculate shipping fee when landmark coordinates change
  useEffect(() => {
    if (landmark.coordinates) {
      const distance = calculateDistance(
        STORE_LOCATION.lat,
        STORE_LOCATION.lng,
        landmark.coordinates.lat,
        landmark.coordinates.lng
      );
      
      const fee = calculateShippingFee(distance);
      const zone = getZoneName(distance);
      
      if (fee === null) {
        toast.error('Sorry, we do not deliver to locations beyond 40km');
        setShippingFee(0);
        setDeliveryZone('Beyond delivery range');
      } else {
        setShippingFee(fee);
        setDeliveryZone(zone);
        toast.success(`Shipping fee calculated: ₱${fee} (${zone.split(' — ')[0]})`);
      }
    } else {
      setShippingFee(0);
      setDeliveryZone('');
    }
  }, [landmark.coordinates]);

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
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (!referenceNumber.trim()) {
      setReferenceValidation({ isValid: null, message: '' });
      return;
    }

    const timer = setTimeout(() => {
      checkReferenceMutation.mutate(referenceNumber);
    }, 500);

    setDebounceTimer(timer);
  };

  const handleReferenceNumberChange = (value) => {
    setGetInfo({ ...getInfo, reference_number: value });

    if (formErrors.reference_number) {
      setFormErrors({ ...formErrors, reference_number: '' });
    }

    setReferenceValidation({ isValid: null, message: '' });
    validateReferenceNumber(value);
  };

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
      setLandmark({ address: '', coordinates: null });
      setShippingFee(0);
      setDeliveryZone('');
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

    if (!landmark.coordinates) {
      toast.error('Please set a delivery location to calculate shipping fee');
      return;
    }

    if (shippingFee === 0 && landmark.coordinates) {
      toast.error('Sorry, we cannot deliver to your selected location');
      return;
    }

    try {
      await checkoutSchema.validate(getInfo, { abortEarly: false });
      setFormErrors({});
      setIsModalOpen(true);
      placeOrderMutation.mutate({
        ...getInfo,
        address: combinedAddress,
        shipping_fee: shippingFee,
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

  const handleSaveLandmark = (landmarkData) => {
    setLandmark(landmarkData);
    toast.success('Location pinned successfully!');
  };

  const handleLandmarkErr = (res) => {
    toast.error(res);
  };

  const handleRemoveLandmark = () => {
    setLandmark({ address: '', coordinates: null });
    setShippingFee(0);
    setDeliveryZone('');
    toast.info('Delivery location removed');
  };

  return (
    <ErrorBoundary>
      <section className="min-h-screen py-8 bg-neutral">
        <main className="relative max-w-2xl px-4 pb-24 mx-auto sm:px-6 lg:px-8">
          <div className="absolute top-0 left-0 mt-4">
            <BackButton />
          </div>

          <div className="flex flex-col items-center justify-center pb-8 mx-auto">
            <h1 className="text-5xl text-content font-heading">Checkout</h1>
            <p className="mt-2 text-lighter">Complete your order by filling the form below</p>
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
                  <label htmlFor="checkout-address" className="block mb-1 text-sm font-medium text-lighter">
                    Delivery Address *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsLocationModalOpen(true)}
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
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
                    <label htmlFor="checkout-landmark" className="block mb-1 text-sm font-medium text-lighter">
                      Landmark Address (for faster delivery)
                    </label>
                    {landmark.address && (
                      <button
                        type="button"
                        onClick={handleRemoveLandmark}
                        className="mb-1 text-sm text-red-500 cursor-pointer hover:underline"
                      >
                        Remove Landmark
                      </button>
                    )}
                  </div>
                  <Textarea
                    id="checkout-landmark"
                    placeholder="Landmark / Nearby location for rider"
                    value={landmark.address || ''}
                    rows={2}
                    readOnly
                  />
                  
                  {/* Shipping Fee Display */}
                  {landmark.coordinates && shippingFee > 0 && (
                    <div className="p-3 mt-4 border border-green-200 rounded-lg bg-green-50">
                      <div className="flex items-center gap-2 text-green-800">
                        <Truck size={18} />
                        <div>
                          <p className="font-medium">Shipping Fee: ₱{shippingFee}</p>
                          <p className="text-sm text-green-600">{deliveryZone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {landmark.coordinates && shippingFee === 0 && (
                    <div className="p-3 mt-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center gap-2 text-red-800">
                        <Truck size={18} />
                        <div>
                          <p className="font-medium">Delivery Not Available</p>
                          <p className="text-sm text-red-600">{deliveryZone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <CartSummaryCard shippingFee={shippingFee} />

            {/* PAYMENT INFORMATION */}
            <Card className="p-8">
              <CardTitle className="text-xl">Payment Information</CardTitle>
              <CardDescription>
                Send the payment to any of the following methods and fill in the details below to confirm your order.
              </CardDescription>
              <div className="mb-4">
                <Label htmlFor="checkout-payment-method" className="block mb-1 text-sm font-medium text-lighter">
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
                {formErrors.payment_method && <p className="mt-1 text-xs text-error">{formErrors.payment_method}</p>}

                {getInfo.payment_method === 'GCash' ? (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-lighter">
                      Scan the QR code below via GCash and fill the required details
                    </p>
                    <img
                      src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1760621075/DonateToMe_fyolkd.jpg"
                      alt={getInfo.payment_method}
                      className="object-contain w-full rounded-2xl"
                    />
                  </div>
                ) : getInfo.payment_method === 'bank_transfer' ? (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-lighter">
                      Scan the QR code below via Bank Transfer and fill the required details
                    </p>
                    <img
                      src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1761442632/6545af42-c08e-4ca7-beff-ae76d91e0ce1_w42tfd.jpg"
                      alt={getInfo.payment_method}
                      className="object-contain w-full rounded-2xl"
                    />
                  </div>
                ) : getInfo.payment_method === 'Maya' ? (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-lighter">
                      Scan the QR code below via Maya and fill the required details
                    </p>
                    <img
                      src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1761442632/6167d02c-a777-4739-9fb0-8e8d0e8806d6_ofeil8.jpg"
                      alt={getInfo.payment_method}
                      className="object-contain w-full rounded-2xl"
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
                <label htmlFor="checkout-order-notes" className="block mb-1 text-sm font-medium text-lighter">
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
                placeOrderMutation.isLoading || 
                items.length === 0 || 
                hasReferenceError || 
                isReferenceValidating ||
                !landmark.coordinates ||
                shippingFee === 0
              }
            >
              {placeOrderMutation.isLoading ? 'Placing Order...' : 'Confirm Order'}
            </Button>
            <p className="flex items-center justify-center mx-auto text-xs">
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