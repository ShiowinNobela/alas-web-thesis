import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'bg-orange-200 text-orange-800';
    case 'processing':
      return 'bg-yellow-200 text-yellow-800';
    case 'shipping':
      return 'bg-green-200 text-green-800';
    case 'delivered':
      return 'bg-blue-200 text-blue-800';
    case 'returned':
      return 'bg-pink-200 text-pink-800';
    case 'refunded':
      return 'bg-violet-200 text-violet-800';
    case 'cancelled':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const tableHeadStyle = 'px-6 py-3 text-center';

function SalesPage() {
  const [orders, setOrders] = useState([]);
  const [fulfillmentRate, setFulfillmentRate] = useState(0);

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    websiteSales: 0,
    walkInSales: 0,
  });

  const startDate = '2025-05-01';
  const endDate = dayjs().add(2, 'day').format('YYYY-MM-DD');

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.order_date) - new Date(a.order_date)
  );

  useEffect(() => {
    axios
      .get(`/api/reports/sales-summary?start=${startDate}&end=${endDate}`)
      .then((res) => {
        const data = res.data.data || {};
        setSummary({
          totalRevenue: Number(data.totalSales || 0),
          totalOrders: Number(data.totalOrders || 0),
          totalItemsSold: Number(data.totalItemsSold || 0),
        });
      })
      .catch(() =>
        setSummary({ totalRevenue: 0, totalOrders: 0, totalItemsSold: 0 })
      );
  }, [startDate, endDate]);

  useEffect(() => {
    axios
      .get('/api/adminOrder')
      .then((res) => {
        const ordersData = res.data.data || [];
        setOrders(ordersData);

        const totalOrders = ordersData.length;
        const nonCancelled = ordersData.filter(
          (order) => order.status && order.status.toLowerCase() !== 'cancelled'
        ).length;

        const rate =
          totalOrders > 0 ? ((nonCancelled / totalOrders) * 100).toFixed(2) : 0;
        setFulfillmentRate(rate);
      })
      .catch(() => setFulfillmentRate(0));
  }, []);

  const {
    data: walkInOrders,
    isLoading: walkInLoading,
    error: walkInError,
  } = useQuery({
    queryKey: ['walkInOrders'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/api/walkInOrders/');
      if (!res.ok) throw new Error('Network response was not ok');
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const totalWalkInSales =
    walkInOrders?.reduce(
      (sum, order) => sum + parseFloat(order.total_amount || 0),
      0
    ) || 0;

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-x-auto bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50">
      <div className="flex h-full flex-col space-y-6 overflow-x-auto p-6">
        {/* tiles */}
        <div>
          <div className="flex flex-row gap-x-8 p-7">
            <div
              className="hover:bg-green-100 h-35 w-1/4 cursor-pointer rounded-lg bg-gray-100 p-4 transition-all hover:-translate-y-1 hover:shadow-md border border-gray-200"
              role="button"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold uppercase text-green-600">
                    {' '}
                    Fullfilment Rate
                  </h2>
                  <p className="text-lg font-semibold text-green-600">
                    {fulfillmentRate}%{' '}
                  </p>
                </div>
              </div>
            </div>
            <div
              className=" h-35 w-1/4 cursor-pointer rounded-lg bg-gray-100 p-4 transition-all hover:-translate-y-1 hover:bg-orange-100 hover:shadow-md border border-gray-200"
              role="button"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold uppercase text-orange-500 ">Website</h2>
                  <p className="text-md mb-1 text-orange-500">
                    Total Website Sales
                  </p>
                  <p className="text-lg font-semibold">
                    ₱ {summary.totalRevenue.toLocaleString()}{' '}
                  </p>
                </div>
              </div>
            </div>
            <div
              className=" h-35 w-1/4 cursor-pointer rounded-lg bg-gray-100 p-4 transition-all hover:-translate-y-1 hover:bg-green-100 hover:shadow-md border border-gray-200"
              role="button"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold uppercase text-green-500">Walk-In</h2>
                  <p className="text-md mb-1 text-green-500">
                    Total Walk-In Sales
                  </p>
                  <p className="mt-5 mb-1 text-lg font-semibold">
                    ₱{' '}
                    {totalWalkInSales.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div
              className=" h-35 w-1/4 cursor-pointer rounded-lg bg-gray-100 p-4 transition-all hover:-translate-y-1 hover:bg-orange-100 hover:shadow-md border border-gray-200"
              role="button"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold uppercase text-orange-500">Orders</h2>
                  <p className="text-md mb-1 text-orange-500">Total Orders</p>
                  <p className="text-lg font-semibold">
                    {' '}
                    {summary.totalOrders}
                  </p>
                </div>
              </div>
            </div>
            <div
              className=" h-35 w-1/4 cursor-pointer rounded-lg bg-gray-100 p-4 transition-all hover:-translate-y-1 hover:bg-green-100 hover:shadow-md border border-gray-200"
              role="button"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="mb-1 text-xl font-bold uppercase text-green-500">Items</h2>
                  <p className="text-md mb-1 text-green-500">Total Items Sold</p>
                  <p className="text-lg font-semibold">
                    {' '}
                    {summary.totalItemsSold}{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-8 px-7 pb-7">
            <div
              className=" h-55 w-full cursor-pointer rounded-lg bg-gray-100 p-4 transition-all hover:-translate-y-3 hover:bg-orange-100 hover:shadow-md border border-gray-200"
              role="button"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="mb-8 text-3xl font-bold uppercase text-orange-500">Revenue</h2>
                  <p className="mb-1 text-lg text-orange-500">Total Revenue</p>
                  <p className="text-4xl font-semibold">
                    ₱ {summary.totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative col-span-3 mr-5 w-full transition-all hover:-translate-y-3 hover:bg-green-100 hover:shadow-md border border-gray-200">
              <h1 className='p-3'> Latest Sales</h1>
              <table className="w-full text-left text-sm text-slate-800">
                <thead className="bg-admin sticky top-0 text-xs text-black uppercase">
                  <tr>
                    <th className={tableHeadStyle}>User Info</th>
                    <th className={tableHeadStyle}>Order ID</th>
                    <th className={tableHeadStyle}>Items</th>
                    <th className={tableHeadStyle}>
                      <div className="flex items-center">Date</div>
                    </th>
                    <th className={tableHeadStyle}>
                      <div className="flex cursor-pointer items-center hover:underline">
                        Total
                      </div>
                    </th>
                    <th className="px-2 py-3 text-center">
                      <div className="leading-tight">
                        Payment
                        <br />
                        Method
                      </div>
                    </th>
                    <th className={tableHeadStyle}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b border-gray-200">
                      <td className="bg-gray-50 px-6 py-4 text-xs text-gray-700">
                        <div>
                          <p className="font-primary">{order.username}</p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="bg-gray-100 px-6 py-4 text-xs text-gray-600">
                        {order.id}
                      </td>
                      <td className="min-w-[190px] bg-gray-50 px-6 py-4">
                        <ul className="list-inside list-disc break-words">
                          {order.items.map((item) => (
                            <li key={item.item_id}>
                              {item.product_name} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="bg-gray-100 px-6 py-4">
                        <div className="text-sm font-medium text-gray-800">
                          {new Date(order.order_date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(order.order_date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>
                      <td className="bg-gray-50 px-6 py-4">
                        ₱ {parseFloat(order.total_amount).toLocaleString()}
                      </td>
                      <td className="bg-gray-100 px-6 py-4 capitalize">
                        {order.payment_method}
                      </td>
                      <td className="bg-gray-50 px-6 py-4">
                        <div className="flex items-center justify-center">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesPage;
