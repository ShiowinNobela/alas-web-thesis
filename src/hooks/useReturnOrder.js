import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export function useReturnOrder() {
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [returningOrderId, setReturningOrderId] = useState(null);

  const queryClient = useQueryClient();

  const returnMutation = useMutation({
    mutationFn: async ({ orderId, reason, contactNumber }) => {
      const res = await axios.post(`/api/returns/request/${orderId}`, {
        reason,
        contact_number: contactNumber,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Return request submitted successfully!');
      queryClient.invalidateQueries(['orders']);
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to submit return request.');
    },
  });

  const requestReturn = () => {
    const reason = returnReason.trim();
    const contact = contactNumber.trim();

    if (!returningOrderId) {
      toast.warning('Missing order ID.');
      return;
    }
    if (!reason || !contact) {
      toast.warning('Please fill in all required fields.');
      return;
    }

    returnMutation.mutate({ orderId: returningOrderId, reason, contactNumber: contact });
  };

  const reset = () => {
    setShowReturnModal(false);
    setReturnReason('');
    setContactNumber('');
    setReturningOrderId(null);
    returnMutation.reset();
  };

  return {
    showReturnModal,
    setShowReturnModal,
    returnReason,
    setReturnReason,
    contactNumber,
    setContactNumber,
    returningOrderId,
    setReturningOrderId,
    requestReturn,
    reset,
    returnMutation,
  };
}
