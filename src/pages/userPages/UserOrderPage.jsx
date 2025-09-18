import axios from 'axios';
import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import OrdersTable from '@/components/cards/OrdersCard';
import { useSearchParams } from 'react-router-dom';
import OrderFiltersPanel from '@/components/filters/orderFilterSidebar';
import { toast } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CancelOrderModal from '@/components/modals/CanceLOrderModal';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import ErrorState from '@/components/States/ErrorState';

function UserViewOrderPage() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [searchParams] = useSearchParams();
  const orderIdSearch = searchParams.get('order_id');

  const statusFilters = useMemo(() => searchParams.getAll('status'), [searchParams]);
  const paymentFilters = useMemo(() => searchParams.getAll('payment_method'), [searchParams]);

  const monthYearFilter = useMemo(() => searchParams.get('month_year'), [searchParams]);

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

    const statusQuery = statusFilters.map((status) => `status=${encodeURIComponent(status)}`).join('&');
    const paymentQuery = paymentFilters.map((p) => `payment_method=${encodeURIComponent(p)}`).join('&');

    const monthYearQuery = monthYearFilter ? `month_year=${encodeURIComponent(monthYearFilter)}` : '';

    const queryString = [statusQuery, paymentQuery, monthYearQuery].filter(Boolean).join('&');
    const url = `/api/orders${queryString ? `?${queryString}` : ''}`;

    const response = await axios.get(url);
    return response.data.data;
  };

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orders', statusFilters, paymentFilters, orderIdSearch, monthYearFilter],
    queryFn: fetchOrders,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const cancelOrderMutation = useMutation({
    mutationFn: ({ orderId, note }) => axios.put(`/api/orders/cancel/${orderId}`, { notes: note }),
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
    return <div className="p-8 text-center text-red-600">Failed to load orders.</div>;
  }

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <main className="bg-neutral min-h-screen pb-8 sm:pb-4">
          <div className="mx-auto max-w-6xl p-4 sm:py-8 md:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-6 text-center sm:mb-8">
              <div className="mb-2 flex flex-col items-start justify-center">
                <h1 className="text-content font-heading text-2xl font-semibold sm:text-3xl">Your Orders</h1>
                <p className="text-lighter text-base sm:text-lg">
                  Track your recent orders and stay updated on their status in one place.
                </p>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="flex gap-6">
              {/* Desktop Sidebar - Hidden on mobile */}
              <div className="sticky top-4 hidden h-fit self-start lg:block">
                <OrderFiltersPanel />
              </div>

              {/* Orders Table - Full width on mobile */}
              <div className="min-w-0 flex-1">
                {isLoading ? (
                  <TableSkeleton columns={6} rows={10} />
                ) : isError ? (
                  <ErrorState
                    error={isError}
                    onRetry={refetch}
                    title="Failed to load Orders"
                    retryText="Retry Request"
                  />
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
                  <OrderFiltersPanel />
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
    </ErrorBoundary>
  );
}

export default UserViewOrderPage;
