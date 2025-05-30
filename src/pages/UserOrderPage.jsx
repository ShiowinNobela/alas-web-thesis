import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

function UserViewOrderPage() {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

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

  const toggleDropdown = () => setDropdownOpen((open) => !open);

  const selectStatusFilter = (status) => {
    setFilterStatus(status);
    setDropdownOpen(false);
  };

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
        return "bg-yellow-200 text-yellow-800";
      case "completed":
      case "delivered":
        return "bg-green-200 text-green-800";
      case "cancelled":
      case "rejected":
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

  return (
    <section className="bg-yellow-100 min-h-screen pt-32">
      <div className="max-w-6xl mx-auto px-3 py-5 bg-gray-100 rounded-md shadow-lg">
        <div className="mb-4 relative inline-block">
          <button
            onClick={toggleDropdown}
            id="dropdownActionButton"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span className="sr-only">Action button</span>
            Filter: {filterStatus || "All"}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 absolute mt-2">
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownActionButton"
              >
                <li>
                  <button
                    onClick={() => selectStatusFilter("")}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => selectStatusFilter("pending")}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Pending
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => selectStatusFilter("processing")}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Processing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => selectStatusFilter("shipping")}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Shipping
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => selectStatusFilter("delivered")}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Delivered
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => selectStatusFilter("refunded")}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Refunded
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => selectStatusFilter("returned")}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Returned
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => selectStatusFilter("cancelled")}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Cancelled
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full min-w-[950px] text-sm text-left text-slate-800">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-amber-200">
              Your Orders
              <p className="mt-1 text-sm font-normal">
                Look at your orders because you ordered because when I wake up
                in the morning I order, so when I wake up I order and I order
                because I wake up
              </p>
            </caption>
            <thead className="text-xs uppercase bg-amber-100 text-gray-700">
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
                  <td className="px-6 py-4 min-w-[180px]">
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
                  <td className="px-6 py-4 font-medium">{order.id}</td>
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
                    <button
                      onClick={() =>
                        (window.location.href = `/GiveReview?orderId=${order.id}`)
                      }
                      className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                    >
                      <FaEdit />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900 bg-gray-100">
                <td colSpan={2} className="px-6 py-3 text-base">
                  Total Orders: {orders.length}
                </td>
                <td colSpan={5} className="px-6 py-3 text-right">
                  Total Amount: ₱ {totalAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

export default UserViewOrderPage;
