import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '@/api/orders';
import { Button, Card, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Textarea } from 'flowbite-react';
import PaymentMethodIcon from '../bigComponents/PaymentMethodsIcon';

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
    <Modal show={show} size="xl" onClose={onCancel}>
      <ModalHeader>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>

          <p className="text-lighter text-base">
            Order # <span className="text-primary text-sm tracking-tight">{order?.id}</span>
          </p>
        </div>
      </ModalHeader>
      <ModalBody>
        {/* Order details */}
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Spinner aria-label="Loading order details" />
            <span className="text-lighter ml-2">Loading order details...</span>
          </div>
        ) : order ? (
          <Card className="mb-4 text-sm ring-1">
            <div className="text-lighter mb-2 space-y-1">
              <p>
                Customer: <span className="text-content">{order.username}</span>
              </p>
              <p>
                Contact: <span className="text-content">{order.contact_number}</span>
              </p>
              <p>
                Payment: <PaymentMethodIcon method={order?.payment_method || 'unknown'} />
              </p>
              <p>
                Reference Number: <span className="text-primary tracking-tighter">{order.reference_number}</span>
              </p>

              <p>
                Address: <span className="text-content">{order.address}</span>
              </p>
              {order.notes && (
                <p>
                  Notes: <span className="text-content">{order.notes}</span>
                </p>
              )}
            </div>

            <p className="text-base font-bold">
              Total: <span className="text-emerald-500">₱ {order.total_amount}</span>
            </p>
            {order.discount_amount !== '0.00' && <p>Discount: ₱ {order.discount_amount}</p>}

            <div>
              <p className="mb-1 font-medium">Items:</p>
              {order.items.map((item) => (
                <Card key={item.item_id} className="mb-1 ring-1">
                  <div className="flex">
                    <img src={item.product_image} alt={item.product_name} className="h-10 w-10 rounded object-cover" />
                    <div>
                      <p>
                        <span className="text-primary font-heading">{item.product_name} </span>x {item.quantity}
                      </p>
                      <p className="text-lighter text-xs">
                        ₱ {item.unit_price} each | Subtotal: ₱ <span className="text-emerald-500">{item.subtotal}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        ) : (
          <div className="text-brand mb-4">Order not found</div>
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
