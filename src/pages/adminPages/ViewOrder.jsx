import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

function ViewOrder() {
  const [detailsCart, setOrderDetails] = useState(null);
  const [detailsUser, setUserDetails] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const statusFlow = [
    'pending',
    'processing',
    'shipping',
    'delivered',
    'cancelled',
    'refunded',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.token) throw new Error('User not authenticated');

        const [orderResponse, userResponse] = await Promise.all([
          axios.get(`/api/adminOrder/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          axios.get(`/api/adminUser/${orderData.customer_id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);

        const orderData = orderResponse.data.data;
        const userData = userResponse.data.data;

        setOrderDetails(orderData);
        setUserDetails(userData);
        setSelectedStatus(orderData.status);
      } catch (error) {
        console.error('Error during data fetching:', error);
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const updateStatus = async () => {
    if (!selectedStatus || selectedStatus === detailsCart?.status) return;

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.token) throw new Error('User not authenticated');

      const response = await axios.patch(
        `/api/adminOrder/status-update/${id}`,
        { status: selectedStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setOrderDetails(response.data.data);
      toast.success('Order status updated successfully!');
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.status === 400
          ? 'Invalid status update'
          : 'Failed to update status');
      toast.error(errorMessage);
    }
  };

  const getNextStatuses = (currentStatus) => {
    if (!currentStatus) return [];
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex === -1) return [];

    let next = [];
    if (currentIndex + 1 < statusFlow.length) {
      next.push(statusFlow[currentIndex + 1]);
    }
    if (!['cancelled', 'refunded'].includes(currentStatus)) {
      next.push('cancelled', 'refunded');
    }
    return [...new Set(next)];
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!detailsCart) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="h-full w-screen">
      <Toaster richColors />
      <div className="flex h-screen w-screen flex-col items-center bg-[#E2E0E1] pl-[256px]">
        <h1 className="py-5 text-4xl font-semibold">Order Details</h1>
        <div className="w-4xl rounded-lg border-1 bg-white p-5 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Order #{detailsCart.id}</h2>
            <span className="text-gray-500">Status: {detailsCart.status}</span>
          </div>

          <div className="mb-5">
            <h1 className="pb-1.5 text-2xl font-semibold">
              Customer Information
            </h1>
            <p className="mb-1">Username: {detailsUser?.username || 'N/A'}</p>
            <p className="mb-1">Email: {detailsUser?.email || 'N/A'}</p>
            <p className="mb-1">
              Contact Number: {detailsUser?.contact_number || 'N/A'}
            </p>
            <p className="mb-1">Address: {detailsUser?.address || 'N/A'}</p>
            <p className="mb-1">Payment Method: {detailsCart.payment_method}</p>
            <p className="mb-1">
              Date: {new Date(detailsCart.order_date).toLocaleDateString()}
            </p>

            <div className="flex justify-between">
              <div>
                <label>
                  Update Order Process:
                  <select
                    name="Status"
                    id="Status"
                    className="mb-5 ml-2 w-[180px] rounded-md border p-2"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    disabled={!getNextStatuses(detailsCart.status).length}
                  >
                    <option value={detailsCart.status} disabled>
                      {detailsCart.status} (current)
                    </option>
                    {getNextStatuses(detailsCart.status).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <button
                  className="mb-5 ml-2 cursor-pointer rounded-md border bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                  onClick={updateStatus}
                  disabled={
                    selectedStatus === detailsCart.status || !selectedStatus
                  }
                >
                  Update Status
                </button>
              </div>
            </div>

            <hr className="my-4" />

            <div>
              <h1 className="pb-1.5 text-2xl font-semibold">Order Items</h1>
              <table className="mb-5 w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border p-2">Product Id</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Unit Price</th>
                    <th className="border p-2">Sub Price</th>
                  </tr>
                </thead>
                <tbody>
                  {detailsCart.items?.map((item) => (
                    <tr key={item.product_id}>
                      <td className="border p-2">{item.product_id}</td>
                      <td className="border p-2">{item.quantity}</td>
                      <td className="border p-2">
                        ₱{item.unit_price.toFixed(2)}
                      </td>
                      <td className="border p-2">
                        ₱{item.subtotal.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr className="my-4" />

              <div>
                <h1 className="pt-5 text-2xl font-semibold">Order Summary</h1>
                <p className="mb-1">
                  Sub Total Amount: ₱{detailsCart.total_amount?.toFixed(2)}
                </p>
                <p className="mb-1">
                  Discount Amount: ₱{detailsCart.discount_amount?.toFixed(2)}
                </p>
                <p className="mb-1 font-bold">
                  Final Amount: ₱{detailsCart.total_amount?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
