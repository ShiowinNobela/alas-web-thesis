import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '@/api/orderService';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  Mail,
  Package,
  Calendar,
  CreditCard,
  Copy,
  AlertCircle,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { Card, Badge, Button } from 'flowbite-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { toast } from 'sonner';

function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="h-4 w-4 text-yellow-500" />,
      processing: <Truck className="h-4 w-4 text-blue-500" />,
      shipped: <Truck className="h-4 w-4 text-purple-500" />,
      delivered: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      cancelled: <XCircle className="h-4 w-4 text-red-500" />,
    };
    return icons[status] || <AlertCircle className="text-lighter h-4 w-4" />;
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
        <p className="text-lighter mt-2 text-sm">
          {error?.response?.data?.message || 'Failed to load order details'}
        </p>
        <Button
          onClick={() => navigate('/admin/orders')}
          size="sm"
          color="blue"
          className="mt-4"
        >
          Back to Orders
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header with Order Summary and Status */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <Card
          onClick={() => navigate('/admin/orders')}
          className="cursor-pointer ring-1 transition-all hover:shadow-md md:col-span-2"
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} className="text-blue-500" />
            Back to Orders
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="ring-1 md:col-span-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex w-full flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">
                  Order #{order.order_number || order.id}
                </h1>
                <Button
                  size="xs"
                  color="light"
                  onClick={() =>
                    handleCopy(order.order_number || order.id, 'Order ID')
                  }
                >
                  <Copy size={12} />
                </Button>
              </div>

              <p className="text-lighter mt-2 flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {order.order_date
                  ? format(new Date(order.order_date), 'MMM d, yyyy h:mm a')
                  : 'Date not available'}
              </p>

              {order.reference_number && (
                <div className="text-lighter mt-2 flex items-center gap-2 text-sm">
                  <span className="font-medium">Reference:</span>
                  {order.reference_number}
                  <Button
                    size="xs"
                    color="light"
                    onClick={() =>
                      handleCopy(order.reference_number, 'Reference number')
                    }
                  >
                    <Copy size={12} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Status Badge */}
        <Card className="flex flex-col gap-4 ring-1 md:col-span-4">
          <div className="flex items-center gap-2">
            {getStatusIcon(order.status)}
            <Badge
              size="lg"
              className={`px-4 py-2 text-base font-semibold ${getStatusStyle(order.status)}`}
            >
              {order.status.toUpperCase()}
            </Badge>
          </div>
          <Button color="blue" className="w-full">
            Update Status
          </Button>
          {order.cancel_requested && (
            <div className="flex items-center gap-2 rounded bg-red-50 p-2 text-sm text-red-600">
              <AlertCircle size={16} />
              Customer requested cancellation
            </div>
          )}
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
                  <Button
                    size="xs"
                    color="light"
                    onClick={() => handleCopy(order.username, 'Username')}
                  >
                    <Copy size={12} />
                  </Button>
                )}
              </div>
            </div>
            <div>
              <p className="text-lighter font-medium">Payment Account Name</p>
              <div className="flex items-center gap-1">
                <p className="mt-1">{order.account_name || 'N/A'}</p>
                {order.account_name && (
                  <Button
                    size="xs"
                    color="light"
                    onClick={() =>
                      handleCopy(order.account_name, 'Account name')
                    }
                  >
                    <Copy size={12} />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>{order.email || 'N/A'}</span>
              {order.email && (
                <Button
                  size="xs"
                  color="light"
                  onClick={() => handleCopy(order.email, 'Email')}
                >
                  <Copy size={12} />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{order.contact_number || 'N/A'}</span>
              {order.contact_number && (
                <Button
                  size="xs"
                  color="light"
                  onClick={() =>
                    handleCopy(order.contact_number, 'Contact number')
                  }
                >
                  <Copy size={12} />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Delivery Info */}
        <Card className="rounded-lg shadow-sm ring-1">
          <div className="mb-3 border-b border-gray-100 pb-2">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <MapPin className="h-5 w-5 text-green-500" /> Delivery Information
            </h2>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-lighter font-medium">Shipping Address</p>
              <div className="flex items-start gap-1">
                <p className="mt-1 flex-1">
                  {order.shipping_address || order.address || 'N/A'}
                </p>
                {(order.shipping_address || order.address) && (
                  <Button
                    size="xs"
                    color="light"
                    onClick={() =>
                      handleCopy(
                        order.shipping_address || order.address,
                        'Address'
                      )
                    }
                  >
                    <Copy size={12} />
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <span>
                {getPaymentMethodLabel(order.payment_method) || 'N/A'}
              </span>
            </div>
            {order.payment_status && (
              <div className="mt-2">
                <Badge
                  size="sm"
                  color={
                    order.payment_status === 'paid'
                      ? 'success'
                      : order.payment_status === 'pending'
                        ? 'warning'
                        : 'failure'
                  }
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                >
                  Payment: {order.payment_status}
                </Badge>
              </div>
            )}
            {order.tracking_number && (
              <div>
                <p className="text-lighter font-medium">Tracking Number</p>
                <div className="flex items-center gap-1">
                  <p className="mt-1">{order.tracking_number}</p>
                  <Button
                    size="xs"
                    color="light"
                    onClick={() =>
                      handleCopy(order.tracking_number, 'Tracking number')
                    }
                  >
                    <Copy size={12} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="rounded-lg shadow-sm ring-1">
          <div className="mb-3 border-b border-gray-100 pb-2">
            <h2 className="text-base font-semibold">Order Summary</h2>
          </div>
          <div className="space-y-3 text-sm">
            {order.subtotal && (
              <div className="flex justify-between py-1">
                <span className="text-lighter">Subtotal:</span>
                <span className="font-medium">
                  ₱{parseFloat(order.subtotal).toFixed(2)}
                </span>
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
                <span className="font-medium">
                  ₱{parseFloat(order.shipping_fee).toFixed(2)}
                </span>
              </div>
            )}

            {order.tax && (
              <div className="flex justify-between border-b border-gray-100 py-1 pb-3">
                <span className="text-lighter">Tax:</span>
                <span className="font-medium">
                  ₱{parseFloat(order.tax).toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between pt-2 text-base font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                ₱{parseFloat(order.total || order.total_amount || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        {/* Order Notes */}
        <Card className="rounded-lg shadow-sm ring-1">
          <div className="mb-3 border-b border-gray-100 pb-2">
            <h2 className="text-base font-semibold">Order Notes</h2>
          </div>
          <div className="text-lighter rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
            {order.notes || 'No notes provided.'}
          </div>

          {order.coupon_code && (
            <div className="mt-4">
              <div className="text-lighter mb-2 text-sm font-medium">
                Coupon Applied
              </div>
              <Badge color="green" className="inline-flex items-center">
                {order.coupon_code}
              </Badge>
            </div>
          )}
        </Card>
      </div>

      {/* Order Items */}
      <Card className="ring-1">
        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Package className="h-5 w-5 text-purple-500" /> Order Items
          </h2>
          <span className="text-lighter text-sm">
            {order.items?.length || 0} item(s)
          </span>
        </div>
        {order.items && order.items.length > 0 ? (
          <Table striped className="min-w-full">
            <TableHead>
              <TableHeadCell className="py-3 text-sm font-semibold">
                Product
              </TableHeadCell>
              <TableHeadCell className="py-3 text-sm font-semibold">
                Product ID
              </TableHeadCell>
              <TableHeadCell className="py-3 text-sm font-semibold">
                Qty
              </TableHeadCell>
              <TableHeadCell className="py-3 text-sm font-semibold">
                Unit Price
              </TableHeadCell>
              <TableHeadCell className="py-3 text-right text-sm font-semibold">
                Total
              </TableHeadCell>
            </TableHead>
            <TableBody className="text-content">
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-10 w-10 rounded-lg border border-gray-200 object-cover"
                        />
                      )}
                      <span className="text-sm font-medium">
                        {item.product_name || 'N/A'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm">
                    {item.product_id || 'N/A'}
                  </TableCell>
                  <TableCell className="py-3 text-sm">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="py-3 text-sm">
                    ₱{parseFloat(item.unit_price || 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 text-right text-sm font-semibold">
                    ₱
                    {(
                      parseFloat(item.unit_price || 0) *
                      parseInt(item.quantity || 0)
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-lighter rounded-lg bg-gray-50 py-4 text-center text-sm">
            No items found in this order
          </p>
        )}
      </Card>
    </div>
  );
}

export default AdminOrderDetails;
