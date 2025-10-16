import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { moveToProcessingApi, moveToShippingApi, moveToDeliveredApi, cancelOrderApi } from '@/api/orders';

export function useOrderStatusUpdate() {
  const queryClient = useQueryClient();

  const [statusUpdateModal, setStatusUpdateModal] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [confirmButtonLabel, setConfirmButtonLabel] = useState('');
  const [cancelRequested, setCancelRequested] = useState(false);

  // Mutation logic reused across pages
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, data }) => {
      const { status, notes, cancelRequested } = data;

      if (cancelRequested) return await cancelOrderApi(orderId, { notes });

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

      resetModal();

      if (cancelRequested) {
        toast.success('Order has been successfully cancelled.', { id: 'update-status-toast' });
      } else {
        const messages = {
          processing: 'Order status updated: Now Processing.',
          shipping: 'Order status updated: Shipped.',
          delivered: 'Order status updated: Delivered.',
        };
        toast.success(messages[status] || 'Order status updated.', { id: 'update-status-toast' });
      }
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Failed to update order status.';
      toast.error(message, { id: 'update-status-toast' });
    },
  });

  const handleStatusUpdate = (orderId, note, status) => {
    updateStatusMutation.mutate({
      orderId,
      data: { status, notes: note, cancelRequested },
    });
  };

  const handleStatusUpdateClick = (orderId, status, modalTitle, confirmLabel, cancelRequested = false) => {
    setStatusUpdateModal(true);
    setUpdatingId(orderId);
    setUpdateStatus(status);
    setCancelRequested(cancelRequested);
    setModalTitle(cancelRequested ? 'Confirm Cancellation' : modalTitle);
    setConfirmButtonLabel(cancelRequested ? 'Cancel Order' : confirmLabel);
  };

  const resetModal = () => {
    setStatusUpdateModal(false);
    setAdminNote('');
    setUpdatingId(null);
    setUpdateStatus('');
    setModalTitle('');
    setConfirmButtonLabel('');
  };

  return {
    // state
    statusUpdateModal,
    updatingId,
    updateStatus,
    adminNote,
    modalTitle,
    confirmButtonLabel,
    cancelRequested,

    // setters
    setAdminNote,
    setStatusUpdateModal,

    // mutation
    updateStatusMutation,

    // handlers
    handleStatusUpdate,
    handleStatusUpdateClick,
    resetModal,
  };
}
