import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '@/api/orders';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import { User, MapPin, Phone, Mail, Package, CreditCard, Copy, CheckCircle, PhilippinePeso, Truck } from 'lucide-react';
import { format } from 'date-fns';
import { Card, Badge, Button, Tooltip } from 'flowbite-react';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { toast } from 'sonner';
import BackButton from '@/components/bigComponents/BackButton';
import { useOrderStatusUpdate } from '@/hooks/useOrderStatusUpdate';
import StatusUpdateModal from '@/components/modals/statusUpdateModal';

function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    statusUpdateModal,
    updatingId,
    updateStatus,
    adminNote,
    modalTitle,
    confirmButtonLabel,
    setAdminNote,
    setStatusUpdateModal,
    updateStatusMutation,
    handleStatusUpdate,
    handleStatusUpdateClick,
  } = useOrderStatusUpdate();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id,
  });

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    toast.success(`${field} copied to clipboard!`);
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      bank_transfer: 'Bank Transfer',
      credit_card: 'Credit Card',
      paypal: 'PayPal',
      cash_on_delivery: 'Cash on Delivery',
    };
    return methods[method] || method;
  };

  if (isLoading) {
    return (
      <div className="mx-auto mt-6 max-w-6xl space-y-4 p-4">
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="mx-auto mt-6 max-w-5xl p-6 text-center ring-1">
        <h1 className="text-lg font-bold text-red-600">Error Loading Order</h1>
        <p className="text-lighter mt-2 text-sm">{error?.response?.data?.message || 'Failed to load order details'}</p>
        <Button onClick={() => navigate('/admin/orders')} size="sm" color="blue" className="mt-4">
          Back to Orders
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <Card className="mb-6 w-full shadow-sm ring-1">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BackButton label="" className="py-6 ring-1" />
            <div>
              <h1 className="text-2xl font-bold">
                Order <span className="text-primary font-heading text-lg">#{order.order_number || order.id}</span>
              </h1>
              <div className="text-lighter flex items-center gap-2 text-sm">
                {order.order_date ? format(new Date(order.order_date), 'MMM d, yyyy h:mm a') : 'Date not available'}
              </div>
            </div>
            <Button size="xs" color="light" onClick={() => handleCopy(order.order_number || order.id, 'Order ID')}>
              <Copy size={12} />
            </Button>
          </div>

          {order.reference_number && (
            <div className="flex flex-col items-center">
              <p className="mt-1">{getPaymentMethodLabel(order.payment_method) || 'N/A'}</p>
              <div className="flex">
                <p className="text-content font-bold">
                  Reference:{' '}
                  <span className="text-lighter text-sm font-normal tracking-tight">{order.reference_number}</span>
                </p>

                <Button size="xs" color="light" onClick={() => handleCopy(order.reference_number, 'Reference number')}>
                  <Copy size={10} />
                </Button>
              </div>
            </div>
          )}

          <div className="flex w-3xs items-center gap-2">
            <Badge size="lg" className={`px-10 py-2 font-normal ${getStatusStyle(order.status)}`}>
              {order.status}
            </Badge>
            {order.status === 'pending' && order.cancel_requested === 0 ? (
              <Button
                onClick={() => handleStatusUpdateClick(order.id, 'processing', 'Process Order', 'Process Order')}
                className="w-full bg-yellow-200 font-medium text-yellow-700 hover:bg-yellow-100"
              >
                Process Order
              </Button>
            ) : order.status === 'pending' && order.cancel_requested === 1 ? (
              <Tooltip
                content="Order can't be processed. Customer has requested to cancel this order"
                placement="bottom-end"
              >
                <Button
                  onClick={() => handleStatusUpdateClick(order.id, '', 'Cancel Order', 'Cancel Order', true)}
                  className="w-full bg-red-300 font-medium text-red-800 hover:bg-red-100"
                >
                  Cancel Order
                </Button>
              </Tooltip>
            ) : order.status === 'cancelled' ? (
              <span className="text-sm text-gray-500 italic">Order Cancelled</span>
            ) : order.status === 'processing' ? (
              <Button
                onClick={() => handleStatusUpdateClick(order.id, 'shipping', 'Ship Order', 'Ship Order')}
                className="w-full bg-green-200 font-medium text-green-800 hover:bg-green-100"
              >
                Ship Order
              </Button>
            ) : order.status === 'shipping' ? (
              <Button
                onClick={() => handleStatusUpdateClick(order.id, 'delivered', 'Mark Order as Delivered', 'Confirm')}
                className="w-full bg-blue-200 font-medium text-blue-800 hover:bg-blue-100"
              >
                Mark Delivered
              </Button>
            ) : order.status === 'delivered' ? (
              <div className="flex items-center text-sm text-emerald-500">
                <CheckCircle className="mr-1 h-5 w-5" />
                Delivered
              </div>
            ) : null}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-4">
        <Card className="col-span-3 ring-1">
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Package className="h-5 w-5 text-purple-500" /> Order Items
            </h2>
            <span className="text-lighter text-sm">{order.items?.length || 0} item(s)</span>
          </div>
          {order.items && order.items.length > 0 ? (
            <Table striped className="min-w-full">
              <TableHead>
                <TableHeadCell className="py-3 text-sm font-semibold">Product</TableHeadCell>
                <TableHeadCell className="py-3 text-sm font-semibold">Product ID</TableHeadCell>
                <TableHeadCell className="py-3 text-sm font-semibold">Qty</TableHeadCell>
                <TableHeadCell className="py-3 text-sm font-semibold">Unit Price</TableHeadCell>
                <TableHeadCell className="py-3 text-right text-sm font-semibold">Total</TableHeadCell>
              </TableHead>
              <TableBody className="text-content">
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        {item.product_image && (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="size-15 rounded-lg border border-gray-200 object-cover"
                          />
                        )}
                        <span className="text-sm font-medium">{item.product_name || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-sm">{item.product_id || 'N/A'}</TableCell>
                    <TableCell className="py-3 text-sm">{item.quantity}</TableCell>
                    <TableCell className="py-3 text-sm">₱{parseFloat(item.unit_price || 0).toFixed(2)}</TableCell>
                    <TableCell className="py-3 text-right text-sm font-semibold text-emerald-500">
                      ₱{(parseFloat(item.unit_price || 0) * parseInt(item.quantity || 0)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} className="py-4 text-right text-base font-semibold text-gray-600">
                    Total
                  </TableCell>
                  <TableCell className="py-4 text-right text-xl font-bold text-emerald-600">
                    ₱{parseFloat(order.total || order.total_amount || 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <p className="text-lighter rounded-lg bg-gray-50 py-4 text-center text-sm">No items found in this order</p>
          )}
        </Card>

        <Card className="rounded-lg bg-emerald-100 shadow-sm ring-1">
          <div className="mb-3 border-b border-gray-100 pb-2">
            <h2 className="text-base font-semibold">Order Summary</h2>
          </div>
          <div className="space-y-3 text-sm">
            {order.subtotal && (
              <div className="flex justify-between py-1">
                <span className="text-lighter">Subtotal:</span>
                <span className="font-medium">₱{parseFloat(order.subtotal).toFixed(2)}</span>
              </div>
            )}

            {order.discount_amount && parseFloat(order.discount_amount) > 0 && (
              <div className="flex justify-between py-1 text-green-600">
                <span className="text-lighter">Discount:</span>
                <span className="font-medium">
                  -₱{parseFloat(order.discount_amount).toFixed(2)}
                  {order.coupon_code && ` (${order.coupon_code})`}
                </span>
              </div>
            )}

            {order.shipping_fee && (
              <div className="flex justify-between py-1">
                <span className="text-lighter">Shipping Fee:</span>
                <span className="font-medium">₱{parseFloat(order.shipping_fee).toFixed(2)}</span>
              </div>
            )}

            {order.tax && (
              <div className="flex justify-between border-b border-gray-100 py-1 pb-3">
                <span className="text-lighter">Tax:</span>
                <span className="font-medium">₱{parseFloat(order.tax).toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between pt-2 text-base font-bold">
              <span>Total:</span>
              <span className="text-emerald-600">₱{parseFloat(order.total || order.total_amount || 0).toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Customer + Delivery Info */}
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-4">
        {/* Customer Info */}
        <Card className="rounded-lg shadow-sm ring-1">
          <div className="mb-3 border-b border-gray-100 pb-2">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <User className="h-5 w-5 text-blue-500" /> Customer Information
            </h2>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-lighter font-medium">Username</p>
              <div className="flex items-center gap-1">
                <p className="mt-1">{order.username || 'N/A'}</p>
                {order.username && (
                  <Button size="xs" color="light" onClick={() => handleCopy(order.username, 'Username')}>
                    <Copy size={12} />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>{order.email || 'N/A'}</span>
              {order.email && (
                <Button size="xs" color="light" onClick={() => handleCopy(order.email, 'Email')}>
                  <Copy size={12} />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{order.contact_number || 'N/A'}</span>
              {order.contact_number && (
                <Button size="xs" color="light" onClick={() => handleCopy(order.contact_number, 'Contact number')}>
                  <Copy size={12} />
                </Button>
              )}
            </div>
          </div>
        </Card>

        <Card className="rounded-lg shadow-sm ring-1">
          <div className="mb-3 border-b border-gray-100 pb-2">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <PhilippinePeso className="h-5 w-5 text-emerald-500" /> Payment Information
            </h2>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-lighter font-medium">Payment Account Name</p>
              <div className="flex items-center gap-1">
                <p className="mt-1">{order.account_name || 'N/A'}</p>
                {order.account_name && (
                  <Button size="xs" color="light" onClick={() => handleCopy(order.account_name, 'Account name')}>
                    <Copy size={12} />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-lighter font-medium">Reference Number</p>
              <div className="flex items-center gap-1">
                <p className="mt-1">{order.reference_number || 'N/A'}</p>
                {order.reference_number && (
                  <Button size="xs" color="light" onClick={() => handleCopy(order.reference_number, 'Account name')}>
                    <Copy size={12} />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-lighter font-medium">Payment Method</p>
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4 text-gray-400" />
                <p className="mt-1">{getPaymentMethodLabel(order.payment_method) || 'N/A'}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Delivery Info */}
        <Card className="rounded-lg border border-gray-200 shadow-sm ring-1 dark:border-gray-700">
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-600">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
              <MapPin className="h-5 w-5 text-green-500" />
              Delivery Information
            </h2>
            <Truck className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {/* Shipping Address */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Address</p>
                <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                  {order.shipping_address || order.address || 'No address provided'}
                </p>
              </div>
              {(order.shipping_address || order.address) && (
                <Button
                  size="xs"
                  color="light"
                  className="ml-2 shrink-0"
                  onClick={() => handleCopy(order.shipping_address || order.address, 'Address')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Tracking Reference */}
            <div className="flex items-start justify-between text-sm">
              <div className="flex-1">
                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Tracking Number</p>
                <p className="font-mono text-gray-800 dark:text-gray-200">
                  {order?.shipping_reference || 'Not provided'}
                </p>
              </div>
              {order?.shipping_reference && (
                <Button
                  size="xs"
                  color="light"
                  className="ml-2 shrink-0"
                  onClick={() => handleCopy(order.shipping_reference, 'Tracking number')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Shipping Details Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-2 dark:border-gray-600">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Company</p>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-800 dark:text-gray-200">{order.shipping_company || 'Not specified'}</p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Cost</p>
                <p className="text-money font-semibold">
                  {order.shipping_price ? `₱${Number(order.shipping_price).toLocaleString()}` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Optional: Shipping Status Badge */}
            {order.shipping_status && (
              <div className="border-t border-gray-100 pt-2 dark:border-gray-600">
                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Shipping Status</p>
                <Badge
                  color={
                    order.shipping_status === 'delivered'
                      ? 'success'
                      : order.shipping_status === 'shipped'
                        ? 'blue'
                        : order.shipping_status === 'in_transit'
                          ? 'yellow'
                          : 'gray'
                  }
                  className="inline-flex items-center gap-1"
                >
                  <Package className="h-3 w-3" />
                  {order.shipping_status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            )}
          </div>
        </Card>

        <Card className="rounded-lg shadow-sm ring-1">
          <div className="mb-3 border-b border-gray-100 pb-2">
            <h2 className="text-base font-semibold">Order Notes</h2>
          </div>
          <div className="text-lighter rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
            {order.notes || 'No notes provided.'}
          </div>
        </Card>

        {/* Order Notes */}
      </div>

      {StatusUpdateModal && (
        <StatusUpdateModal
          show={statusUpdateModal}
          title={modalTitle}
          orderId={updatingId}
          textareaValue={adminNote}
          onTextareaChange={(e) => setAdminNote(e.target.value)}
          onCancel={() => setStatusUpdateModal(false)}
          onConfirm={() => handleStatusUpdate(updatingId, adminNote, updateStatus)}
          confirmButtonLabel={confirmButtonLabel}
          isLoading={updateStatusMutation.isPending}
        />
      )}
    </div>
  );
}

export default AdminOrderDetails;
