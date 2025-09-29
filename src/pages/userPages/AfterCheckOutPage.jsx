import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

function AfterCheckOutPage() {
  const user = useUserStore((state) => state.user);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (loading) return <div className="h-screen bg-amber-100"></div>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  return (
    <main className="min-h-screen bg-amber-100 py-8">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={250}
        gravity={0.2}
        colors={['#FFC371', '#FF7E5F', '#FFB347', '#EF6C00']}
      />
      {/* Because why not */}

      <div className="mx-auto flex w-2xl flex-col items-center px-4">
        <motion.img
          src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
          alt="Alas Delis Logo"
          className="mx-auto mb-4 h-20 w-20 object-contain"
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <motion.h1
          className="font-heading text-primary mb-4 text-center text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Thank You! <span className="text-content">{user.username}</span>
        </motion.h1>

        <motion.p
          className="text-content font-heading mb-2 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Your purchase was completed successfully!
        </motion.p>

        <motion.p
          className="font-heading text-lighter mb-10 text-center uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          ORDER NO: {order.id}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-2 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/UserOrderPage">
            <Button size="lg" className="font-heading rounded-lg px-12 py-6 text-base">
              Go to your Orders
            </Button>
          </Link>
          <div className="flex flex-col items-center">
            <Link to="/ProductListPage">
              <Button variant="link" className="text-lighter">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/ProductListPage">
              <Button variant="link" className="text-primary">
                Back to Menu
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-full"
        >
          <Card className="mb-6 w-full rounded-lg border-2 p-5">
            <h2 className="font-heading text-center text-lg font-bold">ORDER ITEMS</h2>

            <div className="mb-4 border-t border-b border-gray-300 py-2">
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
        </motion.div>

        <motion.p
          className="text-content font-heading mb-10 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Your order has been successfully processed and will be prepared shortly. Please check your orders page for
          detailed information including items, quantities, and total cost. We appreciate your purchase and hope you
          enjoy your meal!
        </motion.p>
      </div>
    </main>
  );
}

export default AfterCheckOutPage;
