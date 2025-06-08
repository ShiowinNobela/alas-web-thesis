import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineRateReview } from "react-icons/md";
import { HiSortAscending, HiSortDescending, HiEye } from "react-icons/hi";
//import { Modal, ModalBody } from "flowbite-react";
import OrderHistoryModal from "../components/modals/orderHistoryModal";
import StatusUserDropdown from "../components/StatusUserDropdown";
import UserSideBar from "./UserSideBar";

function UserViewOrderPage() {
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
  const [notifications, setNotifications] = useState([]);
  const [deliveredOrderIds, setDeliveredOrderIds] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  //const [showOrderModal, setShowOrderModal] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState(null);

  const user = JSON.parse(window.localStorage.getItem("user"));
  const queryClient = useQueryClient();

  const fetchOrders = async () => {
    const url = filterStatus
      ? `/api/orders?status=${filterStatus}`
      : `/api/orders`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data.data;
  };

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", filterStatus],
    queryFn: fetchOrders,
    onSuccess: (orders) => {
      const delivered = orders.filter((order) => order.status === "delivered");
      setNotifications(
        delivered.map((order) => ({
          id: order.id,
          message: `Your order ${order.id} has been delivered!`,
          date: order.order_date,
        }))
      );
    },
  });

  useEffect(() => {
    const delivered = orders.filter((order) => order.status === "delivered");
    setNotifications(
      delivered.map((order) => ({
        id: order.id,
        message: `Your order ${order.id} has been delivered!`,
        date: order.order_date,
      }))
    );
    setDeliveredOrderIds(delivered.map((order) => order.id));
  }, [orders]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownAnchor(null);
        setSelectedOrder(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalAmount = orders.reduce(
    (sum, order) => sum + parseFloat(order.total_amount),
    0
  );

  const cancelOrderMutation = useMutation({
    mutationFn: ({ orderId, note }) =>
      axios.put(
        `/api/orders/cancel/${orderId}`,
        { notes: note },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setShowCancelModal(false);
      setCancelNote("");
      setCancelingOrderId(null);
    },
    onError: () => {
      alert("Failed to cancel order.");
    },
  });

  const fetchSingleOrder = async (orderId) => {
    const response = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return response.data.data;
  };

  const viewOrderMutation = useMutation({
    mutationFn: fetchSingleOrder,
    onSuccess: (data) => {
      setSelectedOrder(data);
    },
    onError: () => {
      alert("Failed to fetch order details.");
    },
  });

  const handleViewMore = (e, orderId) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setDropdownAnchor({
      top: rect.top + window.scrollY - 120,
      left: rect.left + window.scrollX - 384 - 8,
    });

    viewOrderMutation.mutate(orderId);
  };

  const fetchOrderHistory = async (orderId) => {
    try {
      const res = await axios.get(`/api/orders/status-history/${orderId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setHistoryData(res.data);
      setShowHistoryModal(true);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch order history:", err);
      alert("Failed to fetch order status history.");
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

    useEffect(() => {
    const delivered = orders.filter((order) => order.status === "delivered");
    const sortedDelivered = delivered.sort(
      (a, b) => new Date(b.order_date) - new Date(a.order_date)
    );
    setNotifications(
      sortedDelivered.map((order) => ({
        id: order.id,
        message: `Your order ${order.id} has been delivered!`,
        date: order.order_date,
      }))
    );
    setDeliveredOrderIds(sortedDelivered.map((order) => order.id));
  }, [orders]);

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

  const cancelOrder = () => {
    if (!cancelingOrderId || !cancelNote) return;
    cancelOrderMutation.mutate({ orderId: cancelingOrderId, note: cancelNote });
  };

  return (
    <div className="h-screen w-full overflow-x-clip overflow-y-auto bg-yellow-100 grid grid-cols-[0.15fr_0.85fr]">
      <UserSideBar setActiveSwitch={setActiveSwitch} />
      <main>
        {activeSwitch === "orderList" && (
          <div className="w-full mx-auto px-15 py-10 rounded-md">
            <div className="flex items-center justify-between mb-4 bg-gray-700 shadow-2xl rounded-2xl px-5 py-5 flex-wrap gap-4">
              {/* LEFT: Text Summary */}
              <div className="text-white text-lg sm:text-base">
                <p>
                  <span className="font-medium">Total Orders:</span>{" "}
                  {orders.length}
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> ₱
                  {totalAmount.toLocaleString()}
                </p>
              </div>

              {/* RIGHT: Dropdown + Sort Buttons */}
              <div className="flex flex-wrap items-center gap-3 justify-end">
                <button
                  onClick={() => handleSort("date")}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg border ${
                    sortConfig.key === "date"
                      ? "bg-white text-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Date
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <HiSortAscending className="w-4 h-4 ms-2 opacity-100" />
                    ) : (
                      <HiSortDescending className="w-4 h-4 ms-2 opacity-100" />
                    ))}
                  {sortConfig.key !== "date" && (
                    <HiSortAscending className="w-4 h-4 ms-2 opacity-30" />
                  )}
                </button>

                <button
                  onClick={() => handleSort("total")}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg border ${
                    sortConfig.key === "total"
                      ? "bg-white text-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Total
                  {sortConfig.key === "total" &&
                    (sortConfig.direction === "asc" ? (
                      <HiSortAscending className="w-4 h-4 ms-2 opacity-100" />
                    ) : (
                      <HiSortDescending className="w-4 h-4 ms-2 opacity-100" />
                    ))}
                  {sortConfig.key !== "total" && (
                    <HiSortAscending className="w-4 h-4 ms-2 opacity-30" />
                  )}
                </button>

                <StatusUserDropdown
                  selected={filterStatus}
                  onChange={setFilterStatus}
                />
              </div>
            </div>

            <div className="relative overflow-x-auto shadow sm:rounded-lg">
              <table className="w-full min-w-[950px] text-sm text-left text-slate-800 bg-white/70 shadow">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-white/70">
                  Your Orders
                  <p className="mt-1 text-sm font-normal">
                    Look at your orders because you ordered because when I wake
                    up in the morning I order, so when I wake up I order and I
                    order because I wake up
                  </p>
                </caption>
                <thead className="text-xs uppercase bg-gray-600 text-white">
                  <tr>
                    <th className="px-6 py-3">Items</th>

                    <th className="px-6 py-3">
                      <div className="flex items-center ">Date</div>
                    </th>

                    <th className="px-6 py-3">
                      <div className="flex items-center">Total</div>
                    </th>
                    <th className="px-6 py-3">Payment Method</th>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>

                <tbody>
                  {sortedOrders.map((order) => (
                    <tr key={order.id}>
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

                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={(e) => handleViewMore(e, order.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <HiEye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold text-white bg-gray-600">
                    <td colSpan={2} className="px-6 py-3 text-base">
                      Hello
                    </td>
                    <td colSpan={6} className="px-6 py-3 text-right">
                      Alas Delis and Spices
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {activeSwitch === "notif" && (
          <div className="flex items-center justify-center min-h-[60vh] w-full mt-10">
            <div>
              <caption className="text-xl font-bold p-5">Notifications</caption>
              <div className="w-4xl bg-gray-50 h-150 overflow-y-auto mx-auto shadow-md drop-shadow-xl p-5">
                
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
                        <div
                          className="flex flex-col p-5 pr-10 justify-end items-end"
                          onClick={() => {
                            window.location.href = `/GiveReview/${notif.id} `;
                          }}
                        >
                          <p>Leave a Review!</p>
                          <MdOutlineRateReview className="h-15 w-15 " />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

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
      {/* <Modal
        dismissible
        show={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      >
        <ModalBody>
          {selectedOrder && (
            <div className="w-full max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                  <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                  <ul className="space-y-2 text-sm text-gray-800">
                    {selectedOrder.items.map((item) => (
                      <li
                        key={item.item_id}
                        className="flex justify-between items-center border-b pb-1"
                      >
                        <span>
                          {item.product_name} × {item.quantity}
                        </span>
                        <span className="text-gray-600">
                          ₱{parseFloat(item.subtotal).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t pt-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Subtotal:</span>
                      <span>
                        ₱
                        {parseFloat(
                          selectedOrder.total_amount
                        ).toLocaleString()}
                      </span>
                    </div>
                    {parseFloat(selectedOrder.discount_amount) > 0 && (
                      <div className="flex justify-between">
                        <span className="font-medium">Discount:</span>
                        <span className="text-green-600">
                          -₱
                          {parseFloat(
                            selectedOrder.discount_amount
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total:</span>
                      <span>
                        ₱
                        {(
                          parseFloat(selectedOrder.total_amount) -
                          parseFloat(selectedOrder.discount_amount)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-gray-700">
                  <h3 className="text-lg font-semibold">Order Info</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Order ID:</span>
                    <span>{selectedOrder.id}</span>

                    <span className="font-medium">Date:</span>
                    <span>
                      {new Date(selectedOrder.order_date).toLocaleString()}
                    </span>

                    <span className="font-medium">Status:</span>
                    <span className="capitalize">{selectedOrder.status}</span>

                    <span className="font-medium">Payment Method:</span>
                    <span className="capitalize">
                      {selectedOrder.payment_method}
                    </span>

                    {selectedOrder.notes && (
                      <>
                        <span className="font-medium">Notes:</span>
                        <span>{selectedOrder.notes}</span>
                      </>
                    )}

                    {selectedOrder.cancel_requested === 1 && (
                      <>
                        <span className="font-medium text-red-600">
                          Cancellation:
                        </span>
                        <span className="text-red-600 font-medium">
                          Requested
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal> */}
      {dropdownAnchor && selectedOrder && (
        <div
          ref={dropdownRef}
          className="dropdown-card absolute z-50 w-96 bg-white rounded-lg shadow-lg p-4 border"
          style={{
            top: dropdownAnchor.top,
            left: dropdownAnchor.left,
          }}
        >
          <h3 className="font-bold text-lg mb-3 text-gray-800">
            Order #{selectedOrder.id}
          </h3>
          <hr className="my-4 border-gray-400" />

          {/* Items First */}
          <h4 className="font-semibold text-sm text-gray-800 mb-1">Items:</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-4">
            {selectedOrder.items.map((item) => (
              <li key={item.item_id}>
                {item.product_name} × {item.quantity} = ₱
                {parseFloat(item.subtotal).toLocaleString()}
              </li>
            ))}
          </ul>

          <hr className="my-4 border-gray-400" />
          <p className="text-base font-semibold text-gray-800 mb-4">
            Total:{" "}
            <span className="text-green-600">
              ₱{parseFloat(selectedOrder.total_amount).toLocaleString()}
            </span>
          </p>

          {/* Other Details */}
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(selectedOrder.order_date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="capitalize">{selectedOrder.status}</span>
            </p>
            <p>
              <span className="font-medium">Payment:</span>{" "}
              {selectedOrder.payment_method.replace("_", " ")}
            </p>

            {parseFloat(selectedOrder.discount_amount) > 0 && (
              <p>
                <span className="font-medium">Discount:</span> ₱
                {parseFloat(selectedOrder.discount_amount).toLocaleString()}
              </p>
            )}

            {selectedOrder.notes && (
              <p>
                <span className="font-medium">Notes:</span>{" "}
                {selectedOrder.notes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserViewOrderPage;
