import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { toast, Toaster } from 'sonner';

import {
  fetchOrders,
  fetchOrderById,
  fetchOrderHistory as fetchOrderHistoryApi,
  updateOrderStatus as updateOrderStatusApi,
  fetchOrderSummary,
  fetchLast30OrderSummary,
} from '@/api/orderService';
import OrderHistoryModal from '@/components/modals/orderHistoryModal';
import StatusUpdateModal from '@/components/modals/statusUpdateModal';
import OrderSummary from '@/components/bigComponents/OrderSummary';
import AdminOrderFilters from '@/components/filters/AdminOrderFilter';
import AdminOrdersTable from '@/components/tables/AdminOrdersTable';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import { el } from 'date-fns/locale';

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
  const [showInfoModal, setShowInfoModal] = useState(false);
 

  const { data: orders = [], refetch: refetchOrders, isLoading: isOrdersLoading, isError: isOrdersError } = useQuery({
    queryKey: ['orders', status, startDate, endDate, searchId],
    queryFn: () => {
      if (searchId) {
        return fetchOrderById(searchId.trim()).then((order) =>
          order ? [order] : []
        );
      }
      return fetchOrders(
        status,
        startDate ? new Date(startDate) : null,
        endDate ? new Date(endDate) : null
      );
    },
  });

  const { data: summaryData = [], isLoading: isSummaryLoading, isError: isSummaryError } = useQuery({
    queryKey: ['orderSummary', startDate, endDate],
    queryFn: () =>
      fetchOrderSummary(
        startDate ? new Date(startDate) : null,
        endDate ? new Date(endDate) : null
      ),
    enabled: !!startDate && !!endDate,
  });

  const { data: last30SummaryData = [], isLoading: isLast30SummaryLoading, isError: isLast30SummaryError } = useQuery({
    queryKey: ['last30OrderSummary'],
    queryFn: fetchLast30OrderSummary,
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
      return sortConfig.direction === 'asc'
        ? a.total_amount - b.total_amount
        : b.total_amount - a.total_amount;
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

  const handleStatusUpdateClick = (
    orderId,
    status,
    modalTitle,
    confirmButtonLabel
  ) => {
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

  const isLoading = isOrdersLoading || isSummaryLoading || isLast30SummaryLoading;

  return (
    <>
      <Toaster richColors />
      <div className="flex flex-col overflow-x-auto bg-admin">
        <main className="flex flex-col w-full gap-4 p-4">
          <OrderSummary
            summaryData={summaryData}
            last30SummaryData={last30SummaryData}
            startDate={startDate}
            endDate={endDate}
            onRefresh={handleRefresh}
            onShowInfoModal={() => setShowInfoModal(true)}
            isLoading={isSummaryLoading || isLast30SummaryLoading}
            isError={isSummaryError || isLast30SummaryError}
          />

          <AdminOrderFilters
            onRefresh={handleRefresh}
            onSearch={handleSearchById}
            searchId={searchId}
            setSearchId={setSearchId}
            isLoading={isOrdersLoading}
          />

          {isOrdersLoading ? (
            <TableSkeleton columns={7} rows={10} />
          ) : isOrdersError ? (
            <div className="flex items-center justify-center p-6 text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[200px]">
              <div className="text-center">
                <p className="font-medium">Failed to load orders</p>
                <p className="mt-1 text-sm">Please try again later</p>
                <button 
                  onClick={() => refetchOrders()} 
                  className="px-4 py-2 mt-3 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : sortedOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 text-gray-500 bg-white rounded-lg shadow-sm ring-1 min-h-[200px]">
              <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg font-medium">No orders found</p>
              {searchId ? (
                <p className="mt-1 text-sm">No order found with ID: {searchId}</p>
              ) : status || startDate || endDate ? (
                <p className="mt-1 text-sm">Try adjusting your filters</p>
              ) : null}
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 mt-4 text-sm text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
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
          onConfirm={() =>
            handleStatusUpdate(updatingId, adminNote, updateStatus)
          }
          confirmButtonLabel={confirmButtonLabel}
          showImageUpload={
            updateStatus === 'shipping' || updateStatus === 'delivered'
          }
          uploadedImage={uploadedImage}
          onImageUpload={setUploadedImage}
          isLoading={updateStatusMutation.isPending}
        />
      </div>
    </>
  );
}

export default AdminViewOrderPage;
