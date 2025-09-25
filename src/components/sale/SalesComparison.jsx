import { Card } from 'flowbite-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesComparison = ({ weeklyData, monthlyData, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="mb-6">
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </Card>
    );
  }

  const comparisonData = [
    {
      name: 'Online Sales',
      weekly: weeklyData?.onlineSales?.totalSales || 0,
      monthly: monthlyData?.onlineSales?.totalSales || 0,
    },
    {
      name: 'Walk-in Sales',
      weekly: weeklyData?.walkInSales?.totalSales || 0,
      monthly: monthlyData?.walkInSales?.totalSales || 0,
    },
    {
      name: 'Total Orders',
      weekly: weeklyData?.totals?.totalOrders || 0,
      monthly: monthlyData?.totals?.totalOrders || 0,
    },
    {
      name: 'Items Sold',
      weekly: weeklyData?.totals?.totalItemsSold || 0,
      monthly: monthlyData?.totals?.totalItemsSold || 0,
    },
  ];

  return (
    <Card className="mb-6">
      <h3 className="mb-4 text-lg font-bold">Weekly vs Monthly Comparison</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`₱${value.toLocaleString()}`, 'Value']}
            />
            <Bar dataKey="weekly" fill="#3B82F6" name="Weekly" />
            <Bar dataKey="monthly" fill="#10B981" name="Monthly" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SalesComparison;