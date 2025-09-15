import ShowcaseButton from '@/components/bigComponents/ShowcaseButton';
import { motion } from 'framer-motion';
import { StarIcon, QuoteIcon, MessageCircleIcon, FlameIcon } from 'lucide-react';

const TestimonialSection = () => {
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
    <section className="bg-gradient-to-br from-orange-100 via-amber-100 to-amber-200 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-200 px-4 py-1.5 text-orange-900">
            <FlameIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Customer Love</span>
          </div>
          <h2 className="font-heading text-content mb-4 text-3xl font-bold md:text-4xl">
            What Our <span className="text-orange-600">Spice Lovers</span> Say
          </h2>
          <p className="text-lighter mx-auto max-w-2xl">
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
              className="group bg-card relative overflow-hidden rounded-xl shadow-lg"
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-300/30"></div>

              <div className="relative z-10 p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="border-primary h-14 w-14 overflow-hidden rounded-full border-2">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-content font-medium">{testimonial.name}</h3>
                    <p className="text-lighter text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <QuoteIcon className="text-primary mb-4 h-6 w-6 opacity-80" />

                <p className="text-lighter mb-6">{testimonial.content}</p>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="from-primary absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r to-amber-600"></div>
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
          <ShowcaseButton
            icon={<MessageCircleIcon className="h-5 w-5" />}
            className="bg-amber-600 text-white hover:bg-amber-600"
          >
            Leave a Review
          </ShowcaseButton>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
