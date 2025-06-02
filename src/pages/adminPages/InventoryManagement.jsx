import NewSideBar from '../../components/newSideBar'
import { AiFillAlert } from "react-icons/ai";
import axios from 'axios';
import { useState, useEffect } from 'react';

function InventoryManagement() {

    const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/products')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <>
    <div className='h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]'>
    <NewSideBar/>

        <section class="bg-gray-50  py-3 sm:py-5">
            <div class="px-4 mx-auto max-w-screen-2xl lg:px-12">
            <div class="relative overflow-hidden bg-white shadow-xl sm:rounded-lg">
                <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                    <div class="flex items-center flex-1 space-x-4">
                        <h5>
                            <span class="text-gray-500">All Products:</span>
                            <span class="text-gray-500"> 123456</span>
                        </h5>
                        <h5>
                            <span class="text-gray-500">Total sales:</span>
                            <span class="text-gray-500"> $88.4k</span>
                        </h5>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" class="px-4 py-3">Product</th>
                                <th scope="col" class="px-4 py-3">Category</th>
                                <th scope="col" class="px-4 py-3">Stock</th>
                                <th scope="col" class="px-4 py-3">Sales/Week</th>
                                <th scope="col" class="px-4 py-3">Sales/Month</th>
                                <th scope="col" class="px-4 py-3">Rating</th>
                                <th scope="col" class="px-4 py-3">Sales</th>
                                <th scope="col" class="px-4 py-3">Revenue</th>
                                <th scope="col" class="px-4 py-3">Last Update</th>
                            </tr>
                        </thead>

                        {data.map((d) => {
                            return (
                            <tr class="border-b  hover:bg-gray-100 ">
                                <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    {d.name}
                                </th>
                                <td class="px-4 py-2">
                                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded  ">{d.category}</span>
                                </td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    <div class="flex items-center">
                                        <div class="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                                        {d.stock_quantity}
                                    </div>
                                </td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">1.47</td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">0.47</td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                </td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                    <div class="flex items-center">
                                        1.6M
                                    </div>
                                </td>
                                <td class="px-4 py-2">$3.2M</td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">Just now</td>
                            </tr>
                            

                    ) })}
                    </table>
                </div>
            </div>
            </div>
        </section>

    </div>
    </>
  )
}

export default InventoryManagement