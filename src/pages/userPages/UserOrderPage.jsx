import axios from 'axios';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OrdersTable from '../../components/bigComponents/OrdersTable';
import { useSearchParams } from 'react-router-dom';
import OrderFiltersPanel from '@/components/bigComponents/orderFilterSidebar';
import { useMemo } from 'react';
import { toast, Toaster } from 'sonner';
import CancelOrderModal from '@/components/modals/cancelOrderModal';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
    <TooltipProvider>
      <main className="bg-neutral min-h-screen pb-8 sm:pb-4">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:py-8 md:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-6 text-center sm:mb-8">
            <div className="mb-2 flex items-center justify-center">
              <h1 className="text-content font-heading text-2xl font-semibold sm:text-3xl">
                Your Orders
              </h1>
            </div>
            <p className="text-lighter text-base sm:text-lg max-w-2xl mx-auto">
              Track your recent orders and stay updated on their status in one place.
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <div className="flex flex-col">
              <p className="text-content text-sm font-medium">
                {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
              </p>
              {(statusFilters.length > 0 || paymentFilters.length > 0) && (
                <p className="text-xs text-gray-500 mt-1">
                  {statusFilters.length + paymentFilters.length} filter{statusFilters.length + paymentFilters.length > 1 ? 's' : ''} applied
                </p>
              )}
            </div>
            <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 relative">
                  <Filter className="h-4 w-4" />
                  Filters
                  {(statusFilters.length > 0 || paymentFilters.length > 0) && (
                    <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs min-w-[20px] h-5 flex items-center justify-center">
                      {statusFilters.length + paymentFilters.length}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm p-0 max-h-[85vh] flex flex-col">
                <DialogHeader className="border-b p-4 flex-shrink-0">
                  <DialogTitle className="text-left">Filter Orders</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4">
                  <OrderFiltersPanel order={orders} />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Desktop Order Count */}
          <div className="mb-4 hidden lg:block">
            <p className="text-content text-sm">
              Showing {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              {(statusFilters.length > 0 || paymentFilters.length > 0) && (
                <span className="text-gray-500 ml-2">
                  ({statusFilters.length + paymentFilters.length} filter{statusFilters.length + paymentFilters.length > 1 ? 's' : ''} applied)
                </span>
              )}
            </p>
          </div>

          {/* Main Content Layout */}
          <div className="flex gap-6">
            {/* Desktop Sidebar - Hidden on mobile */}
            <div className="sticky top-4 hidden h-fit self-start lg:block">
              <OrderFiltersPanel order={orders} />
            </div>

            {/* Orders Table - Full width on mobile */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="bg-background flex h-64 items-center justify-center rounded-lg border text-gray-500 sm:h-96">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
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
                </div>
              )}
            </div>
          </div>
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
        
        {/* Toast Notifications */}
        <Toaster 
          richColors 
          position="top-center"
          toastOptions={{
            className: 'sm:max-w-md',
            duration: 4000,
          }}
        />
      </main>
    </TooltipProvider>
  );
}

export default UserViewOrderPage;
