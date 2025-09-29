import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

function AfterCheckOutPage() {
  const user = useUserStore((state) => state.user);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${id}`);
        setOrder(response.data.data);
      } catch {
        setError('Failed to fetch order.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="mt-10 text-center">Loading your order...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  return (
    <main className="bg-neutral min-h-screen py-12">
      <div className="mx-auto flex w-2xl flex-col items-center px-4">
        <img
          src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
          alt="Alas Delis Logo"
          className="mx-auto mb-4 h-20 w-20 object-contain"
        />
        <h1 className="font-heading text-primary mb-4 text-center text-5xl font-bold">
          Thank You! <spam className="text-content">{user.username}</spam>
        </h1>
        <p className="text-content font-heading mb-2 text-center text-lg">Your purchase was completed successfully!</p>
        <p className="font-heading text-lighter mb-15 text-center uppercase">ORDER NO: {order.id}</p>
        <div className="flex flex-col items-center gap-2 pb-10">
          {/* Main button */}
          <Link to="/UserOrderPage">
            <Button size="lg" className="font-heading rounded-lg px-12 py-6 text-base">
              Go to your Orders
            </Button>
          </Link>

          {/* Link-style button underneath */}
          <Link to="/ProductListPage">
            <Button variant="link" className="text-lighter">
              Back to Menu
            </Button>
          </Link>
        </div>

        <p className="text-content font-heading mb-10 text-center text-lg">
          t is a long established fact that a reader will be distracted by the readable content of a page when looking
          at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to usi
        </p>

        <Card className="mb-6 w-full rounded-lg border-2 p-6">
          <h2 className="font-heading text-center text-lg font-bold">ORDER ITEMS</h2>

          <div className="mb-4 border-t border-b border-gray-300 py-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">TOTAL AMOUNT</span>
              <span className="font-heading text-xl font-bold text-emerald-500">₱{order.total_amount}</span>
            </div>
          </div>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.item_id}
                className="flex items-start justify-between border-b border-dashed border-gray-200 pb-3"
              >
                <div className="flex items-start gap-3">
                  <img src={item.image} alt={item.product_name} className="size-28 rounded object-cover" />
                  <div>
                    <p className="font-heading font-semibold">{item.product_name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-heading font-semibold">₱{item.subtotal}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

export default AfterCheckOutPage;
