import Sidebar from "../../components/sidebar";
import { useState, useEffect } from "react";    
import axios from "axios";
import { useParams } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function ViewOrder() {
    const [detailsCart, setOrderDetails] = useState("");
    const [detailsUser, setUserDetails] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const { id } = useParams();
    const statusFlow = [
    "pending",
    "processing",
    "shipping",
    "delivered",
    "cancelled",
    "refunded"
    ];

    useEffect(() => {
        const fetchData = async () => {
        try {
            const user = JSON.parse(window.localStorage.getItem("user"));
            const orderResponse = await axios.get(`/api/adminOrder/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            });

            const orderData = orderResponse.data.data;
            setOrderDetails(orderData);
            setSelectedStatus(orderData.status);
            console.log("Order Data:", orderData);

            const userResponse = await axios.get(`/api/adminUser/${orderData.customer_id}`);
            const userData = userResponse.data.data;
            setUserDetails(userData);
            console.log("User Data:", userData);
        } catch (error) {
            console.error("Error during data fetching:", error);
        }
        };

        fetchData();
    }, [id]);

    const updateStatus = () => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        axios.patch(`/api/adminOrder/status-update/${id}`,
            {
                status: selectedStatus
            },
            {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )
        .then((response) => {
            setOrderDetails(response.data.data)
            toast.success('Order status updated successfully!');
        })
        .catch((err) =>{
            if (err.response && err.response.status === 400) {
            toast.error('Failed to update status: Bad Request');
        } else {
            toast.error('An unexpected error occurred');
        }
        console.error(err)
           })
    }

    const getNextStatuses = (currentStatus) => {
        const currentIndex = statusFlow.indexOf(currentStatus);
        if (currentIndex === -1) return [];
        let next = [];
        if (currentIndex + 1 < statusFlow.length) {
            next.push(statusFlow[currentIndex + 1]);
        }
        if (!["cancelled", "refunded"].includes(currentStatus)) {
            next.push("cancelled", "refunded");
        }
        return [...new Set(next)];
    };



  return (
    <>
        <div className="h-full w-screen ">
            <Toaster  richColors />
            <Sidebar/>
            <div className="h-screen w-screen bg-[#E2E0E1] pl-[256px] flex flex-col items-center  ">
                <h1 className='py-5 text-4xl font-semibold '>Order Details</h1>
                <div className="w-4xl bg-white p-5 rounded-lg shadow-md border-1">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-bold">Order # {detailsCart.id}  </h2>
                        <span className="text-gray-500">Status:  {detailsCart.status}</span>
                    </div>
                    <div className="mb-5">
                        <h1 className="text-2xl font-semibold pb-1.5">Customer Information</h1>
                        
                        <p class="me">Username: {detailsUser.username}</p>
                        <p class="me">Email: {detailsUser.email} </p>
                        <p class="me">Contact Number: {detailsUser.contact_number} </p>
                        <p class="me">Address: {detailsUser.address}</p>
                        <p class="me">Payment Method: {detailsCart.payment_method}</p>
                        <p class="me">Date: {detailsCart.order_date} </p>
                        <div className="flex justify-between">
                            <div>
                                <label> 
                                    Update Order Process:  
                                    <select name="Status" id="Status" className="ml-2 p-2 border rounded-md mb-5 w-[180px]"
                                    value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                                         {detailsCart.status && (
                                            <option value={detailsCart.status} disabled>
                                                {detailsCart.status} (current)
                                            </option>
                                        )}
                                        {getNextStatuses(detailsCart.status).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div>
                                <button className="ml-2 p-2 border rounded-md mb-5 cursor-pointer" onClick={() => updateStatus() }> Update Status</button>
                            </div>
                        </div>
                        

                        <hr />
                        <div>
                            <h1 className="text-2xl font-semibold pb-1.5">Order Items</h1>
                            <table className="w-full text-left border-collapse mb-5">

                                    <tr>
                                        <th className="border p-2">Product Id</th>
                                        <th className="border p-2">Quantity</th>
                                        <th className="border p-2">Unit Price</th>
                                        <th className="border p-2">Sub Price</th>
                                    </tr>


                                    {detailsCart.items && detailsCart.items.map((item) => (
                                        <tr>
                                            {console.log("Cart Item:", item)}
                                            <td className="border p-2">{item.product_id}</td>
                                            <td className="border p-2">{item.quantity}</td>
                                            <td className="border p-2">₱ {item.unit_price}</td>
                                            <td className="border p-2">₱ {item.subtotal}</td>
                                        </tr>
                                    ))}

                            </table>
                            <hr />
                            <div>
                                <h1 className="text-2xl font-semibold pt-5">Order Summary</h1>
                                <p className="me">Sub Total Amount: ₱ {detailsCart.total_amount}</p>
                                <p className="me">Discount Amount: ₱ {detailsCart.discount_amount}</p>
                                <p className="me">Final Amount: ₱ {detailsCart.total_amount}</p>
                            </div>
                        </div>
                    </div>     
                </div>       
            </div>
        </div>
    </>
  )
}

export default ViewOrder