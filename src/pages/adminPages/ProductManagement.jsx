import { useEffect, useState } from 'react'
import NewSideBar from '../../components/newSideBar'
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
    <div className='h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]'>
    <NewSideBar/>
      <div className='min-h-full w-100% ml-5 flex flex-col gap-5'>
        <div className='w-full flex '>
          <div >
            <p>admin</p>
          </div>
        </div>
        <div className='w-full flex justify-between'>
          <p>search</p>
            <Link to='/Admin/AddProduct'>
            <button className='mr-10 mt-10 p-4 text-xl font-semibold bg-[#144f17] text-white rounded-2xl border-1 border-black'>Add Product</button>
            </Link>
            
        </div>
        <div className='w-full grid grid-cols-4 gap-5'>
          { data.map((d) => (
            <div className='flex flex-col items-center justify-center mb-10'>
              <img className='2xl:w-[300px] lg:h-[300px] w-[250px] h-[200px] shadow-2xl border-b border-2'  />
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