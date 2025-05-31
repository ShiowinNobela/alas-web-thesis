import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ConfirmPopUp from "../components/ConfirmPopUp";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { CheckOutInput, CheckOutTextArea } from "../components/CheckOutInputStyle";

function CheckOutPage() {
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
    axios
      .post("/api/orders", getInfo, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Order confirmed successfully:", response.data);
        toast.success('Order status updated successfully!');
        setTimeout(() => {
                 navigate("/ProductListPage");
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

  return (
    <>
    <Toaster  richColors />
      <section className="bg-gray-100 bg-cover bg-fixed bg-no-repeat h-screen ">
        <div className="max-w-3xl mx-auto pt-20">
          <div className="  p-6 mt-5">
            <h1 className="text-center uppercase tracking-wide font-semibold mb-3  text-2xl ">
              Checkout
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <CheckOutInput
                placeholder="Your Name"
                required
                value={getInfo?.username}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <CheckOutInput
                placeholder="Your Email"
                required
                value={getInfo?.email}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <CheckOutInput
                placeholder="Your Phone Number"
                required
                value={getInfo?.contact_number}
                onChange={(e) =>
                  setGetInfo({...getInfo, contact_number: e.target.value})
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <CheckOutTextArea
                placeholder="Your Address"
                required
                value={getInfo?.address}
                onChange={(e) =>
                  setGetInfo({...getInfo, address: e.target.value})
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
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

            <div className="flex justify-between gap-5 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Reference Number
                </label>
                <CheckOutInput
                  placeholder="Reference Num"
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, reference_number: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  for="Payment Method"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  {" "}
                  Payment Method{" "}
                </label>
                <select
                  name="Payment Method"
                  id="Payment Method"
                  className="
                            shadow-md
                            w-full
                            py-2 px-3
                            text-gray-700
                            border border-gray-300
                            rounded
                            focus:outline-none
                            focus:ring-2
                            focus:ring-gray-500
                            hover:ring-2
                            hover:ring-gray-300
                            transition-colors"
                  value={getInfo?.payment_method}
                  onChange={(e) =>
                    setGetInfo({ ...getInfo, payment_method: e.target.value })
                  }
                >
                  <option value=""></option>
                  <option value="GCash">GCash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="Maya">Maya</option>
                </select>
              </div>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              // onClick={() => {
              //         setOpen(true);
              //     }}
              onClick={handleConfirmOrder}
            >
              Checkout!
            </button>

            <ConfirmPopUp open={open} onClose={() => setOpen(false)}>
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  Confirm Your Order
                </h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to proceed with the order?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleConfirmOrder}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Yes, Confirm
                  </button>
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                    Cancel
                  </button>
                </div>
              </div>
            </ConfirmPopUp>
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckOutPage;
