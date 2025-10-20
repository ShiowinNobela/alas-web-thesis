import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { fetchOrders, fetchOrderById, fetchOrderHistory as fetchOrderHistoryApi } from '@/api/orders';

import OrderHistoryModal from '@/components/modals/orderHistoryModal';
import StatusUpdateModal from '@/components/modals/statusUpdateModal';
import AdminOrderFilters from '@/components/filters/AdminOrderFilter';
import AdminOrdersTable from '@/components/tables/AdminOrdersTable';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import OrderSummary from '@/components/bigComponents/OrderSummary';
import { useOrderStatusUpdate } from '@/hooks/useOrderStatusUpdate';

function AdminViewOrderPage() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || null;
  const endDate = searchParams.get('endDate') || null;

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [searchId, setSearchId] = useState('');

  const {
    statusUpdateModal,
    updatingId,
    updateStatus,
    adminNote,
    modalTitle,
    confirmButtonLabel,
    setAdminNote,
    setStatusUpdateModal,
    updateStatusMutation,
    handleStatusUpdate,
    handleStatusUpdateClick,
  } = useOrderStatusUpdate();

  // 📦 Fetch orders
  const {
    data: orders = [],
    refetch: refetchOrders,
    isLoading: isOrdersLoading,
  } = useQuery({
    queryKey: ['orders', status, startDate, endDate, searchId],
    queryFn: () => {
      if (searchId) {
        return fetchOrderById(searchId.trim()).then((order) => (order ? [order] : []));
      }
      return fetchOrders(status, startDate ? new Date(startDate) : null, endDate ? new Date(endDate) : null);
    },
  });

  const fetchOrderHistory = async (orderId) => {
    try {
      const data = await fetchOrderHistoryApi(orderId);
      setHistoryData(data);
      setShowHistoryModal(true);
    } catch (err) {
      console.error('Failed to fetch order history:', err);
      toast.error('Failed to fetch order status history.');
    }
  };

  const handleRefresh = useCallback(() => {
    setSearchId('');
    queryClient.invalidateQueries(['orders']);
    queryClient.invalidateQueries(['orderSummary']);
    queryClient.invalidateQueries(['last30OrderSummary']);
    toast.info('Data refreshed');
  }, [queryClient]);

  const handleSearchById = useCallback(() => {
    const trimmedId = searchId.trim();
    if (!trimmedId) {
      refetchOrders();
      return;
    }
    toast.loading('Searching for order...');
    refetchOrders().finally(() => {
      toast.dismiss();
      if (orders.length === 0) {
        toast.error('No order found with that ID.');
      } else {
        toast.success('Order found.');
      }
    });
  }, [searchId, refetchOrders, orders.length]);

  return (
    <div className="bg-admin flex min-h-screen flex-col overflow-x-auto">
      <main className="flex w-full flex-col gap-4 p-4">
        <OrderSummary startDate={startDate} endDate={endDate} onRefresh={handleRefresh} />

        <AdminOrderFilters
          onRefresh={handleRefresh}
          onSearch={handleSearchById}
          searchId={searchId}
          setSearchId={setSearchId}
          orders={orders}
          isLoading={isOrdersLoading}
        />

        {isOrdersLoading ? (
          <TableSkeleton rows={3} />
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-gray-600">
            <p>No orders found.</p>
            <button
              onClick={handleRefresh}
              className="mt-4 rounded-md bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <AdminOrdersTable
            orders={orders}
            getStatusColor={getStatusStyle}
            onStatusUpdateClick={handleStatusUpdateClick}
            onViewHistory={fetchOrderHistory}
          />
        )}
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

      {StatusUpdateModal && (
        <StatusUpdateModal
          show={statusUpdateModal}
          title={modalTitle}
          orderId={updatingId}
          textareaValue={adminNote}
          onTextareaChange={(e) => setAdminNote(e.target.value)}
          onCancel={() => setStatusUpdateModal(false)}
          onConfirm={() => handleStatusUpdate(updatingId, adminNote, updateStatus)}
          confirmButtonLabel={confirmButtonLabel}
          isLoading={updateStatusMutation.isPending}
        />
      )}
    </div>
  );
}

export default AdminViewOrderPage;
