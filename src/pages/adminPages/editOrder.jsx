import axios from "axios"
import { CiCirclePlus, CiTrash } from "react-icons/ci";
import { useState, useEffect } from "react"

function editOrder({open,onClose}) {

    const [data, setData] = useState([])
  useEffect(() => {
    axios.get('api/products/')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])
  return (
    <>
        <div onClick={onClose} className={open? " fixed flex items-center justify-center inset-0 transition-colors bg-black/20 " : "hidden"}>
                <div onClick={e => e.stopPropagation()} className={open?"flex flex-col max-h-3xl w-4xl shadow-2xl bg-white p-10 space-y-3 transition-all scale-100 opacity-100 overflow-auto" : "scale-125 opacity-0"}> 
                    <div className="flex justify-center text-3xl font-semibold"> <span>Item list</span></div>
                    <div className="grid grid-cols-3 overflow-auto">
                        { data.map((d) => (
                            <div className="flex flex-row mx-auto gap-x-3">
                                <div className='flex flex-col items-center justify-center mb-10'>
                                    <img className='w-[100px] h-[100px] shadow-2xl border-b border-2'  />
                                    <h1 className='pt-2'>{d.name}</h1>
                                    <input type="number" className="w-15 border-2 border-black" min="0" max={d.stock_quantity}/>
                                </div>
                                <div className="flex flex-col  justify-center gap-y-10">
                                    <CiCirclePlus  className="w-[40px] h-[40px]  "/>
                                    <CiTrash  className="w-[40px] h-[40px] " />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="px-10 py-5 bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500 mx-auto text-xl rounded-4xl cursor-pointer">Save</button>
                    <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600" > X </button>
                </div>
        </div>
    </>
  )
}

export default editOrder