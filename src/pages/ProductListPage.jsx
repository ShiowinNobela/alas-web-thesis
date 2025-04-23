import DisplayPicture from '../components/images/bg-1.jpg'
import Product from '../components/images/product1.jpg'
import Cart from '../components/Cart.jsx'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function ProductPage() {

  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/api/products/')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])


  return (
    <>
  
    <section className="max-w-screen max-h-full h-screen bg-[url('./src/components/images/customer_bg2.png')] bg-cover bg-fixed bg-no-repeat  ">
    
   
      <div className='grid lg:grid-cols-4 grid-cols-2'>
        <div className='lg:col-span-3 col-span-2 mx-auto py-5'>
          <div className='flex flex-col items-center justify-center'>
            <img src={DisplayPicture} alt="/" className='lg:w-[1000px] lg:h-[200px] w-[350px] h-[200px] ' />
          </div>

          
            <div className='flex flex-col items-center justify-center mx-auto px-2 py-2 max-w-7xl'>
              <ul className='bg-[#EA1A2060] flex justify-between items-center lg:w-[1000px] w-[300px] px-4 rounded-lg font-black'>
                <li > Sauces </li>
                <li> Chili Oils </li>
                <li> Spices </li>
              </ul>
              
              
              <div className='grid lg:grid-cols-4 grid-cols-2 py-5 gap-3 cursor-pointer '>
              {data.map((d) => ( 
                <Link to={`/ProductDetailsPage/${d.id}`}>
                <div className='flex flex-col justify-center items-center lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] '>
                  <img src={Product} alt="/" className='lg:w-[250px] lg:h-[250px] w-[150px] h-[150px] pb-3'/>
                  <div className='flex flex-row justify-around gap-8'>
                  <p className='font-semibold'> {d.name} </p>
                  <p className='font-bold'> {d.price} </p>
                  </div>
                </div>
                </Link>
                 ))}
              </div>
             
            </div>
        </div>
        <Cart/>
               
      </div>
    </section>

    </>
  )
}

export default ProductPage