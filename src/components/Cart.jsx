import { MdDeleteForever } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai"

function Cart() {
  return (
    <>
 
    <div className="mt-20 flex flex-col items-end">
        <div className="bg-green-800 w-[400px] h-full">
          <div className="flex flex-row justify-evenly items-center">
          <h1 className="text-3xl text-center font-bold mt-3 my-10"> My Cart </h1>
          <AiOutlineClose className="lg:hidden bg-blue-400 rounded-full p-3 w-[50px] h-[50px] mt-3 my-10 " /> 
          </div>

          <div className="h-[480px] border-black border-1 pt-2 overflow-auto">
            <div className="bg-[#FFFFFF] w-[370px] h-[85px] px-1 py-1 mx-auto border-1 shadow-md shadow-black">
              <div className="grid grid-cols-5 gap-1">
                <img src={"./src/components/images/product1.jpg"} alt="/" className="lg:h-[80px] lg:w-[80px] w-[40px] h-[40px] row-span-2 mx-3 py-1" />
                <h1 className="font-bold col-span-3 text-center"> Pickled Alapeno</h1>
                <MdDeleteForever color='red' className="h-[30px] w-[30px]" />
                <FaPlus className="mx-auto h-[20px] w-[20px] "/>
                <FaMinus className="mx-auto h-[20px] w-[20px] " />
                <p className="mx-1 border-1 text-xl text-center"> 1 </p>
                <p className="mx-1 text-xl text-center"> ₱ 400 </p>
              </div>
            </div>
          </div>

          <div className="border-2 h-[150px]  ">
            <div className="grid grid-cols-2 pb-3">
            <p className="flex items-start pl-3 text-xl font-bold"> Subtotal: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold "> ₱ 400 </p>
            <p className="flex items-start pl-3 text-xl font-bold"> Coupon Value: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold"> ₱ 200 </p>
            </div>

            <div className="flex flex-col items-center ">
              <div className="bg-[#FFFFFF] border-[#EA1A20] border-1 flex flex-row w-[350px] justify-around items-center px-3 py-3 shadow-md shadow-black">
                <p className="text-xl font-semibold"> Pick Coupon: </p>
                <div className="text-[#FFFFFF] text-xl font-semibold bg-[#EA1A20] px-8 py-2"> Coupon </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 px-2 py-4 mx-auto">
            <p className="flex flex-col items-start pl-3 text-xl font-bold"> Total: </p>
            <p className="flex flex-col items-end pr-3 text-xl font-semibold"> ₱ 200 </p>
          </div>
          
          <div className="flex items-center justify-center pb-6">
          <div className="text-center shadow-md shadow-black text-[#FFFFFF] text-xl font-semibold bg-[#EA1A20] px-8 py-2 w-[350px]">
                Checkout
          </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Cart