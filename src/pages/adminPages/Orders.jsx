import Sidebar from "../../components/sidebar.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import OrderHistoryModal from "../../components/modals/orderHistoryModal";
import StatusUpdateModal from "../../components/modals/statusUpdateModal";
import StatusFilterDropdown from "../../components/StatusFilterDropdown";

function AdminViewOrderPage() {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterStatus, setFilterStatus] = useState("");
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [statusUpdateModal, setStatusUpdateModal] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [confirmButtonLabel, setConfirmButtonLabel] = useState("");

  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = (status = "") => {
      const url = status
        ? `/api/adminOrder?status=${status}`
        : `/api/adminOrder`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          const orders = response.data.data;
          setOrders(orders);
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

  // Optional: If you want to allow viewing order status history
  // const fetchOrderHistory = (orderId) => {
  //   axios
  //     .get(`/api/adminOrder/status-history/${orderId}`, {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setHistoryData(res.data);
  //       setShowHistoryModal(true);
  //       setError(null);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch order history:", err);
  //       alert("Failed to fetch order status history.");
  //     });
  // };

  const statusUpdate = (orderId, note, status) => {
    const url = status
      ? `/api/adminOrder/status-update/${orderId}`
      : `/api/adminOrder/cancel/${orderId}`;

    const data = status ? { notes: note, status } : { notes: note };

    axios
      .patch(url, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  cancel_requested: 1,
                  status: status || order.status,
                }
              : order
          )
        );
        setStatusUpdateModal(false);
        setAdminNote("");
        setUpdatingId(null);
        setUpdateStatus("");
        setModalTitle("");
        setConfirmButtonLabel("");
      })
      .catch((err) => {
        console.error("Cancel failed:", err);
        alert("Failed to cancel order.");
      });
  };

  return (
    <>
      <div className="flex min-h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <main className="flex-grow w-full mx-auto px-6 py-5 overflow-auto ml-[256px]">
          <div>
            <StatusFilterDropdown
              selected={filterStatus}
              onChange={setFilterStatus}
            />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full min-w-[950px] text-sm text-left text-slate-800">
              <caption className="p-5 text-lg font-semibold text-left bg-gray-50">
                Your Orders
                <p className="mt-1 text-sm font-normal">
                  Look at your orders because you ordered because when I wake up
                  in the morning I order, so when I wake up I order and I order
                  because I wake up
                </p>
              </caption>
              <thead className="text-xs uppercase bg-rose-200 text-gray-700">
                <tr>
                  <th className="px-6 py-3">User Info</th>
                  <th className="px-6 py-3">Order ID</th>
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
                          <path d="M7 14l5-5 5 5H7z" />
                        ) : (
                          <path d="M7 10l5 5 5-5H7z" />
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
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {sortedOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200">
                    <td className="px-6 py-4 text-xs text-gray-700 bg-gray-50">
                      <div>
                        <p className="font-semibold">{order.username}</p>
                        <p className="text-gray-500 text-xs">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600 bg-gray-100">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 min-w-[200px] bg-gray-50">
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 bg-gray-100">
                      {order.status === "pending" &&
                      order.cancel_requested === 0 ? (
                        <button
                          onClick={() => {
                            setStatusUpdateModal(true);
                            setUpdatingId(order.id);
                            setUpdateStatus("processing");
                            setModalTitle("Process Order");
                            setConfirmButtonLabel("Process Order");
                          }}
                          className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                        >
                          Process Order
                        </button>
                      ) : order.status === "pending" &&
                        order.cancel_requested === 1 ? (
                        <button
                          onClick={() => {
                            setStatusUpdateModal(true);
                            setUpdatingId(order.id);
                            setUpdateStatus("cancelled");
                            setModalTitle("Cancel Order");
                            setConfirmButtonLabel("Cancel Order");
                          }}
                          className="flex items-center gap-2 font-medium text-red-600 hover:underline"
                        >
                          Cancel Order
                        </button>
                      ) : order.status === "cancelled" ? (
                        <span className="text-sm italic text-gray-500">
                          Order Cancelled
                        </span>
                      ) : null}
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
        </main>

        {showHistoryModal && (
          <OrderHistoryModal
            data={historyData?.data}
            onClose={() => {
              setShowHistoryModal(false);
              setHistoryData(null);
            }}
          />
        )}

        <StatusUpdateModal
          show={statusUpdateModal}
          title={modalTitle}
          textareaValue={adminNote}
          onTextareaChange={(e) => setAdminNote(e.target.value)}
          onCancel={() => setStatusUpdateModal(false)}
          onConfirm={() => statusUpdate(updatingId, adminNote, updateStatus)}
          confirmButtonLabel={confirmButtonLabel}
        />
      </div>
    </>
  );
}

export default AdminViewOrderPage;
