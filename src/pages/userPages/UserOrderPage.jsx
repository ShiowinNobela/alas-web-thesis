import axios from 'axios';
import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OrdersTable from '@/components/tables/OrdersTable';
import { useSearchParams } from 'react-router-dom';
import OrderFiltersPanel from '@/components/filters/orderFilterSidebar';
import { toast } from 'sonner';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CancelOrderModal from '@/components/modals/CanceLOrderModal';

function UserViewOrderPage() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  const queryClient = useQueryClient();

  const fetchOrders = async () => {
    if (orderIdSearch) {
      try {
        const response = await axios.get(`/api/orders/${orderIdSearch}`);
        return [response.data.data];
      } catch (err) {
        if (err.response?.status === 404) {
          toast.warning(`Order ID "${orderIdSearch}" not found.`);
          return [];
        }
        throw err;
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

    const response = await axios.get(url);
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
      axios.put(`/api/orders/cancel/${orderId}`, { notes: note }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setShowCancelModal(false);
      setCancelNote('');
      setCancelingOrderId(null);
    },
    onError: () => {
      toast.error('Failed to cancel order.');
    },
  });

  const cancelOrder = () => {
    if (!cancelingOrderId || !cancelNote) {
      return;
    }
    cancelOrderMutation.mutate({ orderId: cancelingOrderId, note: cancelNote });
  };

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">Failed to load orders.</div>
    );
  }

  return (
    <TooltipProvider>
      <main className="bg-neutral min-h-screen pb-8 sm:pb-4">
        <div className="mx-auto max-w-6xl p-4 sm:py-8 md:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-6 text-center sm:mb-8">
            <div className="mb-2 flex flex-col items-start justify-center">
              <h1 className="text-content font-heading text-2xl font-semibold sm:text-3xl">
                Your Orders
              </h1>
              <p className="text-lighter text-base sm:text-lg">
                Track your recent orders and stay updated on their status in one
                place.
              </p>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="flex gap-6">
            {/* Desktop Sidebar - Hidden on mobile */}
            <div className="sticky top-4 hidden h-fit self-start lg:block">
              <OrderFiltersPanel order={orders} />
            </div>

            {/* Orders Table - Full width on mobile */}
            <div className="min-w-0 flex-1">
              {isLoading ? (
                <div className="bg-background text-lighter flex h-64 items-center justify-center rounded-lg border sm:h-96">
                  <div className="text-center">
                    <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                    <p className="text-sm sm:text-base">Loading orders...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <OrdersTable
                    orders={orders || []}
                    onCancelOrder={(id) => {
                      setCancelingOrderId(id);
                      setShowCancelModal(true);
                    }}
                  />
                  <div className="container mx-auto bg-gray-200"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Mobile Filter Button */}
        <div className="lg:hidden">
          <Button
            size="icon"
            className="fixed right-10 bottom-10 z-50 rounded-full shadow-lg"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>

          <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
            <DialogContent className="w-[90%] max-w-sm rounded-2xl p-0">
              <DialogHeader className="border-b p-4">
                <DialogTitle>Order Filters</DialogTitle>
              </DialogHeader>
              <div className="max-h-[70vh] overflow-y-auto px-2">
                <OrderFiltersPanel order={orders} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Cancel Order Modal */}
        <CancelOrderModal
          open={showCancelModal}
          onClose={() => {
            setShowCancelModal(false);
            setCancelNote('');
            setCancelingOrderId(null);
          }}
          note={cancelNote}
          onNoteChange={setCancelNote}
          onConfirm={cancelOrder}
        />
      </main>
    </TooltipProvider>
  );
}

export default UserViewOrderPage;
