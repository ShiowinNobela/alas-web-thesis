import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import axios from 'axios';
import { AlertCircle, CheckCircle, Clock, Truck, Package, MessageSquare, XCircle } from 'lucide-react';
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/components/ui/timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const fetchOrderHistory = async (orderId) => {
  const { data } = await axios.get(`/api/orders/status-history/${orderId}`);
  return data.data;
};

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipping: Truck,
  delivered: CheckCircle,
  cancelled: AlertCircle,
  cancel_requested: XCircle,
  note: MessageSquare,
};

const statusMessages = {
  pending: 'Order has been placed and is awaiting confirmation',
  processing: 'Your order is being prepared',
  shipping: 'Your order is on its way',
  delivered: 'Your order has been delivered',
  cancelled: 'Order was cancelled',
  cancel_requested: 'Cancellation has been requested',
};

const statusTitles = {
  pending: 'Order Placed',
  processing: 'Order Processing',
  shipping: 'Order Shipped',
  delivered: 'Order Delivered',
  cancelled: 'Order Cancelled',
  cancel_requested: 'Cancellation Requested',
  note: 'Admin Note',
};

const statusColors = {
  pending: 'bg-orange-200 text-orange-900 border-orange-300',
  processing: 'bg-yellow-200 text-yellow-700 border-yellow-300',
  shipping: 'bg-green-200 text-green-800 border-green-300',
  delivered: 'bg-blue-200 text-blue-800 border-blue-300',
  cancel_requested: 'bg-pink-100 text-pink-700 border-pink-300',
  cancelled: 'bg-red-300 text-red-800 border-red-300',
};

export default function UserOrderHistory({ order }) {
  const {
    data: orderHistory = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orderHistory', order?.id],
    queryFn: () => fetchOrderHistory(order?.id),
    enabled: !!order?.id,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-2 text-sm text-gray-500">Loading timeline...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <p className="text-sm text-red-500">Failed to load history</p>
        </CardContent>
      </Card>
    );
  }

  const normalFlow = ['pending', 'processing', 'shipping', 'delivered'];
  const cancelFlow = ['pending', 'cancel_requested', 'cancelled'];

  const isCancelledFlow = orderHistory.some((h) => ['cancel_requested', 'cancelled'].includes(h.status));
  const fullFlow = isCancelledFlow ? cancelFlow : normalFlow;
  const historyMap = Object.fromEntries(orderHistory.map((h) => [h.status, h]));
  const currentStatus = orderHistory[orderHistory.length - 1] || null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-lg">
        <CardTitle className="font-bold">Order Timeline</CardTitle>
      </CardHeader>

      <CardContent className="px-10">
        {fullFlow.length === 0 ? (
          <div className="text-lighter p-8 text-center">
            <p className="text-sm">No activity yet</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row">
            <Timeline className="flex-1">
              {fullFlow.map((status, index) => {
                const entry = historyMap[status];
                const Icon = statusIcons[status] || MessageSquare;
                const isCompleted = !!entry;
                const isCurrent =
                  currentStatus?.status === status || (!isCompleted && index > 0 && historyMap[fullFlow[index - 1]]);

                return (
                  <TimelineItem
                    key={status}
                    step={index + 1}
                    data-current={isCurrent || undefined}
                    className="group-data-[orientation=vertical]/timeline:ms-10"
                  >
                    <TimelineHeader>
                      <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                      <TimelineDate>
                        {entry ? dayjs(entry.status_date).format('MMMM D, YYYY h:mm A') : 'Has not reached yet'}
                      </TimelineDate>
                      <TimelineTitle
                        className={cn(
                          'font-heading text-base font-medium transition-colors',
                          isCurrent ? 'text-primary font-semibold' : isCompleted ? 'text-content' : 'text-lighter'
                        )}
                      >
                        {statusTitles[status] || status}
                      </TimelineTitle>
                      <TimelineIndicator
                        className={cn(
                          'flex size-8 items-center justify-center rounded-full border-2 transition-colors group-data-[orientation=vertical]/timeline:-left-7',
                          isCompleted ? statusColors[status] : 'bg-muted text-muted-foreground border-muted'
                        )}
                      >
                        <Icon size={15} />
                      </TimelineIndicator>
                    </TimelineHeader>
                    <TimelineContent>
                      <p className={cn('text-sm', !isCompleted && 'text-lighter')}>
                        {entry?.notes || statusMessages[status] || 'Awaiting update...'}
                        {entry?.admin_id && (
                          <span className="text-muted-foreground mt-1 block">by {entry.admin_name || 'Admin'}</span>
                        )}
                      </p>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

UserOrderHistory.propTypes = {
  order: PropTypes.object.isRequired,
};
