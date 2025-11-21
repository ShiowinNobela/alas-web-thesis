import { Modal, ModalBody, ModalHeader, TextInput, Label, Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';

export default function CreateLoyaltyRewardModal({ show, onClose, selectedReward }) {
  const queryClient = useQueryClient();
  const [type, setType] = useState(selectedReward?.discount_type || '');

  const createRewardMutation = useMutation({
    mutationFn: (newReward) => axios.post('/api/loyalty/create', newReward).then((res) => res.data),
    onSuccess: () => {
      toast.success('Loyalty reward created!');
      queryClient.invalidateQueries({ queryKey: ['loyaltyRewards'] });
      onClose(); // close modal
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to create reward');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      code: formData.get('code'),
      description: formData.get('description'),
      discount_type: formData.get('discount_type'),
      discount_value: Number(formData.get('discount_value')),
      required_orders: Number(formData.get('required_orders')),
    };
    createRewardMutation.mutate(payload);
  };

  return (
    <Modal show={show} size="md" onClose={onClose}>
      <ModalHeader>Create Loyalty Reward</ModalHeader>
      <ModalBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="code">Coupon Code *</Label>
            <TextInput id="code" name="code" defaultValue={selectedReward?.coupon_code || ''} required />
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <TextInput id="description" name="description" defaultValue={selectedReward?.description || ''} required />
          </div>
          <div>
            <Label htmlFor="discount_type">Discount Type *</Label>
            <select
              id="discount_type"
              name="discount_type"
              className="w-full rounded border p-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select type</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
          {type === 'percentage' && (
            <div>
              <Label htmlFor="discount_value">Discount Value *</Label>
              <select
                id="discount_value"
                name="discount_value"
                className="w-full rounded border p-2"
                defaultValue={selectedReward?.discount_value || ''}
                required
              >
                <option value="" disabled>
                  Select percentage
                </option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30% (max)</option>
              </select>
            </div>
          )}

          {type === 'fixed' && (
            <div>
              <Label htmlFor="discount_value">Discount Value *</Label>
              <TextInput
                type="number"
                id="discount_value"
                name="discount_value"
                defaultValue={selectedReward?.discount_value || ''}
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="required_orders">Required Orders *</Label>
            <TextInput
              type="number"
              id="required_orders"
              name="required_orders"
              defaultValue={selectedReward?.required_orders || ''}
              required
            />
          </div>
          <Button type="submit" disabled={createRewardMutation.isLoading}>
            {createRewardMutation.isLoading ? 'Creating...' : 'Create Reward'}
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
}

CreateLoyaltyRewardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedReward: PropTypes.shape({
    coupon_code: PropTypes.string,
    description: PropTypes.string,
    discount_type: PropTypes.oneOf(['percentage', 'fixed']),
    discount_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    required_orders: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
