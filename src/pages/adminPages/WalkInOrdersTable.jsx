import { useNavigate } from "react-router-dom";
import NewSideBar from "../../components/newSideBar";
import { Card, Spinner, Button, Datepicker, TextInput } from "flowbite-react";
import {
  HiSwitchHorizontal,
  HiOutlineSearch,
  HiOutlineRefresh,
} from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import WalkInDropdown from "../../components/WalkInDropdown";

const fetchWalkInOrders = async () => {
  const res = await fetch("http://localhost:3000/api/walkInOrders/");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const json = await res.json();
  return json.data;
};

const tableHeadStyle = "px-6 py-3 text-center";

function WalkInOrders() {
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["walkInOrders"],
    queryFn: fetchWalkInOrders,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const totalAmount = orders?.reduce(
    (sum, order) => sum + parseFloat(order.total_amount || 0),
    0
  );

  return (
    <div className="h-screen w-screen overflow-x-clip overflow-y-auto bg-neutral grid grid-cols-[0.20fr_0.80fr]">
      <NewSideBar />
      <main className="min-h-full flex flex-col gap-3 overflow-auto px-4 py-7">
        <div className="flex flex-row w-full h-[25%] bg-admin rounded-xl shadow p-6 space-x-6 ">
          <Card
            title="Sales"
            className="flex-none p-4 rounded-lg shadow w-1/4 cursor-pointer hover:bg-secondary transition"
            onClick={() => navigate("/Admin/Orders")}
            role="button"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg mb-1">Walk-In Orders</h2>
                <p className="text-sm text-gray-600">Hello Admin!</p>
              </div>
              <HiSwitchHorizontal className="w-6 h-6 text-blue-600" />
            </div>
          </Card>

          <div className="flex flex-row flex-grow gap-x-2">
            <h1 className="text-2xl font-bold">Walk-In Orders</h1>
          </div>
        </div>

        {/* <div className="flex justify-between items-center flex-wrap gap-3 w-full">
          <div className="flex items-center gap-2 w-full sm:w-[25%]">
            <TextInput
              placeholder="Search order by ID..."
              icon={HiOutlineSearch}
              className="flex-1"
            />
            <Button className="group w-[25%] bg-secondary text-black p-2 hover:bg-admin hover:text-white focus:outline-none focus:ring-0 active:scale-95">
              Search
            </Button>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-end">
            <div className="w-[22%]">
              <Datepicker
                placeholder="Start date"
                maxDate={new Date()}
                color="white"
              />
            </div>
            <h3>TO</h3>
            <div className="w-[22%]">
              <Datepicker
                placeholder="End date"
                maxDate={new Date()}
                color="white"
              />
            </div>

            <WalkInDropdown />

            <Button
              color="light"
              className="group bg-white p-2 rounded-full hover:bg-neutral border-gray-500 focus:ring-0"
              onClick={() => window.location.reload()}
            >
              <HiOutlineRefresh className="w-5 h-5 transition-transform duration-300 group-active:rotate-180" />
            </Button>
          </div>
        </div> */}

        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Spinner size="xl" />
          </div>
        )}

        {error && (
          <p className="text-red-600 text-center">
            Failed to load orders: {error.message}
          </p>
        )}
        {orders?.length === 0 && !isLoading && (
          <p className="text-center text-gray-500">No walk-in orders yet.</p>
        )}

        {orders?.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="bg-admin text-white text-xs uppercase font-semibold px-6 py-3 rounded-t-lg">
              <span>Total Orders: {orders.length}</span>
              <span className="ml-4">
                Total Amount: ₱{" "}
                {totalAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <table className="w-full text-sm text-left text-slate-800 rounded-2xl">
              <thead className="sticky top-0 text-xs uppercase bg-admin text-white">
                <tr>
                  <th className={tableHeadStyle}>Order ID</th>
                  <th className={tableHeadStyle}>Customer Name</th>
                  <th className={tableHeadStyle}>Email</th>
                  <th className={tableHeadStyle}>Date</th>
                  <th className={tableHeadStyle}>Total Amount</th>
                  <th className={tableHeadStyle}>Discount</th>
                  <th className={tableHeadStyle}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white hover:bg-gray-50 cursor-pointer border border-gray-200"
                  >
                    <td className="px-6 py-3 text-center">{order.id}</td>
                    <td className="px-6 py-3 text-center">
                      {order.customer_name}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {order.customer_email}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {new Date(order.sale_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-center">
                      ₱ {parseFloat(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-center">
                      ₱ {parseFloat(order.discount_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-center">{order.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default WalkInOrders;
