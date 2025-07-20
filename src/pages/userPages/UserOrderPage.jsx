import axios from 'axios';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OrdersTable from '../../components/bigComponents/OrdersTable';
import { useSearchParams } from 'react-router-dom';
import OrderFiltersPanel from '@/components/bigComponents/orderFilterSidebar';
import { useMemo } from 'react';
import { toast, Toaster } from 'sonner';
import CancelOrderModal from '@/components/modals/cancelOrderModal';

function UserViewOrderPage() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [cancelingOrderId, setCancelingOrderId] = useState(null);

  const [searchParams] = useSearchParams();
  const orderIdSearch = searchParams.get('order_id');

  const statusFilters = useMemo(
    () => searchParams.getAll('status'),
    [searchParams]
  );
  const paymentFilters = useMemo(
    () => searchParams.getAll('payment_method'),
    [searchParams]
  );

  const user = JSON.parse(window.localStorage.getItem('user'));
  const queryClient = useQueryClient();

  const fetchOrders = async () => {
    if (orderIdSearch) {
      try {
        const response = await axios.get(`/api/orders/${orderIdSearch}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        return [response.data.data]; // wrap in array
      } catch (err) {
        if (err.response?.status === 404) {
          toast.warning(`Order ID "${orderIdSearch}" not found.`);
          return []; // no order found
        }
        throw err; // for other errors, still fail
      }
    }

    const statusQuery = statusFilters
      .map((status) => `status=${encodeURIComponent(status)}`)
      .join('&');
    const paymentQuery = paymentFilters
      .map((p) => `payment_method=${encodeURIComponent(p)}`)
      .join('&');

    const queryString = [statusQuery, paymentQuery].filter(Boolean).join('&');

    const url = `/api/orders${queryString ? `?${queryString}` : ''}`;

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
    queryKey: ['orders', statusFilters, paymentFilters, orderIdSearch],
    queryFn: fetchOrders,
    keepPreviousData: true,
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

  const cancelOrder = () => {
    if (!cancelingOrderId || !cancelNote) return;
    cancelOrderMutation.mutate({ orderId: cancelingOrderId, note: cancelNote });
  };

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">Failed to load orders.</div>
    );
  }

  return (
    <>
      <main className="bg-neutral h-full py-4 pb-40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
          <h1 className="font-heading text-content py-4 text-2xl font-semibold">
            Your Orders List
          </h1>

          <div className="flex h-[calc(100vh-4rem)] gap-2">
            <div className="sticky top-4 h-fit self-start">
              <OrderFiltersPanel order={orders} />
            </div>

            {/* RIGHT: Orders Table */}
            <div className="flex-1 overflow-y-auto px-2 py-1">
              {isLoading ? (
                <div className="flex h-full items-center justify-center text-gray-500">
                  Loading orders...
                </div>
              ) : (
                <OrdersTable
                  orders={orders}
                  onCancelOrder={(id) => {
                    setCancelingOrderId(id);
                    setShowCancelModal(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <CancelOrderModal
          open={showCancelModal}
          onClose={() => {
            setShowCancelModal(false);
            setCancelNote('');
          }}
          note={cancelNote}
          onNoteChange={setCancelNote}
          onConfirm={cancelOrder}
        />
        <Toaster richColors />
      </main>
    </>
  );
}

export default UserViewOrderPage;
