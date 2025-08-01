import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import ConfirmPopUp from '../components/ConfirmPopUp';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import {
  CheckOutInput,
  CheckOutTextArea,
} from '../components/CheckOutInputStyle';

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
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setGetInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleConfirmOrder = () => {
    let couponCode = window.localStorage.getItem('couponCode');
    // Remove couponCode if it's null, undefined, empty, or the string "null"/"undefined"
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
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log('Order confirmed successfully:', response.data);
        toast.success('Order status updated successfully!');
        setTimeout(() => {
          navigate('/ProductListPage');
        }, 1000);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toast.error('Failed to update status: Bad Request');
        } else {
          toast.error('An unexpected error occurred');
        }
      });
  };

  // Object.entries(getInfo).forEach(([key, value]) => {
  //     console.log(`${key}: ${typeof value}`);

  // });

  //  {
  //     payment_method: getInfo.payment_method,
  //     address: getInfo.address,
  //     notes: getInfo.notes,
  //     reference_number: getInfo.reference_number,
  //     account_name:   getInfo.account_name,
  // },
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

              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Name
                </label>
                <CheckOutInput
                  placeholder="Your Name"
                  required
                  value={getInfo?.username}
                  readOnly
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Phone Number
                </label>
                <CheckOutInput
                  type="number"
                  placeholder="Your Phone Number"
                  required
                  value={getInfo?.contact_number}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, contact_number: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (['e', 'E', '+', '-'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Address
                </label>
                <CheckOutTextArea
                  placeholder="Your Address"
                  required
                  value={getInfo?.address}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, address: e.target.value })
                  }
                />
              </div>

              {/* Note */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Note
                </label>
                <CheckOutTextArea
                  placeholder="Order Notes"
                  required
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

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Email
                </label>
                <CheckOutInput
                  placeholder="Your Email"
                  required
                  value={getInfo?.email}
                  readOnly
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  name="Payment Method"
                  id="Payment Method"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-gray-700 shadow-inner transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

              {/* Account Name */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Account Name
                </label>
                <CheckOutInput
                  placeholder="Your Gcash Or Bank Account Name"
                  required
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, account_name: e.target.value })
                  }
                />
              </div>

              {/* Reference Number */}
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">
                  Reference Number
                </label>
                <CheckOutInput
                  placeholder="Reference Num"
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, reference_number: e.target.value })
                  }
                />
              </div>

              {/* Terms and Checkout */}
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

          {/* Confirm Pop Up */}
          <ConfirmPopUp open={open} onClose={() => setOpen(false)}>
            <div className="p-6 text-center">
              <h2 className="mb-4 text-xl font-semibold">
                Terms and Conditions
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                All sales are subject to product availability. In the event that
                an item is out of stock, you will be notified and refunded if
                necessary.
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Please ensure that all shipping and contact information provided
                is accurate. We are not responsible for delays or failed
                deliveries due to incorrect information.
              </p>
              <p className="mb-4 text-sm text-gray-600">
                Orders can only be cancelled prior to processing. Once an order
                has been processed and prepared for shipment, it cannot be
                cancelled or refunded.
              </p>
              <p className="mb-6 text-sm text-gray-600">
                By placing an order, you agree to these terms and acknowledge
                that sauces are non-returnable and non-refundable once delivered
                unless the product is defective or damaged during shipping.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setTermsChecked(true);
                    setOpen(false);
                  }}
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Yes, I Accept
                </button>
                <button
                  className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </ConfirmPopUp>
        </div>
      </section>
    </>
  );
}

export default CheckOutPage;
