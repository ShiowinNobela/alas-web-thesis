import Header from "../components/images/expedition33.png";
import { useEffect, useState } from "react";
import axios from "axios";

function CouponPopUp({ open, onClose, onApply }) {
  const [coupon, setCoupon] = useState([]);
  


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
            <div className="grid grid-cols-1">

               {/* <div className="flex flex-row items-center justify-center w-[500px] h-[200px] ">
                <img src={Header} className="h-[100px]" />
                <div className="flex flex-col w-[400px] h-[100px] border-1">
                  <h1 className="text-2xl font-bold pl-3"> 70 % Off</h1>
                  <div className="flex flex-row items-center justify-between w-full px-3 py-2">
                    <h3>Min spend of ₱ 50</h3>
                    <button className="border-1 shadow-2xl drop-shadow-2xl p-2 rounded-2xl">
                      Use Coupon
                    </button>
                  </div>
                </div> 
              </div> */}


            {coupon.map((d) => {
              return (
              <div className="flex flex-row items-center justify-center w-[500px] h-[200px]" key={d.code}>
                <img src={Header} className="h-[100px]" />
                <div className="flex flex-col w-[400px] h-[100px] border-1">
                  <h1 className="text-2xl font-bold pl-3">{d.code}</h1>
                  <div className="flex flex-row items-center justify-between w-full px-3 py-2">
                    <h3>{d.description}</h3>
                    <button className="border-1 shadow-2xl drop-shadow-2xl p-2 rounded-2xl"
                    onClick={() => {
                      if (onApply) onApply(d);
                      onClose();
                    }}>
                      Use Coupon
                    </button>
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
