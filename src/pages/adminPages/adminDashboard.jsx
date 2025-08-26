import Chart from 'react-apexcharts';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Button,
} from 'flowbite-react';

function AdminDashboard() {
  const revenueOptions = {
    chart: {
      id: 'revenue-chart',
      toolbar: { show: false },
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#f59e0b'], // amber-500
    dataLabels: { enabled: false },
    grid: { strokeDashArray: 4 },
  };

  const revenueSeries = [
    {
      name: 'Revenue',
      data: [400, 300, 500, 250, 600, 450, 700],
    },
  ];

  return (
    <div className="bg-admin grid grid-cols-1 gap-6 p-4 lg:grid-cols-6">
      {/* Performance Indicators */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:col-span-6">
        {[
          { title: 'Total Sales', value: '$12,450' },
          { title: 'Orders', value: '320' },
          { title: 'Walk In Orders', value: '20' },
          { title: 'Customers', value: '120' },
          { title: 'Refunds', value: '5' },
        ].map((item, idx) => (
          <Card key={idx} className="rounded-2xl shadow-sm ring-1">
            <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>
            <p className="text-2xl font-semibold">{item.value}</p>
          </Card>
        ))}
      </div>

      {/* Revenue Chart with ApexCharts */}
      <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-4">
        <h3 className="mb-4 text-lg font-semibold">Revenue (This Week)</h3>
        <Chart
          options={{
            ...revenueOptions,
            theme: { mode: 'light' },
            chart: {
              ...revenueOptions.chart,
              background: 'transparent',
            },
            grid: { borderColor: 'rgba(107, 114, 128, 0.2)' },
            xaxis: {
              ...revenueOptions.xaxis,
              labels: { style: { colors: '#7e8693' } },
            },
            yaxis: {
              labels: {
                style: { colors: '#7e8693' },
                formatter: (value) => `₱ ${value}`,
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `₱ ${value}`,
              },
            },
          }}
          series={revenueSeries}
          type="line"
          height={180}
        />
      </Card>

      {/* Low Stock Alert */}
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

      {/* Recent Orders */}
      <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-4">
        <h3 className="mb-4 text-lg font-semibold">Recent Orders</h3>
        <Table striped hoverable>
          <TableHead>
            <TableHeadCell>Order ID</TableHeadCell>
            <TableHeadCell>Customer</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
          </TableHead>
          <TableBody className="text-content divide-y">
            {[
              {
                id: '#1234',
                customer: 'John Doe',
                status: 'Pending',
                total: '$50',
              },
              {
                id: '#1235',
                customer: 'Jane Smith',
                status: 'Completed',
                total: '$75',
              },
              {
                id: '#1236',
                customer: 'Mike Ross',
                status: 'Shipped',
                total: '$120',
              },
            ].map((order, idx) => (
              <TableRow key={idx} className="bg-white dark:bg-gray-700">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Quick Actions */}
      <Card className="rounded-2xl shadow-sm ring-1 lg:col-span-2">
        <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
        <div className="flex flex-col gap-3">
          <Button color="gray">Add Product</Button>
          <Button color="gray">View Inventory</Button>
          <Button color="gray">Manage Orders</Button>
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboard;
