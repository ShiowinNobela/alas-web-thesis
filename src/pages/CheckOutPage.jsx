import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ConfirmPopUp from "../components/ConfirmPopUp";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import {
  CheckOutInput,
  CheckOutTextArea,
} from "../components/CheckOutInputStyle";

function CheckOutPage() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [getInfo, setGetInfo] = useState({
    payment_method: "",
    address: "",
    notes: "",
    reference_number: "",
    account_name: "",
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setGetInfo(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleConfirmOrder = () => {
  let couponCode = window.localStorage.getItem("couponCode");
  // Remove couponCode if it's null, undefined, empty, or the string "null"/"undefined"
  if (
    !couponCode ||
    couponCode.trim() === "" ||
    couponCode === "null" ||
    couponCode === "undefined"
  ) {
    couponCode = null;
  }
  const payload = couponCode
    ? { ...getInfo, couponCode }
    : getInfo;
  axios
    .post("/api/orders", payload, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((response) => {
      console.log("Order confirmed successfully:", response.data);
      toast.success("Order status updated successfully!");
      setTimeout(() => {
        navigate("/ProductListPage");
      }, 1000);
    })
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        toast.error("Failed to update status: Bad Request");
      } else {
        toast.error("An unexpected error occurred");
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
      <section className="bg-yellow-100 min-h-full flex items-center justify-center py-5">
        <div className="max-w-4xl w-full mx-auto px-6 py-8 bg-white shadow-lg rounded-2xl space-y-8">
          {/* HEADER */}
          <div className="relative mb-2 text-center">
            <button
              className="absolute left-0 text-blue-500 hover:text-blue-700 text-sm font-medium"
              onClick={() => window.history.back()}
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              Checkout
            </h1>
          </div>

          {/* FORM */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* LEFT COLUMN - Customer Info */}
            <div className="flex-1 space-y-6 bg-gray-50 p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Billing Information
              </h2>

              {/* Name */}
              <div>
                <label className="block text-gray-700 text-xs font-medium mb-1">
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
                <label className="block text-gray-700 text-xs font-medium mb-1">
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
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 text-xs font-medium mb-1">
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
                <label className="block text-gray-700 text-xs font-medium mb-1">
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
            <div className="flex-1 space-y-6 bg-gray-50 p-6 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Payment Information
              </h2>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-xs font-medium mb-1">
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
                <label className="block text-gray-700 text-xs font-medium mb-1">
                  Payment Method
                </label>
                <select
                  name="Payment Method"
                  id="Payment Method"
                  className="shadow-inner w-full py-2 px-3 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
                <label className="block text-gray-700 text-xs font-medium mb-1">
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
                <label className="block text-gray-700 text-xs font-medium mb-1">
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
              <div className="border-t border-gray-300 pt-4 space-y-3">
                <button
                  type="button"
                  className="text-blue-500 underline font-semibold text-left text-sm"
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="text-center p-6">
              <h2 className="text-xl font-semibold mb-4">
                Terms and Conditions
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                All sales are subject to product availability. In the event that
                an item is out of stock, you will be notified and refunded if
                necessary.
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Please ensure that all shipping and contact information provided
                is accurate. We are not responsible for delays or failed
                deliveries due to incorrect information.
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Orders can only be cancelled prior to processing. Once an order
                has been processed and prepared for shipment, it cannot be
                cancelled or refunded.
              </p>
              <p className="text-gray-600 text-sm mb-6">
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Yes, I Accept
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
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
