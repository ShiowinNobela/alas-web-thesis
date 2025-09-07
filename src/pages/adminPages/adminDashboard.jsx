import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from 'flowbite-react';
import SummaryCard from '@/components/bigComponents/SummaryCard';
import RevenueChart from '@/components/charts/RevenueChart';
import CardSkeleton from '@/components/skeletons/CardSkeleton';
import ChartSkeleton from '@/components/skeletons/ChartSkeleton';
import ListCardSkeleton from '@/components/skeletons/ListCardSkeleton';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

function AdminDashboard() {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);
  const endDate = dayjs().add(2, 'day').format('YYYY-MM-DD');

  // Summary Data Query
  const { data: summaryData, isLoading: isSummaryLoading, isError: isSummaryError } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: async () => {
      const { data } = await axios.get(`/api/reports/sales-summary?start=${startDate}&end=${endDate}`);
      return data.data || {};
    }
  });

  // Revenue Data Query
  const { data: revenueData, isLoading: isRevenueLoading, isError: isRevenueError } = useQuery({
    queryKey: ['dashboardRevenue'],
    queryFn: async () => {
      const { data } = await axios.get('/api/reports/');
      return data.data || {};
    }
  });

  // Orders Data Query
  const { data: ordersData, isLoading: isOrdersLoading, isError: isOrdersError } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const { data } = await axios.get('/api/adminOrder');
      return data.data || [];
    }
  });

  const {data: stockData, isLoading: isStockLoading, isError: isStockError } = useQuery({
    queryKey: ['lowStockItems'],
    queryFn: async () => {
      const { data } = await axios.get('/api/');
      return data.data || [];
    }
  });

  // Walk-in Orders Query
  const { data: walkInData, isLoading: isWalkInLoading, isError: isWalkInError } = useQuery({
    queryKey: ['walkInOrders'],
    queryFn: async () => {
      const { data } = await axios.get('/api/walkInOrders');
      return data.data || [];
    }
  });

  // Customer Accounts Query
  const { data: customerData, isLoading: isCustomerLoading, isError: isCustomerError } = useQuery({
    queryKey: ['customerAccounts'],
    queryFn: async () => {
      const { data } = await axios.get('/api/adminUser', { params: { role: 'customer' } });
      return data.data || [];
    }
  });

  const isPerformanceLoading = isSummaryLoading || isWalkInLoading || isCustomerLoading;
  const isDashboardLoading = isPerformanceLoading || isRevenueLoading || isOrdersLoading || isStockLoading;

  return (
    <div className="grid grid-cols-1 gap-6 p-4 bg-admin lg:grid-cols-6">
      {/* Performance Indicators */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:col-span-6">
        {isPerformanceLoading ? 
          [...Array(5)].map((_, idx) => <CardSkeleton key={idx} />) 
        : isSummaryError || isWalkInError || isCustomerError ? (
          <div className="flex items-center justify-center col-span-5 p-6 text-center text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[120px]">
            Failed to load summary data.
          </div>
        ) : (summaryData && Object.keys(summaryData).length > 0) || 
            (walkInData && walkInData.length > 0) || 
            (customerData && customerData.length > 0) ? 
          [
            {
              title: 'Total Sales',
              value: `₱ ${summaryData?.totalSales?.toLocaleString() || 0}`,
              icon: 'sales',
              color: 'text-green-600',
            },
            {
              title: 'Orders',
              value: summaryData?.totalOrders || 0,
              icon: 'orders',
              color: 'text-blue-600',
            },
            {
              title: 'Walk In Orders',
              value: walkInData?.length || 0,
              icon: 'walkInOrders',
              color: 'text-yellow-600',
            },
            {
              title: 'Total Customers',
              value: customerData?.length || 0,
              icon: 'customer',
              color: 'text-yellow-400',
            },
            {
              title: 'Total Items Sold',
              value: summaryData?.totalItemsSold || 0,
              icon: 'lowStock',
              color: 'text-red-600',
            },
          ].map((item, idx) => (
            <SummaryCard
              key={idx}
              iconKey={item.icon || 'orders'}
              iconColor={item.color || 'text-blue-600'}
              title={item.title}
              value={item.value}
            />
          ))
        : (
          <div className="flex items-center justify-center col-span-5 p-6 text-center text-gray-500 bg-white rounded-lg shadow-sm ring-1 min-h-[120px]">
            No performance data available
          </div>
        )}
      </div>
      
      {/* Revenue Chart */}
      <div className="lg:col-span-4">
        {isRevenueLoading ? (
          <ChartSkeleton />
        ) : isRevenueError ? (
          <div className="flex items-left justify-center p-6 text-center text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[300px]">
            Failed to load revenue data.
          </div>
        ) : (
          <RevenueChart 
            series={revenueData?.series || []} 
            categories={revenueData?.categories || []} 
          />
        )}
      </div>

      {/* Low Stock Alert */}
      <div className="lg:col-span-2">
        {isStockLoading ? (
          <ListCardSkeleton items={4} />
        ) : isStockError ? (
          <div className="flex items-center justify-center p-6 text-center text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[200px]">
            Failed to load low stock data.
          </div>  
        ) : (
          <Card className="h-full shadow-sm rounded-2xl ring-1">
            <h3 className="mb-4 text-lg font-semibold">Low Stock Alerts</h3>
            {stockData?.lowStock?.length > 0 ? (
              <ul className="space-y-3">
                {stockData.lowStock.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-sm text-red-500">Low</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4 text-center text-gray-500">All products are well-stocked</p>
            )}
          </Card>
        )}
      </div>

      {/* Recent Orders */}
      <div className="lg:col-span-4">
        {isOrdersLoading ? (
          <TableSkeleton columns={4} rows={5} />
        ) : isOrdersError ? (
          <div className="flex items-center justify-center p-6 text-center text-red-600 bg-white rounded-lg shadow-sm ring-1 min-h-[300px]">
            Failed to load recent orders data.
          </div>  
        ) : (
          <Card className="h-full shadow-sm rounded-2xl ring-1">
            <h3 className="mb-4 text-lg font-semibold">Recent Orders</h3>
            {(ordersData || []).length > 0 ? (
              <Table striped hoverable>
                <TableHead>
                  <TableHeadCell>Order ID</TableHeadCell>
                  <TableHeadCell>Customer</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Total</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y text-content">
                  {(ordersData || []).slice(0, 5).map((order, idx) => (
                    <TableRow key={idx} className="bg-white dark:bg-gray-700">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.username}</TableCell>
                      <TableCell>
                        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          order.status?.toLowerCase() === 'pending' ? 'bg-orange-200 text-orange-800' :
                          order.status?.toLowerCase() === 'processing' ? 'bg-yellow-200 text-yellow-800' :
                          order.status?.toLowerCase() === 'shipping' ? 'bg-green-200 text-green-800' :
                          order.status?.toLowerCase() === 'delivered' ? 'bg-blue-200 text-blue-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>₱ {parseFloat(order.total_amount).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center py-6 text-center">
                <p className="text-gray-500">No recent orders</p>
              </div>
            )}
          </Card>
        )}
      </div>
      
      {/* Quick Actions */}   
      <div className="lg:col-span-2">
        <Card className="h-full shadow-sm rounded-2xl ring-1">
          <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <Button color="gray">Add Product</Button>
            <Button color="gray">View Inventory</Button>
            <Button color="gray">Manage Orders</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;