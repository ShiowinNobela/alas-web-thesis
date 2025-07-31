import Header from '../components/images/expedition33.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { previewCouponDiscount } from '../utils/couponUtils';
import PropTypes from 'prop-types';

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
      .get('/api/coupons')
      .then((response) => {
        console.log(response.data);
        setCoupon(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching coupons:', error);
      });
  }, []);

  return (
    <>
      <div
        onClick={onClose}
        className={
          open
            ? 'fixed inset-0 flex items-center justify-center bg-black/20 transition-colors'
            : 'hidden'
        }
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            open
              ? 'flex w-xl scale-100 flex-col space-y-3 bg-white p-10 opacity-100 shadow-2xl transition-all'
              : 'scale-125 opacity-0'
          }
        >
          <div className="flex flex-col items-center justify-center p-3">
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-1 space-y-4">
                {/* Preview Section */}
                {previewData && selectedCoupon && (
                  <div className="mb-4 w-[500px] rounded-lg border-2 border-green-200 bg-green-50 p-4">
                    <h3 className="mb-2 text-lg font-bold text-green-800">
                      Coupon Preview
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Cart Total:</span>
                        <span className="font-semibold">
                          {previewData.preview.originalTotal}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Discount ({selectedCoupon.code}):</span>
                        <span className="font-semibold text-green-600">
                          -{previewData.preview.discountAmount}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-bold">Final Total:</span>
                        <span className="text-lg font-bold">
                          {previewData.preview.finalTotal}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        Formula: {previewData.preview.formula}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={handleApplyCoupon}
                        className="rounded-lg bg-green-600 px-6 py-2 font-bold text-white hover:bg-green-700"
                      >
                        Apply This Coupon
                      </button>
                    </div>
                  </div>
                )}

                {/* Coupon List Section */}
                <>
                  {coupon.map((d) => {
                    const isSelected = selectedCoupon?.code === d.code;
                    return (
                      <div
                        className={`flex h-[200px] w-[500px] cursor-pointer flex-row items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-blue-50 ring-2 ring-blue-500'
                            : 'hover:bg-gray-50'
                        }`}
                        key={d.code}
                        onClick={() => handleCouponPreview(d)}
                      >
                        <img src={Header} className="h-[100px]" />
                        <div className="flex h-[100px] w-[400px] flex-col border-1">
                          <h1 className="pl-3 text-2xl font-bold">{d.code}</h1>
                          <div className="flex w-full flex-row items-center justify-between px-3 py-2">
                            <div>
                              <h3>{d.description}</h3>
                              <p className="text-sm text-gray-600">
                                {d.type === 'PERCENTAGE'
                                  ? `${d.amount}% off`
                                  : `₱${d.amount} off`}
                              </p>
                            </div>
                            <div className="text-center">
                              {isSelected ? (
                                <div className="rounded-lg bg-blue-500 px-4 py-2 text-white">
                                  Selected
                                </div>
                              ) : (
                                <div className="rounded-2xl border-1 bg-gray-100 p-2 shadow-2xl drop-shadow-2xl">
                                  Click to Preview
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          {' '}
          X{' '}
        </button>
      </div>
    </>
  );
}

CouponPopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  cartTotal: PropTypes.number,
};

export default CouponPopUp;
