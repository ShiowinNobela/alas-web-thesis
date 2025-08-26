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
import SummaryCard from '@/components/bigComponents/SummaryCard';
import RevenueChart from '@/components/charts/RevenueChart';

function AdminDashboard() {
  const revenueCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
          {
            title: 'Total Sales',
            value: '$12,450',
            icon: 'sales',
            color: 'text-green-600',
          },
          {
            title: 'Orders',
            value: '320',
            icon: 'orders',
            color: 'text-blue-600',
          },
          {
            title: 'Walk In Orders',
            value: '20',
            icon: 'walkInOrders',
            color: 'text-yellow-600',
          },
          {
            title: 'Customers',
            value: '120',
            icon: 'customer',
            color: 'text-yellow-400',
          },
          {
            title: 'Refunds',
            value: '5',
            icon: 'lowStock',
            color: 'text-red-600',
          },
        ].map((item, idx) => (
          <SummaryCard
            key={idx}
            iconKey={item.icon || 'orders'}
            iconColor={item.color || 'text-blue-600'}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
      <RevenueChart series={revenueSeries} categories={revenueCategories} />
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
