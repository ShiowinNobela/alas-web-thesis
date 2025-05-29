import axios from "axios"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"


function UserViewOrderPage() {

    const [values , setValues] = useState([])

    useEffect (() => {
        const user = JSON.parse(window.localStorage.getItem("user"))
        axios.get(`/api/orders`,  {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }})
      .then((response) =>{
        setValues(response.data.data)
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [])


  return (
    <>
    <section className="bg-[url('./src/components/images/customer_bg2.png')] bg-cover bg-fixed bg-no-repeat max-w-screen max-h-full h-screen pt-5 ">
        <div className="max-w-6xl mx-auto px-3 py-3 border-black border-3 mt-[80px] bg-white">
            <h1 className='py-5 text-2xl font-semibold text-center '>Orders</h1>
            <div className="flex items-center justify-center">
                <table className="border-1 border-black w-5xl text-center">
                                  <tr>
                                    <th className="p-2.5 border-black border-1">Date</th>
                                    <th className="p-2.5 border-black border-1">Order ID</th>
                                    <th className="p-2.5 border-black border-1">Total Amount</th>
                                    <th className="p-2.5 border-black border-1">Status</th>
                                    <th className="p-2.5 border-black border-1">Leave Review</th>
                                  </tr>
                
                                 {values && values.map((d) => {
                                    return(
                                 
                                      <tr>
                                        <td className="p-2.5 border-black border-1"> {d.order_date} </td>
                                        <td className="p-2.5 border-black border-1"> {d.id}   </td>
                                        <td className="p-2.5 border-black border-1"> ₱ {d.total_amount} </td>
                                        <td className="p-2.5 border-black border-1"> {d.status} </td>
                                        <td className="p-2.5 border-black border-1" 
                                        >  
                                        
                                          <FaEdit className="mx-auto cursor-pointer w-[30px] h-[30px] " onClick={ () => {
                                            window.location.href = `/GiveReview` }
                                          } />
                                        </td>
                                      </tr>
                                ) })}   

                </table>
             </div>
        </div>
    </section>
    </>
  )
}

export default UserViewOrderPage