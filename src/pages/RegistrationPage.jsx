import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function RegistrationPage() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  })

  const Navigate = useNavigate();

  const handleCreatUser = (event) => {
    event.preventDefault();
    axios.post('/api/users/register/', values)
    .then(res => {
      console.log(res)
      Navigate('/LoginPage')
    })
  }

  return (
    <>
    
  <section className="min-h-screen flex items-center justify-center bg-[url('./src/components/images/bg-1.jpg')] bg-center bg-no-repeat" >
  <div className='flex h-[700px] w-[400px] flex-col items-center justify-center text-center p-10  rounded-2xl max-md:hidden' >
        <h1 className='font-semibold text-7xl text-white'>Spice up your life with <h1 className=' text-[#EA1A20] font-black'> Flavorful </h1>and <h1 className=' text-[#EA1A20] font-black'> Savory Spices</h1></h1>
    </div>
    <div className='w-[650px] max-md:hidden'></div>

    <div className='flex text-white '>
      
        <div className='flex flex-col items-center justify-center text-center p-5 gap-7  rounded-2xl'>
          <h1 className='text-2xl font-bold'>Registration</h1>
          <div className='flex flex-col text-lg text-left gap-1'>
            <span>Email</span>
            <input type="text" className='rounded-md p-1 border-1 outline-none focus:border-black focus:bg-slate-100 focus:text-black text-white' 
            onChange={e => setValues({...values, email: e.target.value})} />
            <span>Username</span>
            <input type="text" className='rounded-md p-1 border-1 outline-none focus:border-black focus:bg-slate-100 focus:text-black text-white' 
            onChange={e => setValues({...values, username: e.target.value})} />
          <div className='flex flex-col text-lg text-left gap-1'>
            <span>Password</span>
            <input type="text" className='rounded-md p-1 border-1 outline-none focus:border-black focus:bg-slate-100 focus:text-black text-white' 
            onChange={e => setValues({...values, password: e.target.value})}/>
            <span>Confirm Password</span>
            <input type="text" className='rounded-md p-1 border-1 outline-none focus:border-black focus:bg-slate-100 focus:text-black text-white' />
          </div>
          </div>
          <Link to="/LoginPage">
          <button className='text-white px-10 py-2 text-lg rounded-md bg-gradient-to-tr from-red-600 to-yellow-400 cursor-pointer' onClick={handleCreatUser}>Register!</button>
          </Link>
          <Link to="/LoginPage">
          <p className='text-sm'>Got Account Already? <a href="#" className='border-b cursor-pointer'> Login Your Account Now!</a></p>
          </Link>
        </div>
    </div>
  </section>
    </>
  )
}

export default RegistrationPage