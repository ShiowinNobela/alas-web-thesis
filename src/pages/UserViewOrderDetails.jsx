import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function fetchOrder(id) {
  const user = JSON.parse(window.localStorage.getItem('user'));
  return axios
    .get(`/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => res.data.data);
}

export default function UserViewOrderDetails() {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrder(id),
  });

  if (isLoading) {
    return <div className="p-4">Loading order details...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  const rawDate = order.order_date;
  const dateObj = new Date(rawDate);

  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const finalDateString = `${formattedDate} at ${formattedTime}`;

  return (
    <section className="bg-neutral h-full max-h-full max-w-full px-40 py-4">
      <div className="px-4 py-4 md:px-6 2xl:container 2xl:mx-auto 2xl:px-20">
        <div className="item-start flex flex-col justify-start space-y-2">
          <h1 className="font-heading text-content text-3xl">
            Order #{order.id}
          </h1>
          <p className="text-base leading-6 text-gray-800">{finalDateString}</p>
        </div>
        <div className="jusitfy-center mt-5 flex w-full flex-col items-stretch space-y-4 md:space-y-6 xl:flex-row xl:space-y-0 xl:space-x-8">
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            <div className="flex w-full flex-col items-start justify-start rounded-xl bg-white p-8 drop-shadow-md">
              <h3 className="font-heading text-content text-xl font-bold uppercase">
                Order Items
              </h3>

              {order.items?.map((item) => (
                <div
                  key={item.item_id}
                  className="mt-2 flex w-full flex-col items-start justify-start rounded-2xl border-b border-gray-200 p-2 md:flex-row md:items-start md:space-x-4"
                >
                  {/* IMAGE COLUMN */}
                  <div className="w-full border md:w-25">
                    <img
                      className="hidden w-full md:block"
                      src="https://media.istockphoto.com/id/152542078/photo/baby-zebra-running.jpg?s=612x612&w=0&k=20&c=Sm4TfkY5XHAanAzjr4he5SZ4Q3J1otyAXcbBXQX9dKI="
                      alt="placeholder"
                    />
                  </div>

                  {/* CONTENT COLUMN */}
                  <div className="flex h-full w-full flex-col items-start justify-start space-y-4 text-gray-800 md:flex-row md:space-y-0 md:space-x-8">
                    {/* LEFT SIDE: Product details */}
                    <div className="flex h-full w-full flex-col self-start">
                      <p className="text-xs text-gray-600">Category</p>
                      <h3 className="text-left text-base font-semibold text-gray-800">
                        {item.product_name}
                      </h3>
                      <p className="mt-auto text-xs font-medium text-gray-500">
                        View Details
                      </p>
                    </div>

                    {/* RIGHT SIDE: Pricing, Quantity, Subtotal */}
                    <div className="flex h-full w-full flex-row items-start justify-between space-x-8 self-start md:w-auto">
                      <div className="flex h-full flex-col justify-center">
                        <span className="text-gray-500">Price</span>
                        <p className="leading-6 text-gray-800">
                          ₱{parseFloat(item.unit_price).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex h-full flex-col justify-center">
                        <span className="text-gray-500">Qty</span>
                        <p className="leading-6 text-gray-800">
                          {item.quantity}
                        </p>
                      </div>

                      <div className="flex h-full flex-col justify-center">
                        <span className="text-gray-500">Subtotal</span>
                        <p className="leading-6 font-semibold text-gray-800">
                          ₱{parseFloat(item.subtotal).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="flex w-full flex-col items-start justify-start rounded-xl bg-white px-4 py-2 drop-shadow-md">
              <div className="w-full border-b border-gray-200 p-4">
                <p className="font-heading text-lg font-bold text-gray-800">
                  Order Summary
                </p>
              </div>

              <div className="mt-2 flex w-full flex-col items-start justify-start rounded-2xl border-b border-gray-200 p-4 md:flex-row md:items-start md:space-x-4">
                <div className="flex h-full w-full flex-col items-start justify-start space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                  <div className="grid w-full grid-cols-[4fr_1fr_1fr] gap-y-4 text-sm">
                    <p className="text-content font-medium">Subtotal</p>
                    <p className="text-content text-right">
                      {order?.items?.length ?? 0} items
                    </p>
                    <p className="text-content text-right">
                      ₱{parseFloat(order?.total_amount ?? 0).toLocaleString()}
                    </p>
                    <p className="text-content font-medium">Discount</p>
                    <p className="text-content text-right">New Customer</p>
                    <p className="text-content text-right">
                      - {order.discount_amount}
                    </p>

    
                    <p className="text-content font-medium">Shipping</p>
                    <p className="text-content text-right">Free Shipping</p>
                    <p className="text-content text-right">00.00</p>

             
                    <p className="text-md font-bold text-gray-800">Total</p>
                    <p className="text-content"></p>
                    <p className="text-md text-right font-bold text-gray-800">
                      ₱{parseFloat(order?.total_amount ?? 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="bg-card flex w-full flex-col space-y-6 rounded-lg px-4 py-6 shadow md:p-6 xl:p-8">
                <h3 className="font-heading text-content text-xl leading-4 font-bold uppercase">
                  Order Summary
                </h3>
                <div className="flex w-full flex-col items-center justify-center space-y-4 border-b border-gray-200 pb-4">
                  <div className="flex w-full justify-between">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-content text-base leading-4">
                      {order.total_amount}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">
                      Discount
                    </p>
                    <p className="text-content text-base leading-4">
                      {order.discount_amount}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-content text-base leading-4">0.00</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-base leading-4 font-semibold text-gray-800">
                    Total
                  </p>
                  <p className="text-content text-base leading-4 font-semibold">
                    {order.total_amount}
                  </p>
                </div>
              </div>
              <div className="bg-card flex w-full flex-col space-y-6 rounded-lg px-4 py-6 shadow md:p-6 xl:p-8">
                <h3 className="text-content font-heading text-xl leading-5 font-bold uppercase">
                  Shipping
                </h3>
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="h-8 w-8">
                      <img
                        className="h-full w-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-start">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        Free Delivery
                        <br />
                        <p className="text-sm font-normal">
                          Delivery with 24 Hours
                        </p>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg leading-6 font-semibold text-gray-800">
                    0.00
                  </p>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button className="bg-primary w-full rounded-md py-5 text-base leading-4 font-medium text-white hover:bg-black focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:outline-none">
                    View Carrier Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:items-start xl:w-5/12">
            <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-6 shadow md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0">
              <div className="flex flex-shrink-0 flex-col items-start justify-start">
                <h3 className="text-content font-heading text-xl leading-5 font-semibold uppercase">
                  Customer
                </h3>
                <div className="flex w-full items-center justify-center space-x-4 py-4 md:justify-start">
                  <div className="size-18 bg-gray-200"></div>
                  <div className="flex flex-col items-start justify-start space-y-2">
                    <p className="text-left text-base leading-4 font-semibold text-gray-800">
                      Clark Trogo
                    </p>
                    <p className="text-content text-sm leading-5">
                      00 Previous Orders
                    </p>
                    <p className="cursor-pointer text-sm">david89@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-left flex w-full flex-col items-start gap-2 rounded-lg bg-white p-6 shadow md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0">
              <h3 className="text-content font-heading text-xl leading-5 font-semibold uppercase">
                Contact
              </h3>
              <p className="text-left text-base leading-4 font-semibold text-gray-800">
                {order.notes || 'No additional notes provided.'}
              </p>
            </div>

            <div className="justify-left flex w-full flex-col items-start gap-2 rounded-lg bg-white p-6 shadow md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0">
              <h3 className="text-content font-heading text-xl leading-5 font-semibold uppercase">
                Notes
              </h3>
              <p className="text-left text-base leading-4 font-semibold text-gray-800">
                {order.notes || 'No additional notes provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
