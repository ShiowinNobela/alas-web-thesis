import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useUserStore from '@/stores/userStore';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import { useState } from 'react';

import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  HashIcon,
  PiggyBankIcon,
  LocationEditIcon,
  MessageSquareIcon,
} from 'lucide-react';
import BackButton from '@/components/bigComponents/BackButton';
import { TooltipProvider } from '@/components/ui/tooltip';
import AdminNotes from '@/components/AdminNotes';

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
  const user = useUserStore((state) => state.user);
  const [showAdminNotes, setShowAdminNotes] = useState(false);

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

  if (!order) {
    return <div className="p-4">Order not found.</div>;
  }

  let finalDateString = 'Date not available';
  if (order && order.order_date) {
    try {
      const rawDate = order.order_date;
      const dateObj = new Date(rawDate);
      
      if (!isNaN(dateObj.getTime())) {
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });

        const formattedTime = dateObj.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        });

        finalDateString = `${formattedDate} at ${formattedTime}`;
      }
    } catch (error) {
      console.warn('Error formatting date:', error);
      finalDateString = 'Invalid date';
    }
  }

  return (
    <TooltipProvider>
      <section className="bg-neutral h-full py-8 pb-40">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <BackButton />

        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-content font-heading text-xl md:text-2xl font-semibold">
            Your Order Details
          </h1>
          <div className="flex w-full flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
            <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-2">
              <p className="text-lighter text-sm md:text-base">
                Order Number
                <span className="text-content tracking-tighter">
                  {' '}
                  #{order?.id || 'N/A'}{' '}
                </span>
              </p>
              <p className="hidden md:block"> - </p>
              <p className="text-sm md:text-base"> {finalDateString}</p>
            </div>
            <div className="self-start md:self-center">
              <p className={`px-3 py-1 text-sm md:px-4 md:text-base ${getStatusStyle(order?.status || 'unknown')}`}>
                {order?.status || 'Unknown'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex w-full flex-col items-stretch justify-center space-y-4 xl:flex-row xl:space-y-0 xl:space-x-4">
          <div className="flex w-full flex-col items-start justify-start space-y-4">
            <Card className="flex w-full flex-col items-start justify-start divide-y divide-gray-200 rounded-2xl p-3 md:p-4 shadow-xs">
              {order.items?.map((item) => (
                <div
                  key={item.item_id}
                  className="flex w-full flex-col items-start justify-start pb-4 space-y-3 md:flex-row md:items-start md:space-y-0 md:space-x-4"
                >
                  {/* IMAGE COLUMN */}
                  <div className="w-full md:w-32 lg:w-35 mr-0 md:mr-5 border shadow-md">
                    <img
                      className="w-full object-cover"
                      src={item.image}
                      alt="placeholder"
                    />
                  </div>

                  {/* CONTENT COLUMN */}
                  <div className="text-content flex h-full w-full flex-col items-start justify-start md:flex-row md:space-y-0 md:space-x-8">
                    {/* LEFT SIDE: Product details */}
                    <div className="flex h-full w-full flex-col self-start">
                      <h3 className="text-content font-heading text-left text-base md:text-lg">
                        {item.product_name}
                      </h3>
                      <p className="text-lighter text-sm">{item.category}</p>
                      <div className="mt-2 md:mt-auto flex flex-col space-y-1 md:flex-row md:space-y-0 md:divide-x md:divide-gray-300 text-sm">
                        <p className="text-lighter md:pr-4">
                          Quantity{' '}
                          <span className="text-content">{item.quantity}</span>
                        </p>
                        <p className="text-lighter md:px-4">
                          Price{' '}
                          <span className="text-content">
                            {item.unit_price}
                          </span>
                        </p>
                        <p className="text-lighter md:px-4">
                          Subtotal{' '}
                          <span className="text-content">{item.subtotal}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex h-full w-full flex-row items-start justify-start space-x-2 md:space-x-4 self-start md:w-auto md:justify-between">
                      <div className="flex h-full flex-col gap-2 w-full md:w-auto">
                        <Button className="text-xs md:text-sm px-3 py-2 md:px-4">Order Again</Button>
                        <Button variant="outline" className="text-xs md:text-sm px-3 py-2 md:px-4">Review Product</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <Card className="bg-card flex w-full flex-col rounded-2xl p-3 md:p-4 shadow">
                <h3 className="text-content font-heading text-base md:text-lg">Order Summary</h3>
                <div className="flex w-full flex-col items-center justify-center space-y-2 md:space-y-4 divide-y divide-gray-200 border-b border-gray-200">
                  <div className="flex w-full justify-between py-2">
                    <p className="text-sm leading-4">Subtotal</p>
                    <p className="text-content text-sm md:text-base leading-4">
                      {order?.subtotal || '0.00'}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between py-2">
                    <p className="text-content text-sm leading-4">Discount</p>
                    <p className="text-content text-sm md:text-base leading-4">
                      {order?.discount_amount || '0.00'}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between py-2">
                    <p className="text-content text-sm leading-4">Shipping</p>
                    <p className="text-content text-sm md:text-base leading-4">0.00</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-2">
                  <p className="text-content text-sm md:text-base leading-4 font-semibold">
                    Total
                  </p>
                  <p className="text-primary text-sm md:text-base leading-4 font-semibold">
                    {order?.total_amount || '0.00'}
                  </p>
                </div>
              </Card>
              <Card className="bg-card flex w-full flex-col space-y-4 md:space-y-6 rounded-2xl px-3 py-4 md:px-4 md:py-6 shadow xl:p-4">
                <h3 className="text-content font-heading leading-5 text-base md:text-lg">Courier</h3>
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center justify-center space-x-3 md:space-x-4">
                    <div className="h-6 w-6 md:h-8 md:w-8">
                      <img
                        className="h-full w-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <p className="text-content leading-5 md:leading-6 text-sm md:text-base">
                        Free Delivery
                      </p>
                      <p className="text-xs md:text-sm font-normal text-lighter">
                        Delivery within 24 Hours
                      </p>
                    </div>
                  </div>
                  <p className="text-content leading-6 font-semibold text-sm md:text-base">0.00</p>
                </div>
                <div className="flex w-full items-center justify-center">
                  <button className="bg-primary focus:ring-content hover:bg-content w-full rounded-md py-3 md:py-5 text-sm md:text-base leading-4 font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none">
                    View Carrier Details
                  </button>
                </div>
              </Card>
            </div>

            {/* Desktop for Admin Notes*/}
            <div className="hidden xl:block">
              <Card className="flex w-full flex-col rounded-2xl bg-white p-3 md:p-4 shadow">
                <div className="flex flex-col gap-3">
                  <h3 className="text-content font-heading text-base md:text-lg">Admin Notes & Feedback</h3>
                  <Button
                    variant="outline"
                    onClick={() => setShowAdminNotes(!showAdminNotes)}
                    className="w-full text-sm md:text-base"
                  >
                    <MessageSquareIcon className="mr-2 h-4 w-4" />
                    {showAdminNotes ? 'Hide Admin Notes' : 'View Admin Notes & Feedback'}
                  </Button>
                </div>
                {showAdminNotes && (
                  <div className="mt-4">
                    <AdminNotes order={order} />
                  </div>
                )}
              </Card>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:items-start xl:w-5/12">
            <Card className="flex w-full flex-col rounded-2xl bg-white p-3 md:p-4 shadow">
              <h3 className="text-content font-heading text-base md:text-lg">Customer</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 md:gap-4">
                  <UserIcon size={16} className="text-lighter flex-shrink-0" />
                  <p className="text-content text-sm md:text-base truncate">{user.username}</p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <MailIcon size={16} className="text-lighter flex-shrink-0" />
                  <p className="text-lighter text-sm md:text-base truncate">{user.email}</p>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <PhoneIcon size={16} className="text-lighter flex-shrink-0" />
                  <p className="text-lighter text-sm md:text-base">{user.contact_number}</p>
                </div>
              </div>
            </Card>
            <Card className="flex w-full flex-col rounded-2xl bg-white p-3 md:p-4 shadow">
              <h3 className="text-content font-heading text-base md:text-lg">Payment Information</h3>
              <div className="text-content flex flex-col gap-2 text-sm md:text-base">
                <div className="flex items-center gap-3 md:gap-4">
                  <PiggyBankIcon size={16} className="text-lighter flex-shrink-0" />
                  <p className="text-content truncate">{order?.payment_method || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <UserIcon size={16} className="text-lighter flex-shrink-0" />
                  <p className="text-content truncate">{order?.account_name || 'N/A'}</p>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                  <HashIcon size={16} className="text-lighter flex-shrink-0" />
                  <p className="text-content break-all text-sm">{order?.reference_number || 'N/A'}</p>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <LocationEditIcon size={16} className="text-lighter flex-shrink-0 mt-0.5" />
                  <p className="text-content text-sm md:text-base">{order?.address || 'N/A'}</p>
                </div>
              </div>
            </Card>
            <Card className="flex w-full flex-col rounded-2xl bg-white p-3 md:p-4 shadow">
              <h3 className="text-content font-heading text-base md:text-lg">Notes</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-4">
                  <p className="text-lighter text-sm md:text-base">
                    {order.notes?.trim() ? order.notes : 'No notes'}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="font-heading flex w-full flex-col rounded-2xl bg-white p-3 md:p-4 shadow xl:hidden">
              <div className="flex flex-col gap-3">
                <h3 className="text-content text-base md:text-lg">Admin Notes & Feedback</h3>
                <Button
                  variant="outline"
                  onClick={() => setShowAdminNotes(!showAdminNotes)}
                  className="w-full text-sm md:text-base"
                >
                  <MessageSquareIcon className="mr-2 h-4 w-4" />
                  {showAdminNotes ? 'Hide Admin Notes' : 'View Admin Notes & Feedback'}
                </Button>
              </div>
            </Card>

            {/* Mobile for Admin Notes*/}
            {showAdminNotes && (
              <Card className="flex w-full flex-col rounded-2xl bg-white p-3 md:p-4 shadow xl:hidden">
                <AdminNotes order={order} />
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
    </TooltipProvider>
  );
}
