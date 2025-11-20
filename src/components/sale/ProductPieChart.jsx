import { Card } from 'flowbite-react';
import Chart from 'react-apexcharts';

const ProductPieChart = ({ products, period, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="ring-1">
        <div className="h-64 bg-gray-200 rounded animate-pulse dark:bg-gray-700"></div>
      </Card>
    );
  }

  if (!products || !products.bestSelling || products.bestSelling.length === 0) {
    return (
      <Card className="ring-1">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 dark:text-gray-400">No product data available</p>
        </div>
      </Card>
    );
  }

  // Prepare data for pie chart using bestSelling products
  const chartData = {
    series: products.bestSelling.map(product => product.revenue || 0),
    labels: products.bestSelling.map(product => product.name || 'Unknown Product'),
  };

  const chartOptions = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: chartData.labels,
    colors: [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
      '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
    ],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: '#6B7280',
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex, w }) {
        const product = products.bestSelling[seriesIndex];
        return `₱${(product.revenue || 0).toLocaleString()}`;
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
      },
      dropShadow: {
        enabled: false,
      }
    },
    tooltip: {
      y: {
        formatter: function (value, { seriesIndex, w }) {
          const product = products.bestSelling[seriesIndex];
          return `
            <div class="p-2">
              <div class="font-bold">${product.name || 'Unknown Product'}</div>
              <div>Revenue: ₱${(product.revenue || 0).toLocaleString()}</div>
              <div>Quantity: ${product.quantitySold || 0}</div>
              <div>Price: ₱${(product.price || 0).toLocaleString()}</div>
            </div>
          `;
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <Card className="ring-1">
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
        Product Revenue Distribution
      </h3>
      <div className="h-64">
        <Chart
          options={chartOptions}
          series={chartData.series}
          type="pie"
          height="100%"
        />
      </div>
      <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
        Showing revenue distribution for best-selling products
      </div>
    </Card>
  );
};

export default ProductPieChart;