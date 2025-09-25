import { Card, Progress } from 'flowbite-react';

const SalesBreakdown = ({ data, period, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="mb-6">
        <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
      </Card>
    );
  }

  const { onlineSales, walkInSales, totals } = data || {};
  
  const onlinePercentage = totals?.totalSales 
    ? Math.round((onlineSales?.totalSales / totals.totalSales) * 100) 
    : 0;
  
  const walkInPercentage = totals?.totalSales 
    ? Math.round((walkInSales?.totalSales / totals.totalSales) * 100) 
    : 0;

  const breakdownData = [
    {
      channel: 'Online Sales',
      amount: onlineSales?.totalSales || 0,
      percentage: onlinePercentage,
      color: 'blue',
      orders: onlineSales?.orderCount || 0,
      items: onlineSales?.itemsSold || 0,
    },
    {
      channel: 'Walk-in Sales',
      amount: walkInSales?.totalSales || 0,
      percentage: walkInPercentage,
      color: 'green',
      orders: walkInSales?.orderCount || 0,
      items: walkInSales?.itemsSold || 0,
    },
  ];

  return (
    <Card className="mb-6">
      <h3 className="mb-4 text-lg font-bold capitalize">{period} Sales Breakdown</h3>
      <div className="space-y-4">
        {breakdownData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.channel}</span>
              <span className="text-sm text-gray-600 dark:text-gray-100">
                ₱{item.amount.toLocaleString()} ({item.percentage}%)
              </span>
            </div>
            <Progress 
              progress={item.percentage} 
              color={item.color}
              size="lg"
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-100">
              <span>{item.orders} orders</span>
              <span>{item.items} items sold</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SalesBreakdown;