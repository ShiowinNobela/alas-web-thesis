import axios from 'axios';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OrdersTable from '../../components/OrdersTable';
import { motion } from 'framer-motion';
import OrderFiltersPanel from '@/components/bigComponents/orderFilterSidebar';

function UserViewOrderPage() {
  const [filterStatus, setFilterStatus] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [cancelingOrderId, setCancelingOrderId] = useState(null);

  const user = JSON.parse(window.localStorage.getItem('user'));
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
    queryKey: ['orders', filterStatus],
    queryFn: fetchOrders,
  });

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
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setShowCancelModal(false);
      setCancelNote('');
      setCancelingOrderId(null);
    },
    onError: () => {
      alert('Failed to cancel order.');
    },
  });

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

  const cancelOrder = () => {
    if (!cancelingOrderId || !cancelNote) return;
    cancelOrderMutation.mutate({ orderId: cancelingOrderId, note: cancelNote });
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading orders...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">Failed to load orders.</div>
    );
  }

  return (
    <>
      <main className="h-full bg-gray-50 py-4 pb-40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-content px-2 py-4 text-4xl font-bold">
            Your Orders List
          </h2>

          <div className="mt-4 flex gap-2 md:h-[calc(100vh-10rem)] md:flex-row">
            <OrderFiltersPanel />

            {/* RIGHT: Orders Table */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 8,
              }}
              className="flex-1 overflow-y-auto rounded-lg px-2"
            >
              <OrdersTable
                orders={orders}
                getStatusColor={getStatusColor}
                onCancelOrder={(id) => {
                  setCancelingOrderId(id);
                  setShowCancelModal(true);
                }}
              />
            </motion.div>
          </div>

          {showCancelModal && (
            <div
              className="fixed top-0 right-0 left-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 p-4"
              aria-hidden="true"
              tabIndex={-1}
            >
              <div className="relative max-h-full w-full max-w-2xl">
                <div className="relative rounded-lg bg-white shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between rounded-t border-b p-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Cancel Order
                    </h2>
                    <button
                      onClick={() => {
                        setShowCancelModal(false);
                        setCancelNote('');
                        setCancelingOrderId(null);
                      }}
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                    >
                      <svg
                        className="h-3 w-3"
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
                  <div className="space-y-4 p-6">
                    <textarea
                      value={cancelNote}
                      onChange={(e) => setCancelNote(e.target.value)}
                      placeholder="Enter cancellation reason..."
                      className="h-40 w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-red-600 focus:ring-red-600"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex justify-end space-x-3 rounded-b border-t border-gray-200 p-4">
                    <button
                      onClick={() => {
                        setShowCancelModal(false);
                        setCancelNote('');
                        setCancelingOrderId(null);
                      }}
                      className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        cancelOrder(cancelingOrderId, cancelNote);
                        setShowCancelModal(false);
                        setCancelNote('');
                        setCancelingOrderId(null);
                      }}
                      className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
                    >
                      Confirm Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

{
  /* <Modal
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
      </Modal> */
}

{
  /* {activeSwitch === "notif" && (
          <div className="flex items-center justify-center min-h-[60vh] w-full mt-10">
            <div>
              <caption className="text-xl font-bold font-heading text-content p-5">Notifications</caption>
              <div className="w-4xl bg-gray-50 h-100 overflow-y-auto mx-auto shadow-md drop-shadow-xl p-5">
                <div className="flex flex-col items-center justify-center">
                  {notifications.length === 0 ? (
                    <div className="text-gray-500 p-5">
                      No notifications yet.
                    </div>
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
                            Delivered on:{" "}
                            {new Date(notif.date).toLocaleString()}
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
        )} */
}

{
  /*  */
}

// useEffect(() => {
//   const delivered = orders.filter((order) => order.status === "delivered");
//   setNotifications(
//     delivered.map((order) => ({
//       id: order.id,
//       message: `Your order ${order.id} has been delivered!`,
//       date: order.order_date,
//     }))
//   );
//   setDeliveredOrderIds(delivered.map((order) => order.id));
// }, [orders]);

// const delivered = orders.filter((order) => order.status === "delivered");
// setNotifications(
//   delivered.map((order) => ({
//     id: order.id,
//     message: `Your order ${order.id} has been delivered!`,
//     date: order.order_date,
//   }))
// );

// useEffect(() => {
//   const delivered = orders.filter((order) => order.status === "delivered");
//   const sortedDelivered = delivered.sort(
//     (a, b) => new Date(b.order_date) - new Date(a.order_date)
//   );
//   setNotifications(
//     sortedDelivered.map((order) => ({
//       id: order.id,
//       message: `Your order ${order.id} has been delivered!`,
//       date: order.order_date,
//     }))
//   );
//   setDeliveredOrderIds(sortedDelivered.map((order) => order.id));
// }, [orders]);

export default UserViewOrderPage;
