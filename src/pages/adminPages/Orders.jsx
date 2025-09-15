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
import EmptyState from '@/components/States/EmptyState';
import ErrorState from '@/components/States/ErrorState';
import OrderReportPDF from '@/components/ReportFormats/OrderReportPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

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
  }, [searchId, refetchOrders, orders.length])

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

          <div className="flex items-center justify-between p-4">
          <AdminOrderFilters
            onRefresh={handleRefresh}
            onSearch={handleSearchById}
            searchId={searchId}
            setSearchId={setSearchId}
            isLoading={isOrdersLoading}
          />
          {sortedOrders.length > 0 && (
            <PDFDownloadLink
              document={
                <OrderReportPDF
                  orders={sortedOrders}
                  startDate={startDate}
                  endDate={endDate}
                />
              }
              fileName={`orders-${startDate || 'all'}-to-${endDate || 'all'}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <button className="text-gray-700 bg-gray-300 rounded">
                    Preparing...
                  </button>
                ) : (
                  <button className="text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                    Download PDF
                  </button>
                )
              }
            </PDFDownloadLink>
          )}
          </div>
          

          {isOrdersLoading ? (
          <TableSkeleton columns={4} rows={10} />
          ) : 
            isOrdersError ? (
              <ErrorState 
                error={isOrdersError}
                onRetry={refetchOrders}
                title="Failed to load orders"
                retryText="Retry Request"
              />  
          ) : sortedOrders.length === 0 ? (
            <>
              <EmptyState
                  title="No Orders Found"
                  description="No orders in the system."
                  icon={<Bug className="w-6 h-6" />}
                  onAction={handleRefresh} />
              <button
                onClick={handleRefresh}
                  className="px-4 py-2 mt-4 text-sm text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                >
                  Clear Filters
              </button>
            </>
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
