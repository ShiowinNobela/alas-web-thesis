import PropTypes from 'prop-types';

export default function OrdersTable({
  orders,
  getStatusColor,
  onCancelOrder,
  onFetchOrderHistory,
}) {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm transition hover:shadow-md"
        >
          {/* --- Header --- */}
          <div className="mb-3 flex flex-wrap items-center gap-8 text-sm text-gray-700">
            {/* Order ID - visually distinct */}

            <h3 className="text-content font-heading font-bold">
              ORDER ID:{' '}
              <span className="text-primary font-mono tracking-tight">
                {order.id}
              </span>
            </h3>

            {/* Status badge */}
            <span
              className={`rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
            >
              {order.status}
            </span>

            <h3 className="text-content font-heading">
              <span className="font-mono text-gray-500">
                {new Date(order.order_date).toLocaleDateString()}
              </span>
            </h3>
          </div>

          {/* --- Items + View More --- */}
          <div className="border-t border-gray-100 px-4 pt-3">
            <div className="flex items-center justify-between">
              {/* Items List */}
              <div className="flex flex-wrap gap-3">
                {order.items.map((item) => (
                  <div
                    key={item.item_id}
                    className="flex items-center gap-3 rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800"
                  >
                    <div className="h-14 w-14 flex-shrink-0 rounded-md bg-gray-200" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">
                        {item.product_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Button Right Side */}
              <button
                onClick={() => onFetchOrderHistory(order.id)}
                className="ml-4 text-xs font-medium whitespace-nowrap text-blue-600 hover:underline"
              >
                View More
              </button>
            </div>
          </div>

          {/* --- Footer --- */}
          <div className="mt-4 flex flex-wrap items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-sm font-semibold text-gray-900">
              Total: ₱ {parseFloat(order.total_amount).toLocaleString()}
            </span>

            {order.status === 'pending' && order.cancel_requested === 0 ? (
              <button
                onClick={() => onCancelOrder(order.id)}
                className="mt-2 text-sm font-medium text-red-600 hover:underline sm:mt-0"
              >
                Cancel Order
              </button>
            ) : order.status === 'pending' && order.cancel_requested === 1 ? (
              <span className="mt-2 text-sm text-gray-500 italic sm:mt-0">
                Cancellation requested
              </span>
            ) : (
              <button
                onClick={() => onFetchOrderHistory(order.id)}
                className="mt-2 text-sm font-medium text-blue-600 hover:underline sm:mt-0"
              >
                View History
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          product_name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
        })
      ).isRequired,
      order_date: PropTypes.string.isRequired,
      total_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      payment_method: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      cancel_requested: PropTypes.number,
    })
  ).isRequired,
  getStatusColor: PropTypes.func.isRequired,
  onCancelOrder: PropTypes.func.isRequired,
  onFetchOrderHistory: PropTypes.func.isRequired,
  onViewMore: PropTypes.func.isRequired,
};
