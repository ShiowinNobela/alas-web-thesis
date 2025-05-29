import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom";

function UserViewOrderDetails() {

    const [values, setValues] = useState([])
    const {id} = useParams();


    useEffect (() => {
        const user = JSON.parse(window.localStorage.getItem("user"));
            axios.get(`/api/orders/status-history/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }})
            .then((response) =>{
            setValues(response.data)
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
        }, [])
  


  return (
    <section className="bg-[#E2E0E1] max-w-screen max-h-full h-screen pt-5  ">
        <div className="flex justify-center mt-20">
            <div className="w-4xl bg-white p-5 rounded-lg shadow-md border-1">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-bold">Order # {values.order_id}  </h2>
                        <span className="text-gray-500">Status: {values.status} </span>
                    </div>
                    <div className="mb-5">
                        <h1 className="text-2xl font-semibold pb-1.5">Customer Information</h1>
                        
                        <p class="me">Contact Number: {} </p>
                        <p class="me">Address: </p>
                        <p class="me">Payment Method: </p>
                        <p class="me">Date:  </p>
                    </div>    
            </div>        
        </div>
    </section>    
  )
}

export default UserViewOrderDetails