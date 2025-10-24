import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cancelOrderApi } from '@/api/userOrders';

export function useCancelOrder() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const queryClient = useQueryClient();

  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order cancelled successfully.');
      resetCancelState();
    },
    onError: () => {
      toast.error('Failed to cancel order.');
    },
  });

  const resetCancelState = () => {
    setShowCancelModal(false);
    setCancelNote('');
    setCancelingOrderId(null);
  };

  const cancelOrder = () => {
    if (!cancelingOrderId || !cancelNote) return;
    cancelOrderMutation.mutate({ orderId: cancelingOrderId, note: cancelNote });
  };

  return {
    showCancelModal,
    setShowCancelModal,
    cancelNote,
    setCancelNote,
    cancelingOrderId,
    setCancelingOrderId,
    cancelOrder,
    resetCancelState,
  };
}
