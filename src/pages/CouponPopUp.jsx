

function CouponPopUp({open,onClose}) {
  return (
    <>
    <div onClick={onClose} className={open? " fixed flex items-center justify-center inset-0 transition-colors bg-black/20 " : "hidden"}>
        <div onClick={e => e.stopPropagation()} className={open?"flex flex-col w-3xl shadow-2xl bg-white p-10 space-y-3 transition-all scale-100 opacity-100" : "scale-125 opacity-0"}> 
            <div className="flex items-center justify-center p-3">
                <div className="grid grid-cols-2 gap-15">
                
                    <div className="flex flex-col items-center justify-center bg-[#EA1A20] w-[200px] h-[150px] rounded-lg shadow-md shadow-black">
                        <h1>Coupon1</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-[#EA1A20] w-[200px] h-[150px] rounded-lg shadow-md shadow-black">
                        <h1>Coupon2</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-[#EA1A20] w-[200px] h-[150px] rounded-lg shadow-md shadow-black">
                        <h1>Coupon3</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-[#EA1A20] w-[200px] h-[150px] rounded-lg shadow-md shadow-black">
                        <h1>Coupon4</h1>
                    </div>
                </div>
                

            </div>


        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600" > X </button>
        </div>
    </div>
    </>
  )
}

export default CouponPopUp