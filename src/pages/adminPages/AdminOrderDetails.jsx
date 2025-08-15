import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '@/api/orderService';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, User, MapPin, Phone, Mail, Package, Calendar, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

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

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 max-w-4xl space-y-6 rounded-md bg-white p-6 shadow">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  console.log(order);
  if (isError) {
    return (
      <div className="mx-auto mt-10 max-w-4xl rounded-md bg-white p-6 shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error Loading Order</h1>
          <p className="mt-2 text-gray-600">
            {error?.response?.data?.message || 'Failed to load order details'}
          </p>
          <button
            onClick={() => navigate('/admin/orders')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto mt-10 max-w-4xl rounded-md bg-white p-6 shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">Order Not Found</h1>
          <p className="mt-2 text-gray-500">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/admin/orders')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/orders')}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order #{order.order_number || order.id}</h1>
            <p className="text-gray-600 mt-1">
              <Calendar className="inline w-4 h-4 mr-1" />
              {order.order_date ? format(new Date(order.order_date), 'MMMM d, yyyy \'at\' h:mm a') : 'Date not available'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={getStatusStyle(order.status)}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Customer Information
            </h2>
            <div className="space-y-3 pl-7">
              <div>
                <p className="font-medium text-gray-700">Transaction Account Name</p>
                <p className="text-gray-600">{order.account_name || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="text-gray-600">{order.email || 'N/A'}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Phone
                </p>
                <p className="text-gray-600">{order.contact_number|| 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Delivery Information
            </h2>
            <div className="space-y-3 pl-7">
              <div>
                <p className="font-medium text-gray-700">Address</p>
                <p className="text-gray-600">
                  {order.shipping_address || order.address || 'N/A'}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700 flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  Payment Method
                </p>
                <p className="text-gray-600 capitalize">{order.payment_method || 'N/A'}</p>
              </div>
              {order.payment_status && (
                <div>
                  <p className="font-medium text-gray-700">Payment Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    order.payment_status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : order.payment_status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.payment_status}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Package className="w-5 h-5" />
          Order Items
        </h2>
        <div className="space-y-4">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  {item.product?.image && (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.product_name|| 'Product Name'}
                    </h3>
                    <p className="text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-gray-600">
                      Unit Price: ₱{parseFloat(item.unit_price || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₱{(parseFloat(item.unit_price || 0) * parseInt(item.quantity || 0)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No items found in this order</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            {order.subtotal && (
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">₱{parseFloat(order.subtotal).toFixed(2)}</span>
              </div>
            )}
            {order.shipping_fee && (
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-900">₱{parseFloat(order.shipping_fee).toFixed(2)}</span>
              </div>
            )}
            {order.tax && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="text-gray-900">₱{parseFloat(order.tax).toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-gray-900">
              ₱{parseFloat(order.total || order.total_amount || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {order.notes && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Notes</h2>
          <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{order.notes}</p>
        </div>
      )}
    </div>
  );
}

export default AdminOrderDetails;
