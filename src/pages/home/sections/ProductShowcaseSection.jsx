import ShowcaseButton from '@/components/bigComponents/ShowcaseButton';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FlameIcon, StarIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const hoverEffect = {
  scale: 1.03,
  boxShadow:
    '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const products = [
  {
    name: 'Classic ALAS',
    image:
      'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351166/BGAlas_izc4p1.jpg',
    heatLevel: 'Medium Heat',
    size: '150ml',
    description: 'The perfect balance of heat and flavor with a hint of sweet.',
    price: '₱300.00',
  },
  {
    name: 'Pickled Jalapeno',
    image:
      'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351168/pickledjalapeno_rv2vzc.jpg',
    heatLevel: 'Hot',
    size: '120ml',
    description: 'Fruity habanero flavor with an intense, lingering heat.',
    price: '₱350.00',
  },
  {
    name: 'Big Bald Bob',
    image:
      'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351167/bigbaldbob_zxev1u.jpg',
    heatLevel: 'Mild',
    size: '200ml',
    description: 'Rich smoky flavor with a subtle warmth that builds slowly.',
    price: '₱320.00',
  },
  {
    name: 'Powder Extreme',
    image:
      'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351170/powders_lziet3.jpg',
    heatLevel: 'Extreme',
    size: '100ml',
    description: 'For true heat seekers - use sparingly!',
    price: '₱400.00',
  },
];

export default function ProductsShowcaseSection() {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-yellow-100 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-amber-800">
            <FlameIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Spicy & Flavorful</span>
          </div>
          <h2 className="font-heading text-content mb-4 text-4xl font-bold md:text-5xl">
            Spice Up Your Life,{' '}
            <span className="text-primary">Like Damn Bruh</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Artisanal heat crafted for flavor explorers. Each product tells a
            story of passion.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={hoverEffect}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            >
              {index === 1 && (
                <div className="bg-primary absolute top-3 right-3 z-10 rounded-full px-2 py-1 text-xs font-bold text-white">
                  Bestseller
                </div>
              )}
              {index === 2 && (
                <div className="bg-primary absolute top-3 right-3 z-10 rounded-full px-2 py-1 text-xs font-bold text-white">
                  New
                </div>
              )}

              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-heading text-content text-xl font-bold">
                    {product.name}
                  </h3>
                  <div className="text-primary flex items-center">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <span className="text-primary inline-flex items-center gap-1 text-sm font-medium">
                    <FlameIcon className="h-4 w-4" />
                    {product.heatLevel}
                  </span>
                  <span className="text-sm text-gray-500">|</span>
                  <span className="text-sm text-gray-500">{product.size}</span>
                </div>

                <p className="mb-4 text-gray-600">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-content text-lg font-bold">
                    {product.price}
                  </span>
                  <ShowcaseButton
                    size="sm"
                    icon={<ArrowRightIcon className="h-4 w-4" />}
                    className="bg-primary text-white hover:bg-amber-600"
                  >
                    View Menu
                  </ShowcaseButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/ProductListPage">
            <Button variant="CTA" className="group relative overflow-hidden">
              <motion.span
                className="relative z-10 flex items-center justify-center gap-2"
                whileHover={{ gap: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Explore Our Full Menu
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: 3 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.span>
              </motion.span>

              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%', opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
