import NewSideBar from "../../components/newSideBar";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import OrderHistoryModal from "../../components/modals/orderHistoryModal";
import StatusUpdateModal from "../../components/modals/statusUpdateModal";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Datepicker,
  TextInput,
  Dropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Tooltip,
  Card,
} from "flowbite-react";
import {
  HiOutlineSearch,
  HiOutlineRefresh,
  HiDotsVertical,
  HiSwitchHorizontal,
  HiUser,
  HiPhone,
  HiMail,
  HiLocationMarker,
  HiCreditCard,
  HiUserCircle,
  HiHashtag,
  HiDocumentText,
} from "react-icons/hi";
import StatusFilterDropdown from "../../components/StatusFilterDropdown";
import dayjs from "dayjs";
import { toast, Toaster } from "sonner";

const tableHeadStyle = "px-6 py-3 text-center";

function AdminViewOrderPage() {
  const [orders, setOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterStatus, setFilterStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [statusUpdateModal, setStatusUpdateModal] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [confirmButtonLabel, setConfirmButtonLabel] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startDateKey, setStartDateKey] = useState(0);
  const [endDate, setEndDate] = useState(null);
  const [endDateKey, setEndDateKey] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const [last30SummaryData, setLast30SummaryData] = useState([]);

  const user = JSON.parse(window.localStorage.getItem("user"));

  const fetchOrders = useCallback(
    (status = "", startDateVal, endDateVal) => {
      const params = new URLSearchParams();

      if (status) params.append("status", status);
      if (startDateVal)
        params.append("startDate", dayjs(startDateVal).format("YYYY-MM-DD"));
      if (endDateVal)
        params.append("endDate", dayjs(endDateVal).format("YYYY-MM-DD"));

      const url = `/api/adminOrder?${params.toString()}`;

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setOrders(response.data.data);

          const total = response.data.data.reduce(
            (sum, order) => sum + parseFloat(order.total_amount),
            0
          );
          setTotalAmount(total);
        })
        .catch((err) => console.error(err));
    },
    [user.token]
  );

  const fetchOrderSummary = useCallback(
    (startDate, endDate) => {
      const start = startDate ? dayjs(startDate) : dayjs();
      const end = endDate ? dayjs(endDate) : dayjs();
      const params = new URLSearchParams();
      params.append("start", start.format("YYYY-MM-DD"));
      params.append("end", end.format("YYYY-MM-DD"));

      const url = `/api/reports/sales-summary-order?${params.toString()}`;

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setSummaryData(res.data.data.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [user.token]
  );

  const fetchLast30OrderSummary = useCallback(() => {
    const end = dayjs(); // today
    const start = dayjs().subtract(30, "day"); // 30 days ago

    const params = new URLSearchParams();
    params.append("start", start.format("YYYY-MM-DD"));
    params.append("end", end.format("YYYY-MM-DD"));

    const url = `/api/reports/sales-summary-order?${params.toString()}`;

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setLast30SummaryData(res.data.data.data);
      })
      .catch((err) => console.error(err));
  }, [user.token]);

  useEffect(() => {
    fetchLast30OrderSummary();
  }, [fetchLast30OrderSummary]);

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }

    fetchOrders(filterStatus, startDate, endDate);
    if (startDate && endDate) {
      fetchOrderSummary(startDate, endDate);
    }
  }, [filterStatus, startDate, endDate, fetchOrders, fetchOrderSummary]);

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

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date === null) {
      setStartDateKey((prev) => prev + 1);
    }
    setSummaryData([]);
  };

  const navigate = useNavigate();

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (date === null) {
      setEndDateKey((prev) => prev + 1);
    }
    setSummaryData([]);
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

  const fetchOrderHistory = (orderId) => {
    axios
      .get(`/api/adminOrder/status-history/${orderId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setHistoryData(res.data);
        setShowHistoryModal(true);
      })
      .catch((err) => {
        console.error("Failed to fetch order history:", err);
        alert("Failed to fetch order status history.");
      });
  };

  const fetchOrderDetails = (orderId) => {
    axios
      .get(`http://localhost:3000/api/adminOrder/${orderId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setSelectedOrder(res.data);
        setShowDetailsModal(true);
      })
      .catch((err) => {
        console.error("Failed to fetch order details:", err);
        alert("Failed to fetch order details.");
      });
  };

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
                  status: status || "cancelled",
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

  const handleSearchById = () => {
    const trimmedId = searchId.trim();
    if (!trimmedId) return;

    axios
      .get(`/api/adminOrder/${trimmedId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        const order = res.data?.data || res.data;
        if (!order || !order.id) {
          toast.error("Order not found.");
          setOrders([]);
        } else {
          setOrders([order]);
        }
        setSearchId("");
      })
      .catch((err) => {
        console.error("Search failed:", err);
        toast.error("Order not found.");
      });
  };

  console.log(summaryData);
  return (
    <>
      <Toaster richColors />
      <div className="h-screen w-screen overflow-x-clip overflow-y-auto bg-neutral grid grid-cols-[0.20fr_0.80fr]">
        <NewSideBar />
        <main className="min-h-full flex flex-col gap-3 overflow-auto px-4 py-7">
          <div className="flex flex-row w-full h-[25%] bg-admin rounded-xl shadow p-6 space-x-6">
            <Card
              title="Sales"
              className="flex-none p-4 rounded-lg shadow w-1/4 cursor-pointer hover:bg-secondary transition"
              onClick={() => navigate("/Admin/WalkInOrders")}
              role="button"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg mb-1">Order Management</h2>
                  <p className="text-sm text-gray-600">Hello Admin!</p>
                </div>
                <HiSwitchHorizontal className="w-6 h-6 text-blue-600" />
              </div>
            </Card>

            <div className="flex flex-row flex-grow gap-x-2">
              {(summaryData.length > 0 ? summaryData : last30SummaryData)
                .length > 0 ? (
                (summaryData.length > 0 ? summaryData : last30SummaryData).map(
                  ({ status, totalOrders }) => (
                    <div
                      key={status}
                      className="
          flex flex-col items-center justify-center bg-white rounded-lg shadow
          transition-transform duration-300 ease-in-out
          hover:scale-105 hover:shadow-lg
          cursor-pointer
          flex-1 min-w-0
          p-4
        "
                      title={
                        status.charAt(0).toUpperCase() +
                        status.slice(1).replaceAll("_", " ")
                      }
                    >
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 text-center truncate">
                        {status.charAt(0).toUpperCase() +
                          status.slice(1).replaceAll("_", " ")}
                      </span>
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                        {totalOrders}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {totalOrders === 1 ? "order" : "orders"}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p>Edit the dates to see orders per status on that time</p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center flex-wrap gap-3 w-full">
            <div className="flex items-center gap-2 w-full sm:w-[30%]">
              <TextInput
                placeholder="Search order by ID..."
                value={searchId}
                icon={HiOutlineSearch}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchById();
                }}
                className="flex-1"
              />
              <Button
                onClick={handleSearchById}
                className="group w-[25%] bg-secondary text-black p-2 hover:bg-admin hover:text-white focus:outline-none focus:ring-0 active:scale-95"
              >
                Search
              </Button>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-end">
              <div className="w-[22%]">
                <Datepicker
                  key={startDateKey}
                  placeholder="Start date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  maxDate={new Date()}
                  color="white"
                />
              </div>
              <h3>TO</h3>
              <div className="w-[22%]">
                <Datepicker
                  key={endDateKey}
                  placeholder="End date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate}
                  maxDate={new Date()}
                  color="white"
                />
              </div>

              <StatusFilterDropdown
                selected={filterStatus}
                onChange={setFilterStatus}
              />

              <Button
                color="light"
                className="group bg-white p-2 rounded-full hover:bg-neutral border-gray-500 focus:ring-0"
                onClick={() => window.location.reload()}
              >
                <HiOutlineRefresh className="w-5 h-5 transition-transform duration-300 group-active:rotate-180" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="bg-admin text-white text-xs uppercase font-semibold px-6 py-3 rounded-t-lg">
              <span>Total Orders: {orders.length}</span>
              <span className="ml-4">
                Total Amount: ₱{totalAmount.toLocaleString()}
              </span>
            </div>

            <table className="w-full text-sm text-left text-slate-800 rounded-2xl">
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
                  <th className={tableHeadStyle}>Action</th>
                  <th className={tableHeadStyle}> </th>
                </tr>
              </thead>

              <tbody>
                {sortedOrders.map((order) => (
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

                    <td className="px-6 py-4 bg-gray-100 justify-center text-center">
                      <div className="flex justify-center items-center">
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
                            className="flex items-center gap-2 font-medium text-amber-400 hover:underline"
                          >
                            Process Order
                          </button>
                        ) : order.status === "pending" &&
                          order.cancel_requested === 1 ? (
                          <Tooltip
                            content="Order can't be processed. Customer has requested to cancel this order"
                            placement="bottom-end"
                          >
                            <button
                              onClick={() => {
                                setStatusUpdateModal(true);
                                setUpdatingId(order.id);
                                setUpdateStatus("");
                                setModalTitle("Cancel Order");
                                setConfirmButtonLabel("Cancel Order");
                              }}
                              className="flex items-center gap-2 font-medium text-red-600 hover:underline"
                            >
                              Cancel Order
                            </button>
                          </Tooltip>
                        ) : order.status === "cancelled" ? (
                          <span className="text-sm italic text-gray-500">
                            Order Cancelled
                          </span>
                        ) : order.status === "processing" ? (
                          <button
                            onClick={() => {
                              setStatusUpdateModal(true);
                              setUpdatingId(order.id);
                              setUpdateStatus("shipping");
                              setModalTitle("Ship Order");
                              setConfirmButtonLabel("Ship Order");
                            }}
                            className="flex items-center gap-2 font-medium text-green-600 hover:underline "
                          >
                            Ship Order
                          </button>
                        ) : order.status === "shipping" ? (
                          <button
                            onClick={() => {
                              setStatusUpdateModal(true);
                              setUpdatingId(order.id);
                              setUpdateStatus("delivered");
                              setModalTitle("Mark Order as Delivered");
                              setConfirmButtonLabel("Confirm");
                            }}
                            className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                          >
                            Mark Delivered
                          </button>
                        ) : order.status === "delivered" ? (
                          <span className="text-sm bold text-gray-500">
                            Order Completed
                          </span>
                        ) : null}
                      </div>
                    </td>

                    <td className="px-6 py-4 bg-gray-50">
                      <Dropdown
                        label=""
                        inline
                        renderTrigger={() => (
                          <button className="text-gray-600 hover:text-blue-600">
                            <HiDotsVertical />
                          </button>
                        )}
                      >
                        <DropdownHeader>Actions</DropdownHeader>
                        <DropdownDivider />

                        <DropdownItem
                          onClick={() => fetchOrderDetails(order.id)}
                        >
                          View Order Details
                        </DropdownItem>

                        <DropdownItem
                          onClick={() => fetchOrderHistory(order.id)}
                        >
                          View History
                        </DropdownItem>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="font-semibold text-white bg-admin">
                  <td colSpan={9} className="px-6 py-6">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Click on a column header to sort orders.</li>
                      <li>Use the search bar to find specific order IDs.</li>
                      <li>
                        Filter by order date range using the date pickers.
                      </li>
                      <li>
                        Click Refresh to reset filters and reload the table.
                      </li>
                    </ul>
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

        <Modal
          show={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        >
          <ModalHeader>
            Order Details – #{selectedOrder?.data?.id}
            {selectedOrder?.data?.status && (
              <span
                className={`ml-2 inline-block rounded px-2 py-0.5 text-xs font-semibold ${getStatusColor(
                  selectedOrder.data.status
                )}`}
              >
                {selectedOrder.data.status.charAt(0).toUpperCase() +
                  selectedOrder.data.status.slice(1)}
              </span>
            )}
          </ModalHeader>

          <ModalBody>
            <div className="shadow px-4 py-5 rounded mb-3 mt-1 bg-gray-100">
              <div className="space-y-4 text-sm text-gray-800">
                <h3 className="text-lg font-semibold mb-7">Order Summary</h3>

                <div className="space-y-2">
                  {selectedOrder?.data?.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="truncate">
                        {item.product_name} x{item.quantity}
                      </span>
                      <span className="text-black font-semibold">
                        ₱{parseFloat(item.subtotal).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-4 border-gray-400" />

              <div className="flex justify-between text-base font-extrabold text-black">
                <span>Total</span>
                <span>
                  ₱{parseFloat(selectedOrder?.data?.total_amount).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="shadow px-4 py-5 rounded mb-7 bg-white">
              <h3 className="text-lg font-semibold mb-8 text-black">
                Customer, Payment & Billing Info
              </h3>

              <div className="flex flex-col md:flex-row gap-6 text-sm text-gray-700">
                {/* Left Side */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex items-start gap-2">
                    <HiUser className="text-secondary mt-1" />
                    <div>
                      <p className="text-black">Customer Name</p>
                      <p className="font-semibold">
                        {selectedOrder?.data?.username || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <HiPhone className="text-secondary mt-1" />
                    <div>
                      <p className="text-black">Contact Number</p>
                      <p className="font-semibold">
                        {selectedOrder?.data?.contact_number || (
                          <span className="text-gray-400">No contact info</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <HiMail className="text-secondary mt-1" />
                    <div>
                      <p className="text-black">Email</p>
                      <p className="font-semibold">
                        {selectedOrder?.data?.email || (
                          <span className="text-gray-400">No email</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <HiLocationMarker className="text-secondary mt-1" />
                    <div>
                      <p className="text-black">Shipping Address</p>
                      <p className="font-semibold">
                        {selectedOrder?.data?.address || (
                          <span className="text-gray-400">No address</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex items-start gap-2">
                    <HiCreditCard className="text-secondary mt-1" />
                    <div>
                      <p className="text-black">Payment Method</p>
                      <p className="font-semibold">
                        {selectedOrder?.data?.payment_method || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <HiUserCircle className="text-secondary mt-1" />
                    <div>
                      <p className="text-black">Account Name</p>
                      <p className="font-semibold">
                        {selectedOrder?.data?.account_name || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <HiHashtag className="text-secondary mt-1" />
                    <div>
                      <p className="text-black">Reference #</p>
                      <p className="font-semibold">
                        {selectedOrder?.data?.reference_number || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <HiDocumentText className="text-secondary mt-1" />
                    <div className="w-full">
                      <p className="text-black mb-1">Order Notes</p>
                      <div className="bg-gray-100 border border-gray-200 rounded p-3 text-sm text-gray-800 min-h-[100px]">
                        {selectedOrder?.data?.notes || "No notes provided."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowDetailsModal(false)}>Close</Button>
          </ModalFooter>
        </Modal>

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
