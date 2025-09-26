import { Card, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Button } from 'flowbite-react';
import SummaryCard from '@/components/cards/SummaryCard';
import RevenueChart from '@/components/charts/RevenueChart';
import CardSkeleton from '@/components/skeletons/CardSkeleton';
import ChartSkeleton from '@/components/skeletons/ChartSkeleton';
import ListCardSkeleton from '@/components/skeletons/ListCardSkeleton';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorState from '@/components/States/ErrorState';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const {
    data: items,
    isLoading: isLoading,
    isError: isError,
    refetch: refetch,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await axios.get('/api/reports/dashboard');
      return data.data || [];
    },
  });

  const { data: dailySales, isLoading: isLoadingDaily } = useQuery({
    queryKey: ['dailySales'],
    queryFn: async () => {
      const { data } = await axios.get('/api/reports/daily-sales?days=7');
      return data.data;
    },
  });

  //Edit the Chart here for future changes.
  let revenueCategories = [];
  let revenueSeries = [];
  if (dailySales?.days?.length) {
    revenueCategories = dailySales.days.map((day) => dayjs(day.date).format('MMM D'));
    revenueSeries = [
      {
        name: 'Revenue',
        data: dailySales.days.map((day) => day.daily_sales),
      },
    ];
  }

  return (
    <div className="bg-admin grid grid-cols-1 gap-6 p-4 lg:grid-cols-6">
      {/* Cardss */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:col-span-6">
        {isLoading ? (
          [...Array(5)].map((_, idx) => <CardSkeleton key={idx} />)
        ) : isError ? (
          <ErrorState
            error={isError}
            onRetry={refetch}
            title="Failed to load Dashboard Items"
            retryText="Retry Request"
          />
        ) : items ? (
          [
            {
              title: 'Total Sales ',
              value: items?.totalSales || 0,
              icon: 'sales',
              color: 'text-green-600',
            },
            {
              title: 'Total Online Orders',
              value: items?.totalOnlineOrders || 0,
              icon: 'orders',
              color: 'text-blue-600',
            },
            {
              title: 'Total Walk-in Orders',
              value: items?.totalWalkInOrders || 0,
              icon: 'walkInOrders',
              color: 'text-yellow-600',
            },
            {
              title: 'Total Items Sold',
              value: items?.totalItemsSold || 0,
              icon: 'packageGreen',
              color: 'text-yellow-400',
            },
            {
              title: 'Total Customers',
              value: items?.totalCustomers || 0,
              icon: 'customer',
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
        ) : (
          <div className="col-span-5 flex min-h-[120px] items-center justify-center rounded-lg bg-white p-6 text-center text-gray-500 shadow-sm ring-1">
            No performance data available
          </div>
        )}
      </div>

      {/* Revenue Chart */}
      {isLoadingDaily ? (
        <ChartSkeleton />
      ) : (
        <RevenueChart title="Revenue within 7 Days" series={revenueSeries} categories={revenueCategories} />
      )}

      {/* Low Stock Alert */}
      {isLoading ? (
        <ListCardSkeleton items={4} />
      ) : (
        <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold">Low Stock Alerts</h3>
          <ul className="space-y-3">
            {['Hot Sauce', 'BBQ Sauce', 'Garlic Mayo'].map((item, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <span>{item}</span>
                <span className="text-sm text-red-500">Low</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Recent Orders */}
      {isLoading ? (
        <TableSkeleton columns={4} rows={3} />
      ) : (
        <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-4">
          <h3 className="mb-4 text-lg font-semibold">Recent Orders</h3>
          <Table striped hoverable>
            <TableHead>
              <TableHeadCell>Order ID</TableHeadCell>
              <TableHeadCell>Customer</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Total</TableHeadCell>
            </TableHead>
            <TableBody className="text-content divide-y">
              {items?.recentOrders?.length > 0 ? (
                items.recentOrders.map((order, idx) => (
                  <TableRow key={idx} className="bg-white dark:bg-gray-700">
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>{order.order_date}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'shipping'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>₱{order.total_amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-4 text-center">
                    No recent orders
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Quick Actions */}
      {isLoading ? (
        <ListCardSkeleton items={4} />
      ) : (
        <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
          <div className="flex flex-col gap-3">
            <Link to="/Admin/AddProduct">
              <Button color="gray">Add Product</Button>
            </Link>
            <Link to="/Admin/InventoryManagement">
              <Button color="gray">View Inventory</Button>
            </Link>
            <Link to="/Admin/Orders">
              <Button color="gray">Manage Orders</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}

export default AdminDashboard;
