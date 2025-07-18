import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { PhilippinePeso, EggFried } from 'lucide-react';
import { Card } from './ui/card';

import dayjs from 'dayjs';
import PaymentMethodIcon from '@/components/paymentMethodIcon';

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
        <Card key={order.id} className="gap-4 rounded-2xl bg-white p-4 shadow">
          {/* --- Header --- */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2">
            {/* Order ID - visually distinct */}

            <div className="flex items-center gap-4">
              <EggFried className="text-brand size-10" />

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-content">
                    Order ID:{' '}
                    <span className="text-secondary text-sm font-semibold tracking-tighter">
                      #{order.id}
                    </span>
                  </h2>
                  <span
                    className={`rounded-sm bg-gray-100 px-4 py-1 text-xs font-semibold shadow-sm ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <h3 className="text-bold text-muted text-sm">
                    {dayjs(order.order_date).format('D MMMM YYYY')}
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
                  className="text-content flex flex-row gap-4 rounded-lg border p-2 shadow"
                >
                  {/* Thumbnail */}
                  <div className="h-14 w-12 flex-shrink-0 overflow-hidden rounded-md bg-orange-200">
                    <img
                      src={
                        item.image_url ||
                        'https://via.placeholder.com/80x80?text=IMG'
                      }
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
                    <p className="text-sm font-semibold">{item.product_name}</p>
                    <p className="text-muted text-xs">
                      Quantity:{' '}
                      <span className="text-content">{item.quantity}</span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* --- Footer --- */}
          <div className="flex flex-wrap items-center">
            <div className="text-content flex w-full items-center justify-between gap-2 rounded-sm py-2">
              <div className="flex gap-4">
                <p className="text-muted font-semibold">
                  Total:{' '}
                  <span className="text-primary">
                    <PhilippinePeso className="inline" />
                    {parseFloat(order.total_amount).toLocaleString()}
                  </span>
                </p>
              </div>

              <p className="text-muted space-x-4 text-sm">
                <span>{order.items.length} items</span>
                <span className="text-lg font-bold">·</span>
                <span>Expected: June 20, 1996</span>
                <span className="text-lg font-bold">·</span>
                <PaymentMethodIcon method={order.payment_method} />
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
