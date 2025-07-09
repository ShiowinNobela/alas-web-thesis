import { useState, useEffect } from "react";
import axios from "axios";
import NewSideBar from "../../components/newSideBar";
import AdminProfile from "../../components/Chinges/AdminProfile";
import dayjs from "dayjs";
import { FaExchangeAlt } from "react-icons/fa";
import TestGraph from "../../components/TestGraph";

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
    const user = JSON.parse(window.localStorage.getItem("user"));
    axios
      .get("/api/adminOrder", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setValues(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);


   useEffect(() => {
   
    const startDate = dayjs().subtract(30, "day").format("YYYY-MM-DD");
    const endDate = dayjs().add(1, "day").format("YYYY-MM-DD");
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
        console.error("Failed to fetch top products", err);
      });
  }, []);

  useEffect(() => { //Graph
    const months = [1, 0].map((n) => {
      const start = dayjs()
        .subtract(n, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      const end = dayjs()
        .subtract(n, "month")
        .endOf("month")
        .format("YYYY-MM-DD");
      return { start, end };
    });

    Promise.all(
      months.map(({ start, end }) =>
        axios.get(`/api/reports/sales-summary?start=${start}&end=${end}`)
      )
    ).then((results) => {
      const apiSales = results.map((res, idx) => ({
        month: dayjs()
          .subtract(1 - idx, "month")
          .format("MMMM YYYY"),
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
    const rangeAgo = dayjs().subtract(orderRange, "day");
    return orderDate.isAfter(rangeAgo);
  });

  const salesWithinRange = values.filter((order) => {
    const orderDate = dayjs(order.order_date);
    const rangeAgo = dayjs().subtract(salesRange, "day");
    return orderDate.isAfter(rangeAgo) && order.status === "delivered";
  });

  const totalSalesAmount = salesWithinRange.reduce(
    (sum, order) => sum + parseFloat(order.total_amount),
    0
  );

  const orderRangeText =
    orderRange === 7 ? " (Last 7 Days)" : " (Last 30 Days)";
  const salesRangeText =
    salesRange === 7 ? " (Last 7 Days)" : " (Last 30 Days)";

  const deliveredNotifications = values
    .filter((order) => order.status === "pending")
    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
    .slice(0, 4);

  return (
    <>
      <div className="h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]">
        <NewSideBar />
        <div className="min-h-full w-100% ml-5 flex flex-col gap-5 overflow-auto py-4">
          <div className="flex flex-row gap-x-5 ">
            <div class="w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-end mb-5">
                <FaExchangeAlt
                  className="w-7 h-7"
                  onClick={() => setOrderRange(orderRange === 7 ? 30 : 7)}
                />
              </div>

              <a href="#">
                <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {" "}
                  {ordersWithinRange.length} orders
                </h5>
              </a>
              <p class="mb-10 font-semibold text-md text-gray-700 dark:text-gray-400 ">
                {" "}
                Total Orders {orderRangeText}{" "}
              </p>
              <a
                href="/Admin/Orders"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to Orders
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>

            <div class="w-xs p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-end mb-5">
                <FaExchangeAlt
                  className="w-7 h-7"
                  onClick={() => setSalesRange(salesRange === 7 ? 30 : 7)}
                />
              </div>

              <a href="#">
                <h5 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {" "}
                  ₱ {totalSalesAmount.toLocaleString()}{" "}
                </h5>
              </a>
              <p class="mb-10 font-semibold text-md text-gray-700 dark:text-gray-400 ">
                {" "}
                Total Sales{salesRangeText}{" "}
              </p>
              <a
                href="/Admin/SalesPage"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to Sales
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>

            <div className="w-4xl p-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 mr-5">
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {" "}
                  Notifications
                </h5>
              </a>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliveredNotifications.length === 0 ? (
                  <div className="text-gray-500 text-sm col-span-2">
                    No pending orders yet.
                  </div>
                ) : (
                  deliveredNotifications.map((order) => (
                    <div
                      key={order.id}
                      className="bg-blue-50 border border-blue-200 rounded-lg shadow p-2 flex flex-col"
                    >
                      <div className="font-semibold text-blue-800 mb-1 text-sm">
                        {order.username}’s order{" "}
                        <span className="font-bold">#{order.id}</span>
                      </div>
                      <div className="text-red-600 font-semibold mb-1">
                        Pending
                      </div>
                      <div className="text-xs text-gray-500">
                        {dayjs(order.order_date).format("MMM D, YYYY h:mm A")}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
          
          <div className="flex flex-row gap-x-5 justify-between mr-5">
            <div className="p-4 rounded-lg shadow-xl w-5xl h-55 cursor-pointer bg-gray-100 drop-shadow-xl hover:bg-secondary transition ">
                <h1 className="text-xl font-semibold ">Top Selling Products</h1>
                <table className="w-full text-sm text-left text-white dark:text-gray-400 shadow-xl bg-gray-500">
                  <thead className="text-xs round text-white uppercase bg-admin ">
                    <tr>
                      <th scope="col" className="px-8 py-3 ">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Orders
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Revenue
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          No data available.
                        </td>
                      </tr>
                    ) : (
                      topProducts.map((product) => (
                        <tr>
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
                className="p-4 rounded-lg shadow-xl w-1/2 h-55 cursor-pointer bg-gray-100 drop-shadow-xl hover:bg-secondary transition"
                role="button"
              >
                <h1 className="text-xl font-semibold">Least Selling Products</h1>
                <table className="w-full text-sm text-left text-white dark:text-gray-400 shadow-xl bg-gray-500">
                  <thead className="text-xs round text-white uppercase bg-admin">
                    <tr>
                      <th scope="col" className="px-8 py-3">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Orders
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Revenue
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leastProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
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

          
            <div
              className="p-4 rounded-lg shadow-xl w-2/3 col-span-2 row-span-2 h-fit cursor-pointer bg-gray-100 drop-shadow-xl hover:bg-secondary transition"
              role="button"
            >
              <div className="flex justify-between">
                <div className="w-full h-full">
                  <h2 className="font-bold text-xl mb-1 uppercase">
                    Graph last month vs this month
                  </h2>
                  <TestGraph graphData={graphData} />
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </>
  );
}

export default adminDashboard;
