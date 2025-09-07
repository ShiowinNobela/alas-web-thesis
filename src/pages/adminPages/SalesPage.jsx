import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
  Spinner,
  Alert,
  Button
} from 'flowbite-react';
import {
  TrendingUp,
  ShoppingCart,
  Store,
  Package,
  DollarSign,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
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

const SalesCard = ({ title, value, subtitle, icon: Icon, color, loading }) => (
  <Card className={`h-full transition-all hover:-translate-y-1 hover:shadow-md border border-gray-200 ${color.replace('text', 'bg')} bg-opacity-10`}>
    <div className="flex items-start justify-between">
      <div>
        <h2 className="mb-1 text-lg font-bold uppercase">{title}</h2>
        {subtitle && <p className="mb-2 text-sm opacity-80">{subtitle}</p>}
        {loading ? (
          <Spinner size="sm" />
        ) : (
          <p className="text-xl font-semibold">{value}</p>
        )}
      </div>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
  </Card>
);

const LatestSalesTable = ({ orders, loading }) => {
  if (loading) {
    return <TableSkeleton columns={7} rows={5} />;
  }

  return (
    <Table hoverable>
      <TableHead>
        <TableRow>
          <TableHeadCell>User Info</TableHeadCell>
          <TableHeadCell>Order ID</TableHeadCell>
          <TableHeadCell>Items</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Total</TableHeadCell>
          <TableHeadCell>Payment Method</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.slice(0, 5).map((order) => (
          <TableRow key={order.id} className="border-b border-gray-200">
            <TableCell>
              <div>
                <p className="font-medium">{order.username}</p>
                <p className="text-xs text-gray-500">{order.email}</p>
              </div>
            </TableCell>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>
              <ul className="list-disc list-inside">
                {order.items.map((item) => (
                  <li key={item.item_id} className="text-sm">
                    {item.product_name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>
              <div className="text-sm font-medium">
                {new Date(order.order_date).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(order.order_date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </TableCell>
            <TableCell>
              ₱ {parseFloat(order.total_amount).toLocaleString()}
            </TableCell>
            <TableCell className="capitalize">
              {order.payment_method}
            </TableCell>
            <TableCell>
              <Badge
                className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function SalesPage() {
  const startDate = '2025-05-01';
  const endDate = dayjs().add(2, 'day').format('YYYY-MM-DD');

  // Sales Query
  const {
    data: summaryData,
    isLoading: summaryLoading,
    isError: summaryError,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: ['salesSummary', startDate, endDate],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/reports/sales-summary?start=${startDate}&end=${endDate}`
      );
      return data.data || {};
    },
  });

  // Orders
  const {
    data: ordersData = [],
    isLoading: ordersLoading,
    isError: ordersError,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const { data } = await axios.get('/api/adminOrder');
      return data.data || [];
    },
  });

  // Walk-in
  const {
    data: walkInOrders = [],
    isLoading: walkInLoading,
    isError: walkInError,
    refetch: refetchWalkIn,
  } = useQuery({
    queryKey: ['walkInOrders'],
    queryFn: async () => {
      const { data } = await axios.get('/api/walkInOrders');
      return data.data || [];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const totalWalkInSales = walkInOrders.reduce(
    (sum, order) => sum + parseFloat(order.total_amount || 0),
    0
  );

  const fulfillmentRate =
    ordersData.length > 0
      ? (
          (ordersData.filter(
            (order) => order.status && order.status.toLowerCase() !== 'cancelled'
          ).length /
            ordersData.length) *
          100
        ).toFixed(2)
      : 0;

  const sortedOrders = [...ordersData].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date)
  );

  const summary = {
    totalRevenue: Number(summaryData?.totalSales || 0),
    totalOrders: Number(summaryData?.totalOrders || 0),
    totalItemsSold: Number(summaryData?.totalItemsSold || 0),
  };

  const isLoading = summaryLoading || ordersLoading || walkInLoading;
  const isError = summaryError || ordersError || walkInError;

  const refetchAll = () => {
    refetchSummary();
    refetchOrders();
    refetchWalkIn();
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-admin">
        <Alert color="failure" className="mb-4">
          <span className="font-medium">Error loading sales data</span>
        </Alert>
        <Button onClick={refetchAll} color="failure">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen p-4 bg-admin">
          <div className="mx-auto max-w-screen-2xl">
            <div className="flex flex-col items-center justify-center p-6 text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[300px]">
              <AlertTriangle className="w-12 h-12 mb-4" />
              <p className="mb-2 font-medium">Failed to load sales data</p>
              <p className="mb-4 text-sm">{error.message}</p>
              <Button onClick={resetError} color="failure">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}
    >
      <div className="p-6 bg-admin">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          <p className="text-gray-600">Overview of your SAUCE's performance</p>
        </div>

        {/* Summary Tiles */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-5">
          <SalesCard
            title="Fulfillment Rate"
            value={`${fulfillmentRate}%`}
            icon={TrendingUp}
            color="text-green-600"
            loading={isLoading}
          />
          <SalesCard
            title="Website Sales"
            value={`₱ ${summary.totalRevenue.toLocaleString()}`}
            subtitle="Total Website Sales"
            icon={ShoppingCart}
            color="text-orange-500"
            loading={summaryLoading}
          />
          <SalesCard
            title="Walk-In Sales"
            value={`₱ ${totalWalkInSales.toLocaleString()}`}
            subtitle="Total Walk-In Sales"
            icon={Store}
            color="text-green-500"
            loading={walkInLoading}
          />
          <SalesCard
            title="Total Orders"
            value={summary.totalOrders}
            icon={Package}
            color="text-orange-500"
            loading={summaryLoading}
          />
          <SalesCard
            title="Items Sold"
            value={summary.totalItemsSold}
            icon={DollarSign}
            color="text-green-500"
            loading={summaryLoading}
          />
        </div>

        {/* Revenue Card */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <Card className="transition-all lg:col-span-1 hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Total Revenue</h3>
              <DollarSign className="w-6 h-6 text-orange-500" />
            </div>
            {summaryLoading ? (
              <Spinner size="lg" />
            ) : (
              <p className="text-3xl font-bold">
                ₱ {summary.totalRevenue.toLocaleString()}
              </p>
            )}
          </Card>

          <Card className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Latest Sales</h3>
              {ordersLoading && <Spinner size="sm" />}
            </div>
            <LatestSalesTable orders={sortedOrders} loading={ordersLoading} />
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default SalesPage;
