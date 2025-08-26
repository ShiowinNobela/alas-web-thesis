import ShowcaseButton from '@/components/bigComponents/ShowcaseButton';
import { motion } from 'framer-motion';
import {
  StarIcon,
  QuoteIcon,
  MessageCircleIcon,
  FlameIcon,
} from 'lucide-react';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Joshcent Rivera',
      role: 'Food Blogger',
      content:
        'ALAS sauces transformed my cooking! The perfect balance of heat and flavor. I put it on everything from eggs to pizza. My subscribers went crazy for my recipes using these sauces!',
      rating: 5,
      image:
        'https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-1/499242487_660617000298825_7648577276595743173_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=106&ccb=1-7&_nc_sid=e99d92&_nc_ohc=eInaUib_ZEwQ7kNvwFKPNij&_nc_oc=AdljdpGD7sGZWwh6vL96Y4IXn4StyVPxxn96D_jg2PAVhcE8PzJQI7Ar2W_JXJchC-E&_nc_zt=24&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=p7DqAlDaxru8X0wIT2GdNQ&oh=00_AfUwHS0dsaFvlDZ8zZoGqAerV0P-fsw4uk6VE11vBy5fRg&oe=68B395AD',
    },
    {
      name: 'Clark Trogo',
      role: 'Restaurant Owner',
      content:
        "We've been using ALAS hot sauces in our restaurant for 6 months now. Customers keep coming back asking what brand we use. The smoky chipotle is our bestseller!",
      rating: 4,
      image:
        'https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-6/469044029_532287313131795_586094656816260243_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=O8D9p2b0008Q7kNvwFqN2Oy&_nc_oc=Adm_AvXvznED79nssGDorOZU8KCxYHzCLORcNbR55NdAvMtWf93Bf_xwJ7FumAg6xbg&_nc_zt=23&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=5eBk0ihzRZPlTW32PRs4xg&oh=00_AfXm1ZQQKveolEMglnJ824BQuiD_TLpBLmCj4_Pe5ZCyCQ&oe=68B388FE',
    },
    {
      name: 'Torogo Guy',
      role: 'Home Cook',
      content:
        "I'm not usually a spicy food person, but the mild options from ALAS have just the right kick. The flavors are so complex - you can tell they use quality ingredients.",
      rating: 5,
      image:
        'https://scontent.fmnl9-2.fna.fbcdn.net/v/t39.30808-6/412954468_301070099586852_7104256681861247984_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=iuimq8Zrbx8Q7kNvwE7G6WD&_nc_oc=AdkA9aJVehP-Qu7y7LPWKk6HSh3vBdJHCLhD42wGquDIZ-0hYSklTWh-lu9ye2MhubE&_nc_zt=23&_nc_ht=scontent.fmnl9-2.fna&_nc_gid=y-7i5kVT8lPrwogQW9VM8A&oh=00_AfUbOGpJ33fk4_oCGaRtCpyOzQH83tx0KrqcuTs66_x0eA&oe=68B390E6',
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
          <p className="mx-auto max-w-2xl text-gray-600">
            Don't just take our word for it - hear from those who've experienced
            the ALAS difference
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
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg"
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
                    <h3 className="text-content font-medium">
                      {testimonial.name}
                    </h3>
                    <p className="text-lighter text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <QuoteIcon className="text-primary mb-4 h-6 w-6 opacity-80" />

                <p className="mb-6 text-gray-600">{testimonial.content}</p>

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
            size="md"
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
