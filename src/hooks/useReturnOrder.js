import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export function useReturnOrder() {
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [returningOrderId, setReturningOrderId] = useState(null);
  const [returnImage, setReturnImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
    onError: (err) => {
      toast.error('Failed to upload image.');
    },
  });

  const returnMutation = useMutation({
    mutationFn: async ({ orderId, reason, contactNumber, imageUrl }) => {
      const res = await axios.post(`/api/returns/request/${orderId}`, {
        reason,
        contact_number: contactNumber,
        image_url: imageUrl,
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

  const requestReturn = async () => {
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

    let imageUrl = null;

    if (returnImage) {
      setUploadingImage(true);
      try {
        const uploadResult = await uploadMutation.mutateAsync(returnImage);
        imageUrl = uploadResult.data.url;
      } catch (error) {
        toast.error('Failed to upload image. Please try again.');
        setUploadingImage(false);
        return;
      }
      setUploadingImage(false);
    }

    returnMutation.mutate({
      orderId: returningOrderId,
      reason,
      contactNumber: contact,
      imageUrl,
    });
  };

  const reset = () => {
    setShowReturnModal(false);
    setReturnReason('');
    setContactNumber('');
    setReturningOrderId(null);
    setReturnImage(null);
    setUploadingImage(false);
    returnMutation.reset();
    uploadMutation.reset();
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
    returnImage,
    setReturnImage,
    uploadingImage,
    requestReturn,
    reset,
    returnMutation,
  };
}
