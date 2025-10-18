import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useUserStore from '@/stores/userStore';
import { getStatusStyle } from '@/utils/statusBadgeStyle';
import { UserIcon, MailIcon, PhoneIcon, HashIcon, PiggyBankIcon, LocationEditIcon } from 'lucide-react';
import BackButton from '@/components/bigComponents/BackButton';
import { TooltipProvider } from '@/components/ui/tooltip';
import UserOrderHistory from '@/components/bigComponents/UserOrderHistory';

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
    return <div className="h-screen bg-neutral"></div>;
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
      <section className="h-full py-8 pb-40 bg-neutral">
        <div className="max-w-6xl px-4 mx-auto md:px-6 lg:px-8">
          <BackButton />

          <div className="flex flex-col items-start space-y-2">
            <div className="flex gap-4">
              <h1 className="text-xl font-bold text-content font-heading md:text-2xl">
                Order ID: <span className="text-xl text-brand">{order?.id} </span>
              </h1>
              <p className={`px-4 mb-7 text-sm md:text-base ${getStatusStyle(order?.status || 'unknown')}`}>
                {order?.status || 'Unknown'}
              </p>
            </div>
            <div className="flex flex-col w-full space-y-2 md:flex-row md:justify-between md:space-y-0">
              <div className="flex flex-col space-y-1 md:flex-row md:items-center md:space-y-0 md:space-x-2">
                <p className="text-sm text-lighter">
                  You ordered this on <span className="text-content">{finalDateString}</span>
                </p>
              </div>
              <div className="self-start md:self-center"></div>
            </div>
          </div>

          <div className="flex flex-col items-stretch justify-center w-full mt-5 space-y-4 xl:flex-row xl:space-y-0 xl:space-x-4">
            <div className="flex flex-col items-start justify-start w-full space-y-4">
              {order.items?.map((item) => (
                <Card key={item.item_id} className="flex flex-col items-center w-full px-4 sm:items-start border-primary md:flex-row">
                  <div className="w-30">
                    <img src={item.image} alt={item.product_name} className="object-cover w-full" />
                  </div>

                  {/* CONTENT COLUMN */}
                  <div className="flex flex-col items-center flex-1 h-full sm:items-baseline sm:justify-between">
                    <div className="pb-5 space-y-1 sm:pb-2">
                      <h3 className="text-2xl font-bold font-heading">{item.product_name}</h3>
                      <p className="text-sm text-center capitalize text-lighter">{item.category}</p>
                    </div>
                    <div className="flex gap-8 text-sm sm:gap-4 md:divide-lighter text-content md:flex-row md:divide-x">
                      <div className="pr-2">
                        <p>Quantity</p>
                        <span className="font-bold font-heading">{item.quantity}</span>
                      </div>
                      <div className="pr-2">
                        <p>Item Price</p>
                        <span className="font-bold font-heading">₱ {item.unit_price}</span>
                      </div>
                      <div className="pr-2">
                        <p>Subtotal</p>
                        <span className="font-bold font-heading text-emerald-500">₱ {item.subtotal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-5 mr-5 sm:mr-2 sm:gap-2 sm:flex-col">
                    <Button className="w-1/2 sm:w-full">Order Again</Button>
                    <Link to={`/user/review/${order?.id}?product_id=${item.product_id}`}>
                      <Button variant="outline">Review Product</Button>
                    </Link>
                  </div>
                </Card>
              ))}

              <div className="flex flex-col items-stretch justify-center w-full space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="font-bold">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-2 divide-y divide-gray-200">
                    <div className="flex justify-between py-2">
                      <span>Subtotal</span>
                      <span className="font-semibold">{order?.subtotal || '0.00'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Discount</span>
                      <span className="font-semibold">{order?.discount_amount || '0.00'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Shipping</span>
                      <span className="font-semibold">0.00</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-primary">{order?.total_amount || '0.00'}</span>
                  </CardFooter>
                </Card>

                <Card className="flex-col w-full space-y-4">
                  <CardHeader>
                    <CardTitle className="font-bold">Courier</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src="https://i.ibb.co/L8KSdNQ/image-3.png" alt="Courier Logo" className="w-8 h-8" />
                      <div className="flex flex-col">
                        <span className="text-base">Free Delivery</span>
                        <span className="text-sm text-muted-foreground">Delivery within 24 Hours</span>
                      </div>
                    </div>
                    <span className="font-semibold">0.00</span>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Carrier Details</Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="w-full">
                <UserOrderHistory order={order} />
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-4 md:items-start xl:w-5/12">
              <Card className="flex-col w-full space-y-2">
                <CardHeader>
                  <CardTitle className="font-bold">Customer</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-3">
                    <UserIcon size={16} className="text-muted-foreground" />
                    <span className="truncate">{user.username}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MailIcon size={16} className="text-muted-foreground" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon size={16} className="text-muted-foreground" />
                    <span>{user.contact_number}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-col w-full space-y-2">
                <CardHeader>
                  <CardTitle className="font-bold">Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-3">
                    <PiggyBankIcon size={16} className="text-muted-foreground" />
                    <span>{order?.payment_method || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserIcon size={16} className="text-muted-foreground" />
                    <span>{order?.account_name || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HashIcon size={16} className="text-muted-foreground" />
                    <span className="break-all">{order?.reference_number || 'N/A'}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <LocationEditIcon size={16} className="text-muted-foreground mt-0.5" />
                    <span>{order?.address || 'N/A'}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-col w-full space-y-2">
                <CardHeader>
                  <CardTitle className="font-bold">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{order.notes?.trim() ? order.notes : 'No notes'}</p>
                </CardContent>
              </Card>

              <Card className="flex-col w-full space-y-2">
                <CardHeader>
                  <CardTitle className="font-bold">More Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{order.notes?.trim() ? order.notes : 'No notes'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
