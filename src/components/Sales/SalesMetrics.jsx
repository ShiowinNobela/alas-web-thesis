import { Card } from 'flowbite-react';
import { TrendingUp, ShoppingCart, Store, Package, Users, CheckCircle, XCircle } from 'lucide-react';
import { getStatusStyle } from '@/utils/statusBadgeStyle';

const SalesMetricCard = ({ title, value, subtitle, icon: Icon, color, status, loading }) => (
  <Card className={`h-full flex flex-col transition-all hover:-translate-y-1 hover:shadow-md border-l-4 ${color} border-opacity-50 dark:bg-gray-800`}>
    <div className="flex items-start justify-between flex-1">
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="mb-1 text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          {subtitle && <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
          {loading ? (
            <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 animate-pulse"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          )}
        </div>
        {status && (
          <div className="flex items-center mt-2 space-x-2">
            {status.positive && <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />}
            {!status.positive && <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />}
            <span className={`text-xs ${status.className} ${getStatusStyle(status.type)} dark:text-gray-300`}>
              {status.label}
            </span>
          </div>
        )}
      </div>
      <Icon className={`w-8 h-8 ${color.replace('border-l-', 'text-')} dark:opacity-90 opacity-70`} />
    </div>
  </Card>
);

const SalesMetrics = ({ currentData, previousData, period, isLoading }) => {
  const { onlineSales, walkInSales, totals } = currentData || {};
  const prevData = previousData || {};
  
  const getComparisonStatus = (current, previous) => {
    if (!previous || previous === 0) return null;
    
    const difference = ((current - previous) / previous) * 100;
    const isPositive = difference >= 0;
    
    return {
      positive: isPositive,
      label: `${isPositive ? '+' : ''}${difference.toFixed(1)}% vs previous ${period.toLowerCase()}`,
      type: isPositive ? 'delivered' : 'cancelled',
      className: isPositive 
        ? 'text-green-700 dark:text-green-500 font-medium' 
        : 'text-red-600 dark:text-red-700 font-medium'
    };
  };

  const metrics = [
    {
      title: "Total Sales",
      value: `₱${totals?.totalSales?.toLocaleString() || 0}`,
      subtitle: `Previous: ₱${prevData?.totals?.totalSales?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: "border-l-green-500",
      status: getComparisonStatus(totals?.totalSales, prevData?.totals?.totalSales),
    },
    {
      title: "Online Orders",
      value: onlineSales?.orderCount || 0,
      subtitle: `₱${onlineSales?.totalSales?.toLocaleString() || 0} (Previous: ₱${prevData?.onlineSales?.totalSales?.toLocaleString() || 0})`,
      icon: ShoppingCart,
      color: "border-l-blue-500",
      status: getComparisonStatus(onlineSales?.orderCount, prevData?.onlineSales?.orderCount),
    },
    {
      title: "Walk-in Orders",
      value: walkInSales?.orderCount || 0,
      subtitle: `₱${walkInSales?.totalSales?.toLocaleString() || 0} (Previous: ₱${prevData?.walkInSales?.totalSales?.toLocaleString() || 0})`,
      icon: Store,
      color: "border-l-orange-500",
      status: getComparisonStatus(walkInSales?.orderCount, prevData?.walkInSales?.orderCount),
    },
    {
      title: "Items Sold",
      value: totals?.totalItemsSold || 0,
      subtitle: `Previous: ${prevData?.totals?.totalItemsSold || 0}`,
      icon: Package,
      color: "border-l-purple-500",
      status: getComparisonStatus(totals?.totalItemsSold, prevData?.totals?.totalItemsSold),
    },
    {
      title: "Total Orders",
      value: totals?.totalOrders || 0,
      subtitle: `Previous: ${prevData?.totals?.totalOrders || 0}`,
      icon: Users,
      color: "border-l-red-500",
      status: getComparisonStatus(totals?.totalOrders, prevData?.totals?.totalOrders),
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-bold text-gray-900 capitalize dark:text-white">{period} Sales Overview</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
        {metrics.map((metric, index) => (
          <SalesMetricCard key={index} {...metric} loading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default SalesMetrics;