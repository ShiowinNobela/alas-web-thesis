import { useNavigate } from 'react-router-dom';
import { Card, Spinner } from 'flowbite-react';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';

const fetchWalkInOrders = async () => {
  const res = await fetch('http://localhost:3000/api/walkInOrders/');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await res.json();
  return json.data;
};

const tableHeadStyle = 'px-6 py-3 text-center';

function WalkInOrders() {
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['walkInOrders'],
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
    <div className="flex min-h-full flex-col gap-3 overflow-auto px-4 py-7">
      <div className="bg-admin flex h-[25%] w-full flex-row space-x-6 rounded-xl p-6 shadow">
        <Card
          title="Sales"
          className="hover:bg-secondary w-1/4 flex-none cursor-pointer rounded-lg p-4 shadow transition"
          onClick={() => navigate('/Admin/Orders')}
          role="button"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-lg font-bold">Walk-In Orders</h2>
              <p className="text-sm text-gray-600">Hello Admin!</p>
            </div>
            <HiSwitchHorizontal className="h-6 w-6 text-blue-600" />
          </div>
        </Card>

        <div className="flex flex-grow flex-row gap-x-2">
          <h1 className="text-2xl font-bold">Walk-In Orders</h1>
        </div>
      </div>

      {isLoading && (
        <div className="flex h-full items-center justify-center">
          <Spinner size="xl" />
        </div>
      )}

      {error && (
        <p className="text-center text-red-600">
          Failed to load orders: {error.message}
        </p>
      )}
      {orders?.length === 0 && !isLoading && (
        <p className="text-center text-gray-500">No walk-in orders yet.</p>
      )}

      {orders?.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="bg-admin rounded-t-lg px-6 py-3 text-xs font-semibold text-white uppercase">
            <span>Total Orders: {orders.length}</span>
            <span className="ml-4">
              Total Amount: ₱{' '}
              {totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <table className="w-full rounded-2xl text-left text-sm text-slate-800">
            <thead className="bg-admin sticky top-0 text-xs text-white uppercase">
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
                  className="cursor-pointer border border-gray-200 bg-white hover:bg-gray-50"
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
    </div>
  );
}

export default WalkInOrders;
