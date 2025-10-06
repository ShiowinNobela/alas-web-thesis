import { Card, Button } from 'flowbite-react';
import SummaryCard from '@/components/cards/SummaryCard';
import RevenueChart from '@/components/charts/RevenueChart';
import CardSkeleton from '@/components/skeletons/CardSkeleton';
import ChartSkeleton from '@/components/skeletons/ChartSkeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const { data: items, isLoading: isLoading } = useQuery({
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:col-span-6">
        {isLoading
          ? [...Array(5)].map((_, idx) => <CardSkeleton key={idx} />)
          : items &&
            [
              {
                title: 'Total Sales ',
                value: items?.totalSales.toLocaleString() || 0,
                icon: 'sales',
                color: 'text-green-600',
                className: 'bg-green-100 dark:bg-green-900/50',
              },
              {
                title: 'Total Online Orders',
                value: items?.totalOnlineOrders.toLocaleString() || 0,
                icon: 'orders',
                color: 'text-blue-600',
                className: 'bg-blue-100 dark:bg-blue-900/50',
              },
              {
                title: 'Total Walk-in Orders',
                value: items?.totalWalkInOrders.toLocaleString() || 0,
                icon: 'walkInOrders',
                color: 'text-fuchsia-600',
                className: 'bg-fuchsia-100 dark:bg-fuchsia-900/50',
              },
              {
                title: 'Total Items Sold',
                value: items?.totalItemsSold || 0,
                icon: 'packageGreen',
                color: 'text-yellow-400',
                className: 'bg-amber-100 dark:bg-amber-900/50',
              },
              {
                title: 'Total Customers',
                value: items?.totalCustomers || 0,
                icon: 'customer',
                color: 'text-teal-600',
                className: 'bg-teal-100 dark:bg-teal-900/50',
              },
            ].map((item, idx) => (
              <SummaryCard
                key={idx}
                iconKey={item.icon || 'orders'}
                iconColor={item.color || 'text-blue-600'}
                className={item.className || ''}
                title={item.title}
                value={item.value}
              />
            ))}
      </div>

      <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-4">
        <p>Empty for now, top products soon...</p>
      </Card>

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

      {isLoadingDaily ? (
        <ChartSkeleton />
      ) : (
        <RevenueChart title="Revenue within 7 Days" series={revenueSeries} categories={revenueCategories} />
      )}

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
    </div>
  );
}

export default AdminDashboard;
