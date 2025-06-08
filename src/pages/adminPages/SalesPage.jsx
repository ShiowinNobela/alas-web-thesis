import NewSideBar from "../../components/newSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import TestGraph from "../../components/TestGraph";

function SalesPage() {

  const [orders, setOrders] = useState([]); 
  const [topProducts, setTopProducts] = useState([]);
  const [leastProducts, setLeastProducts] = useState([]);
  const [fulfillmentRate, setFulfillmentRate] = useState(0);

  const [summary, setSummary] = useState ({
    totalRevenue: 0,
    websiteSales: 0,
    walkInSales: 0,
  })

  const startDate = "2025-05-01";
  const endDate = dayjs().add(2, "day").format("YYYY-MM-DD");

  const [graphData, setGraphData] = useState({ current: [], previous: [], categories: [] });
  
   useEffect(() => {
    axios.get(`/api/reports/top-products?start=${startDate}&end=${endDate}`)
      .then((res) => {
        const products = res.data.data.topProducts;
        setTopProducts(products.slice(0, 5));
        const least = [...products].sort((a, b) => a.totalSold - b.totalSold).slice(0, 5);
        setLeastProducts(least);
      })
      .catch((err) => {
        setTopProducts([]);
        setLeastProducts([]);
        console.error("Failed to fetch top products", err);
      });
  }, [startDate, endDate]);

  useEffect(() => {
  axios.get(`/api/reports/sales-summary?start=${startDate}&end=${endDate}`)
    .then((res) => {
      const data = res.data.data || {};
      console.log(data)
      setSummary({
        totalRevenue: Number(data.totalSales || 0),
        totalOrders: Number(data.totalOrders || 0),
        totalItemsSold: Number(data.totalItemsSold || 0),
      });
    })
    .catch(() => setSummary({ totalRevenue: 0, totalOrders: 0, totalItemsSold: 0 }));
}, [startDate, endDate]);

useEffect(() => {
  axios.get("/api/adminOrder")
    .then((res) => {
      const ordersData = res.data.data || [];
      setOrders(ordersData);

      const totalOrders = ordersData.length;
      const nonCancelled = ordersData.filter(
        (order) => order.status && order.status.toLowerCase() !== "cancelled"
      ).length;

      const rate = totalOrders > 0 ? ((nonCancelled / totalOrders) * 100).toFixed(2) : 0;
      setFulfillmentRate(rate);
    })
    .catch(() => setFulfillmentRate(0));
}, []);

    useEffect(() => {
      const manualSales = [
        { month: "March 2025", value: 12345 },  
        { month: "April 2025", value: 11789 },   
      ];
      const months = [1, 0].map((n) => {
        const start = dayjs().subtract(n, "month").startOf("month").format("YYYY-MM-DD");
        const end = dayjs().subtract(n, "month").endOf("month").format("YYYY-MM-DD");
        return { start, end };
      });

      Promise.all(
        months.map(({ start, end }) =>
          axios.get(`/api/reports/sales-summary?start=${start}&end=${end}`)
        )
      ).then((results) => {
        const apiSales = results.map((res, idx) => ({
          month: dayjs().subtract(1 - idx, "month").format("MMMM YYYY"),
          value: Number(res.data.data.totalSales || 0),
        }));

        setGraphData({
          sales: [...manualSales, ...apiSales].map((item) => item.value),
          categories: [...manualSales, ...apiSales].map((item) => item.month),
        });
      });
    }, []);

    // Will use this later so that it will automatically get the last 4 months :P
    //   const months = [3, 2, 1, 0].map((n) => {
    //   const start = dayjs().subtract(n, "month").startOf("month").format("YYYY-MM-DD");
    //   const end = dayjs().subtract(n, "month").endOf("month").format("YYYY-MM-DD");
    //   return { start, end };
    // });

    // Promise.all(
    //   months.map(({ start, end }) =>
    //     axios.get(`/api/reports/sales-summary?start=${start}&end=${end}`)
    //   )
    // ).then((results) => {
    //   setGraphData({
    //     sales: results.map((res) => Number(res.data.data.totalSales || 0)),
    //     categories: months.map((_, idx) =>
    //       dayjs().subtract(3 - idx, "month").format("MMMM YYYY")
    //     ),
    //   });
    // });

  return (
    <div className="h-screen max-h-full w-screen overflow-x-clip overflow-y-auto bg-[#E2E0E1] grid grid-cols-[0.20fr_0.80fr]">
      <NewSideBar />
      <div className="flex flex-col h-full overflow-x-auto bg-[#ffffff] p-6 space-y-6">


          {/* tiles */}
          <div>
            <div className="flex flex-row gap-x-8 p-7">
              <div
                className="p-4 rounded-lg shadow-xl w-1/4 h-35 cursor-pointer bg-white drop-shadow-xl hover:bg-secondary transition"
                role="button"
                >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl mb-1 uppercase"> Order Fullfilment Rate</h2>
                    <p className="font-semibold text-lg">{fulfillmentRate}% </p>
                  </div>
                </div>
              </div>
              <div
                className="p-4 rounded-lg shadow-xl w-1/4 h-35 cursor-pointer bg-white drop-shadow-xl hover:bg-secondary transition"
                role="button"
                >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl mb-1 uppercase">Website</h2>
                    <p className="text-md text-gray-600 mb-1 ">Total Website Sales</p>
                    <p className="font-semibold text-lg">₱ {summary.totalRevenue.toLocaleString()} </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                  </svg>
                </div>
              </div>
              <div
                className="p-4 rounded-lg shadow-xl w-1/4 h-35 cursor-pointer bg-white drop-shadow-xl hover:bg-secondary transition"
                role="button"
                >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl mb-1 uppercase">Walk-In</h2>
                    <p className="text-md text-gray-600 mb-1 ">Total Walk-In Sales</p>
                    <p className="font-semibold text-lg">₱ 0</p>
                  </div>
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                  </svg>
                </div>
              </div>
              <div
                className="p-4 rounded-lg shadow-xl w-1/4 h-35 cursor-pointer bg-white drop-shadow-xl hover:bg-secondary transition"
                role="button"
                >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl mb-1 uppercase">Orders</h2>
                    <p className="text-md text-gray-600 mb-1 ">Total Orders</p>
                    <p className="font-semibold text-lg"> {summary.totalOrders}</p>
                  </div>
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                  </svg>
                </div>
              </div>
              <div
                className="p-4 rounded-lg shadow-xl w-1/4 h-35 cursor-pointer bg-white drop-shadow-xl hover:bg-secondary transition"
                role="button"
                >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl mb-1 uppercase">Items</h2>
                    <p className="text-md text-gray-600 mb-1 ">Total Items Sold</p>
                    <p className="font-semibold text-lg"> {summary.totalItemsSold} </p>
                  </div>
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-x-8 px-7 pb-7">
              <div
                className="p-4 rounded-lg shadow-xl w-full h-55 cursor-pointer bg-white drop-shadow-xl hover:bg-secondary transition"
                role="button"
                >
                <div className="flex justify-between">
                  <div>                 
                    <h2 className="font-bold text-3xl mb-8 uppercase">Revenue</h2>
                    <p className="text-lg text-gray-600 mb-1 ">Total Revenue</p>
                    <p className="font-semibold text-4xl">₱ {summary.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div
                className="p-4 rounded-lg shadow-xl w-full h-55 cursor-pointer bg-white drop-shadow-xl hover:bg-secondary transition "
                role="button"
                >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl mb-1 uppercase">Least Selling Products</h2>
                    {leastProducts.length === 0 ? (
                      <p>No data available.</p>
                    ) : (
                      leastProducts.map((product) => (
                        <div key={product.id} className="flex flex-row justify-between items-center">
                          <h2 className="font-light text-md p-1">{product.name}</h2>
                          <p>{product.totalSold}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div
                className="p-4 rounded-lg shadow-xl w-full col-span-2 row-span-2 h-fit cursor-pointer bg-white drop-shadow-xl hover:bg-secondary transition"
                role="button" 
                >
                <div className="flex justify-between">
                  <div className="w-full h-full">
                    <h2 className="font-bold text-xl mb-1 uppercase">Graph last month vs this month</h2>
                      <TestGraph graphData={graphData} />
                  </div>
                </div>
              </div>
            
            <div className="mt-7 col-span-2">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-xl">
                <thead className="text-xs round text-white uppercase bg-admin ">
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
                    <td className="px-6 py-3">₱{parseFloat(product.unitPrice).toFixed(2)}</td>
                    
                  </tr>
                ))
              )}
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
