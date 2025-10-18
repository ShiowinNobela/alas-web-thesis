import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import axios from 'axios';
import { AlertCircle, CheckCircle, Clock, Truck, Package, MessageSquare, User, XCircle } from 'lucide-react';
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

const StatusInfoCard = ({ currentStatus }) => {
  if (!currentStatus) {
    return null;
  }

  const getStatusDetails = () => {
    switch (currentStatus.status) {
      case 'pending':
        return {
          description: 'We received your order and it will be processed soon.',
          action: 'Expected processing time: 1-2 business days',
        };
      case 'processing':
        return {
          description: 'Your items are being prepared for shipment.',
          action: 'Expected shipping time: 1-3 business days',
        };
      case 'shipping':
        return {
          description: 'Your package is on its way to you.',
          action: 'Track your shipment with the provided tracking number',
        };
      case 'delivered':
        return {
          description: 'Your order has been successfully delivered.',
          action: 'Please check your items and contact us if there are any issues',
        };
      case 'cancelled':
        return {
          description: 'This order has been cancelled.',
          action: 'If this was unexpected, please contact customer support',
        };
      case 'cancel_requested':
        return {
          description: 'Your cancellation request has been received.',
          action: 'We will process your request shortly',
        };
      default:
        return {
          description: 'Your order is being processed.',
          action: 'Check back for updates',
        };
    }
  };

  const details = getStatusDetails();
  const IconComponent = statusIcons[currentStatus.status] || Package;

  return (
    <div className="flex-shrink-0 max-sm:mt-4 max-sm:ml-0 max-sm:w-full">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'flex size-8 items-center justify-center rounded-full',
            currentStatus.status === 'delivered'
              ? 'bg-green-100 text-green-600'
              : currentStatus.status === 'cancelled'
                ? 'text-primary bg-red-100'
                : 'bg-blue-100 text-blue-600'
          )}
        >
          <IconComponent size={16} />
        </div>
        <span className="font-medium">{statusTitles[currentStatus.status] || 'Order Processing'}</span>
      </div>
      <p className="text-muted-foreground mt-3 text-sm">{details.description}</p>
      <p className="text-muted-foreground mt-2 text-sm font-medium">{details.action}</p>
    </div>
  );
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

  // Sort history with most recent first
  const sortedHistory = [...orderHistory].sort((a, b) => new Date(b.status_date) - new Date(a.status_date));
  const currentStatus = sortedHistory[0];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-lg">
        <CardTitle className="font-bold">Order Timeline</CardTitle>
      </CardHeader>

      <CardContent className="px-10">
        {sortedHistory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">No activity yet</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row">
            <Timeline className="flex-1">
              {sortedHistory.map((entry, index) => {
                const Icon = statusIcons[entry.status] || (entry.admin_id ? User : MessageSquare);
                const isCurrent = index === 0;
                const isAdminNote = entry.admin_id;

                return (
                  <TimelineItem
                    key={`entry-${entry.history_id}`}
                    step={index + 1}
                    data-current={isCurrent || undefined}
                    className="group-data-[orientation=vertical]/timeline:sm:ms-32"
                  >
                    <TimelineHeader>
                      <TimelineSeparator />
                      <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-36 group-data-[orientation=vertical]/timeline:sm:text-right">
                        {dayjs(entry.status_date).format('MMM D, YYYY h:mm A')}
                      </TimelineDate>
                      <TimelineTitle
                        className={cn('sm:-mt-0.5', isCurrent ? 'font-semibold' : 'text-muted-foreground')}
                      >
                        {isAdminNote ? 'Admin Note' : statusTitles[entry.status] || 'System Note'}
                      </TimelineTitle>
                      <TimelineIndicator
                        className={cn(
                          'flex size-6 items-center justify-center border-none',
                          isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        )}
                      >
                        <Icon size={14} />
                      </TimelineIndicator>
                    </TimelineHeader>
                    <TimelineContent>
                      <p className={cn('text-sm', !isCurrent && 'text-muted-foreground')}>
                        {entry.notes || statusMessages[entry.status]}
                        {isAdminNote && (
                          <span className="text-muted-foreground mt-1 block">by {entry.admin_name || 'Admin'}</span>
                        )}
                      </p>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
            <StatusInfoCard currentStatus={currentStatus} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

StatusInfoCard.propTypes = {
  currentStatus: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }),
};

UserOrderHistory.propTypes = {
  order: PropTypes.object.isRequired,
};
