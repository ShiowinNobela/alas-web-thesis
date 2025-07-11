import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import PropTypes from 'prop-types';
import gcashImg from '../components/images/gcash-logo.png';
import mayaImg from '../components/images/maya-icon.png';
import bankImg from '../components/images/maya-icon.png';

const paymentImages = {
  GCash: gcashImg,
  Maya: mayaImg,
  bank_transfer: bankImg,
};

export default function OrdersTable({
  orders,
  getStatusColor,
  onCancelOrder,
  onFetchOrderHistory,
}) {
  return (
    <div className="max-h-[50vh] overflow-x-auto overflow-y-auto rounded">
      <Table hoverable className="shadow">
        <TableHead className="font-heading text-content sticky top-0 z-10 font-bold">
          <TableRow>
            <TableHeadCell>Order ID</TableHeadCell>
            <TableHeadCell>Items</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
            <TableHeadCell>
              Payment
              <br />
              Method
            </TableHeadCell>

            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {orders.map((order) => (
            <TableRow key={order.id} className="text-content bg-white">
              <TableCell className="text-xs">{order.id}</TableCell>

              <TableCell className="font-medium text-gray-900">
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item.item_id}
                      className="flex items-center space-x-3"
                    >
                      <div className="h-4 w-4 rounded-full bg-orange-200" />
                      <span>
                        {item.product_name} x {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </TableCell>

              <TableCell className="flex flex-col">
                <span>{new Date(order.order_date).toLocaleDateString()}</span>
                <span className="text-sm text-gray-500">
                  {new Date(order.order_date).toLocaleTimeString()}
                </span>
              </TableCell>

              <TableCell>
                ₱ {parseFloat(order.total_amount).toLocaleString()}
              </TableCell>

              <TableCell className="flex flex-col">
                <img
                  src={paymentImages[order.payment_method]}
                  alt={order.payment_method}
                  className="mb-2 h-7 w-7 object-contain"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {order.payment_method.split('_').join(' ')}
                </span>
              </TableCell>

              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </TableCell>

              <TableCell>
                {order.status === 'pending' && order.cancel_requested === 0 ? (
                  <button
                    onClick={() => onCancelOrder(order.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Cancel Order
                  </button>
                ) : order.status === 'pending' &&
                  order.cancel_requested === 1 ? (
                  <span className="text-sm text-gray-500 italic">
                    Cancellation<br></br>requested
                  </span>
                ) : (
                  <button
                    onClick={() => onFetchOrderHistory(order.id)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    View History
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between bg-gray-100 px-6 py-3 text-base font-semibold text-gray-800">
        <span>Hello</span>
        <span>Alas Delis and Spices</span>
      </div>
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
