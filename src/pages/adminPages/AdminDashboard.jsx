import { Card, Button } from 'flowbite-react';
import SummaryCard from '@/components/cards/SummaryCard';
import RevenueChart from '@/components/charts/RevenueChart';
import CardSkeleton from '@/components/skeletons/CardSkeleton';
import ChartSkeleton from '@/components/skeletons/ChartSkeleton';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Crown, Star, TrendingUp, AlertTriangle, AlertCircle, ArrowRight, Plus, Archive, Package, ShoppingCart, User, CreditCard, Activity, CheckCircle } from 'lucide-react';

function AdminDashboard() {
  const { data: items, isLoading: isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await axios.get('/api/dashboard/metrics');
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
    <div className="grid grid-cols-1 gap-6 p-4 bg-admin lg:grid-cols-6">
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

      <Card className="shadow-sm rounded-2xl ring-1 lg:col-span-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">Top Products</h3>
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        
        {items?.topProducts?.length > 0 ? (
          <div className="space-y-3">
            {items.topProducts.map((p, index) => (
              <div 
                key={p.id} 
                className="flex items-center p-3 space-x-3 transition-shadow duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                {/* Rank Badge */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                }`}>
                  {index === 0 ? <Crown className="w-4 h-4" /> : index + 1}
                </div>
                
                {/* Product Image */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="object-cover w-16 h-16 border border-gray-200 rounded-lg"
                />
                
                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-black truncate dark:text-white">
                    {p.name}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>₱{p.price}</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      Sold: {p.total_sold}
                    </span>
                  </div>
                </div>
                
                {/* Popularity Indicator */}
                <div className="flex-shrink-0">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.total_sold > 50 ? 'bg-green-100 text-green-800' :
                    p.total_sold > 20 ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {p.total_sold > 50 ? 'Hot' : p.total_sold > 20 ? 'Popular' : 'Good'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No top products yet</p>
          </div>
        )}
      </Card>

      <Card className={`border-t-4 border-l-4 shadow-sm rounded-2xl lg:col-span-2 ${
        items?.lowStock?.length > 0 
          ? 'border-red-500 border-l-red-500 border-t-red-500' 
          : 'border-green-500 border-l-green-500 border-t-green-500'
        }`}>
        <div className="flex items-center mb-4 space-x-2">
          {items?.lowStock?.length > 0 ? (
            <>
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-red-700">Low Stock Alerts</h3>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-green-700">Stock Status</h3>
            </>
          )}
        </div>
        
        {items?.lowStock?.length > 0 ? (
          <div className="space-y-3">
            {items.lowStock.map((item) => {
              const isCritical = item.stock <= 5;
              const isWarning = item.stock <= 10;
              
              return (
                <div 
                  key={item.id} 
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    isCritical 
                      ? 'bg-red-50 border-red-200 hover:bg-red-100' 
                      : 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <AlertCircle className={`w-4 h-4 ${
                          isCritical ? 'text-red-500' : 'text-orange-500'
                        }`} />
                        <span className={`text-sm font-bold ${
                          isCritical ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          {isCritical ? 'CRITICAL' : 'LOW'} - Only {item.stock} left!
                        </span>
                      </div>
                    </div>
                    
                    <Link 
                      to="/Admin/InventoryManagement" 
                      className="flex-shrink-0 p-1 ml-2 text-gray-500 transition-colors cursor-pointer hover:text-red-600"
                      title="Restock item"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </Link>
                  </div>
                  
                  {/* Stock Level Bar */}
                  <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        isCritical ? 'bg-red-500' : 'bg-orange-500'
                      }`}
                      style={{ 
                        width: `${Math.min((item.stock / 20) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
            
            {/* Quick Action Button */}
            <Link to="/Admin/InventoryManagement">
              <Button 
                color="failure" 
                className="flex items-center justify-center w-full mt-4 space-x-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Manage All Inventory</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="flex justify-center mb-3">
              <CheckCircle className="w-12 h-12 text-green-500" />
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

      <Card className="shadow-sm rounded-2xl ring-1 lg:col-span-2">
        <div className="flex items-center mb-4 space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Product Management */}
          <Link to="/Admin/AddProduct">
            <Button color="gray" className="flex flex-col items-center justify-center w-full h-16 p-2">
              <Plus className="w-5 h-5 mb-1" />
              <span className="text-xs">Add Product</span>
            </Button>
          </Link>
          
          {/* Inventory Management */}
          <Link to="/Admin/InventoryManagement">
            <Button color="gray" className="flex flex-col items-center justify-center w-full h-16 p-2">
              <Archive className="w-5 h-5 mb-1" />
              <span className="text-xs">View Inventory</span>
            </Button>
          </Link>
          
          {/* Orders Management */}
          <Link to="/Admin/Orders">
            <Button color="gray" className="flex flex-col items-center justify-center w-full h-16 p-2">
              <Package className="w-5 h-5 mb-1" />
              <span className="text-xs">Manage Orders</span>
            </Button>
          </Link>
          
          {/* Walk-in Ordering */}
          <Link to="/Admin/WalkInOrdering">
            <Button color="gray" className="flex flex-col items-center justify-center w-full h-16 p-2">
              <ShoppingCart className="w-5 h-5 mb-1" />
              <span className="text-xs">Walk-in Order</span>
            </Button>
          </Link>
          
          {/* User Management */}
          <Link to="/Admin/AccountManagement">
            <Button color="gray" className="flex flex-col items-center justify-center w-full h-16 p-2">
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">User Management</span>
            </Button>
          </Link>
          
          {/* Sales Summary */}
          <Link to="/Admin/SalesPage">
            <Button color="gray" className="flex flex-col items-center justify-center w-full h-16 p-2">
              <CreditCard className="w-5 h-5 mb-1" />
              <span className="text-xs">Sales Summary</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboard;