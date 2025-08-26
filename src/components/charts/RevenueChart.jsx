import Chart from 'react-apexcharts';
import { Card } from 'flowbite-react';

const RevenueChart = ({
  series,
  categories,
  title = 'Revenue (This Week)',
}) => {
  const options = {
    chart: {
      id: 'revenue-chart',
      toolbar: { show: false },
      background: 'transparent',
    },
    xaxis: {
      categories,
      labels: { style: { colors: '#7e8693' } },
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#f59e0b'],
    dataLabels: { enabled: false },
    grid: { strokeDashArray: 4, borderColor: 'rgba(107, 114, 128, 0.2)' },
    yaxis: {
      labels: {
        style: { colors: '#7e8693' },
        formatter: (value) => `₱ ${value}`,
      },
    },
    tooltip: {
      y: { formatter: (value) => `₱ ${value}` },
    },
    theme: { mode: 'light' },
  };

  return (
    <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-4">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <Chart options={options} series={series} type="line" height={180} />
    </Card>
  );
};

export default RevenueChart;
