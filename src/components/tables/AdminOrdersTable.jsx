// components/bigComponents/AdminOrdersTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Tooltip,
  Badge,
  Button,
} from 'flowbite-react';
import { MoreVertical, Clock, Truck, Check, X, StepBack, BadgeX, BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import PropTypes from 'prop-types';
import PaymentMethodIcon from '../bigComponents/PaymentMethodsIcon';

export default function AdminOrdersTable({
  orders,
  onStatusUpdateClick,
  onViewHistory,
  isLoading = false,
  emptyMessage = 'No orders found',
}) {
  const navigate = useNavigate();

  // Status icons mapping
  const statusIcons = {
    pending: <Clock className="mr-1 h-4 w-4" />,
    processing: <Clock className="mr-1 h-4 w-4" />,
    shipping: <Truck className="mr-1 h-4 w-4" />,
    delivered: <Check className="mr-1 h-4 w-4" />,
    returned: <StepBack className="mr-1 h-4 w-4" />,
    refunded: <StepBack className="mr-1 h-4 w-4" />,
    cancelled: <X className="mr-1 h-4 w-4" />,
  };

  // Format date consistently
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return {
      date: format(date, 'MMM dd, yyyy'),
      time: format(date, 'hh:mm a'),
    };
  };

  return (
    <div className="relative overflow-x-auto shadow-md ring-1 sm:rounded-lg">
      <Table hoverable striped>
        <TableHead>
          <TableHeadCell className="table-header">Order Information</TableHeadCell>
          <TableHeadCell className="table-header">Items</TableHeadCell>
          <TableHeadCell className="table-header">DATE</TableHeadCell>
          <TableHeadCell className="table-header">TOTAL</TableHeadCell>
          <TableHeadCell className="table-header">
            <div className="leading-tight">Payment Method</div>
          </TableHeadCell>
          <TableHeadCell className="table-header">Status</TableHeadCell>
          <TableHeadCell className="table-header">Action</TableHeadCell>
          <TableHeadCell className="table-header"></TableHeadCell>
        </TableHead>

        <TableBody className="text-content">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="px-2 py-8 text-center">
                <div className="flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="py-8 text-center text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => {
              const formattedDate = formatDate(order.order_date);

              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div>
                        <p className="font-primary text-sm">{order.username}</p>
                        <Badge color="yellow" className="mt-1 w-fit">
                          #{order.id}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item) => (
                        <div
                          key={item.item_id}
                          className="overflow-hidden text-xs text-ellipsis whitespace-nowrap"
                          title={`${item.product_name} × ${item.quantity}`}
                        >
                          {item.product_name} × {item.quantity}
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="text-lighter text-xs whitespace-nowrap">
                          +{order.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="min-w-[140px]">
                    <div className="text-sm font-medium">{formattedDate.date}</div>
                    <div className="text-lighter text-xs">{formattedDate.time}</div>
                  </TableCell>

                  <TableCell className="font-medium">₱ {parseFloat(order.total_amount).toLocaleString()}</TableCell>

                  <TableCell className="">
                    <PaymentMethodIcon method={order?.payment_method || 'unknown'} />
                  </TableCell>

                  <TableCell>
                    <div className={`${getStatusStyle(order.status)} flex items-center justify-center text-xs`}>
                      {statusIcons[order.status] && <span className="mr-1">{statusIcons[order.status]}</span>}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </TableCell>

                  <TableCell>
                    {order.status === 'pending' && order.cancel_requested === 0 ? (
                      <Button
                        onClick={() => onStatusUpdateClick(order.id, 'processing', 'Process Order', 'Process Order')}
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
                          onClick={() => onStatusUpdateClick(order.id, '', 'Cancel Order', 'Cancel Order', true)}
                          className="text-error w-full bg-red-300 font-medium hover:bg-red-100"
                        >
                          Cancel Order
                        </Button>
                      </Tooltip>
                    ) : order.status === 'cancelled' ? (
                      <BadgeX className="text-error" />
                    ) : order.status === 'processing' ? (
                      <Button
                        onClick={() => onStatusUpdateClick(order.id, 'shipping', 'Ship Order', 'Ship Order')}
                        className="w-full bg-green-200 font-medium text-green-800 hover:bg-green-100"
                      >
                        Ship Order
                      </Button>
                    ) : order.status === 'shipping' ? (
                      <Button
                        onClick={() => onStatusUpdateClick(order.id, 'delivered', 'Mark Order as Delivered', 'Confirm')}
                        className="w-full bg-blue-200 font-medium text-blue-800 hover:bg-blue-100"
                      >
                        Mark Delivered
                      </Button>
                    ) : order.status === 'delivered' ? (
                      <BadgeCheck className="text-money" />
                    ) : null}
                  </TableCell>

                  <TableCell className="justify-start">
                    <Dropdown
                      label=""
                      inline
                      renderTrigger={() => (
                        <button className="font-bold text-black hover:text-blue-600">
                          <MoreVertical />
                        </button>
                      )}
                    >
                      <DropdownHeader>
                        <div className="font-semibold">Order #{order.id}</div>
                      </DropdownHeader>
                      <DropdownDivider />
                      <DropdownItem onClick={() => navigate(`/admin/order/${order.id}`)}>
                        View Order Details
                      </DropdownItem>
                      <DropdownItem onClick={() => onViewHistory(order.id)}>View History</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem onClick={() => navigator.clipboard.writeText(order.id.toString())}>
                        Copy Order ID
                      </DropdownItem>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>

        <tfoot className="bg-black text-sm text-white">
          <tr>
            <td colSpan={9} className="px-6 py-6">
              <ul className="list-inside list-disc space-y-1">
                <li>Click on a column header to sort orders.</li>
                <li>Use the search bar to find specific order IDs.</li>
                <li>Filter by order date range using the date pickers.</li>
                <li>Click Refresh to reset filters and reload the table.</li>
                <li>Total orders displayed: {orders.length}</li>
              </ul>
            </td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

AdminOrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      order_date: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          product_name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
        })
      ).isRequired,
      total_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      payment_method: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      cancel_requested: PropTypes.number.isRequired,
    })
  ).isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
  }).isRequired,
  handleSort: PropTypes.func.isRequired,
  onStatusUpdateClick: PropTypes.func.isRequired,
  onViewHistory: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  emptyMessage: PropTypes.string,
};
