import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import OrderHistoryModal from "../components/modals/orderHistoryModal";
import StatusFilterDropdown from "../components/StatusFilterDropdown";
import UserSideBar from "./UserSideBar";

function UserViewOrderPage() {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterStatus, setFilterStatus] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelNote, setCancelNote] = useState("");
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const initialTab = location.state?.tab || "orderList";
  const [activeSwitch, setActiveSwitch] = useState(initialTab);
  const [notifications, setNotifications] = useState([]); //notif

  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = (status = "") => {
      const url = status ? `/api/orders?status=${status}` : `/api/orders`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          const orders = response.data.data;
          setOrders(orders);

          const delivered = orders.filter(
          (order) => order.status === "delivered"
        );
        setNotifications(
          delivered.map((order) => ({
            id: order.id,
            message: `Your order ${order.id} has been delivered!`,
            date: order.order_date,
          }))
        );

        const total = orders.reduce(
          (sum, order) => sum + parseFloat(order.total_amount),
          0
        );
        setTotalAmount(total);
      })
      .catch((err) => console.error(err));
  };
  fetchOrders(filterStatus);
}, [filterStatus, user.token]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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

  const sortedOrders = [...orders].sort((a, b) => {
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

  const cancelOrder = (orderId, note) => {
    axios
      .put(
        `/api/orders/cancel/${orderId}`,
        { notes: note },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, cancel_requested: 1 } : order
          )
        );
        setShowCancelModal(false);
        setCancelNote("");
        setCancelingOrderId(null);
      })
      .catch((err) => {
        console.error("Cancel failed:", err);
        alert("Failed to cancel order.");
      });
  };

  const fetchOrderHistory = (orderId) => {
    axios
      .get(`/api/orders/status-history/${orderId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setHistoryData(res.data);
        setShowHistoryModal(true);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch order history:", err);
        alert("Failed to fetch order status history.");
      });
  };

  return (
    <section className="bg-amber-50 min-h-screen pt-20 ">
      <div className="grid grid-cols-[0.15fr_0.85fr]">
        <UserSideBar setActiveSwitch={setActiveSwitch}/>
        <div>
          {activeSwitch === "orderList" && (
          <div className="max-w-6xl mx-auto px-3 py-5 rounded-md"> 
            <div>
              <StatusFilterDropdown
                selected={filterStatus}
                onChange={setFilterStatus}
              />
            </div>
            
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full min-w-[950px] text-sm text-left text-slate-800">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-gray-50">
                  Your Orders
                  <p className="mt-1 text-sm font-normal">
                    Look at your orders because you ordered because when I wake up
                    in the morning I order, so when I wake up I order and I order
                    because I wake up
                  </p>
                </caption>
                <thead className="text-xs uppercase bg-rose-200 text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Items</th>

                    <th className="px-6 py-3">
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
                            <path d="M7 14l5-5 5 5H7z" /> // Up arrow
                          ) : (
                            <path d="M7 10l5 5 5-5H7z" /> // Down arrow
                          )}
                        </svg>
                      </div>
                    </th>

                    <th className="px-6 py-3">
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
                            <path d="M7 14l5-5 5 5H7z" /> // Up arrow
                          ) : (
                            <path d="M7 10l5 5 5-5H7z" /> // Down arrow
                          )}
                        </svg>
                      </div>
                    </th>
                    <th className="px-6 py-3">Payment Method</th>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Notes</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 min-w-[200px]">
                        <ul className="list-disc list-inside break-words">
                          {order.items.map((item) => (
                            <li key={item.item_id}>
                              {item.product_name} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>

                      <td className="px-6 py-4">
                        {new Date(order.order_date).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        ₱ {parseFloat(order.total_amount).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 capitalize text-gray-600">
                        {order.payment_method}
                      </td>

                      <td className="px-6 py-4 text-xs text-gray-600">
                        {order.id}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 italic">{order.notes}</td>

                      <td className="px-6 py-4">
                        {order.status === "pending" &&
                        order.cancel_requested === 0 ? (
                          <button
                            onClick={() => {
                              setCancelingOrderId(order.id);
                              setShowCancelModal(true);
                            }}
                            className="flex items-center gap-2 font-medium text-red-600 hover:underline"
                          >
                            Cancel Order
                          </button>
                        ) : order.status === "pending" &&
                          order.cancel_requested === 1 ? (
                          <span className="text-sm italic text-gray-500">
                            Cancellation requested
                          </span>
                        ) : (
                          <button
                            onClick={() => fetchOrderHistory(order.id)}
                            className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                          >
                            View History
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-gray-900 bg-rose-300">
                    <td colSpan={2} className="px-6 py-3 text-base">
                      Total Orders: {orders.length}
                    </td>
                    <td colSpan={6} className="px-6 py-3 text-right">
                      Total Amount: ₱ {totalAmount.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          )}

          {activeSwitch === "notif" && (
            <div className="flex items-center justify-center min-h-[60vh] w-full">
              <div className="w-4xl bg-gray-50 h-50 mx-auto shadow-md drop-shadow-xl">
                <caption className="text-xl font-bold p-5">Notifications</caption>
                <div className="flex flex-col items-center justify-center">
                  {notifications.length === 0 ? (
                    <div className="text-gray-500 p-5">No notifications yet.</div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="w-3xl grid grid-cols-[0.70fr_0.30fr] bg-white shadow-2xl mb-4"
                      >
                        <div className="flex flex-col p-5 pl-10 justify-start">
                          <h1 className="text-lg font-semi text-start ">
                            {notif.message}
                          </h1>
                          <p className="text-sm">
                            Delivered on: {new Date(notif.date).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col p-5 pr-10 justify-end items-end" 
                        onClick={() => { window.location.href = `/GiveReview/${notif.id} `}}>
                          <p>Leave a Review!</p>
                          <MdOutlineRateReview className="h-15 w-15 " />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
         </div> 
      </div>

      
      
      {showHistoryModal && (
        <OrderHistoryModal
          data={historyData?.data}
          error={error}
          onClose={() => {
            setShowHistoryModal(false);
            setHistoryData(null);
          }}
        />
      )}
      {showCancelModal && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full bg-black/50"
          aria-hidden="true"
          tabIndex={-1}
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cancel Order
                </h2>
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelNote("");
                    setCancelingOrderId(null);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <textarea
                  value={cancelNote}
                  onChange={(e) => setCancelNote(e.target.value)}
                  placeholder="Enter cancellation reason..."
                  className="w-full h-40 p-3 border border-gray-300 text-sm rounded-lg resize-none bg-gray-50 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 focus:ring-red-600 focus:border-red-600"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelNote("");
                    setCancelingOrderId(null);
                  }}
                  className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    cancelOrder(cancelingOrderId, cancelNote);
                    setShowCancelModal(false);
                    setCancelNote("");
                    setCancelingOrderId(null);
                  }}
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                >
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
    </section>
  );
}

export default UserViewOrderPage;
