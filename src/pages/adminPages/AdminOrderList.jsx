import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  fetchOrders,
  fetchOrderById,
  fetchOrderHistory as fetchOrderHistoryApi,
  moveToProcessingApi,
  moveToShippingApi,
  moveToDeliveredApi,
  cancelOrderApi,
} from '@/api/orders';
import OrderHistoryModal from '@/components/modals/orderHistoryModal';
import StatusUpdateModal from '@/components/modals/statusUpdateModal';
import AdminOrderFilters from '@/components/filters/AdminOrderFilter';
import AdminOrdersTable from '@/components/tables/AdminOrdersTable';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import OrderSummary from '@/components/bigComponents/OrderSummary';

function AdminViewOrderPage() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || null;
  const endDate = searchParams.get('endDate') || null;
  const [cancelRequested, setCancelRequested] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [statusUpdateModal, setStatusUpdateModal] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [confirmButtonLabel, setConfirmButtonLabel] = useState('');
  const [searchId, setSearchId] = useState('');

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

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, data }) => {
      const { status, notes, cancelRequested } = data;

      if (cancelRequested) {
        return await cancelOrderApi(orderId, { notes });
      }

      switch (status) {
        case 'processing':
          return await moveToProcessingApi(orderId, { notes });
        case 'shipping':
          return await moveToShippingApi(orderId, { notes });
        case 'delivered':
          return await moveToDeliveredApi(orderId, { notes });
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    },
    onMutate: () => {
      toast.loading('Updating order status...', { id: 'update-status-toast' });
    },
    onSuccess: (_data, variables) => {
      const { data } = variables;
      const { status, cancelRequested } = data;

      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['orderSummary']);
      queryClient.invalidateQueries(['last30OrderSummary']);
      setStatusUpdateModal(false);
      setAdminNote('');
      setUpdatingId(null);
      setUpdateStatus('');
      setModalTitle('');
      setConfirmButtonLabel('');

      if (cancelRequested) {
        toast.success('Order has been successfully cancelled.', { id: 'update-status-toast' });
      } else {
        switch (status) {
          case 'processing':
            toast.success('Order status updated: Now Processing.', { id: 'update-status-toast' });
            break;
          case 'shipping':
            toast.success('Order status updated: Shipped.', { id: 'update-status-toast' });
            break;
          case 'delivered':
            toast.success('Order status updated: Delivered.', { id: 'update-status-toast' });
            break;
          default:
            toast.success('Order status updated.', { id: 'update-status-toast' });
        }
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to update order status.';
      toast.error(message, { id: 'update-status-toast' });
    },
  });

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortConfig.key === 'date') {
      const dateA = new Date(a.order_date);
      const dateB = new Date(b.order_date);
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortConfig.key === 'total') {
      return sortConfig.direction === 'asc' ? a.total_amount - b.total_amount : b.total_amount - a.total_amount;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

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

  const handleStatusUpdate = (orderId, note, status) => {
    updateStatusMutation.mutate({
      orderId,
      data: { status, notes: note, cancelRequested },
    });
  };

  const handleStatusUpdateClick = (orderId, status, modalTitle, confirmButtonLabel, cancelRequested = false) => {
    setStatusUpdateModal(true);
    setUpdatingId(orderId);
    setUpdateStatus(status);
    setCancelRequested(cancelRequested);

    if (cancelRequested) {
      setModalTitle('Confirm Cancellation');
      setConfirmButtonLabel('Cancel Order');
    } else {
      setModalTitle(modalTitle);
      setConfirmButtonLabel(confirmButtonLabel);
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
    <>
      <div className="bg-admin flex min-h-screen flex-col overflow-x-auto">
        <main className="flex w-full flex-col gap-4 p-4">
          <OrderSummary startDate={startDate} endDate={endDate} onRefresh={handleRefresh} />

          <AdminOrderFilters
            onRefresh={handleRefresh}
            onSearch={handleSearchById}
            searchId={searchId}
            setSearchId={setSearchId}
            orders={sortedOrders}
            isLoading={isOrdersLoading}
          />

          {isOrdersLoading ? (
            <TableSkeleton rows={3} />
          ) : sortedOrders.length === 0 ? (
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
              orders={sortedOrders}
              sortConfig={sortConfig}
              handleSort={handleSort}
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

        <StatusUpdateModal
          show={statusUpdateModal}
          title={modalTitle}
          orderId={updatingId}
          textareaValue={adminNote}
          onTextareaChange={(e) => setAdminNote(e.target.value)}
          onCancel={() => {
            setStatusUpdateModal(false);
          }}
          onConfirm={() => handleStatusUpdate(updatingId, adminNote, updateStatus)}
          confirmButtonLabel={confirmButtonLabel}
          isLoading={updateStatusMutation.isPending}
        />
      </div>
    </>
  );
}

export default AdminViewOrderPage;
