// components/OrderSummary.jsx
import { HiOutlineRefresh } from 'react-icons/hi';
import { Tooltip } from 'flowbite-react';
import dayjs from 'dayjs';
import OrderInfoModal from '../modals/OrderInfoModal';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderSummary, fetchLast30OrderSummary } from '@/api/orders';
import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-orange-200 text-orange-800';
    case 'processing':
      return 'bg-yellow-200 text-yellow-800';
    case 'shipping':
      return 'bg-green-200 text-green-800';
    case 'delivered':
      return 'bg-blue-200 text-blue-800';
    case 'returned':
      return 'bg-pink-200 text-pink-800';
    case 'refunded':
      return 'bg-violet-200 text-violet-800';
    case 'cancelled':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// ✅ Memoized cards component
const OrderCards = memo(function OrderCards({ data }) {
  return (
    <div className="flex flex-grow flex-row gap-2">
      {data.map(({ status, totalOrders }) => (
        <div
          key={status}
          className={`flex flex-col items-center justify-center ${getStatusColor(
            status
          )} flex-1 rounded-xl p-2 shadow transition-transform duration-400 ease-in-out hover:scale-105 hover:shadow-lg`}
          title={status.charAt(0).toUpperCase() + status.slice(1).replaceAll('_', ' ')}
        >
          <span className="mb-1 truncate text-center text-sm font-semibold">
            {status.charAt(0).toUpperCase() + status.slice(1).replaceAll('_', ' ')}
          </span>
          <span className="text-3xl font-extrabold">{totalOrders}</span>
          <span className="text-xs">{totalOrders === 1 ? 'order' : 'orders'}</span>
        </div>
      ))}
    </div>
  );
});

const OrderSummary = ({ startDate, endDate, onRefresh }) => {
  const delayedFetchOrderSummary = async (start, end, delay = 500) => {
    const result = await fetchOrderSummary(start, end);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return result;
  };

  const {
    data: summaryData = [],
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useQuery({
    queryKey: ['orderSummary', startDate, endDate],
    queryFn: () =>
      delayedFetchOrderSummary(
        startDate ? new Date(startDate) : null,
        endDate ? new Date(endDate) : null,
        400 // delay in ms
      ),
    enabled: !!startDate && !!endDate,
  });

  const {
    data: last30SummaryData = [],
    isLoading: isLast30SummaryLoading,
    isError: isLast30SummaryError,
  } = useQuery({
    queryKey: ['last30OrderSummary'],
    queryFn: fetchLast30OrderSummary,
  });

  const isLoading = isSummaryLoading || isLast30SummaryLoading;
  const isError = isSummaryError || isLast30SummaryError;
  const activeData = summaryData.length > 0 ? summaryData : last30SummaryData;
  const hasData = activeData.length > 0;

  const timeRange =
    startDate && endDate
      ? `${dayjs(startDate).format('MMM D')} - ${dayjs(endDate).format('MMM D, YYYY')}`
      : 'Last 30 days';

  if (isError) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-red-500">Failed to load order summary.</p>
        <button onClick={onRefresh} className="ml-2 text-blue-600 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card flex w-full flex-row space-x-4 rounded-xl p-4 ring-1">
      <div className="w-1/7 flex-none cursor-pointer rounded-lg p-4 transition">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Order List Management</h2>
            <p className="text-lighter text-sm">Manage orders here</p>
            <p className="text-xs text-gray-500">{timeRange}</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="flex flex-1 items-center justify-center rounded-xl p-2"></Skeleton>
      ) : hasData ? (
        <OrderCards data={activeData} />
      ) : (
        <div className="flex w-full items-center justify-center">
          <p>Edit the dates to see orders per status on that time</p>
        </div>
      )}

      <div className="flex flex-col items-center justify-center space-y-2">
        <OrderInfoModal tooltipContent="Learn more about orders" modalTitle="Order Information">
          <p>This modal shows detailed information or guides about orders.</p>
          <p>Someone can work on this, it would just be a guide anyway, heck put pics on the guide if you want</p>
        </OrderInfoModal>

        <Tooltip content="Reload" placement="bottom">
          <button
            onClick={onRefresh}
            className="group rounded-full border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-label="Refresh data"
          >
            <HiOutlineRefresh className="h-5 w-5 transition-transform duration-300 group-active:rotate-180" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default OrderSummary;
