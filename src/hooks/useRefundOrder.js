import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export function useRefundOrder() {
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [refundingOrderId, setRefundingOrderId] = useState(null);

  const queryClient = useQueryClient();

  const refundMutation = useMutation({
    mutationFn: async ({ orderId, reason, contactNumber }) => {
      const res = await axios.post(`/api/refunds/request/${orderId}`, {
        reason,
        contact_number: contactNumber,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Refund request submitted successfully!');
      queryClient.invalidateQueries(['orders']);
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to submit refund request.');
    },
  });

  const requestRefund = () => {
    const reason = refundReason.trim();
    const contact = contactNumber.trim();

    if (refundMutation.isLoading) return;

    // Validate properly
    if (!refundingOrderId) {
      toast.warning('Missing order ID.');
      return;
    }
    if (!reason || !contact) {
      toast.warning('Please fill in all required fields.');
      return;
    }

    refundMutation.mutate({ orderId: refundingOrderId, reason, contactNumber: contact });
  };

  const reset = () => {
    setShowRefundModal(false);
    setRefundReason('');
    setContactNumber('');
    setRefundingOrderId(null);
  };

  return {
    showRefundModal,
    setShowRefundModal,
    refundReason,
    setRefundReason,
    contactNumber,
    setContactNumber,
    refundingOrderId,
    setRefundingOrderId,
    requestRefund,
    reset,
    refundMutation,
  };
}
