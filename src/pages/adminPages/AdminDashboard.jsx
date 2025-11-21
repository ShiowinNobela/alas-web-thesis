import { Card, Button } from 'flowbite-react';
import SummaryCard from '@/components/cards/SummaryCard';
import RevenueChart from '@/components/charts/RevenueChart';
import CardSkeleton from '@/components/skeletons/CardSkeleton';
import ChartSkeleton from '@/components/skeletons/ChartSkeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import {
  Crown,
  Star,
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  Plus,
  Archive,
  Package,
  ShoppingCart,
  User,
  CreditCard,
  Activity,
  CheckCircle,
} from 'lucide-react';

function AdminDashboard() {
  const { data: items, isLoading: isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await axios.get('/api/reports/dashboard');
      return res.data.data || [];
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

      {isLoadingDaily ? (
        <ChartSkeleton />
      ) : (
        <RevenueChart title="Revenue within 7 Days" series={revenueSeries} categories={revenueCategories} />
      )}

      <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-2">
        <div className="mb-3 flex items-center gap-2">
          {items?.lowStock?.length > 0 ? (
            <>
              <AlertTriangle className="text-error h-5 w-5" />
              <h3 className="text-error text-sm font-semibold">Low Stock Alerts</h3>
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="text-sm font-semibold text-green-700">Stock Status</h3>
            </>
          )}
        </div>

        {items?.lowStock?.length > 0 ? (
          <div className="space-y-2">
            {items.lowStock.slice(0, 2).map((item) => {
              const isCritical = item.stock <= 5;
              return (
                <div
                  key={item.id}
                  className={`rounded-lg border p-2 text-xs ${
                    isCritical ? 'border-red-200 bg-red-50' : 'border-orange-200 bg-orange-50'
                  }`}
                >
                  <p className="truncate font-medium text-gray-900">{item.name}</p>
                  <div className="mt-1 flex items-center gap-1">
                    <AlertCircle className={`h-3 w-3 ${isCritical ? 'text-error' : 'text-orange-500'}`} />
                    <span className={`${isCritical ? 'text-error font-bold' : 'font-bold text-orange-600'}`}>
                      {isCritical ? 'CRITICAL' : 'LOW'} - {item.stock} left
                    </span>
                  </div>
                </div>
              );
            })}

            {items.lowStock.length > 2 && (
              <p className="text-xs text-gray-500">+{items.lowStock.length - 2} more low stock items</p>
            )}

            <Link to="/admin/inventory">
              <Button color="failure" className="mt-2 flex w-full items-center justify-center gap-1 text-xs">
                <AlertTriangle className="h-3 w-3" /> Manage All Inventory
              </Button>
            </Link>
          </div>
        ) : (
          <div className="py-4 text-center">
            <CheckCircle className="mx-auto mb-2 h-10 w-10 text-green-500" />
            <p className="text-sm font-medium text-green-700">All items are well stocked!</p>
          </div>
        )}
      </Card>

      <Card className="rounded-2xl bg-lime-100/25 shadow-sm ring-1 lg:col-span-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Top Products</h3>
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>

        {items?.topProducts?.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {items.topProducts.slice(0, 3).map((p, index) => (
              <Card key={p.id} className="flex flex-col items-center rounded-2xl p-2 ring-1">
                <div className="flex">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                    }`}
                  >
                    {index === 0 ? <Crown className="h-5 w-5" /> : index + 1}
                  </div>
                  <img src={p.image} alt={p.name} className="mb-2 size-15 object-cover" />
                </div>

                <p className="truncate text-center text-sm font-semibold text-gray-900">{p.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="text-money font-bold">₱{p.price}</span>
                  <span className="flex items-center gap-1">{p.total_sold} sold</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-gray-500">
            <TrendingUp className="mx-auto mb-2 h-10 w-10 text-gray-300" />
            <p>No top products yet</p>
          </div>
        )}
      </Card>

      <Card className="rounded-2xl bg-fuchsia-100/25 shadow-sm ring-1 lg:col-span-2">
        <div className="mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Product Management */}
          <Link to="/admin/add-product">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <Plus className="mb-1 h-5 w-5" />
              <span className="text-xs">Add Product</span>
            </Button>
          </Link>

          {/* Inventory Management */}
          <Link to="/admin/inventory">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <Archive className="mb-1 h-5 w-5" />
              <span className="text-xs">View Inventory</span>
            </Button>
          </Link>

          {/* Orders Management */}
          <Link to="/admin/order">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <Package className="mb-1 h-5 w-5" />
              <span className="text-xs">Manage Orders</span>
            </Button>
          </Link>

          {/* Walk-in Ordering */}
          <Link to="/admin/create-walk-in">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <ShoppingCart className="mb-1 h-5 w-5" />
              <span className="text-xs">Walk-in Order</span>
            </Button>
          </Link>

          {/* User Management */}
          <Link to="/admin/account-management">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <User className="mb-1 h-5 w-5" />
              <span className="text-xs">User Management</span>
            </Button>
          </Link>

          {/* Sales Summary */}
          <Link to="/admin/sales">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <CreditCard className="mb-1 h-5 w-5" />
              <span className="text-xs">Sales Summary</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboard;
