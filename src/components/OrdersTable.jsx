import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import PropTypes from "prop-types";

export default function OrdersTable({
  orders,
  getStatusColor,
  onCancelOrder,
  onFetchOrderHistory,
}) {
  return (
    <div className="overflow-x-auto rounded shadow max-h-[50vh] overflow-y-auto">
      <Table striped>
        <TableHead className="sticky top-0 z-10 bg-white">
          <TableRow>
            <TableHeadCell>Items</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
            <TableHeadCell>
              Payment
              <br />
              Method
            </TableHeadCell>
            <TableHeadCell>Order ID</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="bg-white">
              <TableCell className="font-medium text-gray-900">
                <ul className="list-disc list-inside break-words">
                  {order.items.map((item) => (
                    <li key={item.item_id}>
                      {item.product_name} x {item.quantity}
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

              <TableCell className="flex flex-col capitalize">
                {order.payment_method.split("_").map((word, idx) => (
                  <span key={idx}>{word}</span>
                ))}
              </TableCell>

              <TableCell className="text-xs">{order.id}</TableCell>

              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </TableCell>

              <TableCell>
                {order.status === "pending" && order.cancel_requested === 0 ? (
                  <button
                    onClick={() => onCancelOrder(order.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Cancel Order
                  </button>
                ) : order.status === "pending" &&
                  order.cancel_requested === 1 ? (
                  <span className="text-sm italic text-gray-500">
                    Cancellation requested
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

      <div className="bg-gray-100 text-gray-800 flex justify-between items-center text-base font-semibold px-6 py-3">
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
