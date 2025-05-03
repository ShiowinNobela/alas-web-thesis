import Sidebar from '../../components/sidebar.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Category } from '../constants.js'
import { useNavigate, useParams } from 'react-router-dom'


function AddProduct() {
  const {id} = useParams();
  const [values, setValues] = useState({
    id: '',
    name: '',
    category: '', 
    stock_quantity: '',
    price: '',
    image: '',
    description: ''
    })

  const Navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/products/' + id)
    .then(res => {
      setValues(res.data);
    })
    .catch(err => console.log(err))
  }, [])

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('/api/products/' + id, values)
    .then(res => {
      console.log(res);
      Navigate('/Admin/ProductManagement')
    })
    .catch(err =>console.log(err))
  }

  return (
    <>
    <div className='w-screen h-screen'>
      <Sidebar/>
      <div className='flex flex-col items-center  h-screen w-screen bg-[#D9D9D9] pl-[256px]'>
      
        <h1 className='text-3xl font-bold mx-auto my-5 '>Edit Product</h1>
        <form onSubmit={handleUpdate}>
        <div className='flex flex-row items-center justify-center shadow-2xl w-6xl p-5 bg-[#FFFFFF] gap-5 rounded-4xl'>
            
          
            <div className='flex flex-col bg-[#D9D9D9] p-10 w-xl gap-5 rounded-2xl'>
              
              <h1 className='font-bold text-xl'>Product ID: </h1>
              <input type="text" className='border-1 border-[#888686] bg-[#F9F7F7] py-1.5' value={values.id} onChange={e => setValues({...values, id: e.target.value})} />
              <h1 className='font-bold text-xl'>Name Of The Product</h1>
              <input type="text" className='border-1 border-[#888686] bg-[#F9F7F7] py-1.5' value={values.name} onChange={e => setValues({...values, name: e.target.value})}/>
                <label for="category" className='font-bold text-xl '> Category </label>
                  <select name="category" id="category" className='border-1 border-[#888686] bg-[#F9F7F7] py-1.5'>
                    { Category.map( e => { return ( 
                      <option value={e} selected={e === values.category} >{e}</option>
                      )})
                    }
                  </select>
                <h1 className='font-bold text-xl'>Product Description</h1>
                <textarea className='border-1 border-[#888686] bg-[#F9F7F7] ' name="ProductDescription" id="ProductDescription" cols="20" rows="5" placeholder=' Enter the product description' value={values.description} onChange={e => setValues({...values, description: e.target.value})}></textarea>
                <div className='flex flex-row gap-2'>
                    <div className='flex flex-col w-2xl'>
                      <h1 className='font-bold text-xl'>Pricing</h1>
                      <input type="number" className='border-1 border-[#888686] bg-[#F9F7F7] py-1.5' value={values.price} onChange={e => setValues({...values, price: e.target.value})}/>
                    </div>
                    <div className='flex flex-col'>
                      <h1 className='font-bold text-xl'>Discount</h1>
                      <input type="number" className='border-1 border-[#888686] bg-[#F9F7F7] py-1.5'/>
                    </div>
                </div>
                <div className='flex flex-row justify-end gap-5 mt-10'>
                  <div className='bg-[#FFAE67] p-3 rounded-xl font-medium'>
                      <h1>Archive Product</h1>
                  </div>
                  <button>
                  <div className='bg-[#E9484B] p-3 rounded-xl font-medium'>
                      <h1>Save Changes</h1>
                  </div>
                  </button>
                </div>
            </div>
            <div className='flex flex-col bg-[#D9D9D9] p-10 w-sm gap-5 rounded-2xl'>
              <h1 className='font-bold text-xl'>Product Photo</h1>
              <div className='flex justify-center items-center h-[250px] w-[300px] rounded-2xl border-2 border-black cursor-pointer'>
                <h1 className='font-bold text-xl'> Click to Upload an image </h1>
              </div>
              <label for="Variant" className='font-bold text-xl '> Variant </label>
                <select name="Variant" id="Variant" className='border-1 border-[#888686] bg-[#F9F7F7] py-1.5'>
                  <option value="/">Placeholder</option>
                  <option value="Chili Oils">Placeholder</option>
                  <option value="Placeholder">Placeholder</option>
                </select>
              <h1 className='font-bold text-xl'>Pieces</h1>
              <input type="number" className='border-1 border-[#888686] bg-[#F9F7F7] py-1.5' value={values.stock_quantity} onChange={e => setValues({...values, stock_quantity: e.target.value})} />
            </div> 
        </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddProduct