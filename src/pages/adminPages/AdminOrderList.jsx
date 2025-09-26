import { useState, useCallback, lazy, Suspense } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

import {
  fetchOrders,
  fetchOrderById,
  fetchOrderHistory as fetchOrderHistoryApi,
  updateOrderStatus as updateOrderStatusApi,
} from '@/api/orders';
import OrderHistoryModal from '@/components/modals/orderHistoryModal';
import StatusUpdateModal from '@/components/modals/statusUpdateModal';
const OrderSummary = lazy(() => import('@/components/bigComponents/OrderSummary'));
import AdminOrderFilters from '@/components/filters/AdminOrderFilter';
import AdminOrdersTable from '@/components/tables/AdminOrdersTable';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

function AdminViewOrderPage() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || null;
  const endDate = searchParams.get('endDate') || null;

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
  const [uploadedImage, setUploadedImage] = useState('');

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
    mutationFn: ({ orderId, data }) => updateOrderStatusApi(orderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['orderSummary']);
      queryClient.invalidateQueries(['last30OrderSummary']);
      setStatusUpdateModal(false);
      setAdminNote('');
      setUpdatingId(null);
      setUpdateStatus('');
      setModalTitle('');
      setConfirmButtonLabel('');
      setUploadedImage('');
      toast.success('Order status updated successfully');
    },
    onError: (error) => {
      console.error('Status update failed:', error);
      toast.error('Failed to update order status.');
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
      data: { status, note, image: uploadedImage },
    });
  };

  const handleStatusUpdateClick = (orderId, status, modalTitle, confirmButtonLabel) => {
    setStatusUpdateModal(true);
    setUpdatingId(orderId);
    setUpdateStatus(status);
    setModalTitle(modalTitle);
    setConfirmButtonLabel(confirmButtonLabel);
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
      <Toaster richColors />
      <div className="bg-admin flex min-h-screen flex-col overflow-x-auto">
        <main className="flex w-full flex-col gap-4 p-4">
          <Suspense fallback={<div className="p-4">Loading summary...</div>}>
            <OrderSummary startDate={startDate} endDate={endDate} onRefresh={handleRefresh} />
          </Suspense>

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
          textareaValue={adminNote}
          onTextareaChange={(e) => setAdminNote(e.target.value)}
          onCancel={() => {
            setStatusUpdateModal(false);
            setUploadedImage('');
          }}
          onConfirm={() => handleStatusUpdate(updatingId, adminNote, updateStatus)}
          confirmButtonLabel={confirmButtonLabel}
          showImageUpload={updateStatus === 'shipping' || updateStatus === 'delivered'}
          uploadedImage={uploadedImage}
          onImageUpload={setUploadedImage}
          isLoading={updateStatusMutation.isPending}
        />
      </div>
    </>
  );
}

export default AdminViewOrderPage;
