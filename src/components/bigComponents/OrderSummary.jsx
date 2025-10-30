import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderSummary, fetchLast30OrderSummary } from '@/api/orders';
import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
// import OrderInfoModal from '../modals/OrderInfoModal';
// import { Tooltip } from 'flowbite-react';
// import { RefreshCcw } from 'lucide-react';

// Meoized cards component
const OrderCards = memo(function OrderCards({ data }) {
  return (
    <div className="flex flex-grow flex-row gap-2">
      {data.map(({ status, totalOrders }) => (
        <div
          key={status}
          className={`flex flex-col items-center justify-center ${getStatusStyle(
            status
          )} flex-1 rounded-2xl p-2 shadow transition-transform duration-400 ease-in-out hover:scale-105 hover:shadow-lg`}
          title={status.charAt(0).toUpperCase() + status.slice(1).replaceAll('_', ' ')}
        >
          <span className="mb-1 truncate text-center text-sm font-semibold">
            {status.charAt(0).toUpperCase() + status.slice(1).replaceAll('_', ' ')}
          </span>
          <span className="text-xl font-semibold">{totalOrders}</span>
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
        <p className="text-primary">Failed to load order summary.</p>
        <button onClick={onRefresh} className="ml-2 text-blue-600 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card flex w-full flex-row space-x-4 rounded-2xl p-4 ring-1">
      <div className="flex-none cursor-pointer rounded-lg p-4 transition">
        <div className="flex items-center justify-between">
          <div className="text-content">
            <h2 className="font-bold">Order List Management</h2>
            <p className="text-sm">Manage your orders here</p>
            <p className="text-lighter text-xs">{timeRange}</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="flex flex-1 items-center justify-center rounded-2xl p-2"></Skeleton>
      ) : hasData ? (
        <OrderCards data={activeData} />
      ) : (
        <div className="flex w-full items-center justify-center">
          <p>Edit the dates to see orders per status on that time</p>
        </div>
      )}

      {/* <div className="flex flex-col items-center justify-center space-y-2">
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
            <RefreshCcw className="h-5 w-5 transition-transform duration-300 group-active:rotate-180" />
          </button>
        </Tooltip>
      </div> */}
    </div>
  );
};

OrderCards.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      totalOrders: PropTypes.number.isRequired,
    })
  ).isRequired,
};

OrderSummary.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onRefresh: PropTypes.func,
};

export default OrderSummary;
