import { Card } from 'flowbite-react';
import { TrendingUp, ShoppingCart, Store, Package, Users, CheckCircle, XCircle } from 'lucide-react';
import { getStatusStyle } from '@/utils/statusBadgeStyle';

const SalesMetricCard = ({ title, value, subtitle, icon: Icon, color, status, loading }) => (
  <Card className="flex h-full flex-col ring-1">
    <div className="flex flex-1 items-start justify-between">
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="mb-1 text-lg font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          {subtitle && <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
          {loading ? (
            <div className="h-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          )}
        </div>
        {status && (
          <div className="mt-2 flex items-center space-x-2">
            {status.positive && <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />}
            {!status.positive && <XCircle className="text-error h-4 w-4" />}
            <span className={`text-xs ${status.className} ${getStatusStyle(status.type)} dark:text-gray-300`}>
              {status.label}
            </span>
          </div>
        )}
      </div>
      <Icon className={`h-8 w-8 ${color.replace('border-l-', 'text-')} opacity-70 dark:opacity-90`} />
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
      className: isPositive ? 'text-green-700 dark:text-green-500 font-medium' : 'text-error font-medium',
    };
  };

  const metrics = [
    {
      title: 'Total Sales',
      value: `₱${totals?.totalSales?.toLocaleString() || 0}`,
      subtitle: `Previous: ₱${prevData?.totals?.totalSales?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: 'border-l-green-500',
      status: getComparisonStatus(totals?.totalSales, prevData?.totals?.totalSales),
    },
    {
      title: 'Online Orders',
      value: onlineSales?.orderCount || 0,
      subtitle: `₱${onlineSales?.totalSales?.toLocaleString() || 0} (Previous: ₱${prevData?.onlineSales?.totalSales?.toLocaleString() || 0})`,
      icon: ShoppingCart,
      color: 'border-l-blue-500',
      status: getComparisonStatus(onlineSales?.orderCount, prevData?.onlineSales?.orderCount),
    },
    {
      title: 'Walk-in Orders',
      value: walkInSales?.orderCount || 0,
      subtitle: `₱${walkInSales?.totalSales?.toLocaleString() || 0} (Previous: ₱${prevData?.walkInSales?.totalSales?.toLocaleString() || 0})`,
      icon: Store,
      color: 'border-l-orange-500',
      status: getComparisonStatus(walkInSales?.orderCount, prevData?.walkInSales?.orderCount),
    },
    {
      title: 'Items Sold',
      value: totals?.totalItemsSold || 0,
      subtitle: `Previous: ${prevData?.totals?.totalItemsSold || 0}`,
      icon: Package,
      color: 'border-l-purple-500',
      status: getComparisonStatus(totals?.totalItemsSold, prevData?.totals?.totalItemsSold),
    },
    {
      title: 'Total Orders',
      value: totals?.totalOrders || 0,
      subtitle: `Previous: ${prevData?.totals?.totalOrders || 0}`,
      icon: Users,
      color: 'border-l-red-500',
      status: getComparisonStatus(totals?.totalOrders, prevData?.totals?.totalOrders),
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-xl font-bold text-gray-900 capitalize dark:text-white">{period} Sales Overview</h2>
      <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, index) => (
          <SalesMetricCard key={index} {...metric} loading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default SalesMetrics;
