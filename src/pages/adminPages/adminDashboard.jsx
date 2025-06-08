import { useState, useEffect } from "react";
import axios from "axios";
import NewSideBar from '../../components/newSideBar'
import AdminProfile from '../../components/Chinges/AdminProfile';
import dayjs from "dayjs";
import { FaExchangeAlt } from "react-icons/fa";

function adminDashboard() {
  const [values, setValues] = useState([]);
  const [orderRange, setOrderRange] = useState(7); // 7 or 30
  const [salesRange, setSalesRange] = useState(7);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .get("/api/adminOrder", {
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

    const ordersWithinRange = values.filter(order => {
    const orderDate = dayjs(order.order_date);
    const rangeAgo = dayjs().subtract(orderRange, 'day');
    return orderDate.isAfter(rangeAgo);
  });

    const salesWithinRange = values.filter(order => {
    const orderDate = dayjs(order.order_date);
    const rangeAgo = dayjs().subtract(salesRange, 'day');
    return orderDate.isAfter(rangeAgo) && order.status === "delivered";
  });

  const totalSalesAmount = salesWithinRange
  .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

  const orderRangeText = orderRange === 7 ? " (Last 7 Days)" : " (Last 30 Days)";
  const salesRangeText = salesRange === 7 ? " (Last 7 Days)" : " (Last 30 Days)";

  const deliveredNotifications = values
  .filter(order => order.status === "pending")
  .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
  .slice(0, 4);


  //table
  const tableHeadStyle = "px-6 py-3 text-center";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-orange-200 text-orange-800";
    case "processing":
      return "bg-yellow-200 text-yellow-800";
    case "shipping":
      return "bg-green-200 text-green-800";
    case "delivered":
      return "bg-blue-200 text-blue-800";
    case "returned":
      return "bg-pink-200 text-pink-800";
    case "refunded":
      return "bg-violet-200 text-violet-800";
    case "cancelled":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

const sortedOrders = [...values].sort((a, b) => {
  if (sortConfig.key === "date") {
    const dateA = new Date(a.order_date);
    const dateB = new Date(b.order_date);
    return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
  } else if (sortConfig.key === "total") {
    return sortConfig.direction === "asc"
      ? a.total_amount - b.total_amount
      : b.total_amount - a.total_amount;
  }
  return 0;
});

const handleSort = (key) => {
  let direction = "asc";
  if (sortConfig.key === key && sortConfig.direction === "asc") {
    direction = "desc";
  }
  setSortConfig({ key, direction });
};
  return (
    <>
    <div className='h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]'>
      <NewSideBar/>
      <div className='min-h-full w-100% ml-5 flex flex-col gap-5 overflow-auto'>
        <div className='w-full pt-3 pr-7 flex justify-end'>
          <AdminProfile />
        </div>

        <div className="flex flex-row gap-x-5">

          <div class="w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end mb-5">
              <FaExchangeAlt className="w-7 h-7"
              onClick={() => setOrderRange(orderRange === 7 ? 30 : 7)}/>
            </div>
            
              <a href="#">
                  <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"> {ordersWithinRange.length}  orders</h5>
              </a>
              <p class="mb-10 font-semibold text-md text-gray-700 dark:text-gray-400 "> Total Orders {orderRangeText} </p>
              <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Go to Orders
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
          </div> 

          <div class="w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end mb-5">
              <FaExchangeAlt className="w-7 h-7"
              onClick={() => setSalesRange(salesRange === 7 ? 30 : 7)}/>
            </div>
            
              <a href="#">
                  <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"> ₱ {totalSalesAmount.toLocaleString()} </h5>
              </a>
              <p class="mb-10 font-semibold text-md text-gray-700 dark:text-gray-400 "> Total Sales{salesRangeText} </p>
              <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Go to Sales
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
          </div>    

          <div className="w-4xl p-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 mr-5">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"> Notifications</h5>
            </a>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliveredNotifications.length === 0 ? (
                <div className="text-gray-500 text-sm col-span-2">No pending orders yet.</div>
              ) : (
                deliveredNotifications.map((order) => (
                  <div
                    key={order.id}
                    className="bg-blue-50 border border-blue-200 rounded-lg shadow p-2 flex flex-col"
                  >
                    <div className="font-semibold text-blue-800 mb-1 text-sm">
                      {order.username}’s order <span className="font-bold">#{order.id}</span>
                    </div>
                    <div className="text-red-600 font-semibold mb-1">Pending</div>
                    <div className="text-xs text-gray-500">
                      {dayjs(order.order_date).format("MMM D, YYYY h:mm A")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div> 
        
        </div>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-100% mr-5">

            <table className="w-full text-sm text-left text-slate-800">
              <thead className="sticky top-0 text-xs uppercase bg-admin text-white">
                <tr>
                  <th className={tableHeadStyle}>User Info</th>
                  <th className={tableHeadStyle}>Order ID</th>
                  <th className={tableHeadStyle}>Items</th>
                  <th className={tableHeadStyle}>
                    <div
                      className="flex items-center cursor-pointer hover:underline"
                      onClick={() => handleSort("date")}
                    >
                      Date
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {sortConfig.key === "date" &&
                        sortConfig.direction === "asc" ? (
                          <path d="M7 14l5-5 5 5H7z" />
                        ) : (
                          <path d="M7 10l5 5 5-5H7z" />
                        )}
                      </svg>
                    </div>
                  </th>
                  <th className={tableHeadStyle}>
                    <div
                      className="flex items-center cursor-pointer hover:underline"
                      onClick={() => handleSort("total")}
                    >
                      Total
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {sortConfig.key === "total" &&
                        sortConfig.direction === "asc" ? (
                          <path d="M7 14l5-5 5 5H7z" />
                        ) : (
                          <path d="M7 10l5 5 5-5H7z" />
                        )}
                      </svg>
                    </div>
                  </th>
                  <th className="px-2 py-3 text-center">
                    <div className="leading-tight">
                      Payment
                      <br />
                      Method
                    </div>
                  </th>
                  <th className={tableHeadStyle}>Status</th>
                </tr>
              </thead>

              <tbody>
                {sortedOrders.slice(0,5).map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 ">
                    <td className="px-6 py-4 text-xs text-gray-700 bg-gray-50">
                      <div>
                        <p className="font-primary">{order.username}</p>
                        <p className="text-gray-500 text-xs">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 bg-gray-100">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 min-w-[190px] bg-gray-50">
                      <ul className="list-disc list-inside break-words">
                        {order.items.map((item) => (
                          <li key={item.item_id}>
                            {item.product_name} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 bg-gray-100">
                      <div className="text-sm font-medium text-gray-800">
                        {new Date(order.order_date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.order_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 bg-gray-50">
                      ₱ {parseFloat(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 capitalize bg-gray-100">
                      {order.payment_method}
                    </td>
                    <td className="px-6 py-4 bg-gray-50">
                      <div className="flex justify-center items-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

      </div>
    </div>
    </>
  );
}

export default adminDashboard;
