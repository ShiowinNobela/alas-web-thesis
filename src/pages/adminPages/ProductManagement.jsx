import { useEffect, useState } from 'react'
import NewSideBar from '../../components/newSideBar'
import ItemPic from '../../components/images/lp1.jpg'
import {Link} from 'react-router-dom'

import { PiMagnifyingGlassLight } from "react-icons/pi";
import { Card } from "flowbite-react";
import axios from 'axios'
import AdminProfile from '../../components/Chinges/AdminProfile';


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
      <div className='min-h-full w-100% ml-5 flex flex-col gap-5 overflow-auto'>
        <div className='w-full pt-3 pr-7 flex justify-end'>
              <AdminProfile />
            </div>
        <div className='w-full flex justify-between items-center'>
          <div className='h-10 w-70 bg-[#FAF9F6] pt-1 pl-3 rounded-2xl border-2 border-[#595959] flex justify-between'>
            <p>search</p>
          <PiMagnifyingGlassLight className=" mx-3 h-7 w-7" />{" "}
          </div>
            <div className='pr-4'>
            <Link to='/Admin/AddProduct'>
              <button className='p-2 text-l font-normal bg-[#144f17] text-white rounded border-1 border-black'>ADD PRODUCT</button>
            </Link>
            </div>
        </div>

        <div className='w-full pr-7 pl-3 pt-5 grid grid-cols-4 gap-5'>
          { data.map((d) => (
            <Card
              className="max-w-sm"
              imgAlt='Hello'
              imgSrc={ItemPic}
            >
              <h5 className="text-2xl font-bold tracking-tight text-white">
                CATCH23
              </h5>
              <div>
                <Link to={`/Admin/EditProduct/${d.id}`} >
                <div className='p-1 bg-[#d3723a] text-l font-medium mt-1 border-1 border-[#894a25] drop-shadow-sm drop-shadow-black/60 w-full h-[30px] rounded-2xl flex justify-center cursor-pointer' >
                  <p>Edit</p>
                </div>
              </Link> 
              </div>

            </Card>
          ))}

        </div>
      </div>
    </div>
    </>
  )
}

export default ProductManagement