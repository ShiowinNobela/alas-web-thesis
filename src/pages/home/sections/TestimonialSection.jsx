import ShowcaseButton from '@/components/bigComponents/ShowcaseButton';
import { motion } from 'framer-motion';
import { StarIcon, QuoteIcon, MessageCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';

const TestimonialSection = () => {
  const user = useUserStore((state) => state.user);

  const testimonials = [
    {
      name: 'Joshcent Rivera',
      role: 'Food Blogger',
      content:
        'ALAS sauces transformed my cooking! The perfect balance of heat and flavor. I put it on everything from eggs to pizza. My subscribers went crazy for my recipes using these sauces!',
      rating: 5,
      image: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755266866/alas_uploads/irew6sxp4aej6qjfdmaf.jpg',
    },
    {
      name: 'Clark Trogo',
      role: 'Restaurant Owner',
      content:
        "We've been using ALAS hot sauces in our restaurant for 6 months now. Customers keep coming back asking what brand we use. The smoky chipotle is our bestseller!",
      rating: 4,
      image: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755266866/alas_uploads/irew6sxp4aej6qjfdmaf.jpg',
    },
    {
      name: 'Torogo Guy',
      role: 'Home Cook',
      content:
        "I'm not usually a spicy food person, but the mild options from ALAS have just the right kick. The flavors are so complex - you can tell they use quality ingredients.",
      rating: 5,
      image: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755266866/alas_uploads/irew6sxp4aej6qjfdmaf.jpg',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 bg-neutral md:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-center font-heading text-content md:text-5xl">
            What Our <span className="text-orange-600">Spice Lovers</span> Say
          </h2>
          <p className="max-w-2xl mx-auto text-center text-lighter">
            Don't just take our word for it - hear from those who've experienced the ALAS difference
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="relative overflow-hidden shadow-lg group bg-card rounded-2xl"
            >
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="overflow-hidden border-2 rounded-full border-primary h-14 w-14">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-content">{testimonial.name}</h3>
                    <p className="text-sm text-lighter">{testimonial.role}</p>
                  </div>
                </div>

                <QuoteIcon className="w-6 h-6 mb-4 text-primary opacity-80" />

                <p className="mb-6 text-lighter">{testimonial.content}</p>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 from-primary bg-gradient-to-r to-amber-600"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          {user ? (
            <Link to="/users/reviews">
              <ShowcaseButton
                icon={<MessageCircleIcon className="w-5 h-5" />}
                className="text-white bg-primary hover:bg-primary/90"
              >
                Leave a Review
              </ShowcaseButton>
            </Link>
          ) : (
            <Link to="/login">
              <ShowcaseButton
                icon={<MessageCircleIcon className="w-5 h-5" />}
                className="text-white bg-primary hover:bg-primary/90"
              >
                Leave a Review
              </ShowcaseButton>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
