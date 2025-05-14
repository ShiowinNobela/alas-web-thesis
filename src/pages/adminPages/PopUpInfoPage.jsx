import examapleDB from  './records.json'
import { Status } from '../constants.js'

function PopUpInfoPage({open,onClose, id}) {
    console.log(id)

    let data = examapleDB.find(e => e.id === id) 
    console.log(data)


    if (data == null ) {
        data = 
        {
        "id": 0,
        "name": "",
        "order": "",
        "refNumber": 0,
        "date": "",
        "status": ""
        }
    } 

  return (
   <>
   <div onClick={onClose} className={open? " fixed flex items-center justify-center inset-0 transition-colors bg-black/20 " : "hidden"}>
        <div onClick={e => e.stopPropagation()} className={open?"flex flex-col w-3xl shadow-2xl bg-white p-10 space-y-3 transition-all scale-100 opacity-100" : "scale-125 opacity-0"}> 
            <div className="flex justify-center text-3xl font-semibold"> <span>Order Information</span></div>
            <p>Username: {data.name} </p> 
            <p>Email: {} </p>
            <p>Order: {data.order}</p>
            <p>Adress: {data.address}</p>
            <p>Ref Num#: {data.refNumber}</p>
            <div className="flex flex-row">
                <label for="Status">Status:</label>
                <select name="Status" id="Status" className='ml-5'>
                    { Status.map( e => { return ( 
                        <option value={e} selected={e === data.status} >{e}</option>
                    )})
                    }
                </select>
            </div>
            <button className="px-10 py-5 bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500 mx-auto text-xl rounded-4xl cursor-pointer">Save</button>
            <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600" > X </button>
        </div>
    </div>
   </>
  )
}

export default PopUpInfoPage