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
  ArrowRight,
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

      <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Top Products</h3>
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>

        {items?.topProducts?.length > 0 ? (
          <div className="space-y-3">
            {items.topProducts.map((p, index) => (
              <Card key={p.id} className="flex gap-4 ring-1">
                <div className="flex items-center">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold text-white ${
                      index === 0
                        ? 'bg-yellow-500'
                        : index === 1
                          ? 'bg-gray-400'
                          : index === 2
                            ? 'bg-orange-600'
                            : 'bg-blue-500'
                    }`}
                  >
                    {index === 0 ? <Crown className="h-5 w-5" /> : index + 1}
                  </div>

                  {/* Product Image */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-16 w-16 flex-shrink-0 rounded-lg border border-gray-200 object-cover"
                  />

                  {/* Product Info */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="truncate text-lg font-semibold text-gray-900 dark:text-white">{p.name}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span>₱{p.price}</span>
                      <span className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-500" />
                        Sold: {p.total_sold}
                      </span>
                    </div>
                  </div>

                  {/* Popularity Indicator */}
                  <div className="flex-shrink-0">
                    <div className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200">
                      {p.total_sold > 50 ? 'Hot' : p.total_sold > 20 ? 'Popular' : 'Good'}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <TrendingUp className="mx-auto mb-2 h-12 w-12 text-gray-300" />
            <p>No top products yet</p>
          </div>
        )}
      </Card>

      <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-2">
        <div className="mb-4 flex items-center space-x-2">
          {items?.lowStock?.length > 0 ? (
            <>
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-red-700">Low Stock Alerts</h3>
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="text-lg font-semibold text-green-700">Stock Status</h3>
            </>
          )}
        </div>

        {items?.lowStock?.length > 0 ? (
          <div className="space-y-3">
            {items.lowStock.map((item) => {
              const isCritical = item.stock <= 5;

              return (
                <div
                  key={item.id}
                  className={`rounded-lg border p-3 transition-all duration-200 ${
                    isCritical
                      ? 'border-red-200 bg-red-50 hover:bg-red-100'
                      : 'border-orange-200 bg-orange-50 hover:bg-orange-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <AlertCircle className={`h-4 w-4 ${isCritical ? 'text-red-500' : 'text-orange-500'}`} />
                        <span className={`text-sm font-bold ${isCritical ? 'text-red-600' : 'text-orange-600'}`}>
                          {isCritical ? 'CRITICAL' : 'LOW'} - Only {item.stock} left!
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/Admin/InventoryManagement"
                      className="ml-2 flex-shrink-0 cursor-pointer p-1 text-gray-500 transition-colors hover:text-red-600"
                      title="Restock item"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </Link>
                  </div>

                  {/* Stock Level Bar */}
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${isCritical ? 'bg-red-500' : 'bg-orange-500'}`}
                      style={{
                        width: `${Math.min((item.stock / 20) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}

            {/* Quick Action Button */}
            <Link to="/Admin/InventoryManagement">
              <Button color="failure" className="mt-4 flex w-full cursor-pointer items-center justify-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Manage All Inventory</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="mb-3 flex justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <p className="font-medium text-green-700">All items are well stocked! Yippie!!!!</p>
          </div>
        )}
      </Card>

      {isLoadingDaily ? (
        <ChartSkeleton />
      ) : (
        <RevenueChart title="Revenue within 7 Days" series={revenueSeries} categories={revenueCategories} />
      )}

      <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-2">
        <div className="mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Product Management */}
          <Link to="/Admin/AddProduct">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <Plus className="mb-1 h-5 w-5" />
              <span className="text-xs">Add Product</span>
            </Button>
          </Link>

          {/* Inventory Management */}
          <Link to="/Admin/InventoryManagement">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <Archive className="mb-1 h-5 w-5" />
              <span className="text-xs">View Inventory</span>
            </Button>
          </Link>

          {/* Orders Management */}
          <Link to="/Admin/Orders">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <Package className="mb-1 h-5 w-5" />
              <span className="text-xs">Manage Orders</span>
            </Button>
          </Link>

          {/* Walk-in Ordering */}
          <Link to="/Admin/WalkInOrdering">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <ShoppingCart className="mb-1 h-5 w-5" />
              <span className="text-xs">Walk-in Order</span>
            </Button>
          </Link>

          {/* User Management */}
          <Link to="/Admin/AccountManagement">
            <Button color="gray" outline className="flex h-16 w-full flex-col items-center justify-center p-2">
              <User className="mb-1 h-5 w-5" />
              <span className="text-xs">User Management</span>
            </Button>
          </Link>

          {/* Sales Summary */}
          <Link to="/Admin/SalesPage">
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
