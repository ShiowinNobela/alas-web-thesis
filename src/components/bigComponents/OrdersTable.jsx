import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, PackageSearch } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from '../ui/card';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import PaymentMethodIcon from '@/components/paymentMethodIcon';

export default function OrdersTable({ orders, onCancelOrder }) {
  const navigate = useNavigate();
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  const toggleExpand = (orderId) => {
    setExpandedOrderIds(
      (prev) =>
        prev.includes(orderId)
          ? prev.filter((id) => id !== orderId)
          : [...prev, orderId]
    );
  };

  // Animation variants (same as before)
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const expandVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2 },
    }),
  };

  return (
    <div className="space-y-2">
      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-lighter h-full rounded-2xl p-6 sm:p-8 text-center shadow">
            <PackageSearch className="text-lighter mx-auto mb-4 size-20 sm:size-32" />
            <p className="font-heading text-base sm:text-lg font-semibold mb-2">
              No orders found
            </p>
            <p className="text-sm text-gray-600">
              Try adjusting your filters or search keyword.
            </p>
          </Card>
        </motion.div>
      ) : (
        orders.map((order, index) => {
          const isExpanded = expandedOrderIds.includes(order?.id);

          return (
            <motion.div
              key={order?.id || index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card className="p-0 overflow-hidden relative">
                {/* Main Content Container */}
                <div className="flex flex-col">
                  {/* Left Content (Order Info) */}
                  <div className="flex-1 p-4 sm:p-6 sm:pr-52">
                    {/* --- Header --- */}
                    <div className="border-b border-gray-200 pb-3 sm:pb-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                        <h2 className="text-lighter text-sm sm:text-base">
                          Order ID:{' '}
                          <span className="text-content font-heading font-semibold tracking-tighter">
                            #{order?.id || 'N/A'}
                          </span>
                        </h2>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex w-fit items-center rounded-sm bg-gray-100 px-3 py-1 text-xs font-semibold shadow-sm ${getStatusStyle(order?.status || 'unknown')}`}
                        >
                          {order?.status || 'Unknown'}
                        </motion.span>
                      </div>
                      <h3 className="mt-1 text-xs sm:text-sm text-gray-600">
                        Ordered on{' '}
                        {order?.order_date ? dayjs(order.order_date).format('D MMMM YYYY') : 'Date not available'}
                      </h3>
                    </div>

                    {/* --- Product List Grid (collapsible) --- */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          variants={expandVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-2 lg:grid-cols-3">
                            {order?.items?.map((item, i) => (
                              <motion.div
                                key={item.item_id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                                whileHover={{ y: -2 }}
                              >
                                <Card className="text-content flex flex-row gap-3 rounded-lg border p-3 shadow-sm hover:shadow-md transition-shadow">
                                  <motion.div
                                    className="size-10 sm:size-12 flex-shrink-0 overflow-hidden rounded bg-orange-200"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <img
                                      src={
                                        item.image ||
                                        'https://via.placeholder.com/80x80?text=IMG'
                                      }
                                      alt={item.product_name}
                                      className="h-full w-full object-cover"
                                    />
                                  </motion.div>
                                  <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
                                    <p className="truncate text-xs sm:text-sm font-semibold">
                                      {item.product_name}
                                    </p>
                                    <p className="text-lighter text-xs">
                                      Qty:{' '}
                                      <span className="text-content font-medium">
                                        {item.quantity}
                                      </span>
                                    </p>
                                  </div>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* --- Footer --- */}
                    <motion.div layout className="mt-3 sm:mt-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-lighter text-sm sm:text-base">
                          Total:{' '}
                          <span className="text-content font-semibold text-lg">
                            {new Intl.NumberFormat('en-PH', {
                              style: 'currency',
                              currency: 'PHP',
                              minimumFractionDigits: 2,
                            }).format(order.total_amount || 0)}
                          </span>
                        </p>

                        <div className="text-lighter flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">{order?.items?.length || 0}</span>
                            <span>items</span>
                          </span>
                          <span className="hidden font-bold sm:inline">·</span>
                          <span className="hidden sm:inline">Expected: June 20, 1996</span>
                          <span className="hidden font-bold sm:inline">·</span>
                          <div className="flex items-center">
                            <PaymentMethodIcon method={order?.payment_method || 'unknown'} />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mobile Action Buttons */}
                    <div className="mt-4 flex flex-col gap-2 sm:hidden">
                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() =>
                            navigate(`/UserViewOrderDetails/${order?.id}`)
                          }
                          className="w-full"
                        >
                          View Details
                        </Button>
                      </motion.div>

                      {order?.status === 'pending' ? (
                        order?.cancel_requested === 1 ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <Button
                                  variant="secondary"
                                  disabled
                                  className="w-full"
                                >
                                  Cancel Requested
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              This order has already requested cancellation.
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Button
                              variant="destructive"
                              onClick={() => onCancelOrder(order?.id)}
                              className="w-full"
                            >
                              Cancel Order
                            </Button>
                          </motion.div>
                        )
                      ) : null}

                      <motion.div whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          onClick={() => toggleExpand(order?.id)}
                          aria-label="Toggle item list"
                          className="w-full"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="mr-2 h-4 w-4" />
                              Hide Items
                            </>
                          ) : (
                            <>
                              <ChevronDown className="mr-2 h-4 w-4" />
                              Show Items ({order?.items?.length || 0})
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>

                  {/* Desktop Right Side Buttons - Hidden on mobile */}
                  <div className="absolute right-0 top-0 hidden flex-col gap-3 p-6 sm:flex sm:w-48">
                    {/* View Details button */}
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() =>
                          navigate(`/UserViewOrderDetails/${order?.id}`)
                        }
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </motion.div>

                    {/* Separator line */}
                    <div className="my-1 border-t border-gray-200"></div>

                    {order?.status === 'pending' ? (
                      order?.cancel_requested === 1 ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <Button
                                variant="secondary"
                                disabled
                                className="w-full"
                              >
                                Cancel Requested
                              </Button>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            This order has already requested cancellation.
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <motion.div whileHover={{ scale: 1.03 }}>
                          <Button
                            variant="destructive"
                            onClick={() => onCancelOrder(order?.id)}
                            className="w-full"
                          >
                            Cancel Order
                          </Button>
                        </motion.div>
                      )
                    ) : null}

                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        onClick={() => toggleExpand(order?.id)}
                        aria-label="Toggle item list"
                        className="w-full"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="mr-2 h-4 w-4" />
                            Hide Items
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-2 h-4 w-4" />
                            Show Items
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })
      )}
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
          image: PropTypes.string,
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
  onCancelOrder: PropTypes.func.isRequired,
};
