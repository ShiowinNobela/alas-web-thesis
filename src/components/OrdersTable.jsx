import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Wheat } from 'lucide-react';
import { Card } from './ui/card';

import dayjs from 'dayjs';

export default function OrdersTable({
  orders,
  getStatusColor,
  onCancelOrder,
  onFetchOrderHistory,
}) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card
          key={order.id}
          className="gap-4 rounded-3xl bg-white p-6 shadow-sm"
        >
          {/* --- Header --- */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
            {/* Order ID - visually distinct */}

            <div className="flex items-center gap-4">
              <Wheat className="text-primary size-10 fill-amber-400" />

              <div>
                <div className="flex items-center gap-4">
                  <h3 className="text-primary font-heading font-semibold">
                    Order ID: #{order.id}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <h3 className="text-bold text-sm text-gray-500">
                    {dayjs(order.order_date).format('D MMMM YYYY')}
                  </h3>
                </div>
              </div>
            </div>
            <div className="font-heading flex items-center gap-4">
              <Button variant="outline">Cancel Order</Button>
              <Button
                onClick={() => navigate(`/UserViewOrderDetails/${order.id}`)}
              >
                Order Details
              </Button>
            </div>
          </div>

          {/* <div className="flex flex-wrap items-center gap-8 text-sm text-gray-700">
            <h3 className="text-content font-semibold">
              Order Date:{' '}
              <span className="font-normal text-gray-500">
                {new Date(order.order_date).toLocaleDateString()}
              </span>
            </h3>
            <h3 className="text-content font-semibold">
              Email:{' '}
              <span className="font-normal text-gray-500">
                {order.payment_method}
              </span>
            </h3>
            <h3 className="text-content font-semibold">
              Payment Method:{' '}
              <span className="font-normal text-gray-500">
                {order.payment_method}
              </span>
            </h3>
          </div> */}

          {/* --- Items + View More --- */}

          <div className="">
            {/* Product List Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {order.items.map((item) => (
                <Card
                  key={item.item_id}
                  className="text-content flex flex-row gap-4 rounded-lg border bg-white p-4 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="size-14 flex-shrink-0 overflow-hidden rounded-md bg-orange-200">
                    <img
                      src={
                        item.image_url ||
                        'https://via.placeholder.com/80x80?text=IMG'
                      }
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{item.product_name}</p>
                    <p className="text-xs">
                      Quantity:{' '}
                      <span className="text-content">{item.quantity}</span>
                    </p>
                    <p className="text-xs">
                      Price:{' '}
                      <span className="text-content">
                        ₱ {parseFloat(item.unit_price || 0).toLocaleString()}
                      </span>
                    </p>

                    {/* Optional subtotal */}
                    {/* 
                    <p className="text-xs font-semibold text-gray-700">
                      Subtotal: ₱ {(item.quantity * item.unit_price).toLocaleString()}
                    </p> 
                    */}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* --- Footer --- */}
          <div className="flex flex-wrap items-center">
            <div className="text-content flex w-full items-center justify-between gap-2 rounded-sm py-2">
              <div className="flex gap-4">
                <span
                  className={`rounded-lg bg-gray-100 px-4 py-1 text-xs ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
                <p className="text-content space-x-4">
                  Total: ₱ {parseFloat(order.total_amount).toLocaleString()}
                </p>
              </div>

              <p className="space-x-4 text-sm">
                <span>{order.items.length} items</span>
                <span className="text-lg font-bold">·</span>
                <span>Expected: June 20, 1996</span>
                <span className="text-lg font-bold">·</span>
                <span>{order.payment_method}</span>
              </p>
            </div>
          </div>
        </Card>
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
