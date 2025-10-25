import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';
import { motion } from 'framer-motion';
import { ListOrdered, Star, User, HelpCircle, Phone, Flame, Gift, Shield } from 'lucide-react';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function UserDashboard() {
  const user = useUserStore((state) => state.user);

  const quickActions = [
    {
      title: 'My Orders',
      desc: 'Track, manage, and view your order history',
      icon: <ListOrdered className="h-6 w-6 text-blue-500" />,
      link: '/user/orders',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'My Reviews',
      desc: 'Share your experience and read others',
      icon: <Star className="h-6 w-6 text-amber-500" />,
      link: '/users/reviews',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
    },
    {
      title: 'My Profile',
      desc: 'Update personal info and preferences',
      icon: <User className="h-6 w-6 text-green-500" />,
      link: '/user/profile',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      title: 'My Rewards',
      desc: 'Earn points and unlock exclusive benefits',
      icon: <Gift className="h-6 w-6 text-purple-500" />,
      link: '/user/loyalty-rewards',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
  ];

  // const stats = [
  //   { label: 'Active Orders', value: '2', color: 'text-blue-600' },
  //   { label: 'Reward Points', value: '1,250', color: 'text-amber-600' },
  //   { label: 'Reviews', value: '8', color: 'text-green-600' },
  //   { label: 'Wishlist', value: '5', color: 'text-pink-600' },
  // ];

  return (
    <div className="bg-neutral min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-8 py-4 pb-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between lg:flex-row lg:items-start"
        >
          <div className="space-y-4">
            <h1 className="font-heading text-content text-3xl font-bold tracking-tight md:text-4xl">
              Welcome back, <span className="text-primary">{user?.username}! 👋</span>
            </h1>
            <p className="text-lighter max-w-xl">Manage your account, track orders, and discover new hot sauces!</p>

            {/* Stats Overview
            <div className="flex gap-6 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div> */}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-6 lg:pt-0">
            <Link to="/menu">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="CTA" className="gap-3 px-8 py-6 text-lg">
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 3,
                      duration: 0.8,
                    }}
                  >
                    <Flame className="h-6 w-6" />
                  </motion.div>
                  Explore Hot Sauces
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-content text-xl font-semibold">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link to={item.link}>
                  <Card
                    className={`h-full border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${item.borderColor} ${item.bgColor}`}
                  >
                    <CardContent className="flex flex-col p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <div className={`rounded-2xl p-3 ${item.bgColor}`}>{item.icon}</div>
                      </div>
                      <CardTitle className="mb-2 text-lg font-semibold">{item.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{item.desc}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Promotional Banner */}
        {/* <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 p-8 md:p-10">
              <div className="max-w-2xl">
                <h2 className="font-heading mb-4 text-2xl font-bold text-white md:text-3xl">Limited Time Offer! 🔥</h2>
                <p className="mb-6 max-w-md text-lg text-orange-100">
                  Get free shipping on all orders over $35 + 2x reward points this weekend!
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/products">
                    <Button variant="secondary" className="gap-2 py-3">
                      <TrendingUp className="h-5 w-5" />
                      Shop the Deal
                    </Button>
                  </Link>
                  <Link to="/bundles">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                      View Bundles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.section> */}

        {/* Help & Support */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-content text-xl font-semibold">Help & Support</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: 'FAQ & Help Center',
                desc: 'Find answers to common questions',
                icon: <HelpCircle className="h-6 w-6 text-blue-500" />,
                link: '/faq',
                color: 'blue',
              },
              {
                title: 'Contact Us',
                desc: 'We promise we will reply as soon as we can.',
                icon: <Phone className="h-6 w-6 text-green-500" />,
                link: '/contact',
                color: 'green',
              },
              {
                title: 'Privacy Policy',
                desc: 'Learn about our policies on keeping your privacy safe',
                icon: <Shield className="h-6 w-6 text-purple-500" />,
                link: '/privacy-policy',
                color: 'purple',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link to={item.link}>
                  <Card className="border-2 border-gray-100 transition hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className={`rounded-xl bg-${item.color}-50 p-3 dark:bg-${item.color}-950/20`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                        <CardDescription className="text-sm">{item.desc}</CardDescription>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default UserDashboard;
