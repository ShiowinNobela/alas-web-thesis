import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import OrderFiltersPanel from '@/components/filters/orderFilterSidebar';
import { toast } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CancelOrderModal from '@/components/modals/CanceLOrderModal';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorState from '@/components/States/ErrorState';
import OrdersCard from '@/components/cards/OrdersCard';
import { useCancelOrder } from '@/hooks/useCancelOrder';
import { fetchOrders } from '@/api/userOrders';
import RefundOrderModal from '@/components/modals/RefundOrderModal';
import { useRefundOrder } from '@/hooks/useRefundOrder';
import { useReturnOrder } from '@/hooks/useReturnOrder';
import ReturnOrderModal from '@/components/modals/ReturnOrderModal';

function UserViewOrderPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams] = useSearchParams();

  const orderIdSearch = searchParams.get('order_id');
  const statusFilters = useMemo(() => searchParams.getAll('status'), [searchParams]);
  const paymentFilters = useMemo(() => searchParams.getAll('payment_method'), [searchParams]);
  const monthYearFilter = useMemo(() => searchParams.get('month_year'), [searchParams]);

  const { showCancelModal, setShowCancelModal, cancelNote, setCancelNote, setCancelingOrderId, cancelOrder, reset } =
    useCancelOrder();
  const {
    showRefundModal,
    setShowRefundModal,
    refundReason,
    setRefundReason,
    contactNumber,
    setContactNumber,
    setRefundingOrderId,
    requestRefund,
    reset: resetRefund,
  } = useRefundOrder();
  const {
    showReturnModal,
    setShowReturnModal,
    returnReason,
    setReturnReason,
    contactNumber: returnContactNumber,
    setContactNumber: setReturnContactNumber,
    setReturningOrderId,
    requestReturn,
    reset: resetReturn,
  } = useReturnOrder();

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orders', statusFilters, paymentFilters, orderIdSearch, monthYearFilter],
    queryFn: async () => {
      try {
        return await fetchOrders({ orderIdSearch, statusFilters, paymentFilters, monthYearFilter });
      } catch (err) {
        if (err.isNotFound) toast.warning(err.message);
        throw err;
      }
    },
    keepPreviousData: true,
  });

  if (isError) {
    return <div className="p-8 text-center text-red-600">Failed to load orders.</div>;
  }

  return (
    <TooltipProvider>
      <main className="bg-neutral min-h-screen pb-8 sm:pb-4">
        <div className="mx-auto max-w-6xl p-4 sm:py-8 md:px-6 lg:px-8">
          <div className="mb-6 text-center sm:mb-8">
            <div className="mb-2 flex flex-col items-start justify-center">
              <h1 className="text-content font-heading text-2xl font-semibold sm:text-3xl">Your Orders</h1>
              <p className="text-lighter text-base sm:text-lg">
                Track your recent orders and stay updated on their status in one place.
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="hidden self-start lg:block">
              <OrderFiltersPanel />
            </div>

            <div className="min-w-0 flex-1">
              {isLoading ? (
                <TableSkeleton columns={6} rows={10} />
              ) : isError ? (
                <ErrorState error={isError} onRetry={refetch} title="Failed to load Orders" retryText="Retry Request" />
              ) : (
                <div className="space-y-4">
                  <OrdersCard
                    orders={orders || []}
                    onCancelOrder={(id) => {
                      setCancelingOrderId(id);
                      setShowCancelModal(true);
                    }}
                    onRefundOrder={(id) => {
                      setRefundingOrderId(id);
                      setShowRefundModal(true);
                    }}
                    onReturnOrder={(id) => {
                      setReturningOrderId(id);
                      setShowReturnModal(true);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

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
              <div className="max-h-[70vh] px-2">
                <OrderFiltersPanel />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <CancelOrderModal
          open={showCancelModal}
          onClose={reset}
          note={cancelNote}
          onNoteChange={setCancelNote}
          onConfirm={cancelOrder}
        />
        <RefundOrderModal
          open={showRefundModal}
          onClose={resetRefund}
          reason={refundReason}
          onReasonChange={setRefundReason}
          contactNumber={contactNumber}
          onContactChange={setContactNumber}
          onConfirm={requestRefund}
        />
        <ReturnOrderModal
          open={showReturnModal}
          onClose={resetReturn}
          reason={returnReason}
          onReasonChange={setReturnReason}
          contactNumber={returnContactNumber}
          onContactChange={setReturnContactNumber}
          onConfirm={requestReturn}
        />
      </main>
    </TooltipProvider>
  );
}

export default UserViewOrderPage;
