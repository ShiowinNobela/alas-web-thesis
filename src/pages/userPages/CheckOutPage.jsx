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
    try {
      await checkoutSchema.validate(getInfo, { abortEarly: false });
      setFormErrors({});
      setIsModalOpen(true); // Show modal while loading
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

/*   

  const featuredProducts = [
    {
      name: 'Carbon',
      desc: 'Perfect balance of sweet and heat.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445989/122179467_192071712292847_9036583728645172047_n_zwhbth.jpg',
      link: '/products/sweet-chili',
      tag: 'BESTSELLER',
      tagColor: 'bg-orange-500',
    },
    {
      name: 'Alas Powders',
      desc: 'Creamy and savory favorite.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351170/powders_lziet3.jpg',
      link: '/products/garlic-mayo',
      tag: 'NEW',
      tagColor: 'bg-green-500',
    },
    {
      name: 'Classic Sauces',
      desc: 'Smoky and rich in flavor.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445522/122462317_192071598959525_4825425067991163101_n_yh2sac.jpg',
      link: '/products/bbq',
      tag: 'TRENDING',
      tagColor: 'bg-red-500',
    },
    {
      name: 'Ballad of Q',
      desc: 'A bold kick for any meal.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445445/471449145_1098376664995676_4011717143068015172_n_fmgpvi.jpg',
      link: '/products/spicy-vinegar',
      tag: 'HOT',
      tagColor: 'bg-red-600',
    },
  ];

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-base">Featured Sauces</h2>
            <Link to="/menu" className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card
                key={product.name}
                className="group overflow-hidden p-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`font-heading absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-bold text-white ${product.tagColor}`}
                  >
                    {product.tag}
                  </div>
                </div>
                <CardContent className="space-y-3 p-5">
                  <div>
                    <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2 text-sm">{product.desc}</CardDescription>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link to={product.link} className="w-full">
                      <Button size="sm" className="w-full">
                        Try It Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> 
        */
