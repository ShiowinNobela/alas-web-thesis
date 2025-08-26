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
} from 'flowbite-react';
import {
  HiCheckCircle,
  HiDotsVertical,
  HiOutlineClock,
  HiTruck,
  HiCheck,
  HiX,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import PropTypes from 'prop-types';

export default function AdminOrdersTable({
  orders,
  sortConfig,
  handleSort,
  onStatusUpdateClick,
  onViewHistory,
  isLoading = false,
  emptyMessage = 'No orders found',
}) {
  const navigate = useNavigate();

  // Status icons mapping
  const statusIcons = {
    pending: <HiOutlineClock className="mr-1 h-4 w-4" />,
    processing: <HiOutlineClock className="mr-1 h-4 w-4" />,
    shipping: <HiTruck className="mr-1 h-4 w-4" />,
    delivered: <HiCheck className="mr-1 h-4 w-4" />,
    cancelled: <HiX className="mr-1 h-4 w-4" />,
  };

  // Format date consistently
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return {
      date: format(date, 'MMM dd, yyyy'),
      time: format(date, 'hh:mm a'),
    };
  };

  // Payment method display components
  const paymentMethodDisplay = (method) => {
    const methods = {
      GCash: {
        logo: '../src/components/images/gcash-logo.png',
        name: 'GCash',
      },
      Maya: {
        logo: '../src/components/images/maya-icon.png',
        name: 'Maya',
      },
      bank_transfer: {
        logo: null,
        name: 'Bank Transfer',
      },
    };

    const currentMethod = methods[method] || { name: method };

    return (
      <div className="flex flex-col items-center justify-center text-center text-xs">
        {currentMethod.logo && (
          <img
            src={currentMethod.logo}
            alt={currentMethod.name}
            className="mb-1 h-6"
          />
        )}
        <span>{currentMethod.name}</span>
      </div>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md ring-1 sm:rounded-lg">
      <Table hoverable striped>
        <TableHead>
          <TableHeadCell>Order Info</TableHeadCell>
          <TableHeadCell>Items</TableHeadCell>
          <TableHeadCell>
            <button
              className="flex cursor-pointer items-center hover:underline"
              onClick={() => handleSort('date')}
            >
              DATE
              <svg
                className="ms-1.5 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {sortConfig.key === 'date' && sortConfig.direction === 'asc' ? (
                  <path d="M7 14l5-5 5 5H7z" />
                ) : (
                  <path d="M7 10l5 5 5-5H7z" />
                )}
              </svg>
            </button>
          </TableHeadCell>
          <TableHeadCell>
            <button
              className="flex cursor-pointer items-center hover:underline"
              onClick={() => handleSort('total')}
            >
              TOTAL
              <svg
                className="ms-1.5 h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {sortConfig.key === 'total' &&
                sortConfig.direction === 'asc' ? (
                  <path d="M7 14l5-5 5 5H7z" />
                ) : (
                  <path d="M7 10l5 5 5-5H7z" />
                )}
              </svg>
            </button>
          </TableHeadCell>
          <TableHeadCell>
            <div className="leading-tight">
              Payment
              <br />
              Method
            </div>
          </TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Action</TableHeadCell>
          <TableHeadCell></TableHeadCell>
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
                        <p className="text-lighter text-xs">{order.email}</p>
                        <Badge color="indigo" className="mt-1 w-fit">
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
                    <div className="text-sm font-medium">
                      {formattedDate.date}
                    </div>
                    <div className="text-lighter text-xs">
                      {formattedDate.time}
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    ₱ {parseFloat(order.total_amount).toLocaleString()}
                  </TableCell>

                  <TableCell className=" ">
                    {paymentMethodDisplay(order.payment_method)}
                  </TableCell>

                  <TableCell>
                    <div className="flex w-fit flex-col items-start space-y-1">
                      <div
                        className={`${getStatusStyle(order.status)} flex items-center text-xs`}
                      >
                        {statusIcons[order.status] && (
                          <span className="mr-1">
                            {statusIcons[order.status]}
                          </span>
                        )}
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </div>

                      {order.cancel_requested === 1 &&
                        order.status !== 'cancelled' && (
                          <div className="w-fit rounded-sm bg-red-200 px-2 py-0.5 text-xs font-semibold text-red-800">
                            Cancel Requested
                          </div>
                        )}
                    </div>
                  </TableCell>

                  <TableCell>
                    {order.status === 'pending' &&
                    order.cancel_requested === 0 ? (
                      <button
                        onClick={() =>
                          onStatusUpdateClick(
                            order.id,
                            'processing',
                            'Process Order',
                            'Process Order'
                          )
                        }
                        className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:underline"
                      >
                        Process Order
                      </button>
                    ) : order.status === 'pending' &&
                      order.cancel_requested === 1 ? (
                      <Tooltip
                        content="Order can't be processed. Customer has requested to cancel this order"
                        placement="bottom-end"
                      >
                        <button
                          onClick={() =>
                            onStatusUpdateClick(
                              order.id,
                              '',
                              'Cancel Order',
                              'Cancel Order'
                            )
                          }
                          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:underline"
                        >
                          Cancel Order
                        </button>
                      </Tooltip>
                    ) : order.status === 'cancelled' ? (
                      <span className="text-sm text-gray-500 italic">
                        Order Cancelled
                      </span>
                    ) : order.status === 'processing' ? (
                      <button
                        onClick={() =>
                          onStatusUpdateClick(
                            order.id,
                            'shipping',
                            'Ship Order',
                            'Ship Order'
                          )
                        }
                        className="flex items-center gap-2 text-sm font-medium text-green-600 hover:underline"
                      >
                        Ship Order
                      </button>
                    ) : order.status === 'shipping' ? (
                      <button
                        onClick={() =>
                          onStatusUpdateClick(
                            order.id,
                            'delivered',
                            'Mark Order as Delivered',
                            'Confirm'
                          )
                        }
                        className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                      >
                        Mark Delivered
                      </button>
                    ) : order.status === 'delivered' ? (
                      <div className="flex items-center text-sm text-green-800">
                        <HiCheckCircle className="mr-1 h-5 w-5" />
                        Delivered
                      </div>
                    ) : null}
                  </TableCell>

                  <TableCell className="justify-start">
                    <Dropdown
                      label=""
                      inline
                      renderTrigger={() => (
                        <button className="font-bold text-black hover:text-blue-600">
                          <HiDotsVertical />
                        </button>
                      )}
                    >
                      <DropdownHeader>
                        <div className="font-semibold">Order #{order.id}</div>
                      </DropdownHeader>
                      <DropdownDivider />
                      <DropdownItem
                        onClick={() =>
                          navigate(`/Admin/AdminOrderDetails/${order.id}`)
                        }
                      >
                        View Order Details
                      </DropdownItem>
                      <DropdownItem onClick={() => onViewHistory(order.id)}>
                        View History
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem
                        onClick={() =>
                          navigator.clipboard.writeText(order.id.toString())
                        }
                      >
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
          item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
          product_name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
        })
      ).isRequired,
      total_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
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
