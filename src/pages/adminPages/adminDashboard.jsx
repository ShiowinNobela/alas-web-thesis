import SideBar from '../../components/sidebar.jsx'
import {Link} from 'react-router-dom'
import { FcSalesPerformance } from "react-icons/fc";

function adminDashboard() {
  return (
    <>
    <div className='h-screen max-w-screen overflow-hidden '>
    <SideBar/> 
        <div className='h-screen w-screen bg-[#E2E0E1] pl-[256px]'>
        <h1 className='text-3xl font-semibold px-5 py-5'>Dash Board</h1>
            <div className='flex flex-col items-center justify-around pt-3'>
                <div className='grid grid-cols-3 gap-10'>


                    <Link to='/Admin/Sales'>
                    <div className='absolute ml-2.5 h-[200px] w-[200px] bg-red-200 shadow-2xl rounded-2xl'>
                        <div className='flex mt-10 items-center justify-center'>
                            <FcSalesPerformance className=' h-[100px] w-[100px]  ' />
                        </div>  
                    </div>
                        <div className='flex justify-end text-center border-1 h-[180px] w-[400px] mt-15 rounded-2xl bg-white'>
                            <div className='flex flex-col '>
                                <p className='text-2xl px-2 py-5 font-semibold '>Pending Orders</p>
                                <h1 className='text-4xl px-2 py-5 font-bold '>3</h1>
                            </div>
                        </div>
                    </Link>


                    <Link to='/Admin/BazaarOrdering'>
                    <div className='flex flex-col h-[250px] w-[400px] bg-red-200 text-center border-2 border-[#000000]'>
                        <h1>Bazaar Ordering</h1>
                    </div>
                    </Link>
                    <Link to='/Admin/AddProduct'>
                        <div className='flex flex-col h-[250px] w-[400px] bg-red-200 text-center border-2 border-[#000000]'>
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