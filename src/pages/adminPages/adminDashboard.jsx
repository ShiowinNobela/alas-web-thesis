import SideBar from '../../components/sidebar.jsx'
import {Link} from 'react-router-dom'
import { FcSalesPerformance } from "react-icons/fc";
import { useState, useEffect } from "react";
import axios from "axios";

function adminDashboard() {

    const [values, setValues] = useState([])


    useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios.get("/api/adminOrder", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }) 
    .then((response) => {
      setValues(response.data.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  return (
    <>
    <div className='h-screen max-w-screen overflow-hidden '>
    <SideBar/> 
        <div className='h-screen w-screen bg-[#E2E0E1] pl-[256px]'>
        <h1 className='text-3xl font-semibold px-5 py-5'>Dash Board</h1>
            <div className='flex flex-col items-center justify-around pt-3 '>
                <div className='grid grid-cols-3 2xl:gap-10 2xl:w-7xl w-4xl'>


                    <Link to='/Admin/Orders'>
                    {/* <div className='absolute ml-2.5 2xl:h-[250px] h-[200px] 2xl:w-[400px] w-[250px] bg-red-200 shadow-2xl rounded-2xl'>
                        <div className='flex mt-10 items-center justify-center'>
                            
                        </div>  
                    </div> */}
                        <div className='flex justify-center text-center border-1 2xl:h-[250px] h-[200px] 2xl:w-[400px] w-[250px] rounded-2xl bg-white'>
                            <div className='flex flex-col items-center justify-center'>
                                {/* <FcSalesPerformance className=' h-[500px] w-[500px]  ' /> */}
                                <p className='text-2xl px-2 py-5 font-semibold '>Pending Orders</p>
                                <h1 className='text-4xl px-2 py-5 font-bold '> {values.length} </h1>
                            </div>
                        </div>
                    </Link>


                    <Link to='/Admin/BazaarOrdering'>
                    <div className='flex flex-col 2xl:h-[250px] h-[200px] 2xl:w-[400px] w-[250px] bg-red-200 text-center border-2 border-[#000000]'>
                        <h1>Bazaar Ordering</h1>
                    </div>
                    </Link>
                    <Link to='/Admin/AddProduct'>
                        <div className='flex flex-col 2xl:h-[250px] h-[200px] 2xl:w-[400px] w-[250px] bg-red-200 text-center border-2 border-[#000000]'>
                            <h1>Add Product</h1>
                        </div>
                    </Link>

                </div>

                <div className='flex justify-center items-center h-[400px] w-[800px] bg-white mt-10 '>
                    <h1>For graphs! still looking.</h1>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default adminDashboard