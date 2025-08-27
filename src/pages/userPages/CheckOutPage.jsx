import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function CheckOutPage() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [getInfo, setGetInfo] = useState({
    payment_method: '',
    address: '',
    notes: '',
    reference_number: '',
    account_name: '',
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem('user'));

  useEffect(() => {
    axios
      .get('/api/users', {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => setGetInfo(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleConfirmOrder = () => {
    let couponCode = window.localStorage.getItem('couponCode');
    if (
      !couponCode ||
      couponCode.trim() === '' ||
      couponCode === 'null' ||
      couponCode === 'undefined'
    ) {
      couponCode = null;
    }
    const payload = couponCode ? { ...getInfo, couponCode } : getInfo;

    axios
      .post('/api/orders', payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        toast.success('Order status updated successfully!');
        setTimeout(() => navigate('/ProductListPage'), 1000);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          toast.error('Failed to update status: Bad Request');
        } else {
          toast.error('An unexpected error occurred');
        }
      });
  };

  return (
    <>
      <Toaster richColors />
      <section className="flex min-h-full items-center justify-center bg-yellow-100 py-5">
        <div className="mx-auto w-full max-w-4xl space-y-8 rounded-2xl bg-white px-6 py-8 shadow-lg">
          {/* HEADER */}
          <div className="relative mb-2 text-center">
            <button
              className="absolute left-0 text-sm font-medium text-blue-500 hover:text-blue-700"
              onClick={() => window.history.back()}
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
              Checkout
            </h1>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-8 md:flex-row">
            {/* LEFT COLUMN - Customer Info */}
            <div className="flex-1 space-y-6 rounded-xl bg-gray-50 p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Billing Information
              </h2>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Name
                </label>
                <Input
                  placeholder="Your Name"
                  value={getInfo?.username}
                  readOnly
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  type="number"
                  placeholder="Your Phone Number"
                  value={getInfo?.contact_number}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, contact_number: e.target.value })
                  }
                  onKeyDown={(e) =>
                    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Address
                </label>
                <Textarea
                  placeholder="Your Address"
                  value={getInfo?.address}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, address: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Note
                </label>
                <Textarea
                  placeholder="Order Notes"
                  value={getInfo?.notes}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, notes: e.target.value })
                  }
                />
              </div>
            </div>

            {/* RIGHT COLUMN - Payment Info */}
            <div className="flex-1 space-y-6 rounded-xl bg-gray-50 p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Payment Information
              </h2>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Email
                </label>
                <Input
                  placeholder="Your Email"
                  value={getInfo?.email}
                  readOnly
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700 shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={getInfo?.payment_method}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, payment_method: e.target.value })
                  }
                >
                  <option disabled value="">
                    -- select an option --
                  </option>
                  <option value="GCash">GCash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="Maya">Maya</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Account Name
                </label>
                <Input
                  placeholder="Your GCash or Bank Account Name"
                  value={getInfo?.account_name}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, account_name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Reference Number
                </label>
                <Input
                  placeholder="Reference Number"
                  value={getInfo?.reference_number}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, reference_number: e.target.value })
                  }
                />
              </div>

              <div className="space-y-3 border-t border-gray-300 pt-4">
                <button
                  type="button"
                  className="text-left text-sm font-semibold text-blue-500 underline"
                  onClick={() => setOpen(true)}
                >
                  Terms and Conditions
                </button>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                  />
                  <p className="text-sm text-gray-700">
                    I Accept All Terms and Conditions
                  </p>
                </div>

                <button
                  className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!termsChecked}
                  onClick={handleConfirmOrder}
                >
                  Checkout!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckOutPage;
