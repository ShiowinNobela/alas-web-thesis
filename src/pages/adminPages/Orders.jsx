import NewSideBar from "../../components/newSideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import OrderHistoryModal from "../../components/modals/orderHistoryModal";
import StatusUpdateModal from "../../components/modals/statusUpdateModal";
import { Button, Datepicker, TextInput } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import StatusFilterDropdown from "../../components/StatusFilterDropdown";
import dayjs from "dayjs";
import { toast, Toaster } from "sonner";

const tableHeadStyle = "px-6 py-3 text-center";

// const customFlowbiteTheme = createTheme({
//   textInput: {
//     field: {
//       input: {
//         colors: {
//           default:
//             "bg-admin border-red-500 focus:ring-teal-500 focus:border-teal-500 text-gray-800 ",
//           primary:
//             "bg-primary border-red-500 focus:ring-teal-500 focus:border-teal-500 text-gray-800",
//         },
//       },
//     },
//   },
// });

function AdminViewOrderPage() {
  const [orders, setOrders] = useState([]);
  //const [totalAmount, setTotalAmount] = useState(0);
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }
    const fetchOrders = (status = "", startDateVal, endDateVal) => {
      const params = new URLSearchParams();

      if (status) params.append("status", status);
      if (startDateVal)
        params.append("startDate", dayjs(startDateVal).format("YYYY-MM-DD"));
      if (endDateVal)
        params.append("endDate", dayjs(endDateVal).format("YYYY-MM-DD"));
      console.log("Effect triggered:", params.toString);

      const url = `/api/adminOrder?${params.toString()}`;
      console.log("Effect triggered:", url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setOrders(response.data.data);
          // const total = orders.reduce(
          //   (sum, order) => sum + parseFloat(order.total_amount),
          //   0
          // );
          // setTotalAmount(total);
        })
        .catch((err) => console.error(err));
    };

    fetchOrders(filterStatus, startDate, endDate);
  }, [filterStatus, startDate, endDate, user.token]);

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

  return (
    <>
      <Toaster />
      <div className="h-screen w-screen overflow-x-clip overflow-y-auto bg-neutral grid grid-cols-[0.20fr_0.80fr]">
        <NewSideBar />
        <main className="min-h-full flex flex-col gap-3 overflow-auto px-4 py-7">
          <div className="bg-white rounded-xl p-20 shadow mb-1">
            {/* You can add elements here later */}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <TextInput
              placeholder="Search orders..."
              color="white"
              className="w-[30%]"
              icon={HiOutlineSearch}
            />
            <StatusFilterDropdown
              selected={filterStatus}
              onChange={setFilterStatus}
            />
            <Button>Reload</Button>

            <Datepicker
              placeholder="Start date"
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              maxDate={new Date()}
              color="white"
              theme={{
                root: {
                  base: "relative",
                },
                popup: {
                  root: {
                    base: "absolute top-10 z-50 block pt-2",
                    inline: "relative top-0 z-auto",
                    inner:
                      "inline-block rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700",
                  },
                  header: {
                    base: "",
                    title:
                      "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
                    selectors: {
                      base: "mb-2 flex justify-between",
                      button: {
                        base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                        prev: "",
                        next: "",
                        view: "",
                      },
                    },
                  },
                  view: {
                    base: "p-1",
                  },
                  footer: {
                    base: "mt-2 flex space-x-2",
                    button: {
                      base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
                      today:
                        "bg-cyan-700 text-white hover:bg-cyan-800 dark:bg-cyan-600 dark:hover:bg-cyan-700",
                      clear:
                        "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                    },
                  },
                },
                views: {
                  days: {
                    header: {
                      base: "mb-1 grid grid-cols-7",
                      title:
                        "h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400",
                    },
                    items: {
                      base: "grid w-64 grid-cols-7",
                      item: {
                        base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        selected: "bg-cyan-700 text-white hover:bg-cyan-600",
                        disabled: "text-gray-500",
                      },
                    },
                  },
                  months: {
                    items: {
                      base: "grid w-64 grid-cols-4",
                      item: {
                        base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        selected: "bg-cyan-700 text-white hover:bg-cyan-600",
                        disabled: "text-gray-500",
                      },
                    },
                  },
                  years: {
                    items: {
                      base: "grid w-64 grid-cols-4",
                      item: {
                        base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        selected: "bg-cyan-700 text-white hover:bg-cyan-600",
                        disabled: "text-gray-500",
                      },
                    },
                  },
                  decades: {
                    items: {
                      base: "grid w-64 grid-cols-4",
                      item: {
                        base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
                        selected: "bg-cyan-700 text-white hover:bg-cyan-600",
                        disabled: "text-gray-500",
                      },
                    },
                  },
                },
              }}
            />
            <h3>TO</h3>

            <Datepicker
              placeholder="End date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              maxDate={new Date()}
              color="white"
            />
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  <th className={tableHeadStyle}>Action</th>
                  <th className={tableHeadStyle}>Status History</th>
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
                          {order.status}
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
                      <button
                        onClick={() => fetchOrderHistory(order.id)}
                        className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                      >
                        View History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="font-semibold text-white bg-admin">
                  <td colSpan={9} className="px-6 py-3">
                    Tip: Click on a column header to sort orders.
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
