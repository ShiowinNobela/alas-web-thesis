import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FireExtinguisherIcon, FlameIcon } from 'lucide-react';
import herogif from '@/components/images/herogif.gif';
import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';

const HeroSection = () => {
  const user = useUserStore((state) => state.user);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const floatingFlame = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex min-h-[500px] w-full items-center justify-center bg-cover bg-center bg-no-repeat md:min-h-[500px]"
        style={{ backgroundImage: `url(${herogif})` }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black/30"
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 container mx-auto px-4"
        >
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1
              variants={item}
              className="font-heading mb-6 text-5xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl"
            >
              Artisanal Hot Sauce and Some Spicy Stuff
            </motion.h1>

            <motion.p
              variants={item}
              className="mb-8 text-lg text-white opacity-90 md:text-xl"
            >
              We pride ourselves on different flavor profiles, not just heat.
              Anything that's spicy as a whole, we have it. From powders, to
              pickles, to oils, to sauces, name it.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col justify-center gap-4 px-8 sm:flex-row"
            >
              <Link to={user ? '/ProductListPage' : '/LoginPage'}>
                <Button variant="CTA" className="px-6 font-medium text-white">
                  Order Now
                </Button>
              </Link>

              <Link to="/ProductListPage">
                <Button
                  variant="outline"
                  className="bg-white/20 px-6 font-medium text-white backdrop-blur-sm transition hover:bg-white/40 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
                >
                  VIEW MENU
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={floatingFlame}
          animate="animate"
          className="absolute top-1/4 left-10 hidden lg:block"
        >
          <FlameIcon className="size-8 text-amber-400/80" />
        </motion.div>

        <motion.div
          variants={floatingFlame}
          animate="animate"
          className="absolute top-1/3 right-10 hidden lg:block"
        >
          <FlameIcon className="size-6 text-red-400/80" />
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: [0, -20, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <FireExtinguisherIcon className="size-10 text-amber-100" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
