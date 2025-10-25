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
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

const products = [
  {
    id: 'P012',
    name: 'Jinx',
    image: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351166/BGAlas_izc4p1.jpg',
    heatLevel: 'Medium Heat',
    size: '150ml',
    description: 'The perfect balance of heat and flavor with a hint of sweet.',
    price: '₱400.00',
  },
  {
    id: 'P015',
    name: 'Red Tam',
    image: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351168/pickledjalapeno_rv2vzc.jpg',
    heatLevel: 'Hot',
    size: '120ml',
    description: 'Fruity habanero flavor with an intense, lingering heat.',
    price: '₱400.00',
  },
  {
    id: 'P002',
    name: 'Big Bald Bob',
    image: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351167/bigbaldbob_zxev1u.jpg',
    heatLevel: 'Mild',
    size: '200ml',
    description: 'Rich smoky flavor with a subtle warmth that builds slowly.',
    price: '₱400.00',
  },
  {
    id: 'P011',
    name: 'Hey Day Wreck',
    image:
      'https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445632/471779028_1099994044833938_4378818071091498091_n_nzu1r6.jpg',
    heatLevel: 'Extreme',
    size: '150ml',
    description: 'For true heat seekers - use sparingly!',
    price: '₱1000.00',
  },
];

export default function ProductsShowcaseSection() {
  return (
    <section className="py-12 product-gradient md:py-25">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold font-heading text-content md:text-5xl">
            Spice Up Your Life, <span className="text-primary">Like Never Before</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-lighter">
            Artisanal heat crafted for flavor explorers. Each product tells a story of passion.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={hoverEffect}
              className="relative overflow-hidden transition-all duration-300 rounded-lg shadow-md group bg-card hover:shadow-xl sm:rounded-xl"
            >
              {index === 1 && (
                <div className="absolute z-10 px-2 py-1 text-xs font-bold text-white bg-primary top-3 right-3 rounded-xl">
                  Bestseller
                </div>
              )}
              {index === 2 && (
                <div className="absolute z-10 px-2 py-1 text-xs font-bold text-white bg-primary top-3 right-3 rounded-xl">
                  New
                </div>
              )}

              <div className="relative w-full h-40 overflow-hidden sm:h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="p-3 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold font-heading text-content">{product.name}</h3>
                  <div className="flex items-center text-primary">
                    <StarIcon className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    <FlameIcon className="w-4 h-4" />
                    {product.heatLevel}
                  </span>
                  <span className="text-sm text-lighter">|</span>
                  <span className="text-sm text-lighter">{product.size}</span>
                </div>

                <p className="mb-4 text-lighter">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-content">{product.price}</span>
                  <Link to={`/product/${product.id}`}>
                    <ShowcaseButton
                      size="sm"
                      icon={<ArrowRightIcon className="w-4 h-4" />}
                      className="text-white bg-primary hover:bg-amber-600"
                    >
                      View Menu
                    </ShowcaseButton>
                  </Link>
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
          className="text-center mt-14"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/menu">
            <Button variant="CTA" className="relative overflow-hidden group">
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
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.span>
              </motion.span>

              <motion.span
                className="absolute inset-0 opacity-0 bg-gradient-to-r from-amber-500 to-amber-600 group-hover:opacity-100"
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
