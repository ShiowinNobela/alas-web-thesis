import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ConfirmPopUp from "../components/ConfirmPopUp";
import { useNavigate } from "react-router-dom";

function CheckOutPage() {

    const [getInfo,setGetInfo] = useState({
        payment_method: '',
        address: '',
        notes: '',
        reference_number: '',
        account_name: '',
    });

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(window.localStorage.getItem("user"));

    useEffect(() => {
        axios.get("/api/users", {
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


        axios.post("/api/orders", getInfo,
        {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        })
        .then((response) => {
            console.log("Order confirmed successfully:", response.data);    
            navigate("/ProductListPage")

        })
        .catch((error) => {
            console.error("Error confirming order:", error);
        });
    }


  return (
    <>
    <section className="bg-[url('./src/components/images/customer_bg2.png')] bg-cover bg-fixed bg-no-repeat h-screen ">
        <div className="max-w-3xl mx-auto pt-20">
            <div className='bg-white shadow-md rounded-lg p-6 mt-5'>
                <h1 className='text-center uppercase tracking-wide font-semibold mb-3  text-2xl '>Checkout</h1>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' >Name</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  placeholder='Your Name' required  
                        value={getInfo?.username}/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' >Email</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  placeholder='Your Email' required 
                        value={getInfo?.email}/>
                    </div>
                     <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' >Phone Number</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  placeholder='Your Name' required  
                        value={getInfo?.contact_number}/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' >Account Name</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  placeholder='Your Gcash Or Bank Account Name' required  
                        onChange={e => setGetInfo({...getInfo, account_name: e.target.value})}/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' >Address</label>
                        <textarea className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  placeholder='Your Address' required 
                        value={getInfo?.address}></textarea>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' >Note</label>
                        <textarea className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  placeholder='Order Notes' required 
                        onChange={e => setGetInfo({...getInfo, notes: e.target.value})}></textarea>
                    </div>

                    <div className="flex justify-between gap-5 mb-4">
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2' >Reference Number</label>
                            <input className='shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  placeholder='Reference Num' 
                            onChange={e => setGetInfo({...getInfo, reference_number: e.target.value})}/>
                        </div>
                        <div>
                        <label for="Payment Method" className="block text-gray-700 text-sm font-bold mb-2"> Payment Method </label>
                            <select name="Payment Method" id="Payment Method" className='border-1 border-[#888686] bg-[#F9F7F7] py-1.5 w-40' 
                            value={getInfo?.payment_method}
                            onChange={(e) => setGetInfo({...getInfo, payment_method: e.target.value})}>
                                <option value=""></option>
                                <option value="Gcash">Gcash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </select>
                        </div>
                    </div>
                    
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    // onClick={() => {
                    //         setOpen(true);
                    //     }}
                    onClick={handleConfirmOrder}
 
                    >Checkout!</button>

                    <ConfirmPopUp open={open} onClose={() => setOpen(false)}>
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Confirm Your Order</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to proceed with the order?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={handleConfirmOrder} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Yes, Confirm</button>
                            <button  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">Cancel</button>
                        </div>
                    </div>    
                    </ConfirmPopUp>

            </div>

        </div>
    </section>
    </>
  )
}

export default CheckOutPage