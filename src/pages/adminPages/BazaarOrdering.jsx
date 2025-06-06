import Sidebar from "../../components/sidebar.jsx";
import { useState } from "react";
import EditOrder from "./editOrder.jsx";

function BazaarOrdering() {
  const [Open, setOpen] = useState(false);

  return (
    <>
      <div className="h-full w-screen overflow-auto">
        <Sidebar />
        <div className="h-screen w-screen bg-[#E2E0E1] pl-[256px]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="pl-10 pt-5 text-xl font-semibold">
              Bazaar Ordering
            </h1>

            <form>
              <div className="mt-5 h-5xl w-7xl border-1 border-black shadow-2xl">
                <div className="flex flex-row gap-x-3">
                  <p className="pl-3 text-xl p-2 m-2">Username:</p>
                  <input
                    type="text"
                    name="userName"
                    className="p-1 m-2 text-xl border-b-1 border-black w-md"
                  />
                  <input
                    type="checkbox"
                    id="HasAccount"
                    name="HasAccount"
                    value="HasAccount"
                    className="ml-20"
                  />
                  <label for="vehicle1" className="p-2 m-2 text-xl">
                    {" "}
                    Doesn't have an Account
                  </label>
                </div>
                <div className="flex flex-col items-center justify-center mt-10">
                  <p className="pl-3 text-xl p-2 m-2">Ordered Items:</p>
                  <div className="max-h-xs w-[1024px] border-1 border-black overflow-auto">
                    <div className="grid grid-cols-3 m-1">
                      <div className="flex flex-row mx-auto gap-x-5 p-2 border-1 m-1 border-black">
                        <p>ID: HSJINX</p>
                        <p>Quantity: 5</p>
                        <p>Price: 1000</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="m-3 p-4 bg-red-600 text-[#FFFFFF] rounded-3xl shadow-xl cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    Edit Order
                  </div>
                  <EditOrder open={Open} onClose={() => setOpen(false)} />
                </div>
                <div className="flex flex-row ml-4 text-2xl">
                  <p className="p-1 ml-3">Discount: </p>
                  <input
                    type="number"
                    className="p-1 ml-3 border-black border-b-1"
                  />
                </div>
                <h1 className="mt-10 ml-8 text-3xl">
                  Total Amount: PLACEHOLDER VALUE
                </h1>
                <div className="flex justify-center items-center m-3 p-3">
                  <button className="bg-red-500 text-white text-2xl m-2 p-4 rounded-3xl cursor-pointer">
                    Complete Transaction
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BazaarOrdering;
