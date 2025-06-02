import Sidebar from '../../components/sidebar.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Category } from '../constants.js'
import { useNavigate, useParams } from 'react-router-dom'
import AdminProfile from '../../components/Chinges/AdminProfile.jsx'
import NewSideBar from '../../components/newSideBar'
import BackButton from '../../components/Chinges/BackButton.jsx'
import BaseInput from '../../components/Chinges/baseInput.jsx'
import Description from '../../components/Chinges/Description.jsx'
import DropDown from '../../components/Chinges/DropDown.jsx'
import Upload from '../../components/Chinges/Upload.jsx'
import UploadButton from '../../components/Chinges/UploadButton.jsx'


function AddProduct() {
  const {id} = useParams();
  const [values, setValues] = useState({
    id: '',
    name: '',
    category: '', 
    stock_quantity: '',
    price: '',
    image: '',
    description: '',
    is_active: false
    })

  const Navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/products/' + id)
    .then(res => {
      setValues(res.data);
    })
    .catch(err => console.log(err))
  }, [])

  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   axios.put('/api/products/' + id, values)
  //   .then(res => {
  //     setValues({
  //       is_active: Boolean(res.data.is_active)
  //     })
  //     console.log(res);
  //     Navigate('/Admin/ProductManagement')
  //   })
  //   .catch(err =>console.log(err))
  // }


  const handleUpdate = (event) => {
  event.preventDefault();
  const submitValues = {
    ...values,
    is_active: Boolean(values.is_active) // force boolean
  };
  axios.put('/api/products/' + id, submitValues)
    .then(res => {
      setValues({
        ...values,
        is_active: Boolean(res.data.is_active)
      });
      console.log(res);
      Navigate('/Admin/ProductManagement');
    })
    .catch(err => console.log(err));
}

  return (
    <>
    <div className='h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]'>
      <NewSideBar/>
      <div className='min-h-full w-100% ml-5 flex flex-col gap-5 overflow-auto'>
        <div className='w-full pt-3 pr-7 flex justify-end'>
          <AdminProfile />
        </div>
        <div className='w-full flex justify-between items-center'>
          <BackButton/>
        </div>  
        <div className='w-full h-135 grid grid-cols-2 gap-7 pl-4 pr-8'>
          <div className='h-full bg-gray-800 rounded-2xl flex flex-col p-7 gap-3'>
            <BaseInput className='pb-5'/>
            <BaseInput/>
            <Description/>
              <div className='grid grid-cols-[0.6fr_0.4fr] gap-4'>
                <BaseInput/>
                <DropDown/>
              </div>
          </div>
          <div className='h-full bg-gray-800 rounded-2xl'>
            <div className='px-7 pt-8'><Upload/>
            </div>
            <div className="bg-gray-800 flex flex-col p-7 gap-3">
              <DropDown />
              <div className="w-full flex justify-between">
                <BaseInput/>
                <div className='mt-8'>
                  <UploadButton/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddProduct