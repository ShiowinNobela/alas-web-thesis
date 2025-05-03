import Sidebar from "../../components/sidebar.jsx"
import PopUpInfoPage from "./PopUpInfoPage";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import exampleDb from './records.json'

function Sales() {

  const [Open, setOpen] = useState(false)
  
  const [id, setId] = useState("")
  return (
    <>
    <div className="h-screen w-screen ">
        <Sidebar/>
        <div className="h-screen w-screen bg-[#E2E0E1] pl-[256px] flex flex-col items-center">
            <h1 className='py-5 text-4xl font-semibold '>Sales</h1>
            <div className="w-7xl">
              <ul className="flex justify-between py-5">
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500">
                    All
                  </button>
                </li>
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500">
                    Pending
                  </button>
                </li>
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500">
                    Delivering
                  </button>
                </li>
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500">
                    Delivered
                  </button>
                </li>
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500">
                    Cancelled
                  </button>
                </li>
                <li>
                  <input className="p-3 border-1 border-black rounded-2xl" type="text" name="Search" id="Search"  placeholder="Search!"/>
                </li>
              </ul>


              <div className="flex justify-center items-center pt-10">
                <table className="border-1 border-black w-7xl">
                  <tr>
                    <th className="p-2.5 border-black border-1">Name</th>
                    <th className="p-2.5 border-black border-1">Order</th>
                    <th className="p-2.5 border-black border-1">Address</th>
                    <th className="p-2.5 border-black border-1">Ref Num#</th>
                    <th className="p-2.5 border-black border-1">Date</th>
                    <th className="p-2.5 border-black border-1">Status</th>
                    <th className="p-2.5 border-black border-1">  Edit</th>
                  </tr>
                  { exampleDb.map( d => { return (
                  <tr >
                    <td className="p-2.5 border-black border-1"> {d.name} </td>
                    <td className="p-2.5 border-black border-1"> {d.order} </td>
                    <td className="p-2.5 border-black border-1"> {d.address} </td>
                    <td className="p-2.5 border-black border-1"> {d.refNumber} </td>
                    <td className="p-2.5 border-black border-1"> {d.date} </td>
                    <td className="p-2.5 border-black border-1"> {d.status} </td>
                    <td className="p-2.5 border-black border-1"><FaEdit className="mx-auto cursor-pointer w-[30px] h-[30px] " onClick={() => 
                      { 
                        setOpen(true) 
                        setId(d.id)
                      }}/></td>
                  </tr>
                  )})}
                </table>
              </div>
              

              <PopUpInfoPage open={Open} id={id} onClose={() => setOpen(false)}> </PopUpInfoPage>

            </div>
        </div>
    </div>
    

    </>
  )
}

export default Sales