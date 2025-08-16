import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRightIcon, AwardIcon } from 'lucide-react';
import ShowcaseButton from '@/components/bigComponents/ShowcaseButton';
import { Link } from 'react-router-dom';

const StorySection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Image Column */}
          <div className="relative h-full min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ rotateX, rotateY }}
              onPointerMove={(e) => {
                const bounds = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - bounds.left - bounds.width / 2);
                y.set(e.clientY - bounds.top - bounds.height / 2);
              }}
              onPointerLeave={() => {
                x.set(0);
                y.set(0);
              }}
              className="relative h-full overflow-hidden rounded-2xl shadow-2xl"
            >
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351167/BGSos_fjwqb0.jpg"
                alt="Our team crafting hot sauces"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                type: 'spring',
                bounce: 0.4,
              }}
              className="absolute -right-10 bottom-0 z-10 w-40 overflow-hidden rounded-xl border-4 border-amber-400 bg-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] md:-right-12 md:bottom-2 md:w-48 lg:-right-14 lg:bottom-4 lg:w-56"
            >
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351169/lp2_q6mjhd.jpg"
                alt="Award winning hot sauce"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-amber-500/10">
                <AwardIcon className="h-8 w-8 text-amber-400 drop-shadow-lg" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 text-amber-700"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                transition={{ duration: 0.6 }}
                className="h-0.5 bg-amber-700"
              />
              <span className="text-sm font-medium tracking-wider uppercase">
                Our Journey
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-heading mb-6 text-3xl font-bold text-gray-900 md:text-4xl"
            >
              Crafting Delicate Heat With{' '}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-primary"
              >
                Passion Since 2020
              </motion.span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 space-y-4 text-gray-600"
            >
              <p>
                Our journey into the spice world came as a surprise, from
                curiosity, to independent research, up to becoming a legit
                business.
              </p>
              <p>
                Each bottle represents countless hours of craft. Local
                ingredients, no compromises — just award-winning recipes.
              </p>
            </motion.div>

            <Link to="/AboutUs">
              <ShowcaseButton
                size="md"
                icon={<ArrowRightIcon className="h-5 w-5" />}
                className="hover:bg-amber-600"
              >
                Read Our Full Story
              </ShowcaseButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
