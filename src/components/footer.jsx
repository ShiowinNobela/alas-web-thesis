import redDiamond from '../components/images/reddiamond.png'
import Logo from '../components/images/logowhite.png'
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function footer() {
  return (
    <>
        <div className='max-w-screen flex justify-center items-center '>
            <img className=' grid grid-cols-1  h-[100px] w-7xl' src={redDiamond} alt="/"  />
        </div>
        <div className='max-w-screen flex justify-around items-center mb-10'>
        <img src={Logo} alt="/" className='flex justify-start lg:h-[150px] lg:w-[300px] h-[100px] w-[150px] cursor-pointer ' />
                <ul className='lg:flex justify-end max-w-[600px] gap-4 text-center '> 
                    <li className='text-[#FFFFFF] lg:text-xl lg:mb-0 mb-4 text-sm cursor-pointer'> Products </li>
                    <li className='text-[#FFFFFF] lg:text-xl lg:mb-0 mb-4 text-sm cursor-pointer'> About Us </li>
                    <li className='text-[#FFFFFF] lg:text-xl lg:mb-0 mb-2 text-sm cursor-pointer'> Contact Us </li>
                </ul>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <ul className='grid grid-cols-4  max-w-3xl mx-auto py-3 gap-5'>
            <li> <FaFacebook color='white ' className='cursor-pointer'/> </li> 
            <li> <FaInstagram color='white' className='cursor-pointer'/> </li> 
            <li> <FaTiktok color='white' className='cursor-pointer' /> </li> 
            <li> <MdEmail color='white' className='cursor-pointer'/> </li> 
            </ul>
            <p className='text-[#ffffff] mb-2'>2025 Alas Deli’s and Spices. All rights reserved.</p>
            <ul className='grid grid-cols-2'>
                <li className='text-[#ffffff] cursor-pointer'>Privacy</li>
                <li className='text-[#ffffff] cursor-pointer'>Cookie Policy</li>
            </ul>
        </div>
        

    </>
  )
}

export default footer