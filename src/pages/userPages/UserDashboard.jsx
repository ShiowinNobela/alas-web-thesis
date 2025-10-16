import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';
import { motion } from 'framer-motion';
import {
  ListOrdered,
  Star,
  User,
  HelpCircle,
  Info,
  Phone,
  ArrowRight,
  ShoppingBag,
  Flame,
  TrendingUp,
  Clock,
  RefreshCcw,
} from 'lucide-react';
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function UserDashboard() {
  const user = useUserStore((state) => state.user);

  const featuredProducts = [
    {
      name: 'Carbon',
      desc: 'Perfect balance of sweet and heat.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445989/122179467_192071712292847_9036583728645172047_n_zwhbth.jpg',
      link: '/products/sweet-chili',
      tag: 'BESTSELLER',
      tagColor: 'bg-orange-500',
    },
    {
      name: 'Alas Powders',
      desc: 'Creamy and savory favorite.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351170/powders_lziet3.jpg',
      link: '/products/garlic-mayo',
      tag: 'NEW',
      tagColor: 'bg-green-500',
    },
    {
      name: 'Classic Sauces',
      desc: 'Smoky and rich in flavor.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445522/122462317_192071598959525_4825425067991163101_n_yh2sac.jpg',
      link: '/products/bbq',
      tag: 'TRENDING',
      tagColor: 'bg-red-500',
    },
    {
      name: 'Ballad of Q',
      desc: 'A bold kick for any meal.',
      img: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445445/471449145_1098376664995676_4011717143068015172_n_fmgpvi.jpg',
      link: '/products/spicy-vinegar',
      tag: 'HOT',
      tagColor: 'bg-red-600',
    },
  ];

  const quickActions = [
    {
      title: 'My Orders',
      desc: 'View your active and past orders',
      icon: <ListOrdered className="text-primary h-6 w-6" />,
      link: '/user/orders',
    },
    {
      title: 'Reviews',
      desc: 'Tell us what you think',
      icon: <Star className="text-primary h-6 w-6" />,
      link: '/users/reviews',
    },
    {
      title: 'Profile',
      desc: 'Manage your account and settings',
      icon: <User className="text-primary h-6 w-6" />,
      link: '/user/profile',
    },
    {
      title: 'Wishlist',
      desc: 'See your saved favorites',
      icon: <ShoppingBag className="text-primary h-6 w-6" />,
      link: '/Wishlist',
    },
  ];

  return (
    <div className="bg-neutral min-h-screen p-4 md:p-10">
      <div className="mx-auto max-w-6xl space-y-15 pb-25">
        {/* Header with Welcome & Stats */}
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="space-y-2">
            <h1 className="text-content font-heading text-3xl font-bold tracking-tight md:text-3xl">
              Hello there, <span className="text-brand">{user?.username}!</span>
            </h1>
            <p className="text-lighter max-w-xl">Ready to spice things up?</p>
          </div>
          <div className="flex justify-center gap-4">
            <Link to="/menu">
              <motion.div
                animate={{
                  x: [0, 5, -5, 8, 0],
                  y: [0, -4, 6, -3, 0],
                  rotate: [0, 1, -1, 1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 2,
                    boxShadow: '0 0 20px rgba(255,100,0,0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Button variant="CTA" className="gap-2 py-5">
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatDelay: 4,
                        duration: 0.6,
                        ease: 'easeInOut',
                      }}
                    >
                      <Flame className="h-5 w-5 text-white" />
                    </motion.div>
                    Shop All Sauces
                  </Button>
                </motion.div>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* We should replace this with actual product linkined it to product details page*/}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-base">Featured Sauces</h2>
            <Link to="/menu" className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card
                key={product.name}
                className="group overflow-hidden p-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`font-heading absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-bold text-white ${product.tagColor}`}
                  >
                    {product.tag}
                  </div>
                </div>
                <CardContent className="space-y-3 p-5">
                  <div>
                    <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2 text-sm">{product.desc}</CardDescription>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link to={product.link} className="w-full">
                      <Button size="sm" className="w-full">
                        Try It Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions - Compact Version */}
        <section className="space-y-4">
          <h2 className="text-content text-xl md:text-base">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickActions.map((item) => (
              <Link key={item.title} to={item.link}>
                <Card className="transition-all hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="flex flex-col items-center gap-3 p-4 text-center">
                    <div className="bg-primary/10 rounded-full p-3">{item.icon}</div>
                    <div>
                      <CardTitle className="text-sm font-semibold">{item.title}</CardTitle>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Promotional Banner */}
        <Card className="to-brand from-primary relative overflow-hidden rounded-2xl border-0 bg-gradient-to-r">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="font-heading mb-3 text-2xl font-bold text-white md:text-3xl">Spice Up Your Collection</h2>
              <p className="mb-6 max-w-md text-orange-100">
                Discover limited edition sauces and exclusive bundles. Free shipping on orders over $35!
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products">
                  <Button variant="secondary" className="gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Shop Now
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

        {/* I think we can make this as Recently Viewed / Personalized Recommendations section but ignore for now */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-content text-xl font-bold md:text-2xl">⭐ Made Just For You</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* You can add personalized recommendations here based on user behavior */}
            <Card className="overflow-hidden transition hover:shadow-lg">
              <CardContent className="p-0">
                <div className="bg-muted flex items-center justify-center p-8">
                  <div className="text-center">
                    <Star className="text-primary mx-auto mb-2 h-8 w-8" />
                    <p className="text-muted-foreground text-sm">
                      Your personalized sauce recommendations will appear here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition hover:shadow-lg">
              <CardContent className="p-0">
                <div className="bg-muted flex items-center justify-center p-8">
                  <div className="text-center">
                    <Clock className="text-primary mx-auto mb-2 h-8 w-8" />
                    <p className="text-muted-foreground text-sm">Based on your taste preferences and order history</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition hover:shadow-lg">
              <CardContent className="p-0">
                <div className="bg-muted flex items-center justify-center p-8">
                  <Link to="/menu" className="text-center">
                    <Button variant="CTA" size="sm">
                      Explore All Sauces
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Help & Support - Compact Footer Style */}
        <section className="space-y-4">
          <h2 className="text-content text-lg font-semibold">Need Help?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                title: 'FAQ',
                desc: 'Find quick answers',
                icon: <HelpCircle className="h-5 w-5" />,
                link: '/faq',
              },
              {
                title: 'Contact',
                desc: 'Get in touch',
                icon: <Phone className="h-5 w-5" />,
                link: '/contact',
              },
              {
                title: 'About',
                desc: 'Our story',
                icon: <Info className="h-5 w-5" />,
                link: '/about',
              },
            ].map((item) => (
              <Link key={item.title} to={item.link}>
                <Card className="transition hover:shadow-md">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="bg-primary/10 rounded-full p-2">{item.icon}</div>
                    <div>
                      <CardTitle className="text-sm font-semibold">{item.title}</CardTitle>
                      <CardDescription className="text-xs">{item.desc}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserDashboard;
