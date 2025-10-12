import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '@/api/orders';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Textarea } from 'flowbite-react';

const StatusUpdateModal = ({
  show,
  orderId,
  title,
  textareaValue,
  onTextareaChange,
  onCancel,
  onConfirm,
  confirmButtonLabel,
}) => {
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
  });

  return (
    <Modal show={show} size="md" onClose={onCancel}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {/* Order details */}
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Spinner aria-label="Loading order details" />
            <span className="ml-2 text-gray-500">Loading order details...</span>
          </div>
        ) : order ? (
          <div className="mb-4 rounded border border-gray-200 bg-gray-50 p-3 text-sm">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Customer:</strong> {order.customer_name}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Total:</strong> ${order.total_amount}
            </p>
          </div>
        ) : (
          <div className="mb-4 text-red-500">Order not found</div>
        )}

        {/* Admin notes */}
        <div className="mb-4">
          <label htmlFor="admin-notes-textarea" className="mb-2 block text-sm font-medium text-gray-700">
            Admin Notes:
          </label>
          <Textarea
            id="admin-notes-textarea"
            value={textareaValue}
            onChange={onTextareaChange}
            placeholder="Enter notes for this status update..."
            rows={4}
          />
        </div>
      </ModalBody>

      <ModalFooter className="flex justify-end gap-2">
        <Button color="red" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="gray" onClick={onConfirm}>
          {confirmButtonLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

StatusUpdateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  orderId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  textareaValue: PropTypes.string.isRequired,
  onTextareaChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmButtonLabel: PropTypes.string.isRequired,
};

export default StatusUpdateModal;
