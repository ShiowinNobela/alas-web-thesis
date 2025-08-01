import { useState, useEffect } from 'react';
import axios from 'axios';
import NewSideBar from '../../components/newSideBar';
import AdminProfile from '../../components/Chinges/AdminProfile';
import dayjs from 'dayjs';
import { FaExchangeAlt } from 'react-icons/fa';
import TestGraph from '../../components/TestGraph';

function adminDashboard() {
  const [values, setValues] = useState([]);
  const [orderRange, setOrderRange] = useState(7); // 7 or 30
  const [salesRange, setSalesRange] = useState(7);
  const [topProducts, setTopProducts] = useState([]);
  const [leastProducts, setLeastProducts] = useState([]);
  const [graphData, setGraphData] = useState({
    current: [],
    previous: [],
    categories: [],
  });

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    axios
      .get('/api/adminOrder', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setValues(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useEffect(() => {
    const startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
    const endDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
    axios
      .get(`/api/reports/top-products?start=${startDate}&end=${endDate}`)
      .then((res) => {
        const products = res.data.data.topProducts || [];
        setTopProducts(products.slice(0, 5));
        const least = [...products]
          .sort((a, b) => a.totalSold - b.totalSold)
          .slice(0, 5);
        setLeastProducts(least);
      })
      .catch((err) => {
        setTopProducts([]);
        setLeastProducts([]);
        console.error('Failed to fetch top products', err);
      });
  }, []);

  useEffect(() => {
    //Graph
    const months = [1, 0].map((n) => {
      const start = dayjs()
        .subtract(n, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
      const end = dayjs()
        .subtract(n, 'month')
        .endOf('month')
        .format('YYYY-MM-DD');
      return { start, end };
    });

    Promise.all(
      months.map(({ start, end }) =>
        axios.get(`/api/reports/sales-summary?start=${start}&end=${end}`)
      )
    ).then((results) => {
      const apiSales = results.map((res, idx) => ({
        month: dayjs()
          .subtract(1 - idx, 'month')
          .format('MMMM YYYY'),
        value: Number(res.data.data.totalSales || 0),
      }));

      setGraphData({
        sales: apiSales.map((item) => item.value),
        categories: apiSales.map((item) => item.month),
      });
    });
  }, []);

  const ordersWithinRange = values.filter((order) => {
    const orderDate = dayjs(order.order_date);
    const rangeAgo = dayjs().subtract(orderRange, 'day');
    return orderDate.isAfter(rangeAgo);
  });

  const salesWithinRange = values.filter((order) => {
    const orderDate = dayjs(order.order_date);
    const rangeAgo = dayjs().subtract(salesRange, 'day');
    return orderDate.isAfter(rangeAgo) && order.status === 'delivered';
  });

  const totalSalesAmount = salesWithinRange.reduce(
    (sum, order) => sum + parseFloat(order.total_amount),
    0
  );

  const orderRangeText =
    orderRange === 7 ? ' (Last 7 Days)' : ' (Last 30 Days)';
  const salesRangeText =
    salesRange === 7 ? ' (Last 7 Days)' : ' (Last 30 Days)';

  const deliveredNotifications = values
    .filter((order) => order.status === 'pending')
    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
    .slice(0, 4);

  return (
    <>
      <div className="h-screen w-full overflow-auto bg-[#F3EDE8] p-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-5">
            <div className="w-xs rounded-lg border-2 border-[#d6d6d6] bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-5 flex justify-end">
                <FaExchangeAlt
                  className="h-7 w-7"
                  onClick={() => setOrderRange(orderRange === 7 ? 30 : 7)}
                />
              </div>

              <a href="#">
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-[#000000] dark:text-white">
                  {' '}
                  {ordersWithinRange.length} orders
                </h5>
              </a>
              <p className="text-md mb-10 font-semibold text-gray-700 dark:text-gray-400">
                {' '}
                Total Orders {orderRangeText}{' '}
              </p>
              <a
                href="/Admin/Orders"
                className="inline-flex items-center rounded-lg bg-[#F2A65A] px-3 py-2 text-center text-sm font-medium text-white hover:bg-[#e6923e] focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to Orders
                <svg
                  className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>

            <div className="w-xs rounded-lg border-2 border-[#d6d6d6] bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-5 flex justify-end">
                <FaExchangeAlt
                  className="h-7 w-7"
                  onClick={() => setSalesRange(salesRange === 7 ? 30 : 7)}
                />
              </div>

              <a href="#">
                <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {' '}
                  ₱ {totalSalesAmount.toLocaleString()}{' '}
                </h5>
              </a>
              <p className="text-md mb-10 font-semibold text-gray-700 dark:text-gray-400">
                {' '}
                Total Sales{salesRangeText}{' '}
              </p>
              <a
                href="/Admin/SalesPage"
                className="inline-flex items-center rounded-lg bg-[#F2A65A] px-3 py-2 text-center text-sm font-medium text-white hover:bg-[#e6923e] focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to Sales
                <svg
                  className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>

            <div className="w-4xl rounded-lg border-2 border-[#d6d6d6] bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {' '}
                  Notifications
                </h5>
              </a>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {deliveredNotifications.length === 0 ? (
                  <div className="col-span-2 text-sm text-gray-500">
                    No pending orders yet.
                  </div>
                ) : (
                  deliveredNotifications.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col rounded-lg border border-blue-200 bg-blue-50 p-2 shadow"
                    >
                      <div className="mb-1 text-sm font-semibold text-blue-800">
                        {order.username}'s order{' '}
                        <span className="font-bold">#{order.id}</span>
                      </div>
                      <div className="mb-1 font-semibold text-red-600">
                        Pending
                      </div>
                      <div className="text-xs text-gray-500">
                        {dayjs(order.order_date).format('MMM D, YYYY h:mm A')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div className="h-55 w-full cursor-pointer rounded-lg border-2 border-[#d6d6d6] bg-[#e5e3e3] p-4 shadow-xl drop-shadow-md">
              <h1 className="text-xl font-semibold">Top Selling Products</h1>
              <table className="w-full rounded-tl-md rounded-tr-md bg-[#FAFAFA] text-left text-sm text-white shadow-xl dark:text-gray-400">
                <thead className="bg-[#8C3B32] text-xs text-white uppercase">
                  <tr>
                    <th scope="col" className="rounded-tl-md px-8 py-3">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Orders
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Revenue
                    </th>
                    <th scope="col" className="rounded-tr-md px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center">
                        No data available.
                      </td>
                    </tr>
                  ) : (
                    topProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-8 py-3">{product.name}</td>
                        <td className="px-6 py-3">{product.totalSold}</td>
                        <td className="px-6 py-3">₱ {product.totalRevenue}</td>
                        <td className="px-6 py-3">
                          ₱{parseFloat(product.unitPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div
              className="h-55 w-full cursor-pointer rounded-lg border-2 border-[#d6d6d6] bg-[#e5e3e3] p-4 shadow-xl drop-shadow-md"
              role="button"
            >
              <h1 className="text-xl font-semibold">Least Selling Products</h1>
              <table className="w-full rounded-tl-md rounded-tr-md bg-[#FAFAFA] text-left text-sm text-white shadow-xl dark:text-gray-400">
                <thead className="round bg-[#8C3B32] text-xs text-white uppercase">
                  <tr>
                    <th scope="col" className="rounded-tl-md px-8 py-3">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Orders
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Revenue
                    </th>
                    <th scope="col" className="rounded-tr-md px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leastProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center">
                        No data available.
                      </td>
                    </tr>
                  ) : (
                    leastProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-8 py-3">{product.name}</td>
                        <td className="px-6 py-3">{product.totalSold}</td>
                        <td className="px-6 py-3">₱ {product.totalRevenue}</td>
                        <td className="px-6 py-3">
                          ₱{parseFloat(product.unitPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default adminDashboard;
