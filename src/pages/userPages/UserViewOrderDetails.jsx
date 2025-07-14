import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  HashIcon,
  PiggyBankIcon,
  LocationEditIcon,
  ArrowLeftIcon,
} from 'lucide-react';

function fetchOrder(id) {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const couponCode = window.localStorage.getItem('couponCode');
  const url = couponCode ? `/api/orders/${id}?couponCode=${encodeURIComponent(couponCode)}` : `/api/orders/${id}`;
  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then((res) => res.data.data);
}

export default function UserViewOrderDetails() {

  const { id } = useParams();

  const navigate = useNavigate();
  const [alreadyReviewedIds, setAlreadyReviewedIds] = useState([]);
  
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrder(id),
  });

  const allReviewed = order?.items?.every(item => alreadyReviewedIds.includes(item.product_id));
  
  useEffect(() => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (!user?.token || !order?.items) return;

  axios
    .get(`/api/reviews/order/${order.id}/user/${user.id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then((res) => {
      // Always map to product_id array
      const reviewedIds = Array.isArray(res.data)
        ? res.data.map(r => r.product_id)
        : [];
      setAlreadyReviewedIds(reviewedIds);
    })
    .catch(() => setAlreadyReviewedIds([]));
  }, [order]);

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

  const finalDateString = ` ${formattedDate} at ${formattedTime}`;
  
  console.log("alreadyReviewedIds:", alreadyReviewedIds);

  return (
    <section className="h-full bg-gray-50 py-8 pb-30">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-content flex items-center gap-2 text-sm text-gray-500 transition-colors"
        >
          <ArrowLeftIcon size={16} />
          Back
        </button>

        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-content font-heading text-3xl font-bold">
            Your Order Details
          </h1>
          <div className="flex flex-row justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-content text-base leading-6">
                <span className="text-gray-500">Order Number </span>
                {order.id}
              </p>
              <p> - </p>
              <p> {finalDateString}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                if (allReviewed) {
                  toast.info("You have already reviewed all items in this order.");
                } else {
                  navigate(`/GiveReview/${order.id}?mode=group`);
                }
              }}
            >
              Leave Group Review
            </Button>
            <div>
              <p>{order.status}</p>
            </div>
          </div>
        </div>

        <div className="jusitfy-center mt-5 flex w-full flex-col items-stretch space-y-4 md:space-y-6 xl:flex-row xl:space-y-0 xl:space-x-4">
          <div className="flex w-full flex-col items-start justify-start space-y-4">
            <Card className="flex w-full flex-col items-start justify-start divide-y divide-gray-200 rounded-md p-6 shadow-xs">
              {order.items?.map((item) => (
              <div key={item.item_id}
                  className="flex w-full flex-col items-start justify-start pb-4 md:flex-row md:items-start md:space-x-4"
                >
                  {/* IMAGE COLUMN */}
                  <div className="mr-5 w-full border shadow-md md:w-45">
                    <img
                      className="hidden w-full md:block"
                      src={item.image}
                      alt="placeholder"
                    />
                  </div>

                  {/* CONTENT COLUMN */}
                  <div className="text-content flex h-full w-full flex-col items-start justify-start md:flex-row md:space-y-0 md:space-x-8">
                    {/* LEFT SIDE: Product details */}
                    <div className="flex h-full w-full flex-col self-start">
                      <h3 className="text-content font-heading text-left text-lg">
                        {item.product_name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <div className="mt-auto flex flex-row divide-x divide-gray-300 text-sm">
                        <p className="pr-4 text-gray-500">
                          Quantity{' '}
                          <span className="text-content">{item.quantity}</span>
                        </p>
                        <p className="px-4 text-gray-500">
                          Price{' '}
                          <span className="text-content">
                            {item.unit_price}
                          </span>
                        </p>
                        <p className="px-4 text-gray-500">
                          Subtotal{' '}
                          <span className="text-content">{item.subtotal}</span>
                        </p>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Pricing, Quantity, Subtotal */}
                    <div className="flex h-full w-full flex-row items-start justify-between space-x-8 self-start md:w-auto">
                      <div className="font-heading flex h-full flex-col gap-2">
                        <Button>Buy Again</Button>
                        <Button
                          variant="outline"
                          disabled={alreadyReviewedIds.includes(item.product_id)}
                          onClick={() => {
                            if (!alreadyReviewedIds.includes(item.product_id)) {
                              navigate(`/GiveReview/${order.id}?mode=single&productId=${item.product_id}`);
                            }
                          }}
                        >
                          {alreadyReviewedIds.includes(item.product_id) ? "Reviewed" : "Leave a Review"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <Card className="bg-card flex w-full flex-col rounded-lg p-6 shadow">
                <h3 className="text-content font-heading text-lg">
                  Order Summary
                </h3>
                <div className="flex w-full flex-col items-center justify-center space-y-4 divide-y divide-gray-200 border-b border-gray-200">
                  <div className="flex w-full justify-between py-2">
                    <p className="text-sm leading-4">Subtotal</p>
                    <p className="text-content text-base leading-4">
                      {parseFloat(order.total_amount).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between py-2">
                    <p className="text-content text-sm leading-4">Discount</p>
                    <p className="text-content text-base leading-4">
                      -{parseFloat(order.total_discount ?? order.discount_amount ?? 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between py-2">
                    <p className="text-content text-sm leading-4">Shipping</p>
                    <p className="text-content text-base leading-4">0.00</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-content text-base leading-4 font-semibold">
                    Total
                  </p>
                  <p className="text-primary text-base leading-4 font-semibold">
                    {parseFloat(order.total_after_discount ?? (order.total_amount - (order.total_discount ?? order.discount_amount ?? 0))).toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </p>
                </div>
              </Card>
              <Card className="bg-card flex w-full flex-col space-y-6 rounded-lg px-4 py-6 shadow md:p-6 xl:p-8">
                <h3 className="text-content font-heading text-lg leading-5">
                  Courier
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
                      <p className="text-content text-lg leading-6">
                        Free Delivery
                        <br />
                        <p className="text-sm font-normal">
                          Delivery within 24 Hours
                        </p>
                      </p>
                    </div>
                  </div>
                  <p className="text-content text-lg leading-6 font-semibold">
                    0.00
                  </p>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button className="bg-primary focus:ring-content hover:bg-content w-full rounded-md py-5 text-base leading-4 font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none">
                    View Carrier Details
                  </button>
                </div>
              </Card>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:items-start xl:w-5/12">
            <Card className="flex w-full flex-col rounded-lg bg-white p-6 shadow">
              <h3 className="text-content font-heading text-lg">Customer</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <UserIcon size={16} className="text-gray-500" />
                  <p className="text-content text-sm">Clark Trogo</p>
                </div>

                <div className="flex items-center gap-4">
                  <MailIcon size={16} className="text-gray-500" />
                  <p className="text-sm text-gray-500">clark@gmail.com</p>
                </div>

                <div className="flex items-center gap-4">
                  <PhoneIcon size={16} className="text-gray-500" />
                  <p className="text-sm text-gray-500">+639123456789</p>
                </div>
              </div>
            </Card>
            <Card className="flex w-full flex-col rounded-lg bg-white p-6 shadow">
              <h3 className="text-content font-heading text-lg">
                Payment Information
              </h3>
              <div className="text-content flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-4">
                  <PiggyBankIcon size={16} className="text-gray-500" />
                  <p className="text-content">{order.payment_method}</p>
                </div>
                <div className="flex items-center gap-4">
                  <UserIcon size={16} className="text-gray-500" />
                  <p className="text-content">{order.account_name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <HashIcon size={16} className="text-gray-500" />
                  <p className="text-content">{order.reference_number}</p>
                </div>
                <div className="flex items-center gap-4">
                  <LocationEditIcon size={16} className="text-gray-500" />
                  <p className="text-content">{order.address}</p>
                </div>
              </div>
            </Card>
            <Card className="flex w-full flex-col rounded-lg bg-white p-6 shadow">
              <h3 className="text-content font-heading text-lg">Notes</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500">
                    {order.notes?.trim() ? order.notes : 'No notes'}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="font-heading flex w-full flex-col rounded-lg bg-white p-6 shadow">
              <h3 className="text-content text-lg">Other</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500">
                    {order.notes?.trim() ? order.notes : 'No notes'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

