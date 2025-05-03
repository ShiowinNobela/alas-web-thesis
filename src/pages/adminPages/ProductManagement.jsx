import { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar.jsx'
import {Link} from 'react-router-dom'
import axios from 'axios'


function ProductManagement() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/products/')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <>
    <div className='h-full w-screen overflow-y-auto'>
    <Sidebar/>
      <div className='h-full w-screen bg-[#E2E0E1] pl-[256px] flex'>
        <div className='flex flex-row'>
          <h1 className='pl-10 pt-5 text-xl font-semibold '>Product Management</h1>
          <Link to='/AddProduct'>
          <button className=' fixed top-0 right-0 mr-15 mt-5 p-5 text-xl font-semibold bg-[#357a38] text-white rounded-3xl border-2 border-black '>Add Product</button>
          </Link>
        </div>
        <div className='grid grid-cols-3 mt-10 w-6xl gap-x-10 '>
          
          { data.map((d) => (
            <div className='flex flex-col items-center justify-center mb-10'>
              <img className='w-[300px] h-[300px] shadow-2xl border-b border-2'  />
              <h1 className='pt-2'>{d.name}</h1>
              <Link to={`/Admin/EditProduct/${d.id}`} >
                <div className='p-1 bg-[#FFB95D] rounded-2xl text-xl font-semibold mt-3 w-[90px] h-[40px] text-center cursor-pointer ' >
                  <p>Edit</p>
                </div>
              </Link>
            </div>
          ))}

        </div>
      </div>
    </div>
    </>
  )
}

export default ProductManagement