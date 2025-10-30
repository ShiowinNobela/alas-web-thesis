import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, PackageSearch } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '../ui/card';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import PaymentMethodIcon from '@/components/bigComponents/PaymentMethodsIcon';

export default function OrdersCard({ orders, onCancelOrder, onRefundOrder, onReturnOrder }) {
  const navigate = useNavigate();
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  const toggleExpand = (orderId) => {
    setExpandedOrderIds((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]));
  };

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
    <div className="space-y-3">
      <div className="flex items-center px-2 sm:px-0">
        <h2 className="text-content font-semibold sm:text-xl">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </h2>
      </div>
      {orders.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card className="text-lighter h-full rounded-2xl p-6 text-center shadow sm:p-8">
            <PackageSearch className="text-lighter mx-auto mb-4 size-20 sm:size-32" />
            <p className="font-heading mb-2 text-base font-semibold sm:text-lg">No orders found</p>
            <p className="text-sm text-gray-600">Try adjusting your filters or search keyword.</p>
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
              whileHover={{ scale: 1.02 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card className="hover:ring-primary border-primary relative overflow-hidden border-l-2 p-0 hover:ring-1">
                {/* <PackageSearch className="text-primary/7 absolute top-2 left-2 size-32" strokeWidth={1} /> */}
                {/* New Design I */}
                <div className="flex flex-col sm:flex-row">
                  {/* Left Content (Order Info) */}
                  <div className="flex-1 p-4 sm:p-6">
                    {/* --- Header --- */}
                    <div className="border-b border-gray-200 pb-3 sm:pb-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                        <h2 className="text-content">
                          Order ID:{' '}
                          <span className="text-primary font-heading text-sm font-bold tracking-tighter">
                            #{order?.id || 'N/A'}
                          </span>
                        </h2>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex items-center rounded-2xl px-3 py-1 text-xs font-bold ${getStatusStyle(order?.status || 'unknown')}`}
                        >
                          {order?.status || 'Unknown'}
                        </motion.span>
                      </div>
                      <h3 className="text-lighter mt-1 text-xs sm:text-sm">
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
                          <div className="grid grid-cols-1 gap-2 py-2 lg:grid-cols-2">
                            {order?.items?.map((item, i) => (
                              <motion.div
                                key={item.item_id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                                whileHover={{ y: -2 }}
                              >
                                <Card className="text-content flex flex-row gap-2 rounded-2xl p-3 shadow">
                                  <motion.div className="h-15 rounded-2xl" whileHover={{ scale: 1.05 }}>
                                    <img
                                      src={item.image || 'https://via.placeholder.com/80x80?text=IMG'}
                                      alt={item.product_name}
                                      className="h-full w-full object-contain"
                                    />
                                  </motion.div>
                                  <div className="flex h-full flex-1 flex-col justify-between gap-1">
                                    <p className="font-heading font-bold sm:text-sm">{item.product_name}</p>
                                    <p className="text-lighter text-xs">
                                      Quantity: <span className="text-content font-medium">{item.quantity}</span>
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
                          <span className="font-heading font-bold text-emerald-600">
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
                          <div className="flex items-center">
                            <PaymentMethodIcon method={order?.payment_method || 'unknown'} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="ring-primary/15 flex flex-col gap-3 p-4 ring-2 sm:w-54 sm:p-6">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => navigate(`/users/orders/${order?.id}`)} className="w-full">
                        View Details
                      </Button>
                    </motion.div>

                    {order?.status === 'pending' ? (
                      order?.cancel_requested === 1 ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <Button variant="secondary" disabled className="w-full">
                                Cancel Requested
                              </Button>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="left">This order has already requested cancellation.</TooltipContent>
                        </Tooltip>
                      ) : (
                        <motion.div whileHover={{ scale: 1.03 }}>
                          <Button
                            variant="destructive"
                            onClick={() => onCancelOrder(order?.id)}
                            className="w-full bg-amber-500"
                          >
                            Cancel Order
                          </Button>
                        </motion.div>
                      )
                    ) : null}

                    {order?.status === 'cancelled' &&
                      (() => {
                        const latestStatusDate = new Date(order?.latest_status_date);
                        const now = new Date();
                        const daysPassed = (now - latestStatusDate) / (1000 * 60 * 60 * 24);

                        // If refund already requested
                        if (order?.refund_status === 'pending') {
                          return (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>
                                  <Button disabled className="w-full cursor-not-allowed bg-gray-200 text-gray-500">
                                    Refund Requested
                                  </Button>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="left">You already refund requested this order.</TooltipContent>
                            </Tooltip>
                          );
                        }

                        if (order?.refund_status === 'denied') {
                          return (
                            <Button disabled className="text-error w-full cursor-not-allowed bg-red-200">
                              Refund Denied
                            </Button>
                          );
                        }

                        // Only show refund button if it's been 3 days or less
                        if (daysPassed <= 15) {
                          return (
                            <motion.div whileHover={{ scale: 1.03 }}>
                              <Button
                                variant="destructive"
                                onClick={() => onRefundOrder(order?.id)}
                                className="w-full bg-violet-200 text-violet-800 hover:bg-violet-300"
                              >
                                Refund Order
                              </Button>
                            </motion.div>
                          );
                        }

                        return null;
                      })()}

                    {order?.status === 'delivered' &&
                      (() => {
                        // Show return button logic
                        const latestStatusDate = new Date(order?.latest_status_date);
                        const now = new Date();
                        const daysPassed = (now - latestStatusDate) / (1000 * 60 * 60 * 24);

                        // Already has a return request
                        if (order?.return_status === 'pending') {
                          return (
                            <Button disabled className="w-full cursor-not-allowed bg-gray-200 text-gray-500">
                              Return Requested
                            </Button>
                          );
                        }

                        if (order?.return_status === 'denied') {
                          return (
                            <Button disabled className="text-error w-full cursor-not-allowed bg-red-200">
                              Return Denied
                            </Button>
                          );
                        }

                        if (daysPassed <= 3) {
                          return (
                            <motion.div whileHover={{ scale: 1.03 }}>
                              <Button
                                variant="secondary"
                                onClick={() => onReturnOrder(order?.id)}
                                className="w-full bg-pink-200 text-pink-800 hover:bg-pink-300"
                              >
                                Return Order
                              </Button>
                            </motion.div>
                          );
                        }

                        return null;
                      })()}

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
              </Card>
            </motion.div>
          );
        })
      )}
    </div>
  );
}

OrdersCard.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          item_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          product_name: PropTypes.string.isRequired,
          quantity: PropTypes.number.isRequired,
          image: PropTypes.string,
        })
      ).isRequired,
      order_date: PropTypes.string.isRequired,
      total_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      payment_method: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      cancel_requested: PropTypes.number,
    })
  ).isRequired,
  onCancelOrder: PropTypes.func.isRequired,
  onRefundOrder: PropTypes.func,
  onReturnOrder: PropTypes.func,
};
