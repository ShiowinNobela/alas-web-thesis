import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import OrderHistoryModal from '../../components/modals/orderHistoryModal';
import StatusUpdateModal from '../../components/modals/statusUpdateModal';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import {
  //Button,
  Datepicker,
  TextInput,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Tooltip,
  Card,
} from 'flowbite-react';
import {
  HiOutlineSearch,
  HiOutlineRefresh,
  HiDotsVertical,
  HiCheckCircle,
} from 'react-icons/hi';
import StatusFilterDropdown from '../../components/StatusFilterDropdown';
import dayjs from 'dayjs';
import { toast, Toaster } from 'sonner';

const tableHeadStyle = 'px-6 py-3 text-center';

function AdminViewOrderPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [statusUpdateModal, setStatusUpdateModal] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [confirmButtonLabel, setConfirmButtonLabel] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [startDateKey, setStartDateKey] = useState(0);
  const [endDate, setEndDate] = useState(null);
  const [endDateKey, setEndDateKey] = useState(0);

  const [searchId, setSearchId] = useState('');
  const [summaryData, setSummaryData] = useState([]);
  const [last30SummaryData, setLast30SummaryData] = useState([]);

  const user = JSON.parse(window.localStorage.getItem('user'));

  const fetchOrders = useCallback(
    (status = '', startDateVal, endDateVal) => {
      const params = new URLSearchParams();

      if (status) params.append('status', status);
      if (startDateVal)
        params.append('startDate', dayjs(startDateVal).format('YYYY-MM-DD'));
      if (endDateVal)
        params.append('endDate', dayjs(endDateVal).format('YYYY-MM-DD'));

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
      params.append('start', start.format('YYYY-MM-DD'));
      params.append('end', end.format('YYYY-MM-DD'));

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
    const start = dayjs().subtract(100, 'day'); // 30 days ago

    const params = new URLSearchParams();
    params.append('start', start.format('YYYY-MM-DD'));
    params.append('end', end.format('YYYY-MM-DD'));

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
      toast.error('Start date cannot be after end date');
      return;
    }

    fetchOrders(filterStatus, startDate, endDate);
    if (startDate && endDate) {
      fetchOrderSummary(startDate, endDate);
    }
  }, [filterStatus, startDate, endDate, fetchOrders, fetchOrderSummary]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-200 text-orange-800';
      case 'processing':
        return 'bg-yellow-200 text-yellow-800';
      case 'shipping':
        return 'bg-green-200 text-green-800';
      case 'delivered':
        return 'bg-blue-200 text-blue-800';
      case 'returned':
        return 'bg-pink-200 text-pink-800';
      case 'refunded':
        return 'bg-violet-200 text-violet-800';
      case 'cancelled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);

    if (date === null) {
      setStartDateKey((prev) => prev + 1);
      setLast30SummaryData([]);
      setSummaryData([]);
      fetchLast30OrderSummary();
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (date === null) {
      setEndDateKey((prev) => prev + 1);
    }
    fetchLast30OrderSummary();
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key === 'date') {
      const dateA = new Date(a.order_date);
      const dateB = new Date(b.order_date);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortConfig.key === 'total') {
      return sortConfig.direction === 'asc'
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
        console.error('Failed to fetch order history:', err);
        alert('Failed to fetch order status history.');
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
                  status: status || 'cancelled',
                }
              : order
          )
        );
        setStatusUpdateModal(false);
        setAdminNote('');
        setUpdatingId(null);
        setUpdateStatus('');
        setModalTitle('');
        setConfirmButtonLabel('');
        if (startDate && endDate) {
          fetchOrderSummary(startDate, endDate);
        } else {
          fetchLast30OrderSummary();
        }
      })
      .catch((err) => {
        console.error('Cancel failed:', err);
        alert('Failed to cancel order.');
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
          toast.error('Order not found.');
          setOrders([]);
        } else {
          setOrders([order]);
        }
        setSearchId('');
      })
      .catch((err) => {
        console.error('Search failed:', err);
        toast.error('Order not found.');
      });
  };

  const customTextInputTheme = {
    field: {
      input: {
        base: 'block w-full border rounded-2xl focus:outline-none focus:ring-2',
        colors: {
          custom:
            'border-admin bg-white text-admin placeholder-gray-400 focus:border-admin focus:ring-admin',
        },
      },
    },
  };

  console.log(summaryData);
  return (
    <>
      <Toaster richColors />
      <div className="bg-neutral flex h-full flex-col items-center justify-center overflow-x-auto">
        <main className="flex flex-col gap-3 px-4 py-8">
          <div className="bg-admin flex w-full flex-row space-x-6 rounded-xl p-6 shadow">
            <Card
              title="Sales"
              className="hover:bg-secondary w-1/4 flex-none cursor-pointer rounded-lg p-4 shadow transition"
              role="button"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="mb-1 text-lg font-bold">Order Management</h2>
                  <p className="text-sm text-gray-600">Hello Admin!</p>
                </div>
              </div>
            </Card>

            <div className="flex flex-grow flex-row gap-x-2">
              {(summaryData.length > 0 ? summaryData : last30SummaryData)
                .length > 0 ? (
                (summaryData.length > 0 ? summaryData : last30SummaryData).map(
                  ({ status, totalOrders }) => (
                    <div
                      key={status}
                      className={`flex flex-col items-center justify-center ${getStatusColor(status)} min-w-0 flex-1 cursor-pointer rounded-lg p-4 shadow transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
                      title={
                        status.charAt(0).toUpperCase() +
                        status.slice(1).replaceAll('_', ' ')
                      }
                    >
                      <span className="mb-1 truncate text-center text-sm font-semibold">
                        {status.charAt(0).toUpperCase() +
                          status.slice(1).replaceAll('_', ' ')}
                      </span>
                      <span className="text-4xl font-extrabold">
                        {totalOrders}
                      </span>
                      <span className="text-xs">
                        {totalOrders === 1 ? 'order' : 'orders'}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p>Edit the dates to see orders per status on that time</p>
              )}
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-3 px-2">
            <div className="flex w-full items-center gap-2 sm:w-[30%]">
              <TextInput
                placeholder="Search order by ID..."
                value={searchId}
                icon={HiOutlineSearch}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchById();
                }}
                theme={customTextInputTheme}
                color="custom"
              />
              <Button onClick={handleSearchById}>Search</Button>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
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
                className="group hover:bg-neutral rounded-full border-gray-500 bg-white p-2 focus:ring-0"
                onClick={() => window.location.reload()}
              >
                <HiOutlineRefresh className="h-5 w-5 transition-transform duration-300 group-active:rotate-180" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="bg-admin text-secondary rounded-t-lg px-6 py-3 text-xs font-semibold uppercase">
              <span>Total Orders: {orders.length}</span>
              <span className="ml-10">
                Total Amount: ₱{totalAmount.toLocaleString()}
              </span>
              <span className="ml-10"></span>
            </div>

            <table className="w-full rounded-2xl text-left text-sm text-slate-800">
              <thead className="bg-admin sticky top-0 text-xs text-white uppercase">
                <tr>
                  <th className={tableHeadStyle}>User Info</th>
                  <th className={tableHeadStyle}>Order ID</th>
                  <th className={tableHeadStyle}>Items</th>
                  <th className={tableHeadStyle}>
                    <div
                      className="flex cursor-pointer items-center hover:underline"
                      onClick={() => handleSort('date')}
                    >
                      Date
                      <svg
                        className="ms-1.5 h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {sortConfig.key === 'date' &&
                        sortConfig.direction === 'asc' ? (
                          <path d="M7 14l5-5 5 5H7z" />
                        ) : (
                          <path d="M7 10l5 5 5-5H7z" />
                        )}
                      </svg>
                    </div>
                  </th>
                  <th className={tableHeadStyle}>
                    <div
                      className="flex cursor-pointer items-center hover:underline"
                      onClick={() => handleSort('total')}
                    >
                      Total
                      <svg
                        className="ms-1.5 h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {sortConfig.key === 'total' &&
                        sortConfig.direction === 'asc' ? (
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
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 transition-colors odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-300"
                  >
                    <td className="px-6 py-4 text-xs text-gray-700">
                      <div>
                        <p className="font-primary">{order.username}</p>
                        {/*<p className="text-gray-500 text-xs">{order.email}</p>*/}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-600">
                      {order.id}
                    </td>

                    <td className="min-w-[190px] px-6 py-4">
                      <div className="space-y-1 break-words">
                        {order.items.map((item) => (
                          <div key={item.item_id}>
                            {item.product_name} x {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-800">
                        {new Date(order.order_date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.order_date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      ₱ {parseFloat(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center justify-center text-center text-xs">
                        {order.payment_method === 'GCash' && (
                          <>
                            <img
                              src="../src/components/images/gcash-logo.png"
                              alt="GCash"
                              className="mb-1 h-6"
                            />
                            <span>GCash</span>
                          </>
                        )}

                        {order.payment_method === 'Maya' && (
                          <>
                            <img
                              src="../src/components/images/maya-icon.png"
                              alt="Maya"
                              className="mb-1 h-6"
                            />
                            <span>Maya</span>
                          </>
                        )}

                        {order.payment_method === 'bank_transfer' && (
                          <>
                            <span>Bank</span>
                            <span>Transfer</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <span
                          className={`rounded px-2 py-1 text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>
                    </td>

                    <td className="justify-center px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {order.status === 'pending' &&
                        order.cancel_requested === 0 ? (
                          <button
                            onClick={() => {
                              setStatusUpdateModal(true);
                              setUpdatingId(order.id);
                              setUpdateStatus('processing');
                              setModalTitle('Process Order');
                              setConfirmButtonLabel('Process Order');
                            }}
                            className="flex items-center gap-2 font-medium text-amber-400 hover:underline"
                          >
                            Process Order
                          </button>
                        ) : order.status === 'pending' &&
                          order.cancel_requested === 1 ? (
                          <Tooltip
                            content="Order can't be processed. Customer has requested to cancel this order"
                            placement="bottom-end"
                          >
                            <button
                              onClick={() => {
                                setStatusUpdateModal(true);
                                setUpdatingId(order.id);
                                setUpdateStatus('');
                                setModalTitle('Cancel Order');
                                setConfirmButtonLabel('Cancel Order');
                              }}
                              className="flex items-center gap-2 font-medium text-red-600 hover:underline"
                            >
                              Cancel Order
                            </button>
                          </Tooltip>
                        ) : order.status === 'cancelled' ? (
                          <span className="text-sm text-gray-500 italic">
                            Order Cancelled
                          </span>
                        ) : order.status === 'processing' ? (
                          <button
                            onClick={() => {
                              setStatusUpdateModal(true);
                              setUpdatingId(order.id);
                              setUpdateStatus('shipping');
                              setModalTitle('Ship Order');
                              setConfirmButtonLabel('Ship Order');
                            }}
                            className="flex items-center gap-2 font-medium text-green-600 hover:underline"
                          >
                            Ship Order
                          </button>
                        ) : order.status === 'shipping' ? (
                          <button
                            onClick={() => {
                              setStatusUpdateModal(true);
                              setUpdatingId(order.id);
                              setUpdateStatus('delivered');
                              setModalTitle('Mark Order as Delivered');
                              setConfirmButtonLabel('Confirm');
                            }}
                            className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
                          >
                            Mark Delivered
                          </button>
                        ) : order.status === 'delivered' ? (
                          <div className="flex items-center text-sm text-green-800">
                            <HiCheckCircle className="mr-1 h-5 w-5" />
                          </div>
                        ) : null}
                      </div>
                    </td>

                    <td className="justify-start px-6 py-4">
                      <Dropdown
                        label=""
                        inline
                        renderTrigger={() => (
                          <button className="font-bold text-black hover:text-blue-600">
                            <HiDotsVertical />
                          </button>
                        )}
                      >
                        <DropdownHeader>Actions</DropdownHeader>
                        <DropdownDivider />

                        <DropdownItem
                          onClick={() =>
                            navigate(`/Admin/AdminOrderDetails/${order.id}`)
                          }
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
                <tr className="bg-admin font-semibold text-white">
                  <td colSpan={9} className="px-6 py-6">
                    <ul className="list-inside list-disc space-y-1">
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
