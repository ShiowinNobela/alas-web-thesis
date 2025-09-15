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
import CardSkeleton from '@/components/skeletons/CardSkeleton';
import ChartSkeleton from '@/components/skeletons/ChartSkeleton';
import ListCardSkeleton from '@/components/skeletons/ListCardSkeleton';
import TableSkeleton from '@/components/skeletons/TableSkeleton';
import ErrorState from '@/components/States/ErrorState';
import ErrorBoundary from '@/components/errorUI/ErrorBoundary';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


function AdminDashboard() {

  const { data: items, isLoading: isLoading, isError: isError, refetch: refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await axios.get('/api/dashboard/metrics');
      return data.data || [];
    }
  });

  const { data: weeklySales, isLoading: isLoadingWeekly } = useQuery({
    queryKey: ['weeklySales'],
    queryFn: async () => {
      const { data } = await axios.get('/api/reports/weekly-sales?weeks=7');
      return data.data;
    },
  });

//Edit the Chart here for future changes.
  let revenueCategories = [];
  let revenueSeries = [];
 if (weeklySales?.weeks?.length) {
  revenueCategories = weeklySales.weeks.map((_, idx) => `Week ${idx + 1}`);
  revenueSeries = [
    {
      name: 'Revenue',
      data: weeklySales.weeks.map(w => w.total),
    },
  ];
}


  return (
    <div className="grid grid-cols-1 gap-6 p-4 bg-admin lg:grid-cols-6">

      {/* Cardss */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-5 lg:col-span-6'>
        {isLoading ? 
        [...Array(5)].map((_, idx) => <CardSkeleton key={idx} /> )
      : isError ? (
        <ErrorState
            error={isError}
            onRetry={refetch}
            title="Failed to load Dashboard Items"
            retryText="Retry Request"
          /> 
      ) : ( items ) ?
      [
        {
          title: "This Week's Sales ",
              value: items?.totalSalesLast7Days || 0,
              icon: 'sales',
              color: 'text-green-600',
        },
        {
            title: "This Week's Online Orders",
            value: items?.onlineOrdersLast7Days || 0,
            icon: 'orders',
            color: 'text-blue-600',
        },
        {
            title: "This Week's Walk-in Orders",
            value:  items?.walkInOrdersLast7Days || 0, 
            icon: 'walkInOrders',
            color: 'text-yellow-600',
        },
        {
            title: "This Week's Items Sold",
            value:  items?.totalItemsSoldLast7Days || 0,
            icon: 'customer',
            color: 'text-yellow-400',
        },
        {
            title: 'EMPTY FOR NOW',
            value:  0,
            icon: 'lowStock',
            color: 'text-red-600',
        },
      ] .map((item, idx) => (
            <SummaryCard
              key={idx}
              iconKey={item.icon || 'orders'}
              iconColor={item.color || 'text-blue-600'}
              title={item.title}
              value={item.value}
            />
          ))
          : (
          <div className="flex items-center justify-center col-span-5 p-6 text-center text-gray-500 bg-white rounded-lg shadow-sm ring-1 min-h-[120px]">
            No performance data available
          </div>
        )
      }

      </div>

      {/* Revenue Chart */}
      {isLoadingWeekly ? (
        <ChartSkeleton />
      ) : (
        <RevenueChart
          title="Revenue within 7 Weeks"
          series={revenueSeries}
          categories={revenueCategories}
        />
      )}

      {/* Low Stock Alert */}
      {isLoading ? (
        <ListCardSkeleton items={4} />
      ) : (
        <Card className="shadow-sm rounded-2xl ring-1 lg:col-span-2">
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
      )}
      


      {/* Recent Orders */}
      {isLoading ? (
        <TableSkeleton columns={4} rows={3} />
      ) : (
      <Card className="shadow-sm rounded-2xl ring-1 lg:col-span-4">
        <h3 className="mb-4 text-lg font-semibold">Recent Orders</h3>
        <Table striped hoverable>
          <TableHead>
            <TableHeadCell>Order ID</TableHeadCell>
            <TableHeadCell>Customer</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Total</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y text-content">
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
      )}
      
      {/* Quick Actions */}
      {isLoading ? (
        <ListCardSkeleton items={4} />
      ) : (
      <Card className="shadow-sm rounded-2xl ring-1 lg:col-span-2">
        <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
        <div className="flex flex-col gap-3">
          <Button color="gray">Add Product</Button>
          <Button color="gray">View Inventory</Button>
          <Button color="gray">Manage Orders</Button>
        </div>
      </Card>
      )}

    </div>
  );

}

export default AdminDashboard;
