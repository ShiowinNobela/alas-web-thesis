import Header from "../components/images/expedition33.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { previewCouponDiscount } from "../utils/couponUtils";

function CouponPopUp({ open, onClose, onApply, cartTotal = 0 }) {
  const [coupon, setCoupon] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  


  const handleCouponPreview = (couponData) => {
    if (cartTotal > 0) {
      const preview = previewCouponDiscount(couponData, cartTotal);
      setPreviewData(preview);
      setSelectedCoupon(couponData);
    }
  };

  const handleApplyCoupon = () => {
    if (selectedCoupon && onApply) {
      onApply(selectedCoupon);
      onClose();
    }
  };

  useEffect(() => {
    axios
      .get("/api/coupons")
      .then((response) => {
        console.log(response.data);
        setCoupon(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }, []);

  return (
    <>
      <div
        onClick={onClose}
        className={
          open
            ? " fixed flex items-center justify-center inset-0 transition-colors bg-black/20 "
            : "hidden"
        }
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            open
              ? "flex flex-col w-xl shadow-2xl bg-white p-10 space-y-3 transition-all scale-100 opacity-100"
              : "scale-125 opacity-0"
          }
        >
          <div className="flex flex-col items-center justify-center p-3">
            <div className="grid grid-cols-1 space-y-4">
              
              {/* Preview Section */}
              {previewData && selectedCoupon && (
                <div className="w-[500px] bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-bold text-green-800 mb-2">Coupon Preview</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cart Total:</span>
                      <span className="font-semibold">{previewData.preview.originalTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount ({selectedCoupon.code}):</span>
                      <span className="font-semibold text-green-600">-{previewData.preview.discountAmount}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-bold">Final Total:</span>
                      <span className="font-bold text-lg">{previewData.preview.finalTotal}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      Formula: {previewData.preview.formula}
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button 
                      onClick={handleApplyCoupon}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700"
                    >
                      Apply This Coupon
                    </button>
                  </div>
                </div>
              )}

            {coupon.map((d) => {
              const isSelected = selectedCoupon?.code === d.code;
              return (
              <div 
                className={`flex flex-row items-center justify-center w-[500px] h-[200px] cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`} 
                key={d.code}
                onClick={() => handleCouponPreview(d)}
              >
                <img src={Header} className="h-[100px]" />
                <div className="flex flex-col w-[400px] h-[100px] border-1">
                  <h1 className="text-2xl font-bold pl-3">{d.code}</h1>
                  <div className="flex flex-row items-center justify-between w-full px-3 py-2">
                    <div>
                      <h3>{d.description}</h3>
                      <p className="text-sm text-gray-600">
                        {d.type === 'PERCENTAGE' ? `${d.amount}% off` : `₱${d.amount} off`}
                      </p>
                    </div>
                    <div className="text-center">
                      {isSelected ? (
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                          Selected
                        </div>
                      ) : (
                        <div className="border-1 shadow-2xl drop-shadow-2xl p-2 rounded-2xl bg-gray-100">
                          Click to Preview
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          {" "}
          X{" "}
        </button>
      </div>
    </>
  );
}

export default CouponPopUp;
