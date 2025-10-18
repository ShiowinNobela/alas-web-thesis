import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '@/stores/userStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

function AfterCheckOutPage() {
  const navigate = useNavigate();
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
        const fetchedOrder = response.data.data;

        const orderDate = new Date(fetchedOrder.order_date);
        const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

        if (orderDate.getTime() < tenMinutesAgo) {
          navigate('/*', { replace: true });
          return;
        }

        setOrder(fetchedOrder);
      } catch {
        setError('Failed to fetch order.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) return <div className="h-screen bg-amber-100"></div>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  return (
    <main className="min-h-screen py-8 bg-amber-100">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={250}
        gravity={0.2}
        colors={['#FFC371', '#FF7E5F', '#FFB347', '#EF6C00']}
      />
      {/* Because why not */}

      <div className="flex flex-col items-center w-full max-w-3xl px-4 mx-auto">
        <motion.img
          src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
          alt="Alas Delis Logo"
          className="object-contain w-20 h-20 mx-auto mb-4"
          initial={{ y: -40 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <motion.h1
          className="mb-4 text-3xl font-bold text-center font-heading text-primary sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Thank You! <span className="text-content dark:text-neutral">{user.username}</span>
        </motion.h1>

        <motion.p
          className="mb-2 text-base text-center sm:text-lg text-content font-heading dark:text-neutral"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Your purchase was completed successfully!
        </motion.p>

        <motion.p
          className="mb-10 text-sm text-center uppercase sm:text-base font-heading text-lighter dark:text-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          ORDER NO: {order.id}
        </motion.p>

        <motion.div
          className="flex flex-col items-center w-full gap-2 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/user/orders">
            <Button size="lg" className="px-12 py-6 text-base rounded-lg font-heading">
              Go to your Orders
            </Button>
          </Link>
          <div className="flex flex-col items-center">
            <Link to="/menu">
              <Button variant="link" className="text-sm text-lighter sm:text-base dark:text-card">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/menu">
              <Button variant="link" className="text-sm text-lighter sm:text-base dark:text-card">
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
          <Card className="w-full p-3 mb-6 border-2 rounded-lg sm:p-5">
            <h2 className="text-lg font-bold text-center sm:text-xl font-heading">ORDER ITEMS</h2>

            <div className="py-2 mb-4 border-t border-b border-gray-300">
              <div className="flex items-center justify-between">
                <span className="font-semibold">TOTAL AMOUNT</span>
                <span className="text-xl font-bold font-heading text-emerald-500">₱{order.total_amount}</span>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.item_id}
                  className="flex items-start justify-between pb-3 border-b border-gray-200 border-dashed"
                >
                  <div className="flex items-start gap-3">
                    <img src={item.image} alt={item.product_name} className="object-cover rounded size-28" />
                    <div>
                      <p className="text-sm font-semibold font-heading sm:text-base">{item.product_name}</p>
                      <p className="text-xs sm:text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold font-heading sm:text-base">₱{item.subtotal}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.p
          className="mb-10 text-lg leading-relaxed text-center sm:text-lg text-content font-heading dark:text-card"
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
