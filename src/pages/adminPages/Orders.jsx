import Sidebar from "../../components/sidebar.jsx"
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Orders() {

  const [values, setValues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios.get("/api/adminOrder", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }) 
    .then((response) => {
      setValues(response.data.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }, []);

  const filteredOrders = statusFilter === "All"
    ? values
    : values.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());

  return (
    <>
    <div className="h-screen max-h-full w-screen ">
        <Sidebar/>
        <div className="h-full w-screen bg-[#E2E0E1] pl-[256px] flex flex-col items-center">
            <h1 className='py-5 text-4xl font-semibold '>Orders</h1>
            <div className="2xl:w-7xl w-5xl">
              <ul className="flex justify-between py-5">
                <li > 
                  <button className={`text-center px-10 py-3 rounded-2xl font-semibold 
                    ${statusFilter === "All" ? "bg-amber-800 text-white" : "bg-orange-300"} 
                    hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500`}
                  onClick={() => setStatusFilter("All")}>
                    All
                  </button>
                </li>
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500"
                  onClick={() => setStatusFilter("pending")}>
                    Pending
                  </button>
                </li>
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500"
                  onClick={() => setStatusFilter("shipping")}>
                    Shipping
                  </button>
                </li>
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500"
                  onClick={() => setStatusFilter("delivered")}>
                    Delivered
                  </button>
                </li>
                <li > 
                  <button className="text-center px-10 py-3 rounded-2xl font-semibold bg-orange-300 hover:bg-orange-400 focus:outline-2 focus:outline-offset-2 focus:outline-red-400 active:bg-red-500">
                    Cancelled
                  </button>
                </li>
                <li>
                  <input className="p-3 border-1 border-black rounded-2xl text-center" type="text" name="Search" id="Search"  placeholder="Search!"/>
                </li>
              </ul>


              <div className="flex justify-center items-center pt-10">
                <table className="border-1 border-black w-7xl text-center">
                  <tr>
                    <th className="p-2.5 border-black border-1">Date</th>
                    <th className="p-2.5 border-black border-1">Order ID</th>
                    <th className="p-2.5 border-black border-1">Total Amount</th>
                    <th className="p-2.5 border-black border-1">Status</th>
                    <th className="p-2.5 border-black border-1">View</th>
                  </tr>

                  {filteredOrders && filteredOrders.map((d) => {
                    return (
                      <tr>
                        <td className="p-2.5 border-black border-1">{d.order_date}  </td>
                        <td className="p-2.5 border-black border-1">  {d.id} </td>
                        <td className="p-2.5 border-black border-1"> ₱{d.total_amount} </td> 
                        <td className="p-2.5 border-black border-1"> {d.status} </td>
                        <td className="p-2.5 border-black border-1" onClick={ () => {
                          navigate(`/admin/viewOrder/${d.id}`) }
                        }> 
                          <FaEdit className="mx-auto cursor-pointer w-[30px] h-[30px] " />
                        </td>
                      </tr>
                    )
                  })}
                </table>
              </div>
              

             

            </div>
        </div>
    </div>
    

    </>
  )
}

export default Orders